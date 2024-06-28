const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.options('/ai/chat', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send();
});

app.post('/ai/chat', (req, res) => {
    console.log('Received request:', req.body);

    // 仿真返回数据 Markdown 格式
    const responseMessage = `
# 服务器响应

这是一条 **Markdown** 格式的响应。
- 项目1
- 项目2
- 项目3
`;

    res.send({ message: responseMessage });
});

app.listen(8090, () => {
    console.log('服务器在端口 8090 上运行');
});