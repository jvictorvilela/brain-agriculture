const onlyDigits = /\D/g
const repeatedDigits = /^(\d)\1+$/

export function normalizeDocument(value: string) {
  return value.replace(onlyDigits, '')
}

function hasValidCheckDigits(document: string, weights: number[]) {
  const base = document.slice(0, weights.length)
  const sum = base
    .split('')
    .reduce((total, digit, index) => total + Number(digit) * weights[index], 0)
  const remainder = sum % 11
  const checkDigit = remainder < 2 ? 0 : 11 - remainder

  return checkDigit === Number(document[weights.length])
}

export function isValidCpf(value: string) {
  const cpf = normalizeDocument(value)

  if (cpf.length !== 11 || repeatedDigits.test(cpf)) {
    return false
  }

  return (
    hasValidCheckDigits(cpf, [10, 9, 8, 7, 6, 5, 4, 3, 2]) &&
    hasValidCheckDigits(cpf, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2])
  )
}

export function isValidCnpj(value: string) {
  const cnpj = normalizeDocument(value)

  if (cnpj.length !== 14 || repeatedDigits.test(cnpj)) {
    return false
  }

  return (
    hasValidCheckDigits(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) &&
    hasValidCheckDigits(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  )
}

export function isValidDocument(value: string) {
  const document = normalizeDocument(value)
  return document.length === 11 ? isValidCpf(document) : isValidCnpj(document)
}

export function documentType(value: string) {
  return normalizeDocument(value).length === 11 ? 'CPF' : 'CNPJ'
}
