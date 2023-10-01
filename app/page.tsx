'use client';

import PromptForm from '@/components/PromptForm';
import ShowChoices from '@/components/ShowChoices';
import GridSpinner from '@/components/ui/GridSpinner';
import { useState } from 'react';

interface Choice {
  index: number;
  message: {
    content: string;
  };
}

export default function Home() {
  const [choices, setChoices] = useState<Choice[]>([
    { index: 0, message: { content: '' } },
  ]);
  const [loading, setLoading] = useState(false);

  const handlePrompt = async (prompt: string) => {
    setLoading(true);
    const response = await fetch('/api/genDialog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    const result = await response.json();
    setLoading(false);
    setChoices(result.choices);
  };

  return (
    <main className='w-full flex flex-col p-4'>
      {loading && (
        <div className='text-center'>
          <GridSpinner />
        </div>
      )}
      <p className='text-xl font-bold text-amber-600 mb-2'>
        Chat GPT is thrilled to see you...
      </p>
      <PromptForm onSubmit={handlePrompt} loading={loading} />
      <ShowChoices choices={choices} />
      {/* {choices.map((choice) => (
        <p
          className='m-2 p-4 bg-white border border-neutral-800'
          key={choice.index}
        >
          {choice.message.content}
        </p>
      ))} */}
    </main>
  );
}
