import styled from '@emotion/styled'
import { CircleCheck, X } from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const ToastArea = styled.div({
  position: 'fixed',
  top: 20,
  right: 20,
  zIndex: 200,
  display: 'grid',
  gap: 10,
  width: 'min(380px, calc(100vw - 40px))',
})
const ToastBox = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 11,
  padding: '14px 16px',
  color: theme.colors.primaryDark,
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.md,
  boxShadow: '0 16px 40px rgba(18, 42, 33, 0.16)',
}))
const Close = styled.button({
  display: 'grid',
  placeItems: 'center',
  marginLeft: 'auto',
  padding: 3,
  border: 0,
  background: 'transparent',
  cursor: 'pointer',
})

type ToastContextValue = { success: (message: string) => void }
const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<
    Array<{ id: number; message: string }>
  >([])
  const remove = useCallback(
    (id: number) =>
      setMessages((items) => items.filter((item) => item.id !== id)),
    []
  )
  const success = useCallback(
    (message: string) => {
      const id = Date.now()
      setMessages((items) => [...items, { id, message }])
      window.setTimeout(() => remove(id), 3500)
    },
    [remove]
  )
  const value = useMemo(() => ({ success }), [success])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastArea aria-live="polite">
        {messages.map((item) => (
          <ToastBox key={item.id}>
            <CircleCheck size={20} />
            <span>{item.message}</span>
            <Close
              onClick={() => remove(item.id)}
              aria-label="Fechar notificação"
            >
              <X size={16} />
            </Close>
          </ToastBox>
        ))}
      </ToastArea>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}
