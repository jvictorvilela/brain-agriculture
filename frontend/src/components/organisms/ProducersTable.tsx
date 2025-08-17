import { Badge } from '@/components/atoms/Badge'
import { IconButton } from '@/components/atoms/IconButton'
import type { Producer } from '@/types/domain'
import { formatDocument, initials } from '@/utils/format'
import styled from '@emotion/styled'
import { ChevronRight, MapPinned } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TableWrap = styled.div({ overflowX: 'auto' })
const Table = styled.table({
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: 660,
})
const Th = styled.th(({ theme }) => ({
  padding: '13px 16px',
  color: theme.colors.textMuted,
  background: theme.colors.surfaceMuted,
  borderBottom: `1px solid ${theme.colors.border}`,
  fontSize: 11,
  letterSpacing: '.07em',
  textAlign: 'left',
  textTransform: 'uppercase',
}))
const Td = styled.td(({ theme }) => ({
  padding: '15px 16px',
  borderBottom: `1px solid ${theme.colors.border}`,
  fontSize: 14,
}))
const Row = styled.tr({
  cursor: 'pointer',
  transition: 'background 120ms ease',
  '&:hover': { background: '#fafbf9' },
  '&:last-of-type td': { borderBottom: 0 },
})
const Identity = styled.div({ display: 'flex', alignItems: 'center', gap: 12 })
const Avatar = styled.div(({ theme }) => ({
  width: 38,
  height: 38,
  flex: '0 0 auto',
  display: 'grid',
  placeItems: 'center',
  color: theme.colors.primary,
  background: theme.colors.primaryLight,
  borderRadius: 12,
  fontSize: 12,
  fontWeight: 800,
}))
const Name = styled.strong({ display: 'block', marginBottom: 2 })
const Sub = styled.span(({ theme }) => ({
  color: theme.colors.textMuted,
  fontSize: 12,
}))
const FarmCount = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
})

export function ProducersTable({ producers }: { producers: Producer[] }) {
  const navigate = useNavigate()
  return (
    <TableWrap>
      <Table>
        <thead>
          <tr>
            <Th>Produtor</Th>
            <Th>Documento</Th>
            <Th>Propriedades</Th>
            <Th>Tipo</Th>
            <Th aria-label="Ações" />
          </tr>
        </thead>
        <tbody>
          {producers.map((producer) => (
            <Row
              key={producer.id}
              onClick={() => navigate(`/producers/${producer.id}`)}
              tabIndex={0}
              onKeyDown={(event) =>
                event.key === 'Enter' && navigate(`/producers/${producer.id}`)
              }
            >
              <Td>
                <Identity>
                  <Avatar>{initials(producer.name)}</Avatar>
                  <div>
                    <Name>{producer.name}</Name>
                    <Sub>Cadastrado na plataforma</Sub>
                  </div>
                </Identity>
              </Td>
              <Td>{formatDocument(producer.document)}</Td>
              <Td>
                <FarmCount>
                  <MapPinned size={16} />
                  {producer.farmsCount ?? 0}
                </FarmCount>
              </Td>
              <Td>
                <Badge
                  tone={producer.documentType === 'CPF' ? 'green' : 'gold'}
                >
                  {producer.documentType}
                </Badge>
              </Td>
              <Td>
                <IconButton aria-label={`Ver ${producer.name}`}>
                  <ChevronRight size={18} />
                </IconButton>
              </Td>
            </Row>
          ))}
        </tbody>
      </Table>
    </TableWrap>
  )
}
