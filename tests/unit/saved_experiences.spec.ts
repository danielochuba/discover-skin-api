import { test } from '@japa/runner'
import SavedExperience from '#models/saved_experience'
import Experience from '#models/experience'
import User from '#models/user'

test.group('Saved Experience CRUD', () => {
  test('list all saved experiences', async ({ client }) => {
    const response = await client.get('/saved-experiences')
    response.assertStatus(200)
  })

  test('save an experience', async ({ client }) => {
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
    response.assertStatus(200)
  })

  test('delete a saved experience', async ({ client }) => {
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
    response.assertStatus(200)
  })
})
