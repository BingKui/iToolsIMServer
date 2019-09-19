// 引入express
const express = require('express');
// 创建实例
const app = express();
// 引入网络模块
const http = require('http');
// 创建服务并挂在实例
const server = http.Server(app);

// 引入socket.io，创建实例，挂在server
const io = require('socket.io')(server);

let onlineCount = 0;

// 用户连接
io.on('connection', (socket) => {
    // 通知所有连接用户，新用户加入群聊
    onlineCount++;
    console.log(`新用户加入群聊，现在一共有${onlineCount}人在线！`, socket.id, socket.rooms);
    // socket.emit('join', /* … */); // emit an event to the socket
    // io.emit('useradd', /* … */{name: 'kangbingkui'}); // emit an event to all connected sockets
    // 系统级通知，通知所有人
    // io.emit('notice', {
    //     title: 'Notice',
    //     content: `大家欢迎${socket.id}加入群聊`,
    // });
    // socket.on('reply', () => { /* … */ }); // listen to the event
    // 判断是否离开，离开后消减人数
    socket.on('disconnect', function () {
        onlineCount--;
        console.log(socket.id+'离开了,'+'现在有'+onlineCount+'人在线！');
    });
    socket.on('msg', (value, fn) => {
        console.log('消息送达：', value);
        fn();
        io.emit('msg', value);
    });
});

// 启动服务，绑定端口
server.listen({
    port: 5555,
    host: '0.0.0.0',
}, () => {
    console.log('服务启动成功！端口：5555~');
});