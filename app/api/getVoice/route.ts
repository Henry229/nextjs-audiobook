// pages/api/getVoice.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { buffer } from 'micro';

export async function POST(req: NextRequest, res: NextResponse) {
  // if (req.method !== 'POST') {
  //   return res.status(405).end(); // Method Not Allowed
  // }

  try {
    if (!req.body) {
      return new Response('Request body is missing', { status: 400 });
      // return res.status(400).json({error :'Request body is missing'})
    }
    // API Key를 사용하여 Token 얻기
    const tokenResponse = await axios.get('https://api.murf.ai/v1/auth/token', {
      headers: {
        'api-key': process.env.MURF_API_KEY,
      },
    });
    const token = tokenResponse.data.token;

    // const bodyBuffer = await buffer(req.body);
    // const body = JSON.parse(bodyBuffer.toString());

    // 음성 리스트 얻기
    const voicesResponse = await axios.get(
      'https://api.murf.ai/v1/speech/voices',
      {
        headers: {
          token,
        },
      }
    );
    const voices = voicesResponse.data;

    // ReadableStream을 버퍼로 변환
    const chunks: Uint8Array[] = [];
    const reader = req.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const bodyBuffer = Buffer.concat(chunks);
    const body = JSON.parse(bodyBuffer.toString());

    // 음성 생성
    const text = body.text; // 클라이언트에서 보낸 텍스트
    const voiceId = voices[0].voiceId; // 예시로 첫 번째 음성 선택
    const speechResponse = await axios.post(
      'https://api.murf.ai/v1/speech/generate',
      {
        text,
        voiceId,
        format: 'WAV',
        channelType: 'MONO',
        sampleRate: 24000,
      },
      {
        headers: {
          token,
          'Content-Type': 'application/json',
        },
      }
    );

    const audioFileUrl = speechResponse.data.audioFile;
    return NextResponse.json({ audioFileUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
