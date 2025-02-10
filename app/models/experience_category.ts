import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class ExperienceCategory extends BaseModel {
  @column({ isPrimary: true }) declare id: string
  @column() declare title: string
  @column() declare image: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(category: ExperienceCategory) {
    category.id = v4()
  }
}
