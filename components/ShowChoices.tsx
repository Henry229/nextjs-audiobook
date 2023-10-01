import React from 'react';

interface Choice {
  index: number;
  message: {
    content: string;
  };
}

interface ShowChoicesProps {
  choices: Choice[];
}

const ShowChoices: React.FC<ShowChoicesProps> = ({ choices }) => {
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

const parseContent = (content: string) => {
  const splitBySpeaker = content.split(/(?<=[A-Za-z]+:)/g); // 대화자와 내용을 분리합니다.
  return splitBySpeaker.map((part, index) => (
    <p key={index}>{part.trim()}</p> // 각 대화자와 내용을 <p> 태그로 감쌉니다.
  ));
};

export default ShowChoices;
