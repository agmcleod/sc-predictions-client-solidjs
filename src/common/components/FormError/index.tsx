import { Component } from 'solid-js'

import styles from './styles.module.css'

interface FormErrorProps {
  errorMsg?: string
}

export const FormError: Component<FormErrorProps> = (props) => {
  console.log(props.errorMsg)
  if (!props.errorMsg) return null

  return <p class={styles.error}>{props.errorMsg}</p>
}
