import { Component, Show } from 'solid-js'

import styles from './styles.module.css'

interface FormErrorProps {
  errorMsg?: string
}

export const FormError: Component<FormErrorProps> = (props) => {
  return (
    <Show when={props.errorMsg}>
      <p class={styles.error}>{props.errorMsg}</p>
    </Show>
  )
}
