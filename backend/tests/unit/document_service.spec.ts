import { isValidCnpj, isValidCpf, normalizeDocument } from '#services/document_service'
import { test } from '@japa/runner'

test.group('Document service', () => {
  test('normalizes and validates a CPF', ({ assert }) => {
    assert.equal(normalizeDocument('529.982.247-25'), '52998224725')
    assert.isTrue(isValidCpf('529.982.247-25'))
  })

  test('validates a CNPJ', ({ assert }) => {
    assert.isTrue(isValidCnpj('11.222.333/0001-81'))
  })

  test('rejects invalid or repeated documents', ({ assert }) => {
    assert.isFalse(isValidCpf('111.111.111-11'))
    assert.isFalse(isValidCpf('529.982.247-24'))
    assert.isFalse(isValidCnpj('11.111.111/1111-11'))
    assert.isFalse(isValidCnpj('11.222.333/0001-82'))
  })
})
