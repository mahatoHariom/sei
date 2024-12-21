import { Contact, Prisma, Subject, User } from '@prisma/client'
import { injectable } from 'inversify'
import { PrismaService } from '@/app/services/prisma-service'
import { ISubjectRepository } from '../interfaces/subject.interface'
import { IAdminRepository } from '../interfaces/admin.interface'

@injectable()
export class PrismaAdminRepository implements IAdminRepository {
  private readonly prisma = PrismaService.getClient()

  getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  getAllContact(): Promise<Contact[]> {
    return this.prisma.contact.findMany()
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