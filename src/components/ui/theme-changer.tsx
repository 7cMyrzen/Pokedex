"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

export function ThemeChanger() {
    const [theme, setTheme] = React.useState<"dark" | "light" | "system">("system")
    const [mounted, setMounted] = React.useState(false)

    // Récupérer le thème au chargement
    React.useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "dark" || savedTheme === "light") {
            setTheme(savedTheme)
        } else {
            setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        }
        setMounted(true)
    }, [])

    // Appliquer le thème et le sauvegarder
    React.useEffect(() => {
        if (!mounted) return

        const root = window.document.documentElement
        root.classList.remove("light", "dark")

        // Toujours sauvegarder le thème actuel
        const currentTheme = theme === "system"
            ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
            : theme

        root.classList.add(currentTheme)
        if (theme !== "system") {
            localStorage.setItem("theme", theme)
        }
    }, [theme, mounted])

    const toggleTheme = () => {
        if (!mounted) return

        setTheme(current => {
            const newTheme = current === "light" ? "dark" : "light"
            localStorage.setItem("theme", newTheme)
            console.log(newTheme)
            return newTheme
        })
    }

    const getThemeIcon = () => {
        if (!mounted) {
            return (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        }

        if (theme === "system") {
            return (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        }
        return theme === "dark" ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="relative"
            title={`Current theme: ${theme}. Click to toggle.`}
        >
            {getThemeIcon()}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
