const OpenAI = require("openai");
require('dotenv').config({ path: '../../.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generate = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      // {
      //   "role": "user",
      //   "content": prompt
      // }
      generatePromt(prompt)
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
 
  return response.choices[0].message.content;
}

const generatePromt = (prompt) => {
  const messageContent = `Reply with the correct spelling of this word: ${prompt}`

  const promptObj = {
    "role": "user",
    "content": messageContent
  }

  return promptObj;
}

module.exports = generate;