import factory from '@adonisjs/lucid/factories'
import ExperienceDate from '#models/experience_date'

export const ExperienceDateFactory = factory
  .define(ExperienceDate, async ({ faker }) => {
    return {}
  })
  .build()