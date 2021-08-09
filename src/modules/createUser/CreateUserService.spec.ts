// Teste unitário

import { User } from '../../entities/User'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { IUsersRepository } from '../../repositories/IUsersRepositories'
import { CreateUserService } from './CreateUserService'

describe('Create User', () => {
  let usersRepository: IUsersRepository
  let createUserService: CreateUserService

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory()
    createUserService = new CreateUserService(usersRepository)
  })

  // cada it é um teste que será executado na aplicação
  it('Should be able to create a new user', async () => {
    // Chamada para o servico

    const userData: User = {
      name: 'Test Name',
      email: 'emailtest@test.com',
      username: 'testusername'
    }

    const user = await createUserService.execute(userData)

    expect(user).toHaveProperty('id')
  })

  it('Should not be able to create an existing user', async () => {
    const userData: User = {
      name: 'Test Existing Name',
      email: 'testexisting@test.com',
      username: 'testexisting'
    }

    await createUserService.execute(userData)

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new Error('User already exists!')
    )
  })
})
