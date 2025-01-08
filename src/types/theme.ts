import React from "react";

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
}