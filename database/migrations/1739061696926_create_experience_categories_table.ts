import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'experience_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('experience_id').references('id').inTable('experiences').onDelete('CASCADE')
      table.date('date')
      table.time('start_time')
      table.time('end_time')
      table.integer('max_spots')
      table.integer('spots_reserved')
      table.double('price')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
