import factory from '@adonisjs/lucid/factories'
import Vendor from '#models/vendor'

export const VendorFactory = factory
  .define(Vendor, async ({ faker }) => {
    return {}
  })
  .build()