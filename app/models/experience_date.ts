import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { v4 } from 'uuid'
import Experience from './experience.js'

export default class ExperienceDate extends BaseModel {
  @column({ isPrimary: true }) declare id: string
  @column() declare experienceId: string
  @column() declare date: Date
  @column() declare startTime: string
  @column() declare endTime: string
  @column() declare maxSpots: number
  @column() declare spotsReserved: number
  @column() declare price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Experience)
  declare experience: BelongsTo<typeof Experience>

  @beforeCreate()
  static assignUuid(date: ExperienceDate) {
    date.id = v4()
  }
}
