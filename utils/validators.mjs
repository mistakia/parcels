import Validator from 'fastest-validator'

const v = new Validator({ haltOnFirstError: true })

const sort_schema = {
  type: 'array',
  items: {
    type: 'object',
    props: {
      column_id: { type: 'string' },
      desc: { type: 'boolean' }
    }
  }
}
export const sort_validator = v.compile(sort_schema)

const columns_schema = {
  type: 'array',
  items: [
    {
      type: 'object',
      props: {
        column_name: { type: 'string' },
        table_name: { type: 'string' }
      }
    },
    {
      type: 'string'
    }
  ]
}
export const columns_validator = v.compile(columns_schema)

const where_operator_schema = {
  type: 'string',
  enum: [
    '=',
    '!=',
    '>',
    '>=',
    '<',
    '<=',
    'LIKE',
    'NOT LIKE',
    'IS NULL',
    'IS NOT NULL',
    'IN',
    'NOT IN'
  ]
}

const where_schema = {
  type: 'array',
  items: {
    type: 'object',
    props: {
      column_name: { type: 'string' },
      operator: where_operator_schema,
      value: { type: 'string' }
    }
  }
}

export const where_validator = v.compile(where_schema)

const rank_aggregation_schema = {
  type: 'array',
  items: {
    type: 'object',
    props: {
      column_name: { type: 'string' },
      table_name: { type: 'string' },
      weight: { type: 'number', positive: true }
    }
  }
}
export const rank_aggregation_validator = v.compile(rank_aggregation_schema)

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
  offset: offset_schema,
  sort: sort_schema,
  columns: columns_schema,
  where: where_schema
}
export const table_state_validator = v.compile(table_state_schema)

const view_id_schema = {
  $$root: true,
  type: 'string',
  format: {
    type: 'uuid',
    version: 1
  }
}
export const view_id_validator = v.compile(view_id_schema)
