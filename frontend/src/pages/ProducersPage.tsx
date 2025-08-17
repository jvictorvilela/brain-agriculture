import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { Spinner } from '@/components/atoms/Spinner'
import { EmptyState } from '@/components/molecules/EmptyState'
import { ErrorState } from '@/components/molecules/ErrorState'
import { Modal } from '@/components/molecules/Modal'
import { PageHeader } from '@/components/molecules/PageHeader'
import { Pagination } from '@/components/molecules/Pagination'
import { ProducerForm } from '@/components/organisms/ProducerForm'
import { ProducersTable } from '@/components/organisms/ProducersTable'
import { useToast } from '@/components/molecules/ToastProvider'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  clearError,
  createProducer,
  fetchProducers,
} from '@/store/producersSlice'
import type { ProducerInput } from '@/types/domain'
import styled from '@emotion/styled'
import { Plus, Search } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const Toolbar = styled.form(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: 16,
  borderBottom: `1px solid ${theme.colors.border}`,
  '@media (max-width: 580px)': {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
}))
const SearchBox = styled.div({ position: 'relative', flex: 1 })
const SearchIcon = styled(Search)(({ theme }) => ({
  position: 'absolute',
  top: 13,
  left: 13,
  color: theme.colors.textMuted,
}))
const SearchInput = styled.input(({ theme }) => ({
  width: '100%',
  height: 43,
  padding: '0 14px 0 42px',
  color: theme.colors.text,
  background: theme.colors.surfaceMuted,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.sm,
  outline: 0,
  '&:focus': {
    borderColor: theme.colors.primary,
    boxShadow: '0 0 0 3px rgba(31,93,72,.1)',
  },
}))
const Loading = styled.div({
  minHeight: 280,
  display: 'grid',
  placeItems: 'center',
})
const PaginationWrap = styled.div({ padding: '0 18px 18px' })
const ListCard = styled(Card)<{ hasError: boolean }>(({ hasError }) => ({
  marginTop: hasError ? 18 : 0,
}))

export function ProducersPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const { items, pagination, status, mutationStatus, error } = useAppSelector(
    (state) => state.producers
  )
  const [search, setSearch] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    void dispatch(fetchProducers({ page: 1 }))
  }, [dispatch])

  function submitSearch(event: FormEvent) {
    event.preventDefault()
    setAppliedSearch(search.trim())
    void dispatch(fetchProducers({ page: 1, search: search.trim() }))
  }

  async function submitProducer(input: ProducerInput) {
    try {
      const producer = await dispatch(createProducer(input)).unwrap()
      toast.success('Produtor cadastrado com sucesso')
      setModalOpen(false)
      navigate(`/producers/${producer.id}`)
    } catch {
      /* Redux displays the API error */
    }
  }

  const openModal = () => {
    dispatch(clearError())
    setModalOpen(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Cadastros"
        title="Produtores rurais"
        subtitle="Gerencie produtores, propriedades, safras e culturas."
        action={
          <Button onClick={openModal}>
            <Plus size={18} />
            Novo produtor
          </Button>
        }
      />
      {error && (
        <ErrorState
          message={error}
          onRetry={() =>
            void dispatch(fetchProducers({ page: 1, search: appliedSearch }))
          }
        />
      )}
      <ListCard hasError={Boolean(error)}>
        <Toolbar onSubmit={submitSearch}>
          <SearchBox>
            <SearchIcon size={18} />
            <SearchInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome, CPF ou CNPJ"
              aria-label="Buscar produtores"
            />
          </SearchBox>
          <Button type="submit" variant="secondary">
            Buscar
          </Button>
        </Toolbar>
        {status === 'loading' ? (
          <Loading>
            <Spinner />
          </Loading>
        ) : items.length === 0 ? (
          <EmptyState
            title={
              appliedSearch
                ? 'Nenhum resultado encontrado'
                : 'Nenhum produtor cadastrado'
            }
            description={
              appliedSearch
                ? 'Tente buscar usando outro nome ou documento.'
                : 'Cadastre o primeiro produtor para começar.'
            }
            actionLabel={!appliedSearch ? 'Cadastrar produtor' : undefined}
            onAction={!appliedSearch ? openModal : undefined}
          />
        ) : (
          <ProducersTable producers={items} />
        )}
        {pagination && (
          <PaginationWrap>
            <Pagination
              meta={pagination}
              onChange={(page) =>
                void dispatch(fetchProducers({ page, search: appliedSearch }))
              }
            />
          </PaginationWrap>
        )}
      </ListCard>
      <Modal
        open={modalOpen}
        title="Novo produtor"
        onClose={() => setModalOpen(false)}
      >
        <ProducerForm
          loading={mutationStatus === 'loading'}
          onCancel={() => setModalOpen(false)}
          onSubmit={submitProducer}
        />
      </Modal>
    </>
  )
}
