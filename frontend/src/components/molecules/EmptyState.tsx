import { Button } from '@/components/atoms/Button'
import styled from '@emotion/styled'
import { Sprout } from 'lucide-react'

const Wrapper = styled.div(({ theme }) => ({
  display: 'grid',
  justifyItems: 'center',
  padding: '54px 24px',
  textAlign: 'center',
  color: theme.colors.textMuted,
}))
const Icon = styled.div(({ theme }) => ({
  width: 64,
  height: 64,
  display: 'grid',
  placeItems: 'center',
  marginBottom: 18,
  color: theme.colors.primary,
  background: theme.colors.primaryLight,
  borderRadius: '50%',
}))
const Title = styled.h3(({ theme }) => ({
  marginBottom: 7,
  color: theme.colors.text,
  fontSize: 18,
}))

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <Wrapper>
      <Icon>
        <Sprout size={28} />
      </Icon>
      <Title>{title}</Title>
      <p>{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </Wrapper>
  )
}
