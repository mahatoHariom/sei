import { Prisma, User } from '@prisma/client'
import { injectable } from 'inversify'
import { IAuthRepository } from '../interfaces/auth-interface'

import { PrismaService } from '@/app/services/prisma-service'

@injectable()
export class PrismaAuthRepository implements IAuthRepository {
  private readonly prisma = PrismaService.getClient()

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        userDetail: true
      }
    })
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userDetail: true
      }
    })
  }
}
