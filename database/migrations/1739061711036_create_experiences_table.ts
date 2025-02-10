import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'experiences'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title')
      table.text('description')
      table.string('location')
      table.string('image')
      table.uuid('vendor_id').references('id').inTable('vendors').onDelete('CASCADE')
      table
        .uuid('experience_category_id')
        .references('id')
        .inTable('experience_categories')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
