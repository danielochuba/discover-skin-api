import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import env from '#start/env'
import { v4 } from 'uuid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})
/**
 * @swagger
 * components:
 * schemas:
 *      User:
 *        type: object
 *        properties:
 *          firstName:
 *            type: string
 *         lastName:
 *           type: string
 *          email:
 *            type: string
 *         password:
 *          type: string
 *
 */

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn:
      env.get('NODE_ENV') === 'production'
        ? '12 weeks'
        : env.get('NODE_ENV') === 'test'
          ? '2 weeks'
          : '2 days',
    prefix: 'discover_skin_oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  @beforeCreate()
  static async assignUuid(user: User) {
    user.id = v4()
  }
}
