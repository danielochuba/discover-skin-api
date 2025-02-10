import factory from '@adonisjs/lucid/factories'
import SavedExperience from '#models/saved_experience'

export const SavedExperienceFactory = factory
  .define(SavedExperience, async ({ faker }) => {
    return {}
  })
  .build()