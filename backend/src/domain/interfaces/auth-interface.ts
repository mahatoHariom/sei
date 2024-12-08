import { Prisma, User, UserDetail } from '@prisma/client'

export interface IAuthRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<Partial<User> | null>
  findById(id: string): Promise<User | null>
  getUserDetails(id: string): Promise<UserDetail | null>
}
