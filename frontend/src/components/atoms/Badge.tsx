import styled from '@emotion/styled'

export const Badge = styled.span<{ tone?: 'green' | 'gold' | 'neutral' }>(
  ({ theme, tone = 'neutral' }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
    minHeight: 26,
    padding: '4px 10px',
    borderRadius: theme.radius.pill,
    fontSize: 12,
    fontWeight: 700,
    ...(tone === 'green' && {
      color: theme.colors.primary,
      background: theme.colors.primaryLight,
    }),
    ...(tone === 'gold' && {
      color: '#8a5a18',
      background: theme.colors.accentLight,
    }),
    ...(tone === 'neutral' && {
      color: theme.colors.textMuted,
      background: '#edf0ed',
    }),
  })
)
