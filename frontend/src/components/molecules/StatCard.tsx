import { Card } from '@/components/atoms/Card'
import styled from '@emotion/styled'
import type { LucideIcon } from 'lucide-react'

const Wrapper = styled(Card)({
  padding: 20,
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})
const IconBox = styled.div<{ color: string; background: string }>(
  ({ color, background }) => ({
    width: 50,
    height: 50,
    flex: '0 0 auto',
    display: 'grid',
    placeItems: 'center',
    color,
    background,
    borderRadius: 15,
  })
)
const Label = styled.span(({ theme }) => ({
  display: 'block',
  marginBottom: 3,
  color: theme.colors.textMuted,
  fontSize: 13,
  fontWeight: 600,
}))
const Value = styled.strong({
  display: 'block',
  fontFamily: 'Manrope, sans-serif',
  fontSize: 24,
  lineHeight: 1.1,
})

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = 'green',
}: {
  label: string
  value: string
  icon: LucideIcon
  tone?: 'green' | 'gold' | 'blue'
}) {
  const colors = {
    green: ['#1f5d48', '#dcebe3'],
    gold: ['#9a641b', '#f7ead4'],
    blue: ['#3478a3', '#e0eff7'],
  } as const
  return (
    <Wrapper>
      <IconBox color={colors[tone][0]} background={colors[tone][1]}>
        <Icon size={23} />
      </IconBox>
      <div>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </div>
    </Wrapper>
  )
}
