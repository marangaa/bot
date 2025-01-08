'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from '@/types/theme';

export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme={defaultTheme}
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    );
}