import { Button } from '@/components/atoms/Button'
import type { PaginationMeta } from '@/types/domain'
import styled from '@emotion/styled'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Wrapper = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  paddingTop: 18,
  color: theme.colors.textMuted,
  fontSize: 13,
}))
const Actions = styled.div({ display: 'flex', gap: 8 })

export function Pagination({
  meta,
  onChange,
}: {
  meta: PaginationMeta
  onChange: (page: number) => void
}) {
  if (meta.lastPage <= 1) return null
  return (
    <Wrapper>
      <span>
        Página {meta.currentPage} de {meta.lastPage}
      </span>
      <Actions>
        <Button
          variant="ghost"
          onClick={() => onChange(meta.currentPage - 1)}
          disabled={meta.currentPage <= 1}
          aria-label="Página anterior"
        >
          <ChevronLeft size={17} />
        </Button>
        <Button
          variant="ghost"
          onClick={() => onChange(meta.currentPage + 1)}
          disabled={meta.currentPage >= meta.lastPage}
          aria-label="Próxima página"
        >
          <ChevronRight size={17} />
        </Button>
      </Actions>
    </Wrapper>
  )
}
