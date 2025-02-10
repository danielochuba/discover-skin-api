import type { HttpContext } from '@adonisjs/core/http'
import SavedExperience from '#models/saved_experience'

export default class SavedExperiencesController {
  async index({ response, auth }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'User not found' })
      }
      const savedExperiences = await SavedExperience.query().where('user_id', user.id)

      return response.ok(savedExperiences)
    } catch (error) {
      return response.internalServerError({ message: 'Error fetching saved experiences', error })
    }
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user
      const { experienceId } = request.only(['experienceId'])

      if (!user) {
        return response.unauthorized({ message: 'User not found' })
      }
      const savedExperience = await SavedExperience.create({
        userId: user.id,
        experienceId: experienceId,
      })

      return response.created(savedExperience)
    } catch (error) {
      return response.badRequest({ message: 'Error saving experience', error })
    }
  }

  async destroy({ params, response, auth }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        return response.unauthorized({ message: 'User not found' })
      }
      const savedExperience = await SavedExperience.query()
        .where('id', params.saved_experience_id)
        .andWhere('user_id', user.id)
        .firstOrFail()

      await savedExperience.delete()

      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Saved experience not found' })
    }
  }
}
