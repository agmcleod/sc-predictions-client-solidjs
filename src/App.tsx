import { Component, lazy } from 'solid-js'
import { Routes, Route } from 'solid-app-router'
import Container from '@suid/material/Container'
import { ThemeProvider } from '@suid/material/styles'

import { muiTheme } from './common/theme'

const NewGame = lazy(() => import('./pages/NewGame'))

const App: Component = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Container>
        <Routes>
          <Route path='/' element={<NewGame />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
