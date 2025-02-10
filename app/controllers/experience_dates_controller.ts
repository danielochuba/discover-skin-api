import ExperienceDate from '#models/experience_date'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExperienceDatesController {
  async index({ response }: HttpContext) {
    try {
      const dates = await ExperienceDate.all()
      return dates
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['experience_id', 'date'])
      const experienceDate = await ExperienceDate.create(data)
      return experienceDate
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const experienceDate = await ExperienceDate.findOrFail(params.id)
      return experienceDate
    } catch (error) {
      return response.notFound({ message: 'Experience date not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const experienceDate = await ExperienceDate.findOrFail(params.id)
      experienceDate.merge(request.only(['date']))
      await experienceDate.save()
      return experienceDate
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const experienceDate = await ExperienceDate.findOrFail(params.id)
      await experienceDate.delete()
      return { message: 'Experience date deleted successfully' }
    } catch (error) {
      return response.notFound({ message: 'Experience date not found' })
    }
  }
}
