import type { HttpContext } from '@adonisjs/core/http'
import ExperienceHighlight from '#models/experience_highlight'

export default class ExperienceHighlightsController {
  async index({ response }: HttpContext) {
    try {
      const highlights = await ExperienceHighlight.all()
      return highlights
    } catch (error) {
      return response.internalServerError({ message: 'Error fetching highlights', error })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['experience_id', 'title', 'description', 'image_url'])
      const highlight = await ExperienceHighlight.create(data)

      return response.created(highlight)
    } catch (error) {
      return response.badRequest({ message: 'Error creating highlight', error })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const highlight = await ExperienceHighlight.findOrFail(params.id)
      return highlight
    } catch (error) {
      return response.notFound({ message: 'Highlight not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const highlight = await ExperienceHighlight.findOrFail(params.id)
      const data = request.only(['title', 'description', 'image_url'])
      highlight.merge(data)
      await highlight.save()

      return highlight
    } catch (error) {
      return response.badRequest({ message: 'Error updating highlight', error })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const highlight = await ExperienceHighlight.findOrFail(params.id)
      await highlight.delete()

      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Highlight not found' })
    }
  }
}
