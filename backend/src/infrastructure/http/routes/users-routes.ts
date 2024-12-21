import { FastifyInstance } from 'fastify'
import { TYPES } from '@/types'
import { UserControllers } from '@/app/controllers/users-controller'
// import { upload } from '@/infrastructure/config/multer'

import { Type } from '@sinclair/typebox'
import {
  ChangePasswordInput,
  changePasswordInputSchema,
  CreateUserDetailInput,
  enrollSubjectBody,
  getEnrolledCourseSchema,
  userDetailSchema,
  userResponseSchema
} from '@/domain/schemas/user-schema'
import { upload } from '@/infrastructure/config/multer'

export default async function userRoutes(fastify: FastifyInstance) {
  const userControllers = fastify.container.get<UserControllers>(TYPES.UserControllers)

  fastify.post<{ Body: CreateUserDetailInput }>(
    '/complete-profile',
    {
      schema: {
        tags: ['User'],
        consumes: ['multipart/form-data'],

        response: {
          201: userResponseSchema
        }
      },
      onRequest: fastify.authenticate,
      preHandler: upload.single('profilePic')
    },
    userControllers.completeProfile.bind(userControllers)
  )

  fastify.post<{ Body: ChangePasswordInput }>(
    '/change-password',
    {
      schema: {
        tags: ['User'],
        body: changePasswordInputSchema,
        response: {
          201: { type: 'null' }
        }
      },
      onRequest: fastify.authenticate
    },
    userControllers.changePassword.bind(userControllers)
  )

  fastify.get(
    '/enrolled-courses/:userId',
    {
      schema: {
        tags: ['User'],
        params: getEnrolledCourseSchema,
        response: {
          200: Type.Object({
            courses: Type.Array(
              Type.Object({
                id: Type.String(),
                name: Type.String(),
                description: Type.Optional(Type.String()),
                createdAt: Type.String({ format: 'date-time' })
              })
            ),
            total: Type.Number(),
            page: Type.Number(),
            limit: Type.Number(),
            totalPages: Type.Number(),
            hasPreviousPage: Type.Boolean(),
            hasNextPage: Type.Boolean()
          })
        }
      },
      onRequest: fastify.authenticate
    },
    userControllers.getUserCourses.bind(userControllers)
  )

  fastify.post(
    '/enroll-subject',
    {
      schema: {
        tags: ['User'],
        body: enrollSubjectBody,
        response: {
          201: { type: 'null' }
        }
      },
      onRequest: fastify.authenticate
    },
    userControllers.enrollInSubject.bind(userControllers)
  )

  fastify.patch<{ Body: { fullName?: string; email?: string; userDetails?: Partial<CreateUserDetailInput> } }>(
    '/edit-profile',
    {
      schema: {
        tags: ['User'],
        consumes: ['multipart/form-data'],
        response: {
          200: userResponseSchema
        }
      },
      preHandler: upload.single('profilePic'),
      onRequest: [fastify.authenticate]
    },
    userControllers.editProfile.bind(userControllers)
  ),
    fastify.get(
      '/user-details',
      {
        schema: {
          tags: ['User'],
          response: {
            201: userDetailSchema
          }
        },
        onRequest: fastify.authenticate
      },
      userControllers.getUserDetails.bind(userControllers)
    )
}
