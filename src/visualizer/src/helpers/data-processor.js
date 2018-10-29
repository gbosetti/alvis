import { isUndefined } from 'util'

export function hydrate(dataset) {
  let { columns } = dataset

  const types = data => {
    data = Array.from(data || [])

    if (data.filter(val => val !== undefined).find(val => !Number(val))) {
      return typeof String()
    }

    return typeof Number()
  }

  return {
    ...dataset,
    types: Array.from(columns || []).map(types),
  }
}

export function mapRowsToColumns(dataset) {
  let { headers, rows } = dataset

  headers = Array.from(headers || [])

  const transpose = a => 
    Object.keys(headers).map(c => a.map(r => r[c]))

  return {
    ...dataset,
    columns: transpose(Array.from(rows || []))
  }
}

export function sanitize(dataset) {
  const { columns, rows } = dataset

  const sanitizeData = data => {
    data = Array.from(data || [])

    if (data.filter(val => val !== undefined).find(val => !Number(val))) {
      return data
    }

    return data.map(Number)
  }

  return {
    ...dataset,
    columns: Array.from(columns || []).map(sanitizeData),
    rows: Array.from(rows || []).map(sanitizeData),
  }
}

export function isMissingValue(value) {
  return [
    isUndefined,
    v => v === '',
  ].find(f => f(value))
}

export default {
  hydrate,
  isMissingValue,
  mapRowsToColumns,
  sanitize,
}