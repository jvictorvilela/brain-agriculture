import { Button } from '@/components/atoms/Button'
import { SelectField, TextField } from '@/components/molecules/FormField'
import type { FarmInput } from '@/types/domain'
import styled from '@emotion/styled'
import { useMemo, useState, type FormEvent } from 'react'

export const states = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]
const Form = styled.form({ display: 'grid', gap: 18 })
const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
  '@media (max-width: 560px)': { gridTemplateColumns: '1fr' },
})
const AreaHint = styled.div<{ invalid: boolean }>(({ theme, invalid }) => ({
  padding: 12,
  color: invalid ? theme.colors.danger : theme.colors.textMuted,
  background: invalid ? theme.colors.dangerLight : theme.colors.surfaceMuted,
  borderRadius: theme.radius.sm,
  fontSize: 13,
}))
const Actions = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 10,
  marginTop: 5,
})

const numberValue = (value: string) => Number(value.replace(',', '.')) || 0

export function FarmForm({
  initial,
  loading,
  onCancel,
  onSubmit,
}: {
  initial?: FarmInput
  loading?: boolean
  onCancel: () => void
  onSubmit: (input: FarmInput) => Promise<void>
}) {
  const [name, setName] = useState(initial?.name ?? '')
  const [city, setCity] = useState(initial?.city ?? '')
  const [state, setState] = useState(initial?.state ?? '')
  const [totalArea, setTotalArea] = useState(String(initial?.totalArea ?? ''))
  const [arableArea, setArableArea] = useState(
    String(initial?.arableArea ?? '')
  )
  const [vegetationArea, setVegetationArea] = useState(
    String(initial?.vegetationArea ?? '')
  )
  const [error, setError] = useState('')
  const areas = useMemo(
    () => ({
      total: numberValue(totalArea),
      used: numberValue(arableArea) + numberValue(vegetationArea),
    }),
    [totalArea, arableArea, vegetationArea]
  )
  const invalidArea = areas.used > areas.total

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || !city.trim() || !state)
      return setError('Preencha os dados de localização')
    if (areas.total <= 0)
      return setError('A área total deve ser maior que zero')
    if (invalidArea)
      return setError('As áreas utilizadas ultrapassam a área total')
    setError('')
    await onSubmit({
      name: name.trim(),
      city: city.trim(),
      state,
      totalArea: areas.total,
      arableArea: numberValue(arableArea),
      vegetationArea: numberValue(vegetationArea),
    })
  }

  return (
    <Form onSubmit={submit}>
      <TextField
        label="Nome da propriedade"
        name="farmName"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Ex.: Fazenda Horizonte"
        autoFocus
        required
      />
      <Grid>
        <TextField
          label="Cidade"
          name="city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Ex.: Rio Verde"
          required
        />
        <SelectField
          label="Estado"
          name="state"
          value={state}
          onChange={(event) => setState(event.target.value)}
          required
        >
          <option value="">Selecione</option>
          {states.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </SelectField>
      </Grid>
      <Grid>
        <TextField
          label="Área total (ha)"
          name="totalArea"
          type="number"
          min="0.01"
          step="0.01"
          value={totalArea}
          onChange={(event) => setTotalArea(event.target.value)}
          required
        />
        <TextField
          label="Área agricultável (ha)"
          name="arableArea"
          type="number"
          min="0"
          step="0.01"
          value={arableArea}
          onChange={(event) => setArableArea(event.target.value)}
          required
        />
      </Grid>
      <TextField
        label="Área de vegetação (ha)"
        name="vegetationArea"
        type="number"
        min="0"
        step="0.01"
        value={vegetationArea}
        onChange={(event) => setVegetationArea(event.target.value)}
        required
      />
      <AreaHint invalid={invalidArea}>
        Área disponível:{' '}
        <strong>
          {Math.max(areas.total - areas.used, 0).toLocaleString('pt-BR')} ha
        </strong>
        {error && <> · {error}</>}
      </AreaHint>
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
          {loading ? 'Salvando…' : 'Salvar propriedade'}
        </Button>
      </Actions>
    </Form>
  )
}
