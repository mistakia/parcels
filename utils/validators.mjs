import Validator from 'fastest-validator'

const v = new Validator({ haltOnFirstError: true })

const sort_schema = {
  type: 'array',
  items: {
    type: 'object',
    props: {
      id: { type: 'string' },
      desc: { type: 'boolean' }
    }
  }
}
export const sort_validator = v.compile(sort_schema)

const columns_schema = {
  type: 'array',
  items: {
    type: 'object',
    props: {
      column_name: { type: 'string' },
      table_name: { type: 'string' }
    }
  }
}
export const columns_validator = v.compile(columns_schema)

const offset_schema = {
  type: 'number',
  positive: true,
  integer: true,
  $$root: true
}
export const offset_validator = v.compile(offset_schema)

const view_name_schema = {
  $$root: true,
  type: 'string',
  min: 1,
  max: 30
}
export const view_name_validator = v.compile(view_name_schema)

const view_description_schema = {
  $$root: true,
  type: 'string',
  min: 1,
  max: 400
}
export const view_description_validator = v.compile(view_description_schema)

const table_state_schema = {
  sort: sort_schema,
  columns: columns_schema
}
export const table_state_validator = v.compile(table_state_schema)
