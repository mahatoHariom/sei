import { User, UserDetail } from '@prisma/client'
import { CreateUserDetailInput } from '../schemas/user-schema'

export interface IUserRepository {
  completeProfile(data: CreateUserDetailInput, userId: string): Promise<User>
  changePassword(userId: string, newPassword: string): Promise<User>
  updateProfilePic(userId: string, profilePicData: { url: string; publicId: string }): Promise<UserDetail>
}
