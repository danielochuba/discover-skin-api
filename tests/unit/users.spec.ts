import { test } from '@japa/runner'

import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import env from '#start/env'

test.group('creating user', () => {
  test('hashes user password', async ({ assert }) => {
    const user = new User()
    user.email = 'daniel@gmail.com'
    user.firstName = 'Daniel'
    user.lastName = 'Smith'
    user.password = 'secret'

    await user.save()

    assert.isTrue(hash.isValidHash(user.password))
    assert.isTrue(await hash.verify(user.password, 'secret'))
  })
})
