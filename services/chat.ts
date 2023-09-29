import connectChatGPT from '@/util/chatgpt'; // chatgpt.ts에서 함수를 임포트합니다.
import { OpenAIApi } from 'openai'; // 필요한 타입을 임포트합니다.

export async function generateInfo(prompt: string) {
  await connectChatGPT(); // ChatGPT에 연결합니다.

  try {
    // OpenAI API를 사용하여 정보를 생성합니다.
    // openai 인스턴스를 util/chatgpt.ts에서 가져와야 합니다.
    // 예시에서는 OpenAIApi의 인스턴스가 openai로 가정하였습니다.
    const response = await openai.createCompletion({
      engine: 'davinci-codex',
      prompt: prompt,
      max_tokens: 100,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
