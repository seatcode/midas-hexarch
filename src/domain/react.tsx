import { createContext, useContext } from 'react'
import domainEntryPoint from './index'

export const DomainContext = createContext(domainEntryPoint)

export function DomainProvider (
  { children }: {children: React.ReactNode}
): JSX.Element {
  return (
    <DomainContext.Provider value={domainEntryPoint}>
      {children}
    </DomainContext.Provider>
  )
}

export function useDomain (): typeof domainEntryPoint {
  return useContext(DomainContext)
}
