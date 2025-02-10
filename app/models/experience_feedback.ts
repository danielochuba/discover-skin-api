import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { v4 } from 'uuid'
import Experience from './experience.js'
import User from './user.js'

export default class ExperienceFeedback extends BaseModel {
  @column({ isPrimary: true }) declare id: string
  @column() declare experienceId: string
  @column() declare userId: string
  @column() declare rating: number
  @column() declare comment: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Experience)
  declare experience: BelongsTo<typeof Experience>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @beforeCreate()
  static assignUuid(feedback: ExperienceFeedback) {
    feedback.id = v4()
  }
}
