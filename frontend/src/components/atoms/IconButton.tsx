import styled from '@emotion/styled'

export const IconButton = styled.button(({ theme }) => ({
  width: 38,
  height: 38,
  flex: '0 0 auto',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.sm,
  background: theme.colors.surface,
  color: theme.colors.textMuted,
  cursor: 'pointer',
  transition: 'background 150ms ease, color 150ms ease, transform 150ms ease',
  '&:hover:not(:disabled)': {
    background: theme.colors.surfaceMuted,
    color: theme.colors.primary,
    transform: 'translateY(-1px)',
  },
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
}))
