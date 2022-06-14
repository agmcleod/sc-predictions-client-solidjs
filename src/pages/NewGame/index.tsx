import {
  Component,
  createResource,
  Index,
  createSignal,
  Show,
  createEffect,
} from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import Typography from '@suid/material/Typography'
import Box from '@suid/material/Box'
import Grid from '@suid/material/Grid'
import Button from '@suid/material/Button'

import * as api from '../../common/api'
import { Question } from '../../common/types/question'
import { FormError } from '../../common/components/FormError'
import { Select } from '../../common/components/Select'

interface GameQuestion {
  id?: number
}

const fetchQuestions = async () => {
  return await api.getRequest<Question[]>('/questions')
}

const createGame = async (questions: GameQuestion[]) => {
  return await api.postRequest('/games', {
    question_ids: questions.map((gq) => gq.id),
  })
}

const submit = () => {
  // const response = await publicApi.post('games', {
  //   question_ids: gameQuestions.map((gq) => gq.id),
  // })
  // logoutAction()
  // setAccessToken(response.data.creator)
  // history.push('/lobby')
}

const createOnSubmitHandler = (
  gameQuestions: GameQuestion[],
  setErrorMessage: (message: string) => void
) => {
  return (e: Event) => {
    e.preventDefault()
    if (gameQuestions.filter((gq) => !gq.id).length > 0) {
      setErrorMessage('Each question entry must have a question selected')
    } else {
      const selectedIds = gameQuestions.reduce<{ [key: string]: boolean }>(
        (obj, gq) => {
          obj[gq.id || 'undefined'] = true
          return obj
        },
        {}
      )
      if (Object.keys(selectedIds).length < gameQuestions.length) {
        setErrorMessage('Each question selected must be unique')
      } else {
        setErrorMessage('')
        submit()
      }
    }
  }
}

const NewGame: Component = () => {
  const [questions] = createResource(fetchQuestions)
  const [gameQuestions, setGameQuestions] = createStore([{ id: undefined }])
  const [errorMessage, setErrorMessage] = createSignal('')

  createEffect(() => console.log(errorMessage()))

  return (
    <div>
      <Typography variant='h1'>New Game</Typography>
      <Box sx={{ paddingY: 2 }}>
        <Show when={questions.loading}>
          <p>Loading&hellip;</p>
        </Show>
        <Show when={questions()}>
          <form
            onSubmit={createOnSubmitHandler(gameQuestions, setErrorMessage)}
          >
            <Index each={gameQuestions}>
              {(selectedGameQuestion, i) => (
                <Box sx={{ marginY: 1 }}>
                  <Select
                    id='questions'
                    name='questions'
                    label='Select Questions'
                    items={questions()?.map((question) => ({
                      label: question.body,
                      value: String(question.id),
                    }))}
                    onChange={(ev) => {
                      setGameQuestions(
                        (gameQuestion, j) => i === j,
                        produce(
                          (gameQuestion) =>
                            gameQuestion.id === ev.currentTarget.value
                        )
                      )
                    }}
                    value={selectedGameQuestion().id}
                  />
                </Box>
              )}
            </Index>

            <FormError errorMsg={errorMessage()} />
            <Box sx={{ marginY: 2 }}>
              <Grid spacing={2} container>
                <Grid item>
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      setGameQuestions(
                        produce((gameQuestions) => {
                          gameQuestions.push({ id: undefined })
                        })
                      )
                    }}
                    variant='contained'
                  >
                    Add Question
                  </Button>
                </Grid>
                <Grid item>
                  <Button type='submit' variant='contained'>
                    Create
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Show>
      </Box>
    </div>
  )
}

export default NewGame
