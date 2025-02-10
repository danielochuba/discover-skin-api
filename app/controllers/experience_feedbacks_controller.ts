import type { HttpContext } from '@adonisjs/core/http'
import ExperienceFeedback from '#models/experience_feedback'

export default class ExperienceFeedbacksController {
  async index({ response }: HttpContext) {
    try {
      const feedbacks = await ExperienceFeedback.all()
      return feedbacks
    } catch (error) {
      return response.internalServerError({ message: 'Error fetching feedbacks', error })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['experience_id', 'user_id', 'rating', 'comment'])
      const feedback = await ExperienceFeedback.create(data)

      return response.created(feedback)
    } catch (error) {
      return response.badRequest({ message: 'Error creating feedback', error })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const feedback = await ExperienceFeedback.findOrFail(params.id)
      return feedback
    } catch (error) {
      return response.notFound({ message: 'Feedback not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const feedback = await ExperienceFeedback.findOrFail(params.id)
      const data = request.only(['rating', 'comment'])
      feedback.merge(data)
      await feedback.save()

      return feedback
    } catch (error) {
      return response.badRequest({ message: 'Error updating feedback', error })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const feedback = await ExperienceFeedback.findOrFail(params.id)
      await feedback.delete()

      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Feedback not found' })
    }
  }
}
