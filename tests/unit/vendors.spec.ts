import { test } from '@japa/runner'
import Vendor from '#models/vendor'

test.group('Vendor CRUD', () => {
  test('list all vendors', async ({ client }) => {
    const response = await client.get('/vendors')
    response.assertStatus(200)
  })

  test('create a vendor', async ({ client }) => {
    const response = await client.post('/vendors').json({
      firstName: 'John',
      lastName: 'Doe',
      headline: 'Expert Guide',
      about: 'Providing the best travel experiences.',
    })
    response.assertStatus(200)
  })

  test('get a vendor by ID', async ({ client }) => {
    const vendor = await Vendor.create({
      firstName: 'Jane',
      lastName: 'Smith',
      headline: 'Local Tour Guide',
      about: 'Showing the best hidden gems.',
    })
    const response = await client.get(`/vendors/${vendor.id}`)
    response.assertStatus(200)
  })

  test('update a vendor', async ({ client }) => {
    const vendor = await Vendor.create({
      firstName: 'Alice',
      lastName: 'Brown',
      headline: 'Cultural Expert',
      about: 'Deep insights into traditions.',
    })
    const response = await client.put(`/vendors/${vendor.id}`).json({
      about: 'Updated cultural insights.',
    })
    response.assertStatus(200)
  })

  test('delete a vendor', async ({ client }) => {
    const vendor = await Vendor.create({
      firstName: 'Michael',
      lastName: 'Scott',
      headline: 'Regional Guide',
      about: 'Expert in local history.',
    })
    const response = await client.delete(`/vendors/${vendor.id}`)
    response.assertStatus(200)
  })
})
