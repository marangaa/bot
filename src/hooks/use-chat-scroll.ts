import { useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/chat';

interface ChatScrollProps {
    messages: ChatMessage[];
    shouldAutoScroll?: boolean;
}

export function useChatScroll({
                                  messages,
                                  shouldAutoScroll = true
                              }: ChatScrollProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shouldAutoScroll && scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }
    }, [messages, shouldAutoScroll]);

    return scrollRef;
}