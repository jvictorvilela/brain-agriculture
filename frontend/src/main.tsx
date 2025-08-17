import { App } from '@/App'
import { ToastProvider } from '@/components/molecules/ToastProvider'
import { store } from '@/store'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { theme } from '@/styles/theme'
import { ThemeProvider } from '@emotion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ToastProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
