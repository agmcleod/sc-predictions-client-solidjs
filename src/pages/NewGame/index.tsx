import { Component, createResource, For, Show } from 'solid-js'
import Typography from '@suid/material/Typography'

import * as api from '../../common/api'
import { Question } from '../../common/types/question'
import { Select } from '../../common/components/Select'

const fetchQuestions = async () => {
  return await api.getRequest<Question[]>('/questions')
}

function NewGame(): Component {
  const [questions] = createResource(fetchQuestions)

  return (
    <div>
      <Typography variant='h1'>New Game</Typography>
      <Show when={questions.loading}>
        <p>Loading&hellip;</p>
      </Show>
      <Show when={questions()}>
        <Select
          id='questions'
          label='Select Questions'
          items={questions()?.map((question) => ({
            label: question.body,
            value: question.id,
          }))}
        />
      </Show>
    </div>
  )
}

export default NewGame
