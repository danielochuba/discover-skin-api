import { test } from '@japa/runner'
import ExperienceHighlight from '#models/experience_highlight'
import Experience from '#models/experience'

test.group('Experience Highlight CRUD', () => {
  test('list all experience highlights', async ({ client }) => {
    const response = await client.get('/experience-highlights')
    response.assertStatus(200)
  })

  test('create an experience highlight', async ({ client }) => {
    const experience = await Experience.create({
      title: 'Paragliding',
      description: 'Soar through the skies with a stunning view.',
      location: 'Switzerland',
      image: 'paragliding.jpg',
    })

    const response = await client.post('/experience-highlights').json({
      experience_id: experience.id,
      highlight: 'Includes professional instructor and gear.',
    })
    response.assertStatus(200)
  })

  test('get an experience highlight by ID', async ({ client }) => {
    const experience = await Experience.create({
      title: 'Snorkeling',
      description: 'Explore the underwater world.',
      location: 'Maldives',
      image: 'snorkeling.jpg',
    })

    const highlight = await ExperienceHighlight.create({
      experienceId: experience.id,
      title: 'Includes underwater photography.',
      description: 'Capture your underwater adventure.',
    })

    const response = await client.get(`/experience-highlights/${highlight.id}`)
    response.assertStatus(200)
  })

  test('update an experience highlight', async ({ client }) => {
    const experience = await Experience.create({
      title: 'Helicopter Tour',
      description: 'A breathtaking aerial view.',
      location: 'New York',
      image: 'helicopter.jpg',
    })

    const highlight = await ExperienceHighlight.create({
      experienceId: experience.id,
      title: 'Includes aerial photography.',
      description: 'Capture your flight experience.',
    })

    const response = await client.put(`/experience-highlights/${highlight.id}`).json({
      highlight: 'Includes champagne on board.',
    })
    response.assertStatus(200)
  })

  test('delete an experience highlight', async ({ client }) => {
    const experience = await Experience.create({
      title: 'Mountain Trekking',
      description: 'A thrilling adventure in the mountains.',
      location: 'Nepal',
      image: 'trekking.jpg',
    })

    const highlight = await ExperienceHighlight.create({
      experienceId: experience.id,
      title: 'Includes local guide.',
      description: 'Learn about local culture and traditions.',
    })

    const response = await client.delete(`/experience-highlights/${highlight.id}`)
    response.assertStatus(200)
  })
})
