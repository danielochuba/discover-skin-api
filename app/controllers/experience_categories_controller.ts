import ExperienceCategory from '#models/experience_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExperienceCategoriesController {
  async index({ response }: HttpContext) {
    try {
      const categories = await ExperienceCategory.all()
      return categories
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['title', 'image'])
      const category = await ExperienceCategory.create(data)
      return category
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const category = await ExperienceCategory.findOrFail(params.id)
      return category
    } catch (error) {
      return response.notFound({ message: 'Category not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const category = await ExperienceCategory.findOrFail(params.id)
      category.merge(request.only(['title', 'image']))
      await category.save()
      return category
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const category = await ExperienceCategory.findOrFail(params.id)
      await category.delete()
      return { message: 'Category deleted successfully' }
    } catch (error) {
      return response.notFound({ message: 'Category not found' })
    }
  }
}
