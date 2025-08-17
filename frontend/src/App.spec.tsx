import { App } from '@/App'
import { ToastProvider } from '@/components/molecules/ToastProvider'
import { store } from '@/store'
import { theme } from '@/styles/theme'
import { ThemeProvider } from '@emotion/react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

const fetchMock = jest.fn()

beforeEach(() => {
  fetchMock.mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      data: {
        summary: { totalFarms: 6, totalHectares: 16480.5 },
        charts: {
          farmsByState: [{ state: 'MT', total: 1 }],
          crops: [{ crop: 'Soja', total: 2 }],
          landUse: [
            { type: 'Área agricultável', area: 100 },
            { type: 'Vegetação', area: 30 },
          ],
        },
      },
    }),
  } as Response)
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    value: fetchMock,
  })
})

afterEach(() => fetchMock.mockReset())

test('loads the integrated dashboard route', async () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  )

  expect(
    await screen.findByRole('heading', { name: 'Dashboard rural' })
  ).toBeInTheDocument()
  expect(await screen.findByText('16.480,5 ha')).toBeInTheDocument()
})
