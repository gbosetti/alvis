import { isUndefined } from 'util'

export function hydrate(dataset) {
  let { columns } = dataset

  const types = data => {
    data = Array.from(data || [])
      .filter(val => val !== undefined)

    if (data.find(val => !Number(val))) {
      return 'categorical'
    }

    return 'numeric'
  }

  return {
    ...dataset,
    types: Array.from(columns || []).map(types),
  }
}

export function filterColumns(dataset) {
  let { headers, columns } = dataset

  if (headers === null)
    return dataset

  headers = Array.from(headers || [])
  const filteredHeaders = headers.filter(Boolean)
  
  if (filteredHeaders.length === headers.length)
    columns = filteredHeaders.map((_, i) => columns[i])

  return {
    ...dataset,
    headers: filteredHeaders,
    columns,
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
  const { columns, types } = dataset

  const sanitizeData = (data, i) => {
    data = Array.from(data || [])

    if (types[i] === 'categorical') {
      return data
    }

    return data.map(Number)
  }

  return {
    ...dataset,
    columns: Array.from(columns || []).map(sanitizeData),
  }
}

export function isMissingValue(value) {
  return [
    isUndefined,
    v => v === '',
  ].find(f => f(value))
}

export default {
  filterColumns,
  hydrate,
  isMissingValue,
  mapRowsToColumns,
  sanitize,
}