import styled from '@emotion/styled'
import type { ReactNode } from 'react'

const Wrapper = styled.header({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 20,
  marginBottom: 28,
  '@media (max-width: 640px)': {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
})

const Eyebrow = styled.span(({ theme }) => ({
  display: 'block',
  marginBottom: 7,
  color: theme.colors.primary,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.11em',
  textTransform: 'uppercase',
}))

const Title = styled.h1({
  marginBottom: 5,
  fontFamily: 'Manrope, sans-serif',
  fontSize: 'clamp(25px, 3vw, 34px)',
  lineHeight: 1.15,
})

const Subtitle = styled.p(({ theme }) => ({
  marginBottom: 0,
  color: theme.colors.textMuted,
}))

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <Wrapper>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>
      {action}
    </Wrapper>
  )
}
