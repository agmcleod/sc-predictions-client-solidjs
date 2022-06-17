import {
  Accessor,
  Component,
  createContext,
  createSignal,
  JSX,
  Setter,
  useContext,
} from 'solid-js'

type State = [
  Accessor<string>,
  {
    setAuthToken: Setter<string>
  }
]

const AuthContext = createContext<State>()

interface Props {
  children: JSX.Element
}

export const AuthProvider: Component<Props> = (props) => {
  const [authToken, setAuthToken] = createSignal('')
  const store: State = [
    authToken,
    {
      setAuthToken,
    },
  ]

  return (
    <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
