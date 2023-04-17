const express = require('express');
const socket = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.get('/', function(request, response) {
    console.log('test api for express server');
    response.send('서버 테스트 api 호출에 성공하셨습니다.');
})


server.listen(8000, function() {
    console.log('서버 실행 중...');
})