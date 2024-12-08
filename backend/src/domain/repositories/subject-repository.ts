import { Prisma, Subject } from '@prisma/client'
import { injectable } from 'inversify'
import { PrismaService } from '@/app/services/prisma-service'
import { ISubjectRepository } from '../interfaces/subject.interface'

@injectable()
export class PrismaSubjectRepository implements ISubjectRepository {
  private readonly prisma = PrismaService.getClient()

  async getAllSubjects(): Promise<Subject[]> {
    return this.prisma.subject.findMany({
      select: {
        id: true,
        createdAt: true,
        description: true,
        name: true,
        users: {
          select: { userId: true }
        }
      }
    })
  }

  async getUserSubjects(userId: string, page?: number, limit?: number, search?: string) {
    const currentPage = page || 1
    const currentLimit = limit || 10

    const skip = (currentPage - 1) * currentLimit

    const whereClause: Prisma.SubjectWhereInput = {
      users: {
        some: { userId }
      },
      ...(search
        ? {
            name: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode
            }
          }
        : {})
    }

    const [subjects, total] = await Promise.all([
      this.prisma.subject.findMany({
        where: whereClause,
        skip,
        take: Number(currentLimit),
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.prisma.subject.count({
        where: whereClause
      })
    ])

    const totalPages = Math.ceil(total / currentLimit)

    return {
      subjects,
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages,
      hasPreviousPage: currentPage > 1,
      hasNextPage: currentPage < totalPages
    }
  }

  async createUserSubjectEnrollment(userId: string, subjectId: string): Promise<void> {
    await this.prisma.userSubject.create({
      data: { userId, subjectId }
    })
  }

  async findUserSubjectEnrollment(userId: string, subjectId: string) {
    return this.prisma.userSubject.findFirst({
      where: { userId, subjectId }
    })
  }

  async getSubjectById(subjectId: string) {
    return this.prisma.subject.findUnique({
      where: { id: subjectId }
    })
  }
}
