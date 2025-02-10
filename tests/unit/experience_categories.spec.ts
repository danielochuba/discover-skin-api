import { test } from '@japa/runner'
import ExperienceCategory from '#models/experience_category'

test.group('Experience Category CRUD', () => {
  test('list all categories', async ({ client }) => {
    const response = await client.get('/experience-categories')
    response.assertStatus(200)
  })

  test('create a category', async ({ client }) => {
    const response = await client.post('/experience-categories').json({
      title: 'Adventure',
      image: 'adventure.jpg',
    })
    response.assertStatus(200)
  })

  test('get a category by ID', async ({ client }) => {
    const category = await ExperienceCategory.create({
      title: 'Relaxation',
      image: 'relaxation.jpg',
    })
    const response = await client.get(`/experience-categories/${category.id}`)
    response.assertStatus(200)
  })

  test('update a category', async ({ client }) => {
    const category = await ExperienceCategory.create({
      title: 'Culture',
      image: 'culture.jpg',
    })
    const response = await client.put(`/experience-categories/${category.id}`).json({
      title: 'Cultural Tours',
    })
    response.assertStatus(200)
  })

  test('delete a category', async ({ client }) => {
    const category = await ExperienceCategory.create({
      title: 'Wildlife',
      image: 'wildlife.jpg',
    })
    const response = await client.delete(`/experience-categories/${category.id}`)
    response.assertStatus(200)
  })
})
