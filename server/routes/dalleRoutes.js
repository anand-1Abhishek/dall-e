import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.send('hello from Dall-E!')
});

router.route('/').post(async (req, res) => {
  try {
    // console.log(process.env.OPENAI_API_KEY)
    const {prompt} = req.body;
    console.log(prompt);

    const aiResponse = await openai.createImage({
      prompt,
      n:1,
      size:'1024x1024',
       response_format:'b64_json',
    });
    //console.log(aiResponse);

    const image = aiResponse.data.data[0].b64_json;
    //const image = aiResponse.data.data[0].url;
    res.status(200).json({ photo : image});
  } catch (error) {
    // console.log(error.message)
    
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;