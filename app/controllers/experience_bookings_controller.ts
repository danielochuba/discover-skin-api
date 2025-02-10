import type { HttpContext } from '@adonisjs/core/http'
import ExperienceBooking from '#models/experience_booking'

export default class ExperienceBookingsController {
  async index({ response }: HttpContext) {
    try {
      const bookings = await ExperienceBooking.all()
      return bookings
    } catch (error) {
      return response.internalServerError({ message: 'Error fetching bookings', error })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['experience_id', 'user_id', 'status', 'price'])
      const booking = await ExperienceBooking.create(data)

      return response.created(booking)
    } catch (error) {
      return response.badRequest({ message: 'Error creating booking', error })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const booking = await ExperienceBooking.findOrFail(params.id)
      return booking
    } catch (error) {
      return response.notFound({ message: 'Booking not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const booking = await ExperienceBooking.findOrFail(params.id)
      const data = request.only(['status', 'price'])
      booking.merge(data)
      await booking.save()

      return booking
    } catch (error) {
      return response.badRequest({ message: 'Error updating booking', error })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const booking = await ExperienceBooking.findOrFail(params.id)
      await booking.delete()

      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Booking not found' })
    }
  }
}
