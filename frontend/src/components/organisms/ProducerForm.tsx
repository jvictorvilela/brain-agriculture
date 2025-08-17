import { Button } from '@/components/atoms/Button'
import { TextField } from '@/components/molecules/FormField'
import { formatDocument } from '@/utils/format'
import styled from '@emotion/styled'
import { useState, type FormEvent } from 'react'
import type { ProducerInput } from '@/types/domain'

const Form = styled.form({ display: 'grid', gap: 18 })
const Actions = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 10,
  marginTop: 8,
})

export function ProducerForm({
  initial,
  loading,
  onCancel,
  onSubmit,
}: {
  initial?: ProducerInput
  loading?: boolean
  onCancel: () => void
  onSubmit: (input: ProducerInput) => Promise<void>
}) {
  const [name, setName] = useState(initial?.name ?? '')
  const [document, setDocument] = useState(
    initial ? formatDocument(initial.document) : ''
  )
  const [error, setError] = useState('')

  async function submit(event: FormEvent) {
    event.preventDefault()
    const digits = document.replace(/\D/g, '')
    if (name.trim().length < 2) return setError('Informe o nome do produtor')
    if (![11, 14].includes(digits.length))
      return setError('Informe um CPF ou CNPJ completo')
    setError('')
    await onSubmit({ name: name.trim(), document: digits })
  }

  return (
    <Form onSubmit={submit}>
      <TextField
        label="Nome do produtor"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Ex.: Maria da Silva"
        autoFocus
        required
      />
      <TextField
        label="CPF ou CNPJ"
        name="document"
        value={document}
        onChange={(event) => setDocument(formatDocument(event.target.value))}
        placeholder="000.000.000-00"
        inputMode="numeric"
        error={error}
        required
      />
      <Actions>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando…' : 'Salvar produtor'}
        </Button>
      </Actions>
    </Form>
  )
}
