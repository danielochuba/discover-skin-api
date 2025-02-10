import factory from '@adonisjs/lucid/factories'
import ExperienceCategory from '#models/experience_category'

export const ExperienceCategoryFactory = factory
  .define(ExperienceCategory, async ({ faker }) => {
    return {}
  })
  .build()