import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { v4 } from 'uuid'
import ExperienceCategory from './experience_category.js'
import ExperienceFeedback from './experience_feedback.js'
import User from './user.js'
import Vendor from './vendor.js'
import ExperienceHighlight from './experience_highlight.js'
import ExperienceDate from './experience_date.js'

export default class Experience extends BaseModel {
  @column({ isPrimary: true }) declare id: string
  @column() declare title: string
  @column() declare description: string
  @column() declare location: string
  @column() declare image: string

  @belongsTo(() => Vendor)
  declare vendor: BelongsTo<typeof Vendor>

  @belongsTo(() => ExperienceCategory)
  declare category: BelongsTo<typeof ExperienceCategory>

  @hasMany(() => ExperienceDate)
  declare dates: HasMany<typeof ExperienceDate>

  @hasMany(() => ExperienceHighlight)
  declare highlights: HasMany<typeof ExperienceHighlight>

  @hasMany(() => ExperienceFeedback)
  declare feedbacks: HasMany<typeof ExperienceFeedback>

  @manyToMany(() => User, {
    pivotTable: 'saved_experiences',
  })
  declare savedByUsers: ManyToMany<typeof User>

  @beforeCreate()
  static assignUuid(experience: Experience) {
    experience.id = v4()
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
