import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { IconButton } from '@/components/atoms/IconButton'
import type { Farm, Planting } from '@/types/domain'
import { formatHectares } from '@/utils/format'
import styled from '@emotion/styled'
import { Edit3, Leaf, MapPin, Plus, Sprout, Trash2, X } from 'lucide-react'

const Wrapper = styled(Card)({ overflow: 'hidden' })
const Header = styled.header(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 16,
  padding: '20px 22px',
  borderBottom: `1px solid ${theme.colors.border}`,
}))
const FarmName = styled.h3({
  marginBottom: 5,
  fontFamily: 'Manrope, sans-serif',
  fontSize: 18,
})
const Location = styled.span(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  color: theme.colors.textMuted,
  fontSize: 13,
}))
const Actions = styled.div({ display: 'flex', gap: 7 })
const Body = styled.div({ padding: 22 })
const AreaGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 12,
  '@media(max-width: 580px)': { gridTemplateColumns: '1fr' },
})
const AreaItem = styled.div(({ theme }) => ({
  padding: 13,
  background: theme.colors.surfaceMuted,
  borderRadius: theme.radius.sm,
}))
const AreaLabel = styled.span(({ theme }) => ({
  display: 'block',
  marginBottom: 3,
  color: theme.colors.textMuted,
  fontSize: 11,
}))
const AreaValue = styled.strong({ fontSize: 15 })
const Bar = styled.div(({ theme }) => ({
  display: 'flex',
  height: 7,
  margin: '17px 0 23px',
  overflow: 'hidden',
  background: theme.colors.border,
  borderRadius: 99,
}))
const Segment = styled.span<{ width: number; color: string }>(
  ({ width, color }) => ({ width: `${width}%`, background: color })
)
const PlantingHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  marginBottom: 14,
})
const PlantingTitle = styled.h4({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  margin: 0,
  fontSize: 14,
})
const HarvestList = styled.div({ display: 'grid', gap: 12 })
const Harvest = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 13,
  padding: 13,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.sm,
  '@media(max-width: 520px)': { flexDirection: 'column' },
}))
const HarvestName = styled.strong({
  minWidth: 112,
  paddingTop: 4,
  fontSize: 13,
})
const Crops = styled.div({ display: 'flex', flexWrap: 'wrap', gap: 7 })
const CropChip = styled.span(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '5px 8px 5px 10px',
  color: theme.colors.primaryDark,
  background: theme.colors.primaryLight,
  borderRadius: theme.radius.pill,
  fontSize: 12,
  fontWeight: 700,
}))
const RemoveCrop = styled.button({
  display: 'grid',
  placeItems: 'center',
  padding: 0,
  border: 0,
  color: 'inherit',
  background: 'transparent',
  cursor: 'pointer',
})
const NoPlanting = styled.p(({ theme }) => ({
  margin: 0,
  color: theme.colors.textMuted,
  fontSize: 13,
}))

function groupPlantings(plantings: Planting[] = []) {
  return plantings.reduce<Record<string, Planting[]>>((groups, planting) => {
    ;(groups[planting.harvest.name] ??= []).push(planting)
    return groups
  }, {})
}

export function FarmCard({
  farm,
  busy,
  onEdit,
  onDelete,
  onAddPlanting,
  onDeletePlanting,
}: {
  farm: Farm
  busy?: boolean
  onEdit: () => void
  onDelete: () => void
  onAddPlanting: () => void
  onDeletePlanting: (planting: Planting) => void
}) {
  const grouped = groupPlantings(farm.plantings)
  const arablePercent = (farm.arableArea / farm.totalArea) * 100
  const vegetationPercent = (farm.vegetationArea / farm.totalArea) * 100
  return (
    <Wrapper>
      <Header>
        <div>
          <FarmName>{farm.name}</FarmName>
          <Location>
            <MapPin size={15} />
            {farm.city} · {farm.state}
          </Location>
        </div>
        <Actions>
          <IconButton
            onClick={onEdit}
            aria-label="Editar propriedade"
            disabled={busy}
          >
            <Edit3 size={17} />
          </IconButton>
          <IconButton
            onClick={onDelete}
            aria-label="Excluir propriedade"
            disabled={busy}
          >
            <Trash2 size={17} />
          </IconButton>
        </Actions>
      </Header>
      <Body>
        <AreaGrid>
          <AreaItem>
            <AreaLabel>Área total</AreaLabel>
            <AreaValue>{formatHectares(farm.totalArea)} ha</AreaValue>
          </AreaItem>
          <AreaItem>
            <AreaLabel>Área agricultável</AreaLabel>
            <AreaValue>{formatHectares(farm.arableArea)} ha</AreaValue>
          </AreaItem>
          <AreaItem>
            <AreaLabel>Vegetação</AreaLabel>
            <AreaValue>{formatHectares(farm.vegetationArea)} ha</AreaValue>
          </AreaItem>
        </AreaGrid>
        <Bar aria-label="Distribuição do uso do solo">
          <Segment width={arablePercent} color="#1f5d48" />
          <Segment width={vegetationPercent} color="#87aa97" />
        </Bar>
        <PlantingHeader>
          <PlantingTitle>
            <Sprout size={17} />
            Culturas por safra
          </PlantingTitle>
          <Button
            type="button"
            variant="secondary"
            onClick={onAddPlanting}
            disabled={busy}
          >
            <Plus size={16} />
            Adicionar
          </Button>
        </PlantingHeader>
        {Object.keys(grouped).length === 0 ? (
          <NoPlanting>Nenhuma cultura registrada nesta propriedade.</NoPlanting>
        ) : (
          <HarvestList>
            {Object.entries(grouped).map(([harvest, plantings]) => (
              <Harvest key={harvest}>
                <HarvestName>{harvest}</HarvestName>
                <Crops>
                  {plantings.map((planting) => (
                    <CropChip key={planting.id}>
                      <Leaf size={13} />
                      {planting.crop.name}
                      <RemoveCrop
                        onClick={() => onDeletePlanting(planting)}
                        aria-label={`Remover ${planting.crop.name}`}
                        disabled={busy}
                      >
                        <X size={13} />
                      </RemoveCrop>
                    </CropChip>
                  ))}
                </Crops>
              </Harvest>
            ))}
          </HarvestList>
        )}
      </Body>
    </Wrapper>
  )
}
