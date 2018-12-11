import { isUndefined } from 'util'

export function hydrate(dataset) {
  let { columns } = dataset

  const types = data => {
    data = Array.from(data || [])
      .filter(val => val !== undefined)

    if (data.find(isNaN)) {
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
  let { headers, columns, rows } = dataset

  if (headers === null)
    return dataset

  headers = Array.from(headers || [])
  const filteredHeaders = Object.entries(headers)
    .filter(header => header[1])

  return {
    ...dataset,
    headers: filteredHeaders.map(header => header[1]),
    columns: filteredHeaders.map(header => columns[header[0]]),
    rows: Array.from(rows).map(row => Array.from(row || []).filter((_, i) => (
      filteredHeaders.find(header => header[0] == i
      ))))
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
  const { columns, rows, types } = dataset

  const sanitizeColumnData = (data, i) => {
    data = Array.from(data || [])

    if (types[i] === 'categorical') {
      return data
    }

    return data.map(Number)
  }

  const sanitizeRowData = data => {
    data = Array.from(data || [])

    return data.map((value, i) => {
      return types[i] === 'numeric' ?
        Number(value) :
        value
    })
  }

  return {
    ...dataset,
    columns: Array.from(columns || []).map(sanitizeColumnData),
    rows: Array.from(rows || []).map(sanitizeRowData),
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