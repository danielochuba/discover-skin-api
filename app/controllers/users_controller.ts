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

  /**
   * @swagger
   * /api/v1/users:
   * post:
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           description: User payload
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *                 example: 'James'
   *                 required: true
   *              lastName:
   *               type: string
   *              example: 'Bond'
   *             required: true
   *               email:
   *                 type: string
   *                 example: 'Bond007@example.com'
   *                 required: true
   *              password:
   *                type: string
   *               example: 'password'
   *              required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
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
