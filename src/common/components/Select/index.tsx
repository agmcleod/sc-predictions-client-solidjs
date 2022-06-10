import type { Component } from 'solid-js'
import { For } from 'solid-js'

interface Item {
  label: string
  value: string
}

interface Props {
  id: string
  items: Item[]
  label: string
  placeholder?: string
}

export function Select({
  id,
  items,
  label,
  placeholder = 'Select',
}: Props): Component {
  return (
    <div>
      <label for={id}>{label}</label>
      <select id={id}>
        <option value=''>{placeholder}</option>
        <For each={items}>
          {(item) => <option value={item.value}>{item.label}</option>}
        </For>
      </select>
    </div>
  )
}
