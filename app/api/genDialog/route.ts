import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const params = await request.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You're a professional film scriptwriter, 
          and you can write what the user requests interactively, like a film script. 
          All scripts must start with the name of talker like 'Jame: ' 
          Explain the situation other than the conversation part 
          or the interlocutor's explanation of the action part with 'Narration:' in the beginning 
          When the speaker changes, start a new line.
          `,
      },
      {
        role: 'user',
        content: params.prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(response);
}

// import { NextApiRequest, NextApiResponse } from 'next';
// import OpenAI from 'openai';

// type ResponseData = {
//   text: string;
// };

// interface GenerateNextApiRequest extends NextApiRequest {
//   body: {
//     prompt: string;
//   };
// }

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(
//   // export default async function handler(
//   req: GenerateNextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   console.log('/////// check type res:', typeof req); // res의 타입 출력
//   console.log('++++++++ check value req:', req); // res의 속성 출력
//   console.dir(req, { depth: null }); // res의 속성 출력

//   const response = res as unknown as Response;

//   // if (req.method !== 'POST') {
//   //   return res.status(405).json({ text: 'Method not allowed' });
//   // }

//   if (
//     !req.body ||
//     typeof req.body.prompt !== 'string' ||
//     req.body.prompt.length === 0
//   ) {
//     return res.status(400).json({ text: 'Prompt is required' });
//   }

//   const prompt = req.body.prompt;

//   if (!prompt || prompt.length === 0) {
//     return res.status(400).json({ text: 'Prompt is required' });
//   }

//   if (prompt.length > 2048) {
//     return res.status(400).json({ text: 'Prompt is too long' });
//   }

//   const params = {
//     model: 'text-davinci-002',
//     prompt: prompt,
//     temperature: 0.8,
//     maxTokens: 2048,
//     n: 3,
//     frequencyPenalty: 0,
//     presencePenalty: 0,
//   };

//   try {
//     const completions = await openai.completions.create(params);

//     const result = completions.choices[0].text;

//     const resultObj = JSON.parse(result);
//     const response =
//       resultObj.choices[0].text?.trim() || 'Sorry, there was a problem!';
//     return res.status(200).json({ text: response });
//     // return res.json({ text: resultObj.choices[0].text });
//   } catch (error) {
//     console.error('Error interacting with OpenAI', error);
//     return res.status(500).json({ text: 'Error interacting with OpenAI' });
//   }
// }

// const { Configuration, OpenAIApi } = require('openai');

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const response = await openai.createCompletion({
//   model: 'text-davinci-003',
//   prompt: 'I am a highly intelligent question answering bot...',
//   // prompt가 너무 길어서 생략
//   temperature: 0,
//   max_tokens: 100,
// });

// import { NextResponse } from 'next/server';
// import openai from '@/util/chatgpt';

// interface RequestBody {
//   input?: string;
// }

// export async function POST(request: Request) {
//   const requestBody = await request.text();
//   console.log('+++++ requestBody: ', requestBody);
//   const prompt = (JSON.parse(requestBody) as RequestBody)?.input || '';
//   console.log('+++++ prompt: ', prompt);

//   if (!prompt) {
//     return new Response('Prompt is required', { status: 400 });
//   }
//   if (prompt.length > 2048) {
//     return new Response('Prompt is too long', { status: 400 });
//   }

//   try {
//     const response = await openai.completions.create({
//       model: 'text-davinci-002',
//       // model: 'gpt-4',
//       prompt: prompt,
//       temperature: 0.8,
//       max_tokens: 2048,
//       n: 3,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });

//     return NextResponse.json(response.choices[0].text);
//   } catch (error) {
//     console.error(error);
//     return new Response('An error occurred while processing your request.', {
//       status: 500,
//     });
//   }
// }

// pages/api/chatgpt.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   // if (req.method !== 'POST') {
//   //   return res.status(405).end(); // Method Not Allowed
//   // }

//   console.log('>>>> req', req.body);

//   try {
//     const result = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         // model: 'gpt-4.0-turbo',
//         prompt: req.body.input, // TypeScript를 사용하므로, req.body의 타입을 적절히 지정해야 합니다.
//         max_tokens: 1024,
//         n: 1,
//         stop: '\n',
//         // 필요한 다른 파라미터를 여기에 추가합니다.
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );

//     return res.json(result.data);
//   } catch (error) {
//     console.error('Error interacting with ChatGPT', error);
//     return res.status(500).json({ error: 'Error interacting with ChatGPT' });
//   }
// }

//-------------

// import type { NextApiRequest, NextApiResponse } from 'next';
// import OpenAI from 'openai';
// // import { Configuration, OpenAI } from 'openai';
// // import { OpenAIApi } from 'openai';

// type ResponseData = {
//   text: string;
// };

// interface GenerateNextApiRequest extends NextApiRequest {
//   body: {
//     prompt: string;
//   };
// }

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });
// // const openai = new OpenAIApi(configuration);

// export async function handler(
//   req: GenerateNextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ text: 'Method not allowed' } as ResponseData);
//   }
//   const prompt = req.body.prompt;

//   if (!prompt || prompt.length === 0) {
//     return res.status(400).json({ text: 'Prompt is required' });
//   }

//   if (prompt.length > 2048) {
//     return res.status(400).json({ text: 'Prompt is too long' });
//   }

//   const params = {
//     model: 'text-davinci-002',
//     prompt: prompt,
//     temperature: 0.8,
//     maxTokens: 2048,
//     n: 3,
//     frequencyPenalty: 0,
//     presencePenalty: 0,
//   };

//   try {
//     const completions = await openai.completions.create(params);

//     const result = completions.choices[0].text;

//     const resultObj = JSON.parse(result);
//     const response =
//       resultObj.choices[0].text?.trim() || 'Sorry, there was a problem!';
//     return res.status(200).json({ text: response });
//     // return res.json({ text: resultObj.choices[0].text });
//   } catch (error) {
//     console.error('Error interacting with OpenAI', error);
//     return res
//       .status(500)
//       .json({ text: 'Error interacting with OpenAI' } as ResponseData);
//   }
// }

//---------------------------

//   const aiResult = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${prompt}`,
//     temperature: 0.9,
//     max_tokens: 2048,
//     frequency_penalty: 0.5,
//     presence_penalty: 0,
//   });

//   const response =
//     aiResult.data.choices[0].text?.trim() || 'Sorry, there was a problem!';
//   res.status(200).json({ text: response });
// }
