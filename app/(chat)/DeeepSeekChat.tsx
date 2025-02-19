'use client';

import { Button } from '@/components/ui/button';

export default function DeepSeekChat() {
  const handleChat = async () => {
    const res = await fetch('/api/deepseek-chat', {
      method: 'GET',
    });
    console.log('🚀 ~ handleChat ~ res:', res);
  };
  return (
    <Button className="" onClick={handleChat}>
      Deepseek chat
    </Button>
  );
}
