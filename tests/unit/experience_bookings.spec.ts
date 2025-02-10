import { test } from '@japa/runner'
import ExperienceBooking from '#models/experience_booking'
import Experience from '#models/experience'
import User from '#models/user'

test.group('Experience Booking CRUD', () => {
  test('list all experience bookings', async ({ client }) => {
    const response = await client.get('/experience-bookings')
    response.assertStatus(200)
  })

  test('create an experience booking', async ({ client }) => {
    const user = await User.create({
      firstName: 'Charlie',
      lastName: 'Brown',
      email: 'charlie@example.com',
      password: 'secret',
    })
    const experience = await Experience.create({
      title: 'Skydiving',
      description: 'A thrilling jump from an airplane.',
      location: 'Dubai',
      image: 'skydiving.jpg',
    })

    const response = await client.post('/experience-bookings').json({
      experience_id: experience.id,
      user_id: user.id,
      date: '2025-10-12',
    })
    response.assertStatus(200)
  })

  test('get an experience booking by ID', async ({ client }) => {
    const user = await User.create({
      firstName: 'Daniel',
      lastName: 'Smith',
      email: 'daniel@example.com',
      password: 'secret',
    })
    const experience = await Experience.create({
      title: 'Zip Lining',
      description: 'Fly through the forest at high speed.',
      location: 'Costa Rica',
      image: 'zipline.jpg',
    })

    const booking = await ExperienceBooking.create({
      experienceId: experience.id,
      userId: user.id,
      status: 'pending',
      voucher: 'abc123',
      price: 100,
    })

    const response = await client.get(`/experience-bookings/${booking.id}`)
    response.assertStatus(200)
  })
})
