'use client';

import { useState, FormEvent } from 'react';
import axios from 'axios';

export default function GetChatGPT() {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log('///input: ', input);

      const result = await axios.post('/api/genDialog', { prompt: input });
      setResponse(result.data.text);
    } catch (error) {
      console.error('Error interacting with ChatGPT', error);
      setResponse('Error interacting with ChatGPT');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
        <button type='submit'>Submit</button>
      </form>
      <div>
        <strong>Response:</strong>
        <div>{response}</div>
      </div>
    </div>
  );
}
