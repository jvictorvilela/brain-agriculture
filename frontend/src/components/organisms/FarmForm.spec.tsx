import { FarmForm } from '@/components/organisms/FarmForm'
import { theme } from '@/styles/theme'
import { ThemeProvider } from '@emotion/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('blocks a farm when mapped areas exceed total area', async () => {
  const user = userEvent.setup()
  const onSubmit = jest.fn().mockResolvedValue(undefined)

  render(
    <ThemeProvider theme={theme}>
      <FarmForm onCancel={jest.fn()} onSubmit={onSubmit} />
    </ThemeProvider>
  )

  await user.type(
    screen.getByLabelText('Nome da propriedade'),
    'Fazenda Horizonte'
  )
  await user.type(screen.getByLabelText('Cidade'), 'Rio Verde')
  await user.selectOptions(screen.getByLabelText('Estado'), 'GO')
  await user.type(screen.getByLabelText('Área total (ha)'), '100')
  await user.type(screen.getByLabelText('Área agricultável (ha)'), '80')
  await user.type(screen.getByLabelText('Área de vegetação (ha)'), '30')
  await user.click(screen.getByRole('button', { name: 'Salvar propriedade' }))

  expect(
    screen.getByText(/As áreas utilizadas ultrapassam/)
  ).toBeInTheDocument()
  expect(onSubmit).not.toHaveBeenCalled()
})
