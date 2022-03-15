import { createContext, useContext } from 'react'
import { Config } from './models'
import domainEntryPoint from './entry'

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

export function useConfig (): Config {
  const domain = useDomain()
  return domain.config
}
