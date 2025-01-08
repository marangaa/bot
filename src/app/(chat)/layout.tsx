import React from "react";

export default function ChatLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen flex-col">
            {children}
        </main>
    );
}
