import styled from '@emotion/styled'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

export const Button = styled.button<{ variant?: Variant; fullWidth?: boolean }>(
  ({ theme, variant = 'primary', fullWidth }) => ({
    minHeight: 42,
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '9px 16px',
    borderRadius: theme.radius.sm,
    border: '1px solid transparent',
    cursor: 'pointer',
    fontWeight: 700,
    lineHeight: 1,
    transition:
      'transform 160ms ease, background 160ms ease, box-shadow 160ms ease',
    ...(variant === 'primary' && {
      color: '#fff',
      background: theme.colors.primary,
      boxShadow: '0 7px 18px rgba(31, 93, 72, 0.18)',
    }),
    ...(variant === 'secondary' && {
      color: theme.colors.primaryDark,
      background: theme.colors.primaryLight,
      borderColor: '#c9dfd2',
    }),
    ...(variant === 'ghost' && {
      color: theme.colors.textMuted,
      background: 'transparent',
      borderColor: theme.colors.border,
    }),
    ...(variant === 'danger' && {
      color: theme.colors.danger,
      background: theme.colors.dangerLight,
      borderColor: '#f1ceca',
    }),
    '&:hover:not(:disabled)': {
      transform: 'translateY(-1px)',
      filter: 'brightness(0.98)',
    },
    '&:active:not(:disabled)': { transform: 'translateY(0)' },
    '&:disabled': { opacity: 0.55, cursor: 'not-allowed', boxShadow: 'none' },
  })
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  fullWidth?: boolean
}
