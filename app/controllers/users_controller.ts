import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ response }: HttpContext) {
    try {
      const users = await User.all()
      return users
    } catch (error) {
      console.log(error)
      return response.badRequest(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'firstName', 'lastName', 'password'])
      // check if email is already in use
      const emailExists = await User.findBy('email', data.email)

      if (emailExists) {
        return response.badRequest({ message: 'Email already in use' })
      }

      const user = await User.create(data)
      const token = await User.accessTokens.create(user)

      await user.save()

      return { user, token }
    } catch (error) {
      console.log(error)
      return response.badRequest(error)
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      // Validate body

      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)

      return { user, token, message: 'success' }
    } catch (error) {
      console.log(error)
      return response.badRequest(error)
    }
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user as User
    const tokens = await User.accessTokens.all(user)

    for await (const token of tokens) {
      await User.accessTokens.delete(user, token.identifier)
    }

    return { message: 'success' }
  }
}
