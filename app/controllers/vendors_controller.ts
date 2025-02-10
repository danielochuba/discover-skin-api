import Vendor from '#models/vendor'
import type { HttpContext } from '@adonisjs/core/http'

export default class VendorsController {
  async index({ response }: HttpContext) {
    try {
      const vendors = await Vendor.all()
      return vendors
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['firstName', 'lastName', 'headline', 'about', 'image'])
      const vendor = await Vendor.create(data)
      return vendor
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const vendor = await Vendor.findOrFail(params.id)
      return vendor
    } catch (error) {
      return response.notFound({ message: 'Vendor not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const vendor = await Vendor.findOrFail(params.id)
      vendor.merge(request.only(['firstName', 'lastName', 'headline', 'about', 'image']))
      await vendor.save()
      return vendor
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const vendor = await Vendor.findOrFail(params.id)
      await vendor.delete()
      return { message: 'Vendor deleted successfully' }
    } catch (error) {
      return response.notFound({ message: 'Vendor not found' })
    }
  }
}
