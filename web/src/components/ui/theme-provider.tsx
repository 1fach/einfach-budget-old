import { createContext, useContext, useEffect, useState } from 'react'

import { css } from '@one-ui/styled-system/css'
import { clsx } from 'clsx'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'one-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.body
    const light = css({ colorScheme: 'light' })
    const dark = css({ colorScheme: 'dark' })

    root.classList.remove(light, dark)

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(
        clsx({
          [light]: systemTheme === 'light',
          [dark]: systemTheme === 'dark',
        })
      )
      root.dataset.oneUiTheme = systemTheme
      return
    }

    root.classList.add(
      clsx({
        [light]: theme === 'light',
        [dark]: theme === 'dark',
      })
    )
    root.dataset.oneUiTheme = theme
  }, [theme])

  const value = React.useMemo(() => {
    return {
      theme,
      setTheme: (theme: Theme) => {
        localStorage.setItem(storageKey, theme)
        setTheme(theme)
      },
    }
  }, [storageKey, theme])

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
