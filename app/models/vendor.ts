import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { v4 } from 'uuid'
import Experience from './experience.js'

export default class Vendor extends BaseModel {
  @column({ isPrimary: true }) declare id: string
  @column() declare firstName: string
  @column() declare lastName: string
  @column() declare headline: string
  @column() declare about: string
  @column() declare image: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Experience)
  declare experiences: HasMany<typeof Experience>

  @beforeCreate()
  static assignUuid(vendor: Vendor) {
    vendor.id = v4()
  }
}
