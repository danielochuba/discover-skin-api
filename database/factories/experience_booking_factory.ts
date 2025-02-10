import factory from '@adonisjs/lucid/factories'
import ExperienceBooking from '#models/experience_booking'

export const ExperienceBookingFactory = factory
  .define(ExperienceBooking, async ({ faker }) => {
    return {}
  })
  .build()