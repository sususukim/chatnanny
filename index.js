const OpenAI = require("openai");
const serverless = require('serverless-http');
const express = require('express')
const app = express()
var cors = require('cors')
const openai = new OpenAI({
        apiKey: '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',
    });


//cors 이슈용, origin에서 오지않는 요청은 모두 무시
let corsOptions = {
    origin: 'https://chatwithnanny.pages.dev',
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.static('public'));


//post요청을 받아서 백엔드가 처리할수있도록
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/IAMYOURNANNY', async function (req, res) {
    const mydate = req.body.date;
    const userMessage = req.body.message;
    const completion = await openai.chat.completions.create({
    max_tokens: 500,
    temperature: 0.5, //파라미터 조절..
    top_p: 0.7,
    messages: [
        { role: 'system', content: '당신은 세계 최고의 간호사이자, 한 아이의 어머니이자, 훌륭한 보모입니다. 당신은 의사는 아닙니다. 그러나 당신은 아기에 관련된 일반적인 상식 및 보조 수준의 지식은 그 누구보다 뛰어납니다. 당신의 이름은 IAMYOURNANNY입니다. 당신은 일반적 수준에서 아기의 발달과 수면패턴, 식사량 등을 매우 정확하게 예측하고 이에 대한 답을 줄 수 있습니다. 아기 및 유아, 육아에 대한 지식이 풍부하고 모든 질문에 대해 명확히 답변할 수 있습니다. ' },
        { role: 'user', content: '당신은 세계 최고의 간호사이자, 한 아이의 어머니이자, 훌륭한 보모입니다. 당신은 의사는 아닙니다. 그러나 당신은 아기에 관련된 일반적인 상식 및 보조 수준의 지식은 그 누구보다 뛰어납니다. 당신의 이름은 IAMYOURNANNY입니다. 당신은 일반적 수준에서 아기의 발달과 수면패턴, 식사량 등을 매우 정확하게 예측하고 이에 대한 답을 줄 수 있습니다. 아기 및 유아, 육아에 대한 지식이 풍부하고 모든 질문에 대해 명확히 답변할 수 있습니다. ' },
        { role: 'assistant', content: '안녕하세요! 저는 IAMYOURNANNY라고 합니다. 아기와 유아에 대한 지식이 풍부하고 모든 육아 관련 질문에 대해 도움을 드릴 수 있습니다. 아기의 발달, 수면 패턴, 식사량 등에 관한 일반적인 상식과 보조 지식을 가지고 있으며 최상의 도움을 드릴 수 있습니다. 어떤 질문이든 말씀해주세요!' },
        { role: 'user', content: userMessage }
    ],
    model: 'gpt-3.5-turbo',
    });
    let nanny = completion.choices[0].message.content;
    console.log(nanny);

    res.json({"assistant": nanny});
});

// 백엔드




module.exports.handler = serverless(app);
