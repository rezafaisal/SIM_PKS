import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { createContext } from 'react'
import { Creds } from '../types'

export interface AuthContextValue<Error = unknown> {
  creds: Creds | undefined
  isLoading: boolean
  logout: UseMutateAsyncFunction<any, any, void, any>
}

export const AuthContext = createContext<AuthContextValue>(null!)
