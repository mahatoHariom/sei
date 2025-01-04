import { Contact, Subject, User } from '@prisma/client'

export interface IAdminRepository {
  getAllUsers(
    page: number,
    limit: number,
    search?: string
  ): Promise<{
    users: User[]
    total: number
    page: number
    limit: number
    totalPages: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }>
  getAllContact(
    page: number,
    limit: number,
    search?: string
  ): Promise<{
    contacts: Contact[]
    total: number
    page: number
    limit: number
    totalPages: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }>

  createSubject({ name, description }: { name: string; description: string }): Promise<void>
  deleteSubject({ subjectId }: { subjectId: string }): Promise<void>
  deleteUser({ userId }: { userId: string }): Promise<void>
  editContact({
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
  }): Promise<void>

  deleteContact({ contactId }: { contactId: string }): Promise<void>

  editSubject({ subjectId, name, description }: { subjectId: string; name: string; description: string }): Promise<void>
}
