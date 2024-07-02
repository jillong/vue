/*
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
/!**
 * 跨域问题，后端配置了，前端不需要再配置
 *!/
app.options('/ai/chat', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send();
});

app.listen(8090, () => {
    console.log('服务器在端口 8090 上运行');
});*/
