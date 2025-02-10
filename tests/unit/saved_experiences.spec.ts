import { test } from '@japa/runner'
import SavedExperience from '#models/saved_experience'
import Experience from '#models/experience'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Not authorized to Perform Save Experience CRUD', (group) => {
  test('list all saved experiences without authentication retrns error', async ({ client }) => {
    const response = await client.get('/saved-experiences')
    response.assertStatus(404)
  })

  test('save an experience  without authentication retrns error', async ({ client }) => {
    const user = await User.create({
      firstName: 'Frank',
      lastName: 'Smith',
      email: 'frank@example.com',
      password: 'secret',
    })
    const experience = await Experience.create({
      title: 'Rock Climbing',
      description: 'A thrilling climb up a mountain.',
      location: 'Colorado',
      image: 'climbing.jpg',
    })

    const response = await client.post('/saved-experiences').json({
      experience_id: experience.id,
      user_id: user.id,
    })
    response.assertStatus(404)
  })

  test('delete a saved experience without authentication retrns error', async ({ client }) => {
    const user = await User.create({
      firstName: 'Grace',
      lastName: 'Brown',
      email: 'grace@example.com',
      password: 'secret',
    })
    const experience = await Experience.create({
      title: 'Whitewater Rafting',
      description: 'Navigate through thrilling rapids.',
      location: 'Zambia',
      image: 'rafting.jpg',
    })

    const savedExperience = await SavedExperience.create({
      experienceId: experience.id,
      userId: user.id,
    })

    const response = await client.delete(`/saved-experiences/${savedExperience.id}`)
    response.assertStatus(404)
  })
})

test.group('Perfomr Saved Experience CRUD with valid authentication', (group) => {
  test('list all saved experiences', async ({ client }) => {
    const user = await User.create({
      firstName: 'Frank',
      lastName: 'Smith',
      email: 'frank12@example.com',
      password: 'secret',
    })
    const experience = await Experience.create({
      title: 'Rock Climbing',
      description: 'A thrilling climb up a mountain.',
      location: 'Colorado',
      image: 'climbing.jpg',
    })

    const loginResponse = await client.post('/login').json({
      email: user.email,
      password: 'secret',
    })

    const { token } = loginResponse.body().token

    const response = await client
      .get(`/users/${user.id}/saved-experiences`)
      .json({
        experience_id: experience.id,
        user_id: user.id,
      })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
  })

  test('save an experience', async ({ client }) => {
    const user = await User.create({
      firstName: 'Frank',
      lastName: 'Smith',
      email: 'fran1sk@example.com',
      password: 'secret',
    })
    const experience = await Experience.create({
      title: 'Rock Climbing',
      description: 'A thrilling climb up a mountain.',
      location: 'Colorado',
      image: 'climbing.jpg',
    })

    const loginResponse = await client.post('/login').json({
      email: user.email,
      password: 'secret',
    })

    const { token } = loginResponse.body().token

    const response = await client
      .post(`/users/${user.id}/saved-experiences`)
      .json({
        experience_id: experience.id,
        user_id: user.id,
      })
      .header('Authorization', `Bearer ${token}`)
    response.assertStatus(201)
  })

  test('delete a saved experience', async ({ client }) => {
    const user = await User.create({
      firstName: 'Grace',
      lastName: 'Brown',
      email: 'gracw1e@example.com',
      password: 'secret',
    })
    const experience = await Experience.create({
      title: 'Whitewater Rafting',
      description: 'Navigate through thrilling rapids.',
      location: 'Zambia',
      image: 'rafting.jpg',
    })

    const loginResponse = await client.post('/login').json({
      email: user.email,
      password: 'secret',
    })

    const { token } = loginResponse.body().token

    const savedExperience = await SavedExperience.create({
      experienceId: experience.id,
      userId: user.id,
    })
    const response = await client
      .delete(`/users/${user.id}/saved-experiences/${savedExperience.id}`)
      .json({
        experience_id: experience.id,
        user_id: user.id,
      })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(204)
  })
})
