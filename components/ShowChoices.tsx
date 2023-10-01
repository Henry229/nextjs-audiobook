import React, { useEffect } from 'react';

interface Choice {
  index: number;
  message: {
    content: string;
  };
}

interface ShowChoicesProps {
  choices: Choice[];
  onGetVoice: (text: string) => void;
}

const ShowChoices: React.FC<ShowChoicesProps> = ({ choices, onGetVoice }) => {
  useEffect(() => {
    const text = choices.map((choice) => choice.message.content).join(' ');
    onGetVoice(text);
  }, [choices, onGetVoice]);

  return (
    <>
      {choices.map((choice) => (
        <div
          className='flex flex-col m-2 p-4 bg-white border border-neutral-800'
          key={choice.index}
        >
          {choice.message.content
            .split(/([A-Za-z]+:)/)
            .map((text, index, arr) => {
              if (text.trim().endsWith(':')) {
                return (
                  <p key={index} className='inline'>
                    <span className='font-bold'>{text}</span>
                    {arr[index + 1]}
                  </p>
                );
              }
              return null;
            })}
        </div>
      ))}
    </>
  );
};

export default ShowChoices;
