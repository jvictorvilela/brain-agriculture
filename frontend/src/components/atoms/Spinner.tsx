import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const spin = keyframes({ to: { transform: 'rotate(360deg)' } })

export const Spinner = styled.span<{ size?: number }>(
  ({ theme, size = 22 }) => ({
    width: size,
    height: size,
    display: 'inline-block',
    border: `3px solid ${theme.colors.primaryLight}`,
    borderTopColor: theme.colors.primary,
    borderRadius: '50%',
    animation: `${spin} 700ms linear infinite`,
  })
)
