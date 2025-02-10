import { test } from '@japa/runner'
import ExperienceDate from '#models/experience_date'
import Experience from '#models/experience'

test.group('Experience Date CRUD', () => {
  test('list all experience dates', async ({ client }) => {
    const response = await client.get('/experience-dates')
    response.assertStatus(200)
  })

  test('create an experience date', async ({ client }) => {
    const experience = await Experience.create({
      title: 'Skydiving',
      description: 'An adrenaline-packed free-fall experience.',
      location: 'Dubai',
      image: 'skydiving.jpg',
    })

    const response = await client.post('/experience-dates').json({
      experience_id: experience.id,
      date: '2025-06-15',
    })
    response.assertStatus(200)
  })

  test('get an experience date by ID', async ({ client }) => {
    const experience = await Experience.create({
      title: 'Bungee Jumping',
      description: 'A thrilling jump from a high bridge.',
      location: 'South Africa',
      image: 'bungee.jpg',
    })

    const experienceDate = await ExperienceDate.create({
      experienceId: experience.id,
      date: new Date(),
    })

    const response = await client.get(`/experience-dates/${experienceDate.id}`)
    response.assertStatus(200)
  })

  test('update an experience date', async ({ client }) => {
    const experience = await Experience.create({
      title: 'Desert Safari',
      description: 'An exciting adventure in the desert.',
      location: 'Dubai',
      image: 'safari.jpg',
    })

    const experienceDate = await ExperienceDate.create({
      experienceId: experience.id,
      date: new Date(),
    })

    const response = await client.put(`/experience-dates/${experienceDate.id}`).json({
      date: '2025-08-15',
    })
    response.assertStatus(200)
  })

  test('delete an experience date', async ({ client }) => {
    const experience = await Experience.create({
      title: 'Hot Air Balloon Ride',
      description: 'A breathtaking view from the skies.',
      location: 'Turkey',
      image: 'balloon.jpg',
    })

    const experienceDate = await ExperienceDate.create({
      experienceId: experience.id,
      date: new Date(),
    })

    const response = await client.delete(`/experience-dates/${experienceDate.id}`)
    response.assertStatus(200)
  })
})
