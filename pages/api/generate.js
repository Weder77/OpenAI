import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  console.log(req.body.model)
  const completion = await openai.createCompletion({
    model: req.body.model,
    prompt: req.body.history,
    temperature: Number(req.body.temperature),
    max_tokens: Number(req.body.token)
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}