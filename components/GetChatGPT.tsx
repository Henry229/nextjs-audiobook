'use client';

enum Creator {
  Me = 0,
  GPT = 1,
}

interface DialogProps {
  text: string;
  from: Creator;
  key: number;
}

interface InputProps {
  onSend: (input: string) => void;
  disabled: boolean;
}

export default function GetDialog({ text, from }: DialogProps) {
  return <>{from == Creator.Me}</>;
}
