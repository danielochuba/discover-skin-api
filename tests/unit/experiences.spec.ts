import { test } from '@japa/runner'
import Experience from '#models/experience'

test.group('Experience CRUD', () => {
  test('list all experiences', async ({ client }) => {
    const response = await client.get('/experiences')
    response.assertStatus(200)
  })

  test('create an experience', async ({ client }) => {
    const response = await client.post('/experiences').json({
      title: 'Mountain Hiking',
      description: 'A thrilling adventure through scenic mountain trails.',
      location: 'Rocky Mountains',
      image: 'hiking.jpg',
    })
    response.assertStatus(200)
  })

  test('get an experience by ID', async ({ client }) => {
    const experience = await Experience.create({
      title: 'Scuba Diving',
      description: 'Explore the underwater world.',
      location: 'Maldives',
      image: 'scuba.jpg',
    })
    const response = await client.get(`/experiences/${experience.id}`)
    response.assertStatus(200)
  })

  test('update an experience', async ({ client }) => {
    const experience = await Experience.create({
      title: 'City Tour',
      description: 'Guided city sightseeing tour.',
      location: 'New York',
      image: 'city.jpg',
    })
    const response = await client.put(`/experiences/${experience.id}`).json({
      location: 'San Francisco',
    })
    response.assertStatus(200)
  })

  test('delete an experience', async ({ client }) => {
    const experience = await Experience.create({
      title: 'Jungle Safari',
      description: 'Wildlife exploration in dense forests.',
      location: 'Amazon',
      image: 'safari.jpg',
    })
    const response = await client.delete(`/experiences/${experience.id}`)
    response.assertStatus(200)
  })
})
