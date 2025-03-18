import { Type } from '@sinclair/typebox'
import { userBaseSchema } from './user-schema'

// Base schema for a subject
export const subjectSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 1 }),
  description: Type.Optional(Type.String()),
  difficulty: Type.Optional(Type.String()),
  duration: Type.Optional(Type.String()),
  imageUrl: Type.Optional(Type.String()),
  lessonsCount: Type.Optional(Type.Integer()),
  tags: Type.Optional(Type.Array(Type.String())),
  isFeatured: Type.Optional(Type.Boolean()),
  isNew: Type.Optional(Type.Boolean()),
  rating: Type.Optional(Type.Number()),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Optional(Type.String({ format: 'date-time' })),
  users: Type.Array(
    Type.Object({
      userId: Type.String()
    })
  )
})

// Input schema for creating or updating a subject
export const subjectInputSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  description: Type.Optional(Type.String()),
  difficulty: Type.Optional(Type.String()),
  duration: Type.Optional(Type.String()),
  imageUrl: Type.Optional(Type.String()),
  lessonsCount: Type.Optional(Type.Integer()),
  tags: Type.Optional(Type.Array(Type.String())),
  isFeatured: Type.Optional(Type.Boolean()),
  isNew: Type.Optional(Type.Boolean()),
  rating: Type.Optional(Type.Number())
})

// Response schema for a single subject
export const subjectResponseSchema = subjectSchema

// Response schema for multiple subjects
export const subjectsResponseSchema = Type.Array(subjectSchema)

export type SubjectResponse = typeof subjectResponseSchema
export type SubjectInput = typeof subjectInputSchema
