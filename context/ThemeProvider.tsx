"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  defaultTheme = "light",  // Add default theme
  attribute = "class",     // Explicitly set attribute
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a div with the default theme during SSR
    return <div className={defaultTheme}>{children}</div>
  }

  return (
    <NextThemesProvider
      defaultTheme={defaultTheme}
      attribute={attribute}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}