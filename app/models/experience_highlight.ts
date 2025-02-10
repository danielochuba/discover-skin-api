import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { v4 } from 'uuid'
import Experience from './experience.js'

export default class ExperienceHighlight extends BaseModel {
  @column({ isPrimary: true }) declare id: string
  @column() declare experienceId: string
  @column() declare title: string
  @column() declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Experience)
  declare experience: BelongsTo<typeof Experience>

  @beforeCreate()
  static assignUuid(highlight: ExperienceHighlight) {
    highlight.id = v4()
  }
}
