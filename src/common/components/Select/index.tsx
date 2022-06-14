import type { Component, JSX } from 'solid-js'
import { For } from 'solid-js'

interface Item {
  label: string
  value: string
}

interface Props {
  id: string
  name: string
  onChange?: JSX.EventHandlerUnion<HTMLSelectElement, Event>
  items?: Item[]
  label: string
  placeholder?: string
  value?: string
}

export const Select: Component<Props> = ({
  id,
  items,
  label,
  name,
  onChange,
  placeholder = 'Select',
  value,
}) => {
  return (
    <div>
      <label for={id}>{label}</label>
      <select id={id} onChange={onChange} name={name} value={value}>
        <option value=''>{placeholder}</option>
        <For each={items}>
          {(item) => <option value={item.value}>{item.label}</option>}
        </For>
      </select>
    </div>
  )
}
