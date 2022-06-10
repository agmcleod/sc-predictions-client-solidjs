import { Component, lazy } from 'solid-js'
import { Routes, Route } from 'solid-app-router'
import Container from '@suid/material/Container'

import logo from './logo.svg'
import styles from './App.module.css'

const NewGame = lazy(() => import('./pages/NewGame'))

const App: Component = () => {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<NewGame />} />
      </Routes>
    </Container>
  )
}

export default App
