import { createContext, useRef, useContext } from 'react'

const AppContext = createContext({
  deckInstance: null,
  setDeckInstance: (deckRef) => {},
})

export default AppContext

export const AppContextProvider = AppContext.Provider

export const useAppContextValues = () => {
  const deckInstance = useRef(null)

  const setDeckInstance = (deckRef) => {
    if (deckRef?.deck) {
      deckInstance.current = deckRef.deck
    }
  }

  const contextValues = {
    deckInstance,
    setDeckInstance
  }

  return contextValues
}

export const useAppContext = () => useContext(AppContext)
