import { test } from '@japa/runner'
import ExperienceCategory from '#models/experience_category'

test.group('Experience Category CRUD', () => {
  test('list all categories', async ({ client }) => {
    const response = await client.get('/experience-categories')
    response.assertStatus(200)
  })
})
