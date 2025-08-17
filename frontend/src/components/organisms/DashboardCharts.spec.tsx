import { DashboardCharts } from '@/components/organisms/DashboardCharts'
import { theme } from '@/styles/theme'
import { ThemeProvider } from '@emotion/react'
import { render, screen } from '@testing-library/react'

test('shows all required dashboard charts and their empty states', () => {
  render(
    <ThemeProvider theme={theme}>
      <DashboardCharts charts={{ farmsByState: [], crops: [], landUse: [] }} />
    </ThemeProvider>
  )

  expect(screen.getByText('Fazendas por estado')).toBeInTheDocument()
  expect(screen.getByText('Culturas plantadas')).toBeInTheDocument()
  expect(screen.getByText('Uso do solo')).toBeInTheDocument()
  expect(screen.getAllByText('Sem dados para exibir')).toHaveLength(3)
})
