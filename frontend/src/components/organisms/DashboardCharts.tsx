import { Card } from '@/components/atoms/Card'
import type { DashboardData } from '@/types/domain'
import styled from '@emotion/styled'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 18,
  '@media (max-width: 1180px)': { gridTemplateColumns: '1fr 1fr' },
  '@media (max-width: 680px)': { gridTemplateColumns: '1fr' },
})
const ChartCard = styled(Card)({ minWidth: 0, padding: 20 })
const ChartTitle = styled.h2({
  marginBottom: 2,
  fontFamily: 'Manrope, sans-serif',
  fontSize: 17,
})
const ChartCaption = styled.p(({ theme }) => ({
  marginBottom: 8,
  color: theme.colors.textMuted,
  fontSize: 12,
}))
const ChartArea = styled.div({ width: '100%', height: 280 })
const EmptyChart = styled.div(({ theme }) => ({
  height: 280,
  display: 'grid',
  placeItems: 'center',
  color: theme.colors.textMuted,
  fontSize: 13,
}))

const palette = [
  '#1f5d48',
  '#d99a3d',
  '#5b8f77',
  '#87aa97',
  '#ba7437',
  '#3478a3',
  '#7e6e9e',
  '#abc3b7',
]
const tooltipStyle = {
  border: '1px solid #e2e7e1',
  borderRadius: 10,
  boxShadow: '0 8px 28px rgba(30,55,45,.12)',
  fontSize: 12,
}

function Chart({
  title,
  caption,
  data,
  nameKey,
  valueKey,
}: {
  title: string
  caption: string
  data: Array<Record<string, string | number>>
  nameKey: string
  valueKey: string
}) {
  return (
    <ChartCard>
      <ChartTitle>{title}</ChartTitle>
      <ChartCaption>{caption}</ChartCaption>
      {data.length === 0 ? (
        <EmptyChart>Sem dados para exibir</EmptyChart>
      ) : (
        <ChartArea>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey={valueKey}
                nameKey={nameKey}
                innerRadius={52}
                outerRadius={82}
                paddingAngle={2}
                stroke="none"
                isAnimationActive={false}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={palette[index % palette.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => Number(value).toLocaleString('pt-BR')}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 11 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartArea>
      )}
    </ChartCard>
  )
}

export function DashboardCharts({
  charts,
}: {
  charts: DashboardData['charts']
}) {
  return (
    <Grid>
      <Chart
        title="Fazendas por estado"
        caption="Distribuição geográfica das propriedades"
        data={charts.farmsByState}
        nameKey="state"
        valueKey="total"
      />
      <Chart
        title="Culturas plantadas"
        caption="Ocorrências por cultura e safra"
        data={charts.crops}
        nameKey="crop"
        valueKey="total"
      />
      <Chart
        title="Uso do solo"
        caption="Hectares agricultáveis e de vegetação"
        data={charts.landUse}
        nameKey="type"
        valueKey="area"
      />
    </Grid>
  )
}
