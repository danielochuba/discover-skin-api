import factory from '@adonisjs/lucid/factories'
import ExperienceFeedback from '#models/experience_feedback'

export const ExperienceFeedbackFactory = factory
  .define(ExperienceFeedback, async ({ faker }) => {
    return {}
  })
  .build()