import { Message } from '@ai-sdk/react';
import { generateId } from 'ai';

const CHAT_PREFIX = 'chat_';
const MAX_CHATS = 10; // Keep only last 10 chats
const CHAT_EXPIRY_DAYS = 7; // Chats expire after 7 days

interface StoredChat {
  id: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

function isClient(): boolean {
  return typeof window !== 'undefined';
}

function getChatKey(id: string): string {
  return `${CHAT_PREFIX}${id}`;
}

function cleanupOldChats(): void {
  if (!isClient()) return;
  
  try {
    const now = Date.now();
    const expiryTime = CHAT_EXPIRY_DAYS * 24 * 60 * 60 * 1000; // 7 days in ms
    
    // Get all chat keys
    const chatKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CHAT_PREFIX)) {
        chatKeys.push(key);
      }
    }
    
    // Load all chats with their timestamps
    const chats: StoredChat[] = [];
    chatKeys.forEach(key => {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const chat = JSON.parse(stored);
          chats.push(chat);
        }
      } catch (error) {
        // Remove corrupted entries
        localStorage.removeItem(key);
      }
    });
    
    // Remove expired chats
    chats.forEach(chat => {
      if (now - chat.updatedAt > expiryTime) {
        localStorage.removeItem(getChatKey(chat.id));
      }
    });
    
    // If still too many chats, keep only the most recent ones
    const validChats = chats.filter(chat => now - chat.updatedAt <= expiryTime);
    if (validChats.length > MAX_CHATS) {
      validChats
        .sort((a, b) => a.updatedAt - b.updatedAt) // Sort by oldest first
        .slice(0, validChats.length - MAX_CHATS) // Keep only the excess ones
        .forEach(chat => {
          localStorage.removeItem(getChatKey(chat.id));
        });
    }
  } catch (error) {
    console.warn('Failed to cleanup old chats:', error);
  }
}

export async function createChat(): Promise<string> {
  const id = generateId();
  
  if (isClient()) {
    cleanupOldChats();
    
    const chat: StoredChat = {
      id,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    localStorage.setItem(getChatKey(id), JSON.stringify(chat));
  }
  
  return id;
}

export async function loadChat(id: string): Promise<Message[]> {
  if (!isClient()) return [];
  
  try {
    const stored = localStorage.getItem(getChatKey(id));
    if (!stored) return [];
    
    const chat: StoredChat = JSON.parse(stored);
    
    // Check if chat has expired
    const now = Date.now();
    const expiryTime = CHAT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    
    if (now - chat.updatedAt > expiryTime) {
      localStorage.removeItem(getChatKey(id));
      return [];
    }
    
    return chat.messages;
  } catch (error) {
    console.warn('Failed to load chat:', error);
    return [];
  }
}

export async function saveChat({
  id,
  messages,
}: {
  id: string;
  messages: Message[];
}): Promise<void> {
  if (!isClient()) return;
  
  try {
    cleanupOldChats();
    
    const existingStored = localStorage.getItem(getChatKey(id));
    let createdAt = Date.now();
    
    if (existingStored) {
      try {
        const existing: StoredChat = JSON.parse(existingStored);
        createdAt = existing.createdAt;
      } catch (error) {
        // If parsing fails, use current time
      }
    }
    
    const chat: StoredChat = {
      id,
      messages,
      createdAt,
      updatedAt: Date.now(),
    };
    
    localStorage.setItem(getChatKey(id), JSON.stringify(chat));
  } catch (error) {
    console.warn('Failed to save chat:', error);
  }
}

export function getAllChats(): StoredChat[] {
  if (!isClient()) return [];
  
  try {
    cleanupOldChats();
    
    const chats: StoredChat[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CHAT_PREFIX)) {
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            chats.push(JSON.parse(stored));
          }
        } catch (error) {
          // Remove corrupted entries
          localStorage.removeItem(key);
        }
      }
    }
    
    return chats.sort((a, b) => b.updatedAt - a.updatedAt); // Most recent first
  } catch (error) {
    console.warn('Failed to get all chats:', error);
    return [];
  }
}
