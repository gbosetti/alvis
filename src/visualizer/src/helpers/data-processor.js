import _ from 'underscore'

export function sanitize(dataset) {
  const { rows } = dataset

  const sanitizeRow = row => {
    row = Array.from(row || [])

    if (row.find(val => _.isNaN(Number(val))))
      return row

    return row.map(Number)
  }

  return {
    ...dataset,
    rows: Array.from(rows || []).map(sanitizeRow)
  }
}

export default {
  sanitize,
}