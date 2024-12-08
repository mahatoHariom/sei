export const TYPES = {
  AuthController: Symbol.for('AuthController'),

  UserControllers: Symbol.for('UserControllers'),

  AuthService: Symbol.for('AuthService'),
  UserServices: Symbol.for('UserServices'),
  PrismaAuthRepository: Symbol.for('PrismaAuthRepository'),
  IAuthRepository: Symbol.for('IAuthRepository'),
  IUserRepository: Symbol.for('IUserRepository'),

  ContactController: Symbol.for('ContactController'),
  ContactService: Symbol.for('ContactService'),
  IContactRepository: Symbol.for('IContactRepository'),
  PrismaContactRepository: Symbol.for('PrismaContactRepository'),

  // Subject

  SubjectController: Symbol.for('SubjectController'),
  SubjectService: Symbol.for('SubjectService'),
  ISubjectRepository: Symbol.for('ISubjectRepository'),
  PrismaSubjectRepository: Symbol.for('PrismaSubjectRepository'),

  //

  PrismaClient: Symbol.for('PrismaClient'),
  PrismaService: Symbol.for('PrismaService')
}
