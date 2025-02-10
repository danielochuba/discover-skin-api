import factory from '@adonisjs/lucid/factories'
import Experience from '#models/experience'

export const ExperienceFactory = factory
  .define(Experience, async ({ faker }) => {
    return {}
  })
  .build()