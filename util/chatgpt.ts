// openai 모듈에서 필요한 클래스를 임포트합니다.
import Configuration from 'openai';
import OpenAIApi from 'openai';

type ConnectionType = {
  isConnected?: boolean;
};

const connection: ConnectionType = {};

// 환경 변수에서 API 키와 엔드포인트를 가져옵니다.
const apiKey = process.env.OPENAI_API_KEY!;
const endpoint = process.env.OPENAI_ENDPOINT!; // 예: https://api.openai.com/v1/engines/davinci-codex/completions

// API 키를 포함하는 새로운 configuration 객체를 생성합니다.
const configuration = new Configuration({
  apiKey: apiKey,
});

// configuration 객체를 전달하여 OpenAIApi 클래스의 새 인스턴스를 생성합니다.
const openai = new OpenAIApi(configuration);

async function connectChatGPT() {
  if (connection.isConnected) {
    // 이미 연결된 경우
    return;
  }

  try {
    // OpenAI API에 연결을 시도합니다.
    // 실제 연결 로직은 필요에 따라 구현하시면 됩니다.
    console.log('Connected to ChatGPT');
    connection.isConnected = true;
  } catch (error) {
    console.log('Error connecting to ChatGPT:', error);
    connection.isConnected = false;
  }
}

export default connectChatGPT;
