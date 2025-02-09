import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { v4 } from 'uuid'
import Experience from '#models/experience.ts'
import User from '#models/user.ts'

export default class SavedExperience extends BaseModel {
  @column({ isPrimary: true }) declare id: string
  @column() declare userId: string
  @column() declare experienceId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Experience)
  declare experience: BelongsTo<typeof Experience>

  @beforeCreate()
  static assignUuid(savedExperience: SavedExperience) {
    savedExperience.id = v4()
  }
}
