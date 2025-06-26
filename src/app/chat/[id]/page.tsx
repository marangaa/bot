import { loadChat } from '@/lib/chat-store';
import { ChatInterface } from '@/components/chat/chat-interface';

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;
  const messages = await loadChat(id);

  return (
    <div className="w-full h-full overflow-hidden">
      <ChatInterface id={id} initialMessages={messages} />
    </div>
  );
}
