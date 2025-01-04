import { Contact, Prisma, Subject, User } from '@prisma/client'
import { injectable } from 'inversify'
import { PrismaService } from '@/app/services/prisma-service'
import { ISubjectRepository } from '../interfaces/subject.interface'
import { IAdminRepository } from '../interfaces/admin.interface'

@injectable()
export class PrismaAdminRepository implements IAdminRepository {
  private readonly prisma = PrismaService.getClient()

  async getAllUsers(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{
    users: User[]
    total: number
    page: number
    limit: number
    totalPages: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }> {
    const skip = (page - 1) * limit

    const whereClause: Prisma.UserWhereInput = search
      ? {
          OR: [
            { fullName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        }
      : {}

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.prisma.user.count({ where: whereClause })
    ])

    const totalPages = Math.ceil(total / limit)

    return {
      users,
      total,
      page,
      limit,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages
    }
  }

  async getAllContact(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{
    contacts: Contact[]
    total: number
    page: number
    limit: number
    totalPages: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }> {
    const skip = (page - 1) * limit

    const whereClause: Prisma.ContactWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { message: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } }
          ]
        }
      : {}

    const [contacts, total] = await Promise.all([
      this.prisma.contact.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.prisma.contact.count({ where: whereClause })
    ])

    const totalPages = Math.ceil(total / limit)

    return {
      contacts,
      total,
      page,
      limit,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages
    }
  }

  async editContact({
    contactId,
    name,
    email,
    message,
    phone
  }: {
    contactId: string
    name: string
    email: string
    message: string
    phone: string
  }): Promise<void> {
    await this.prisma.contact.update({
      where: {
        id: contactId
      },
      data: {
        name,
        email,
        message,
        phone
      }
    })
  }

  async deleteContact({ contactId }: { contactId: string }): Promise<void> {
    await this.prisma.contact.delete({
      where: {
        id: contactId
      }
    })
  }

  async createSubject({ name, description }: { name: string; description: string }): Promise<void> {
    await this.prisma.subject.create({
      data: {
        name,
        description
      }
    })
  }

  async deleteSubject({ subjectId }: { subjectId: string }): Promise<void> {
    await this.prisma.subject.delete({
      where: {
        id: subjectId
      }
    })
  }

  async deleteUser({ userId }: { userId: string }): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: userId
      }
    })
  }
  async editSubject({ subjectId, name, description }: { subjectId: string; name: string; description: string }) {
    await this.prisma.subject.update({
      where: {
        id: subjectId
      },
      data: {
        name,
        description
      }
    })
  }
}
