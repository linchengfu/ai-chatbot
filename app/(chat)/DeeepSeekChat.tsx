'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function DeepSeekChat() {
  const [content, setContent] = useState('');

  const handleChat = async () => {
    const res = await fetch('/api/deepseek-chat', {
      method: 'GET',
    });

    // 获取 reader 来读取流数据
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // 解码二进制数据为文本
        const text = decoder.decode(value);
        console.log('收到的文本:', text);
        setContent((prev) => prev + text);
      }
    } catch (error) {
      console.error('读取流出错:', error);
    }
  };
  return (
    <div className="space-y-4">
      <Button className="" onClick={handleChat}>
        Deepseek chat
      </Button>
      <div className="whitespace-pre-wrap">{content}</div>
    </div>
  );
}
