import 'dotenv/config';
import tencentcloud from 'tencentcloud-sdk-nodejs-tts';
import fs from 'node:fs';

const secretId = process.env.SECRET_ID
const secretKey = process.env.SECRET_KEY

const TtsClient = tencentcloud.tts.v20190823.Client;

const client = new TtsClient({
  credential: {
    secretId: secretId,
    secretKey: secretKey,
  },
  region: 'ap-beijing',
  profile: {
    httpProfile: {
      endpoint: 'tts.tencentcloudapi.com',
    }
  }
})
const params = {
  Text: "下班路上，我还在为晚霞开心。突然电话响起：系统崩了。我的心一下揪紧，冲进办公室时几乎要绝望。可当大家一起排查、重启，屏幕终于恢复正常，我长长松了口气，笑着说：还好，我们没放弃。",  // 要合成的文本
  SessionId: 'session-001',
  VoiceType: 502006,  // 声音类型
  Codec: 'mp3',      // 指定输出格式为mp3
}
client.TextToVoice(params).then(
  data => {
    // 返回的Audio字段是Base64编码的音频数据
    const audioBuffer = Buffer.from(data.Audio, 'base64');
    const outputPath = './output.mp3';
    fs.writeFile(outputPath, audioBuffer, (err) => {
      if (err) {
        console.error('Error saving audio file:', err);
      } else {
        console.log('Audio file saved successfully:', outputPath);
      }
    });
  },
  err => {
    console.error('Error:', err);
  }
)
