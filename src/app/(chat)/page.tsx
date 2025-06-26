'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
    const router = useRouter();
    
    useEffect(() => {
        // Redirect to the new chat route which will create a new chat
        router.push('/chat');
    }, [router]);

    return (
        <div className="w-full h-full overflow-hidden flex items-center justify-center">
            <div className="text-muted-foreground">Starting new chat...</div>
        </div>
    );
}