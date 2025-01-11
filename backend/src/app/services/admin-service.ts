import { inject, injectable } from 'inversify'
import { TYPES } from '@/types'
import { ISubjectRepository } from '@/domain/interfaces/subject.interface'
import { Carousel, Contact, Subject, User } from '@prisma/client'
import { IAdminRepository } from '@/domain/interfaces/admin.interface'

@injectable()
export class AdminService {
  constructor(@inject(TYPES.IAdminRepository) private adminRepository: IAdminRepository) {}

  async createCarousel({ publicId, url }: { publicId: string; url: string }): Promise<void> {
    return this.adminRepository.createCarousel({ publicId, url })
  }

  // Update a carousel
  async updateCarousel({ id, publicId, url }: { id: string; publicId: string; url: string }): Promise<void> {
    return this.adminRepository.updateCarousel({ id, publicId, url })
  }

  // Delete a carousel
  async deleteCarousel(id: string): Promise<void> {
    return this.adminRepository.deleteCarousel({ id })
  }

  // Get all carousels
  async getCarousels(): Promise<Carousel[]> {
    return this.adminRepository.getCarousels()
  }

  async getEnrolledUsers(page: number = 1, limit: number = 10, search?: string) {
    return this.adminRepository.getEnrolledUsers(page, limit, search)
  }
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
    return this.adminRepository.getAllUsers(page, limit, search)
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
    return this.adminRepository.getAllContact(page, limit, search)
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
