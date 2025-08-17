import { IconButton } from '@/components/atoms/IconButton'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

const fade = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
const rise = keyframes({
  from: { opacity: 0, transform: 'translateY(18px)' },
  to: { opacity: 1 },
})
const Overlay = styled.div({
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  display: 'grid',
  placeItems: 'center',
  padding: 20,
  background: 'rgba(13, 31, 24, 0.56)',
  backdropFilter: 'blur(4px)',
  animation: `${fade} 160ms ease`,
})
const Dialog = styled.div(({ theme }) => ({
  width: 'min(620px, 100%)',
  maxHeight: 'calc(100vh - 40px)',
  overflow: 'auto',
  background: theme.colors.surface,
  borderRadius: theme.radius.lg,
  boxShadow: '0 26px 90px rgba(0, 0, 0, 0.22)',
  animation: `${rise} 180ms ease`,
}))
const Header = styled.header(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 22px',
  background: theme.colors.surface,
  borderBottom: `1px solid ${theme.colors.border}`,
}))
const Title = styled.h2({
  margin: 0,
  fontFamily: 'Manrope, sans-serif',
  fontSize: 20,
})
const Body = styled.div({ padding: 22 })

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) =>
      event.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <Overlay
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <Dialog role="dialog" aria-modal="true" aria-label={title}>
        <Header>
          <Title>{title}</Title>
          <IconButton type="button" onClick={onClose} aria-label="Fechar">
            <X size={19} />
          </IconButton>
        </Header>
        <Body>{children}</Body>
      </Dialog>
    </Overlay>,
    document.body
  )
}
