import { FormEvent, useState } from 'react';

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  loading: boolean;
}

export default function PromptForm({ onSubmit, loading }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    onSubmit(prompt);
    setPrompt('');
  };
  return (
    <form className='flex flex-col px-3 ' onSubmit={handleSubmit}>
      <label className='text-lg font-bold mb-2' htmlFor='prompt-input'>
        Question
      </label>
      <input
        className='w-full p-3 mb-2 font-bold text-lg border border-neutral-800'
        type='text'
        placeholder='Add a request...'
        id='prompt-input'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className='w-24 h-10 bg-blue-500 text-white border border-gray-500 p-2 rounded-lg'
        disabled={loading}
      >
        Submit
      </button>
    </form>
  );
}
