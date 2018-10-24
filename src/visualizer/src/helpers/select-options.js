export const getOptions = elems => {
  return Array.from(elems || [])
    .map(elem => ({
      key: elem.id,
      value: elem.id,
      text: elem.description
    }))
}

export const getEnumOptions = elems => {
  return Object.keys(elems || [])
    .map(index => ({
      key: index,
      value: index,
      text: elems[index],
    }))
}
