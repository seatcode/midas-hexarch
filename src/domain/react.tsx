import { createContext } from 'react'

export const DomainContext = createContext(null)

export function DomainProvider (
  { children }: {children: React.ReactNode}
): JSX.Element {
  return (
    <DomainContext.Provider value={null}>
      {children}
    </DomainContext.Provider>
  )
}
