import { Button } from '@/components/atoms/Button'
import { Modal } from '@/components/molecules/Modal'
import styled from '@emotion/styled'

const Text = styled.p(({ theme }) => ({
  color: theme.colors.textMuted,
  lineHeight: 1.6,
}))
const Actions = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 10,
  marginTop: 24,
})

export function ConfirmDialog({
  open,
  title,
  description,
  loading,
  onCancel,
  onConfirm,
}: {
  open: boolean
  title: string
  description: string
  loading?: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <Text>{description}</Text>
      <Actions>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Excluindo…' : 'Confirmar exclusão'}
        </Button>
      </Actions>
    </Modal>
  )
}
