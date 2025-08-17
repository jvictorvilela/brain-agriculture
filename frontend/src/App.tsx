import { Spinner } from '@/components/atoms/Spinner'
import { AppShell } from '@/components/organisms/AppShell'
import styled from '@emotion/styled'
import { lazy, Suspense, type ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then(({ DashboardPage: Page }) => ({
    default: Page,
  }))
)
const ProducersPage = lazy(() =>
  import('@/pages/ProducersPage').then(({ ProducersPage: Page }) => ({
    default: Page,
  }))
)
const ProducerDetailsPage = lazy(() =>
  import('@/pages/ProducerDetailsPage').then(
    ({ ProducerDetailsPage: Page }) => ({ default: Page })
  )
)

const LoadingPage = styled.div({
  minHeight: 320,
  display: 'grid',
  placeItems: 'center',
})

function DeferredPage({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <LoadingPage aria-label="Carregando página">
          <Spinner size={32} />
        </LoadingPage>
      }
    >
      {children}
    </Suspense>
  )
}

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route
          index
          element={
            <DeferredPage>
              <DashboardPage />
            </DeferredPage>
          }
        />
        <Route
          path="producers"
          element={
            <DeferredPage>
              <ProducersPage />
            </DeferredPage>
          }
        />
        <Route
          path="producers/:id"
          element={
            <DeferredPage>
              <ProducerDetailsPage />
            </DeferredPage>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
