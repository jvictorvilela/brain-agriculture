import { ProducerForm } from '@/components/organisms/ProducerForm'
import { theme } from '@/styles/theme'
import { ThemeProvider } from '@emotion/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('submits a producer with a normalized document', async () => {
  const user = userEvent.setup()
  const onSubmit = jest.fn().mockResolvedValue(undefined)

  render(
    <ThemeProvider theme={theme}>
      <ProducerForm onCancel={jest.fn()} onSubmit={onSubmit} />
    </ThemeProvider>
  )

  await user.type(screen.getByLabelText('Nome do produtor'), 'Maria da Silva')
  await user.type(screen.getByLabelText('CPF ou CNPJ'), '52998224725')
  await user.click(screen.getByRole('button', { name: 'Salvar produtor' }))

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'Maria da Silva',
    document: '52998224725',
  })
})

test('does not submit an incomplete document', async () => {
  const user = userEvent.setup()
  const onSubmit = jest.fn().mockResolvedValue(undefined)

  render(
    <ThemeProvider theme={theme}>
      <ProducerForm onCancel={jest.fn()} onSubmit={onSubmit} />
    </ThemeProvider>
  )

  await user.type(screen.getByLabelText('Nome do produtor'), 'Maria da Silva')
  await user.type(screen.getByLabelText('CPF ou CNPJ'), '123')
  await user.click(screen.getByRole('button', { name: 'Salvar produtor' }))

  expect(
    await screen.findByText('Informe um CPF ou CNPJ completo')
  ).toBeInTheDocument()
  expect(onSubmit).not.toHaveBeenCalled()
})
