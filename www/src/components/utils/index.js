export const emailCheck = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)

export const isEmpty = obj => obj && !Object.keys(obj).length

export const onlyNonEmptyKeys = source => {
  if (!source || (typeof source !== 'object')) {
    return
  }
  const dest = Object.keys(source).reduce((acc, key) => Object.assign(acc, source[key] ? { [key]: source[key] } : {}), {})
  return !isEmpty(dest) && dest
}

export const onlyNonEmptyDiffKeys = (source, destination) => {
  if (!source || (typeof source !== 'object')) {
    return
  }
  const res = Object.keys(source).reduce((acc, key) =>
    Object.assign(acc, (source[key] && (source[key] !== destination[key])) ? { [key]: source[key] } : {}), {})
  return !isEmpty(res) && res
}
