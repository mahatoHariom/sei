import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, injectable } from 'inversify'
import { TYPES } from '@/types'
import { Contact, User } from '@prisma/client'
import { AdminService } from '../services/admin-service'

@injectable()
export class AdminController {
  constructor(@inject(TYPES.AdminService) private adminService: AdminService) {}

  async getAllUsers(request: FastifyRequest, reply: FastifyReply): Promise<User[]> {
    const data = await this.adminService.getAllUsers()
    return reply.status(200).send(data)
  }

  async getAllContact(request: FastifyRequest, reply: FastifyReply): Promise<Contact[]> {
    const data = await this.adminService.getAllContact()
    return reply.status(200).send(data)
  }

  async editContact(
    request: FastifyRequest<{
      Body: { name: string; email: string; message: string; phone: string }
      Params: { contactId: string }
    }>,
    reply: FastifyReply
  ) {
    const { name, email, message, phone } = request.body
    const { contactId } = request.params
    await this.adminService.editContact({
      contactId,
      name,
      email,
      message,
      phone
    })
    reply.status(200).send()
  }

  async deleteContact(request: FastifyRequest<{ Params: { contactId: string } }>, reply: FastifyReply) {
    const { contactId } = request.params
    await this.adminService.deleteContact({ contactId })
    reply.status(200).send()
  }

  async deleteUser(request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply): Promise<void> {
    const { userId } = request.params
    await this.adminService.deleteUser({ userId })
    reply.status(200).send()
  }

  async createSubject(request: FastifyRequest<{ Body: { name: string; description: string } }>, reply: FastifyReply) {
    const { name, description } = request.body
    const data = await this.adminService.createSubject({
      name,
      description
    })
    reply.status(200).send()
  }

  async editSubject(
    request: FastifyRequest<{ Body: { name: string; description: string }; Params: { subjectId: string } }>,
    reply: FastifyReply
  ) {
    const { name, description } = request.body
    const { subjectId } = request.params
    const data = await this.adminService.editSubject({
      name,
      description,
      subjectId
    })
    reply.status(200).send()
  }

  async deleteSubject(request: FastifyRequest<{ Params: { subjectId: string } }>, reply: FastifyReply) {
    const { subjectId } = request.params
    const data = await this.adminService.deleteSubject({
      subjectId
    })
    reply.status(200).send()
  }
}
