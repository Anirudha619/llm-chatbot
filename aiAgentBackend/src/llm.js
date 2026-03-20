const Cerebras = require('@cerebras/cerebras_cloud_sdk');
const dotenv = require('dotenv')
dotenv.config()

const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
});

async function callLlm(prompt) {
    console.log("prompt ", prompt)
  const chatCompletion = await client.chat.completions.create({
    model: 'llama3.1-8b',
    messages: [{ role: 'user', content: prompt }],
  });

  console.log(chatCompletion?.choices[0]?.message);
  return chatCompletion?.choices[0]?.message.content;
}

module.exports = {
    callLlm
}