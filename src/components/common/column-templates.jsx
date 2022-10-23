export const currencyTemplate = ({ rowData, field }) => {
  return rowData[field]?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const ordinalSuffixOf = i => {
  if (!i) return i
  var j = i % 10,
    k = i % 100
  if (j == 1 && k != 11) {
    return i + 'st'
  }
  if (j == 2 && k != 12) {
    return i + 'nd'
  }
  if (j == 3 && k != 13) {
    return i + 'rd'
  }
  return i + 'th'
}

export const ordinalTemplate = ({ rowData, field }) => {
  if (!rowData.hasOwnProperty(field)) {
    console.error(`${field} does not exist on rowData`, rowData)
  }
  return ordinalSuffixOf(rowData[field])
}

export const booleanTemplate = ({ rowData, field }) => {
  return rowData[field] ? 'Yes' : 'No'
}
