import { Button } from '@/components/atoms/Button'
import { TextField } from '@/components/molecules/FormField'
import type { CatalogItem, PlantingInput } from '@/types/domain'
import styled from '@emotion/styled'
import { useState, type FormEvent } from 'react'

const Form = styled.form({ display: 'grid', gap: 18 })
const Actions = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 10,
  marginTop: 5,
})

export function PlantingForm({
  harvests,
  crops,
  loading,
  onCancel,
  onSubmit,
}: {
  harvests: CatalogItem[]
  crops: CatalogItem[]
  loading?: boolean
  onCancel: () => void
  onSubmit: (input: PlantingInput) => Promise<void>
}) {
  const [harvest, setHarvest] = useState('')
  const [crop, setCrop] = useState('')
  const [error, setError] = useState('')

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (harvest.trim().length < 2 || crop.trim().length < 2)
      return setError('Informe a safra e a cultura')
    setError('')
    await onSubmit({ harvest: harvest.trim(), crop: crop.trim() })
  }

  return (
    <Form onSubmit={submit}>
      <TextField
        label="Safra"
        name="harvest"
        value={harvest}
        onChange={(event) => setHarvest(event.target.value)}
        placeholder="Ex.: Safra 2025/2026"
        list="harvest-options"
        autoFocus
        required
      />
      <datalist id="harvest-options">
        {harvests.map((item) => (
          <option key={item.id} value={item.name} />
        ))}
      </datalist>
      <TextField
        label="Cultura plantada"
        name="crop"
        value={crop}
        onChange={(event) => setCrop(event.target.value)}
        placeholder="Ex.: Soja"
        list="crop-options"
        error={error}
        required
      />
      <datalist id="crop-options">
        {crops.map((item) => (
          <option key={item.id} value={item.name} />
        ))}
      </datalist>
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
          {loading ? 'Registrando…' : 'Registrar cultura'}
        </Button>
      </Actions>
    </Form>
  )
}
