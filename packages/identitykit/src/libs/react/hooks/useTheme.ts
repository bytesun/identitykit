import { useEffect, useState } from "react"
import { IdentityKitTheme } from "../constants"

export function useTheme(theme?: IdentityKitTheme) {
  const [finalTheme, setFinalTheme] = useState(theme ?? IdentityKitTheme.SYSTEM)

  useEffect(() => {
    if (!theme) {
      setFinalTheme(
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
          ? IdentityKitTheme.DARK
          : IdentityKitTheme.LIGHT
      )
    }
  }, [theme])

  return finalTheme
}
