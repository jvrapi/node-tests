/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { app } from '../../app'
import request from 'supertest'

// Test de integração
describe('Create User Controller', () => {
  it('Should be able to create new user', async () => {
    const response = await request(app).post('/users').send({
      username: 'test-integration',
      email: 'testintegration@test.com.br',
      name: 'test-integration'
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
  })

  it('Should not be able to create an existing user', async () => {
    await request(app).post('/users').send({
      username: 'test-integration-exist',
      email: 'testintegrationExisting@test.com.br',
      name: 'test-integration Exist'
    })

    const response = await request(app).post('/users').send({
      username: 'test-integration-exist',
      email: 'testintegrationExisting@test.com.br',
      name: 'test-integration Exist'
    })

    expect(response.status).toBe(400)
  })
})
