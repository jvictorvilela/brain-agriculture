import { Button } from '@/components/atoms/Button'
import styled from '@emotion/styled'
import { CircleAlert } from 'lucide-react'

const Wrapper = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 18,
  padding: 18,
  color: theme.colors.danger,
  background: theme.colors.dangerLight,
  border: '1px solid #f1ceca',
  borderRadius: theme.radius.md,
  '@media (max-width: 600px)': {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
}))
const Content = styled.div({ display: 'flex', alignItems: 'center', gap: 12 })

export function ErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) {
  return (
    <Wrapper role="alert">
      <Content>
        <CircleAlert size={21} />
        <span>{message}</span>
      </Content>
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </Wrapper>
  )
}
