import { FastifyInstance } from 'fastify'
import { TYPES } from '@/types'
import { AdminController } from '@/app/controllers/admin-controller'
import {
  createSubjectSchema,
  deleteContactParamsSchema,
  deleteSubjectParamsSchema,
  deleteUserParamsSchema, // Add this schema
  editContactSchema,
  editSubjectSchema,
  getAllContactsResponseSchema,
  getAllUsersResponseSchema
} from '@/domain/schemas/admin-schemas'

export default async function adminRoutes(fastify: FastifyInstance) {
  const adminController = fastify.container.get<AdminController>(TYPES.AdminController)

  fastify.get(
    '/admin/users',
    {
      schema: {
        tags: ['Admin'],
        response: {
          200: getAllUsersResponseSchema
        }
      },
      onRequest: [fastify.authenticate, fastify.CheckAdminRole]
    },
    adminController.getAllUsers.bind(adminController)
  )

  fastify.get(
    '/admin/contacts',
    {
      schema: {
        tags: ['Admin'],
        response: {
          200: getAllContactsResponseSchema
        }
      },
      onRequest: [fastify.authenticate, fastify.CheckAdminRole]
    },
    adminController.getAllContact.bind(adminController)
  )

  fastify.put(
    '/admin/contacts/:contactId',
    {
      schema: {
        tags: ['Admin'],
        params: deleteContactParamsSchema,
        body: editContactSchema,
        response: {
          200: { type: 'null' }
        }
      },
      onRequest: [fastify.authenticate, fastify.CheckAdminRole]
    },
    adminController.editContact.bind(adminController)
  )

  fastify.delete(
    '/admin/contacts/:contactId',
    {
      schema: {
        tags: ['Admin'],
        params: deleteContactParamsSchema,
        response: {
          200: { type: 'null' }
        }
      },
      onRequest: [fastify.authenticate, fastify.CheckAdminRole]
    },
    adminController.deleteContact.bind(adminController)
  )

  fastify.post(
    '/admin/subjects',
    {
      schema: {
        tags: ['Admin'],
        body: createSubjectSchema,
        response: {
          201: { type: 'null' }
        }
      },
      onRequest: [fastify.authenticate, fastify.CheckAdminRole]
    },
    adminController.createSubject.bind(adminController)
  )

  fastify.put(
    '/admin/subjects/:subjectId',
    {
      schema: {
        tags: ['Admin'],
        params: deleteSubjectParamsSchema,
        body: editSubjectSchema,
        response: {
          200: { type: 'null' }
        }
      },
      onRequest: [fastify.authenticate, fastify.CheckAdminRole]
    },
    adminController.editSubject.bind(adminController)
  )

  fastify.delete(
    '/admin/subjects/:subjectId',
    {
      schema: {
        tags: ['Admin'],
        params: deleteSubjectParamsSchema,
        response: {
          200: { type: 'null' }
        }
      },
      onRequest: [fastify.authenticate, fastify.CheckAdminRole]
    },
    adminController.deleteSubject.bind(adminController)
  )

  fastify.delete(
    '/admin/users/:userId',
    {
      schema: {
        tags: ['Admin'],
        params: deleteUserParamsSchema,
        response: {
          200: { type: 'null' }
        }
      },
      onRequest: [fastify.authenticate, fastify.CheckAdminRole]
    },
    adminController.deleteUser.bind(adminController)
  )
}
