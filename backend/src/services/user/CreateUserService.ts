import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest {
  nome: string
  email: string
  senha: string
  cpf: string
  rg?: string
}

class CreateUserService {
  async execute({ nome, email, senha, cpf, rg }: UserRequest) {
    if (!email) {
      throw new Error('Email incorreto!')
    }

    const userAlreadyExist = await prismaClient.usuario.findFirst({
      where: {
        email: email
      }
    })

    if (userAlreadyExist) {
      throw new Error('Usuário já existe!')
    }

    const passwordHash = await hash(senha, 8)

    const user = await prismaClient.usuario.create({
      data: {
        nome: nome,
        email: email,
        senha: passwordHash,
        cpf: cpf,
        rg: rg
      },
      select: {
        id: true,
        status: true,
        nome: true,
        email: true,
        cpf: true,
        rg: true
      }
    })

    return user
  }
}

export { CreateUserService }
