import styled from '@emotion/styled'
import {
  forwardRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
} from 'react'

const Wrapper = styled.label({ display: 'grid', gap: 7 })
const Label = styled.span(({ theme }) => ({
  color: theme.colors.text,
  fontSize: 13,
  fontWeight: 700,
}))
const Hint = styled.span<{ error?: boolean }>(({ theme, error }) => ({
  color: error ? theme.colors.danger : theme.colors.textMuted,
  fontSize: 12,
}))

const controlStyles = ({
  theme,
}: {
  theme: import('@emotion/react').Theme
}) => ({
  width: '100%',
  height: 44,
  padding: '0 13px',
  color: theme.colors.text,
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.sm,
  outline: 0,
  transition: 'border-color 150ms ease, box-shadow 150ms ease',
  '&:focus': {
    borderColor: theme.colors.primary,
    boxShadow: '0 0 0 3px rgba(31, 93, 72, 0.1)',
  },
  '&::placeholder': { color: '#9aa49f' },
})

const Input = styled.input(controlStyles)
const Select = styled.select(controlStyles)

type CommonProps = { label: string; error?: string; hint?: string }

export const TextField = forwardRef<
  HTMLInputElement,
  CommonProps & InputHTMLAttributes<HTMLInputElement>
>(function TextField({ label, error, hint, id, ...props }, ref) {
  const inputId = id ?? props.name
  return (
    <Wrapper htmlFor={inputId}>
      <Label>{label}</Label>
      <Input ref={ref} id={inputId} aria-invalid={Boolean(error)} {...props} />
      {(error || hint) && <Hint error={Boolean(error)}>{error ?? hint}</Hint>}
    </Wrapper>
  )
})

export const SelectField = forwardRef<
  HTMLSelectElement,
  CommonProps & SelectHTMLAttributes<HTMLSelectElement>
>(function SelectField({ label, error, hint, id, children, ...props }, ref) {
  const inputId = id ?? props.name
  return (
    <Wrapper htmlFor={inputId}>
      <Label>{label}</Label>
      <Select ref={ref} id={inputId} aria-invalid={Boolean(error)} {...props}>
        {children}
      </Select>
      {(error || hint) && <Hint error={Boolean(error)}>{error ?? hint}</Hint>}
    </Wrapper>
  )
})
