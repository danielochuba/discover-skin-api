import Experience from '#models/experience'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExperiencesController {
  async index({ response }: HttpContext) {
    try {
      const experiences = await Experience.all()
      return experiences
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['title', 'description', 'location', 'image'])
      const experience = await Experience.create(data)
      return experience
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const experience = await Experience.findOrFail(params.id)
      return experience
    } catch (error) {
      return response.notFound({ message: 'Experience not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const experience = await Experience.findOrFail(params.id)
      experience.merge(request.only(['title', 'description', 'location', 'image']))
      await experience.save()
      return experience
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const experience = await Experience.findOrFail(params.id)
      await experience.delete()
      return { message: 'Experience deleted successfully' }
    } catch (error) {
      return response.notFound({ message: 'Experience not found' })
    }
  }
}
