import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { Spinner } from '@/components/atoms/Spinner'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'
import { EmptyState } from '@/components/molecules/EmptyState'
import { ErrorState } from '@/components/molecules/ErrorState'
import { Modal } from '@/components/molecules/Modal'
import { useToast } from '@/components/molecules/ToastProvider'
import { FarmCard } from '@/components/organisms/FarmCard'
import { FarmForm } from '@/components/organisms/FarmForm'
import { PlantingForm } from '@/components/organisms/PlantingForm'
import { ProducerForm } from '@/components/organisms/ProducerForm'
import { fetchCatalogs } from '@/store/catalogsSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  clearError,
  clearSelected,
  createFarm,
  createPlanting,
  deleteFarm,
  deletePlanting,
  deleteProducer,
  fetchProducer,
  updateFarm,
  updateProducer,
} from '@/store/producersSlice'
import type {
  Farm,
  FarmInput,
  Planting,
  PlantingInput,
  ProducerInput,
} from '@/types/domain'
import { formatDocument, initials } from '@/utils/format'
import styled from '@emotion/styled'
import { ArrowLeft, Edit3, Plus, Trash2, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Back = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  marginBottom: 20,
  color: theme.colors.textMuted,
  fontSize: 13,
  fontWeight: 700,
  '&:hover': { color: theme.colors.primary },
}))
const Profile = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 20,
  padding: 22,
  marginBottom: 22,
  '@media(max-width: 650px)': {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
})
const Identity = styled.div({ display: 'flex', alignItems: 'center', gap: 16 })
const Avatar = styled.div(({ theme }) => ({
  width: 58,
  height: 58,
  flex: '0 0 auto',
  display: 'grid',
  placeItems: 'center',
  color: theme.colors.primary,
  background: theme.colors.primaryLight,
  borderRadius: 18,
  fontFamily: 'Manrope, sans-serif',
  fontWeight: 800,
}))
const Name = styled.h1({
  marginBottom: 5,
  fontFamily: 'Manrope, sans-serif',
  fontSize: 'clamp(22px, 3vw, 29px)',
})
const Document = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
  color: theme.colors.textMuted,
  fontSize: 13,
}))
const HeaderActions = styled.div({ display: 'flex', flexWrap: 'wrap', gap: 9 })
const SectionHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  margin: '28px 0 15px',
})
const SectionTitle = styled.h2({
  margin: 0,
  fontFamily: 'Manrope, sans-serif',
  fontSize: 20,
})
const FarmList = styled.div({ display: 'grid', gap: 18 })
const Center = styled.div({
  minHeight: 420,
  display: 'grid',
  placeItems: 'center',
})

type ConfirmTarget =
  | { type: 'producer' }
  | { type: 'farm'; farm: Farm }
  | { type: 'planting'; planting: Planting }
  | null

export function ProducerDetailsPage() {
  const { id } = useParams()
  const producerId = Number(id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const {
    selected: producer,
    detailStatus,
    mutationStatus,
    error,
  } = useAppSelector((state) => state.producers)
  const catalogs = useAppSelector((state) => state.catalogs)
  const [producerModal, setProducerModal] = useState(false)
  const [farmModal, setFarmModal] = useState<Farm | 'new' | null>(null)
  const [plantingFarm, setPlantingFarm] = useState<Farm | null>(null)
  const [confirmTarget, setConfirmTarget] = useState<ConfirmTarget>(null)
  const busy = mutationStatus === 'loading'

  useEffect(() => {
    if (Number.isInteger(producerId)) void dispatch(fetchProducer(producerId))
    return () => {
      dispatch(clearSelected())
    }
  }, [dispatch, producerId])

  const refresh = async () => {
    await dispatch(fetchProducer(producerId)).unwrap()
  }
  const open = (callback: () => void) => {
    dispatch(clearError())
    callback()
  }

  async function saveProducer(input: ProducerInput) {
    try {
      await dispatch(updateProducer({ id: producerId, input })).unwrap()
      setProducerModal(false)
      toast.success('Produtor atualizado')
    } catch {
      /* shown by Redux */
    }
  }
  async function saveFarm(input: FarmInput) {
    try {
      if (farmModal === 'new')
        await dispatch(createFarm({ producerId, input })).unwrap()
      else if (farmModal)
        await dispatch(updateFarm({ id: farmModal.id, input })).unwrap()
      await refresh()
      setFarmModal(null)
      toast.success(
        farmModal === 'new'
          ? 'Propriedade cadastrada'
          : 'Propriedade atualizada'
      )
    } catch {
      /* shown by Redux */
    }
  }
  async function savePlanting(input: PlantingInput) {
    if (!plantingFarm) return
    try {
      await dispatch(
        createPlanting({ farmId: plantingFarm.id, input })
      ).unwrap()
      await Promise.all([refresh(), dispatch(fetchCatalogs()).unwrap()])
      setPlantingFarm(null)
      toast.success('Cultura registrada')
    } catch {
      /* shown by Redux */
    }
  }
  async function confirmDelete() {
    if (!confirmTarget) return
    try {
      if (confirmTarget.type === 'producer') {
        await dispatch(deleteProducer(producerId)).unwrap()
        toast.success('Produtor excluído')
        navigate('/producers')
        return
      }
      if (confirmTarget.type === 'farm')
        await dispatch(deleteFarm(confirmTarget.farm.id)).unwrap()
      if (confirmTarget.type === 'planting')
        await dispatch(deletePlanting(confirmTarget.planting.id)).unwrap()
      await refresh()
      toast.success(
        confirmTarget.type === 'farm'
          ? 'Propriedade excluída'
          : 'Cultura removida'
      )
      setConfirmTarget(null)
    } catch {
      /* shown by Redux */
    }
  }

  if (!Number.isInteger(producerId))
    return <ErrorState message="Identificador de produtor inválido" />
  if (detailStatus === 'loading' && !producer)
    return (
      <Center>
        <Spinner size={30} />
      </Center>
    )
  if (!producer)
    return (
      <>
        <Back to="/producers">
          <ArrowLeft size={16} />
          Voltar aos produtores
        </Back>
        <ErrorState
          message={error ?? 'Produtor não encontrado'}
          onRetry={() => void dispatch(fetchProducer(producerId))}
        />
      </>
    )

  const editFarmInitial =
    farmModal && farmModal !== 'new'
      ? {
          name: farmModal.name,
          city: farmModal.city,
          state: farmModal.state,
          totalArea: farmModal.totalArea,
          arableArea: farmModal.arableArea,
          vegetationArea: farmModal.vegetationArea,
        }
      : undefined
  const confirmCopy =
    confirmTarget?.type === 'producer'
      ? [
          'Excluir produtor',
          'O produtor e todas as suas propriedades e culturas serão excluídos permanentemente.',
        ]
      : confirmTarget?.type === 'farm'
        ? [
            'Excluir propriedade',
            `A propriedade ${confirmTarget.farm.name} e seus plantios serão excluídos.`,
          ]
        : [
            'Remover cultura',
            'Este registro de cultura será removido da safra.',
          ]

  return (
    <>
      <Back to="/producers">
        <ArrowLeft size={16} />
        Voltar aos produtores
      </Back>
      {error && <ErrorState message={error} />}
      <Profile>
        <Identity>
          <Avatar>{initials(producer.name)}</Avatar>
          <div>
            <Name>{producer.name}</Name>
            <Document>
              <UserRound size={15} />
              {formatDocument(producer.document)}
              <Badge tone={producer.documentType === 'CPF' ? 'green' : 'gold'}>
                {producer.documentType}
              </Badge>
            </Document>
          </div>
        </Identity>
        <HeaderActions>
          <Button
            variant="ghost"
            onClick={() => open(() => setProducerModal(true))}
          >
            <Edit3 size={17} />
            Editar
          </Button>
          <Button
            variant="danger"
            onClick={() => setConfirmTarget({ type: 'producer' })}
          >
            <Trash2 size={17} />
            Excluir
          </Button>
        </HeaderActions>
      </Profile>
      <SectionHeader>
        <SectionTitle>
          Propriedades rurais ({producer.farms?.length ?? 0})
        </SectionTitle>
        <Button onClick={() => open(() => setFarmModal('new'))}>
          <Plus size={17} />
          Nova propriedade
        </Button>
      </SectionHeader>
      {!producer.farms?.length ? (
        <Card>
          <EmptyState
            title="Nenhuma propriedade cadastrada"
            description="Este produtor ainda não possui propriedades rurais associadas."
            actionLabel="Adicionar propriedade"
            onAction={() => setFarmModal('new')}
          />
        </Card>
      ) : (
        <FarmList>
          {producer.farms.map((farm) => (
            <FarmCard
              key={farm.id}
              farm={farm}
              busy={busy}
              onEdit={() => open(() => setFarmModal(farm))}
              onDelete={() => setConfirmTarget({ type: 'farm', farm })}
              onAddPlanting={() => {
                open(() => setPlantingFarm(farm))
                if (catalogs.status === 'idle') void dispatch(fetchCatalogs())
              }}
              onDeletePlanting={(planting) =>
                setConfirmTarget({ type: 'planting', planting })
              }
            />
          ))}
        </FarmList>
      )}

      <Modal
        open={producerModal}
        title="Editar produtor"
        onClose={() => setProducerModal(false)}
      >
        <ProducerForm
          initial={{ name: producer.name, document: producer.document }}
          loading={busy}
          onCancel={() => setProducerModal(false)}
          onSubmit={saveProducer}
        />
      </Modal>
      <Modal
        open={Boolean(farmModal)}
        title={farmModal === 'new' ? 'Nova propriedade' : 'Editar propriedade'}
        onClose={() => setFarmModal(null)}
      >
        <FarmForm
          initial={editFarmInitial}
          loading={busy}
          onCancel={() => setFarmModal(null)}
          onSubmit={saveFarm}
        />
      </Modal>
      <Modal
        open={Boolean(plantingFarm)}
        title="Registrar cultura"
        onClose={() => setPlantingFarm(null)}
      >
        <PlantingForm
          harvests={catalogs.harvests}
          crops={catalogs.crops}
          loading={busy}
          onCancel={() => setPlantingFarm(null)}
          onSubmit={savePlanting}
        />
      </Modal>
      <ConfirmDialog
        open={Boolean(confirmTarget)}
        title={confirmCopy[0]}
        description={confirmCopy[1]}
        loading={busy}
        onCancel={() => setConfirmTarget(null)}
        onConfirm={() => void confirmDelete()}
      />
    </>
  )
}
