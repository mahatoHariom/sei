import { inject, injectable } from 'inversify'
import { TYPES } from '@/types'
import { ISubjectRepository } from '@/domain/interfaces/subject.interface'
import { Contact, Subject, User } from '@prisma/client'
import { IAdminRepository } from '@/domain/interfaces/admin.interface'

@injectable()
export class AdminService {
  constructor(@inject(TYPES.IAdminRepository) private adminRepository: IAdminRepository) {}
  async getAllUsers(): Promise<User[]> {
    return this.adminRepository.getAllUsers()
  }
  async getAllContact(): Promise<Contact[]> {
    return this.adminRepository.getAllContact()
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
    return this.adminRepository.editContact({
      contactId,
      name,
      email,
      message,
      phone
    })
  }

  async deleteContact({ contactId }: { contactId: string }): Promise<void> {
    return this.adminRepository.deleteContact({ contactId })
  }

  async createSubject({ name, description }: { name: string; description: string }): Promise<void> {
    return this.adminRepository.createSubject({ name, description })
  }

  async deleteUser({ userId }: { userId: string }): Promise<void> {
    await this.adminRepository.deleteUser({ userId })
  }
  async deleteSubject({ subjectId }: { subjectId: string }): Promise<void> {
    return this.adminRepository.deleteSubject({ subjectId })
  }

  async editSubject({
    name,
    description,
    subjectId
  }: {
    name: string
    description: string
    subjectId: string
  }): Promise<void> {
    return this.adminRepository.editSubject({ name, description, subjectId })
  }
}
