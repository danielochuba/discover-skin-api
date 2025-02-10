/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContext } from '@adonisjs/core/http'
import ExperienceBooking from '#models/experience_booking'

export default class ExperienceBookingsController {
  async index({ response, auth }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        return response.unauthorized({ message: 'User not found' })
      }
      const bookings = await ExperienceBooking.query().where('user_id', user.id)
      return response.ok(bookings)
    } catch (error) {
      return response.internalServerError({ message: 'Error fetching bookings', error })
    }
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'User not found' })
      }

      const { experience_id, status, price, voucher } = request.only([
        'experience_id',
        'status',
        'price',
        'voucher',
      ])
      const data = {
        user_id: user.id,
        experience_id: experience_id,
        status,
        price,
        voucher,
      }
      const booking = await ExperienceBooking.create(data)

      return response.created(booking)
    } catch (error) {
      return response.badRequest({ message: 'Error creating booking', error })
    }
  }

  async show({ params, response, auth }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'User not found' })
      }

      const booking = await ExperienceBooking.query()
        .where('user_id', user.id)
        .where('id', params.id)
        .firstOrFail()

      return booking
    } catch (error) {
      return response.notFound({ message: 'Booking not found' })
    }
  }

  async update({ params, request, response, auth }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'User not found' })
      }
      const booking = await ExperienceBooking.query()
        .where('user_id', user.id)
        .where('id', params.id)
        .firstOrFail()
      const data = request.only(['status', 'price', 'voucher'])
      booking.merge(data)
      await booking.save()

      return booking
    } catch (error) {
      return response.badRequest({ message: 'Error updating booking', error })
    }
  }

  async destroy({ params, response, auth }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'User not found' })
      }
      const booking = await ExperienceBooking.query()
        .where('user_id', user.id)
        .where('id', params.id)
        .firstOrFail()

      await booking.delete()

      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Booking not found' })
    }
  }
}
