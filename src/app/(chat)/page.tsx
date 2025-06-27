'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
    const router = useRouter();
    
    useEffect(() => {
        router.push('/chat');
    }, [router]);

    return (
        <div className="w-full h-full overflow-hidden flex items-center justify-center">
            <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
            </div>
        </div>
    );
}