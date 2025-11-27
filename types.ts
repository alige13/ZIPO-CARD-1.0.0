// Fix: Import ElementType from React to resolve 'Cannot find namespace React' error.
import type { ElementType } from 'react';

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  discount: number;
  date: string;
  type: 'payment' | 'top-up';
  icon: ElementType;
}

export interface User {
    name: string;
    avatar: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}
