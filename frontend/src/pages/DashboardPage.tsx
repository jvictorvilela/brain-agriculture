import { Card } from '@/components/atoms/Card'
import { Spinner } from '@/components/atoms/Spinner'
import { ErrorState } from '@/components/molecules/ErrorState'
import { PageHeader } from '@/components/molecules/PageHeader'
import { StatCard } from '@/components/molecules/StatCard'
import { DashboardCharts } from '@/components/organisms/DashboardCharts'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchDashboard } from '@/store/dashboardSlice'
import { formatHectares, formatNumber } from '@/utils/format'
import styled from '@emotion/styled'
import { LandPlot, Map, Sprout } from 'lucide-react'
import { useEffect } from 'react'

const Stats = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 18,
  marginBottom: 22,
  '@media (max-width: 980px)': { gridTemplateColumns: '1fr 1fr' },
  '@media (max-width: 580px)': { gridTemplateColumns: '1fr' },
})
const Loading = styled(Card)({
  minHeight: 360,
  display: 'grid',
  placeItems: 'center',
})

export function DashboardPage() {
  const dispatch = useAppDispatch()
  const { data, status, error } = useAppSelector((state) => state.dashboard)

  useEffect(() => {
    void dispatch(fetchDashboard())
  }, [dispatch])

  return (
    <>
      <PageHeader
        eyebrow="Visão geral"
        title="Dashboard rural"
        subtitle="Indicadores consolidados das propriedades cadastradas."
      />
      {status === 'failed' && (
        <ErrorState
          message={error ?? 'Erro ao carregar dashboard'}
          onRetry={() => void dispatch(fetchDashboard())}
        />
      )}
      {status === 'loading' && !data ? (
        <Loading>
          <Spinner size={30} />
        </Loading>
      ) : (
        data && (
          <>
            <Stats>
              <StatCard
                label="Fazendas cadastradas"
                value={formatNumber(data.summary.totalFarms)}
                icon={LandPlot}
              />
              <StatCard
                label="Hectares registrados"
                value={`${formatHectares(data.summary.totalHectares)} ha`}
                icon={Map}
                tone="gold"
              />
              <StatCard
                label="Culturas diferentes"
                value={formatNumber(data.charts.crops.length)}
                icon={Sprout}
                tone="blue"
              />
            </Stats>
            <DashboardCharts charts={data.charts} />
          </>
        )
      )}
    </>
  )
}
