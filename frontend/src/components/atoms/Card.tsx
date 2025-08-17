import styled from '@emotion/styled'

export const Card = styled.section(({ theme }) => ({
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.lg,
  boxShadow: `0 10px 32px ${theme.colors.shadow}`,
}))
