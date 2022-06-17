import { render, fireEvent } from 'solid-testing-library'

import NewGame from './index'

describe('NewGame', () => {
  test('shows a loading message', () => {
    const { getByText } = render(() => <NewGame />)
    expect(getByText('Loading')).toBeInTheDocument()
    expect(getByText('Select Question')).not.toBeInTheDocument()
  })
})
