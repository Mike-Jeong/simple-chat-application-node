const SocketIo = require("socket.io");

// 미리 정의된 채팅룸 데이터
const predefinedChatRooms = [
    { id: 1, name: 'Chat Room 1', users: 0 },
    { id: 2, name: 'Chat Room 2', users: 0 }
];

module.exports = (http) => {
    const io = SocketIo(http);

    function publicRooms() {
        return predefinedChatRooms.map(room => ({ id: room.id, name: room.name, users: countRoom(room.name) }));
    }

    // room 참여자 수 추출
    function countRoom(roomName) {
        return io.sockets.adapter.rooms.get(roomName)?.size || 0;
    }

    io.on("connection", (socket) => {

        socket.emit("list", publicRooms());

        socket.on("enterRoom", (obj) => {
            const { roomNum, nickname } = JSON.parse(obj);
            console.log("---------enterRoom---------", roomNum)
            socket.join(roomNum);
            const message = `${nickname}님이 ${roomNum}방에 입장하셨습니다.`;
            const userNum = countRoom(roomNum);
            io.sockets.in(roomNum).emit("welcome", message, roomNum, userNum);
            predefinedChatRooms.find(room => room.name === roomNum).users = userNum;
            io.emit("list", publicRooms());
        });

        socket.on("chat", (obj) => {
            const { roomNum, nickname, message } = JSON.parse(obj);
            io.sockets.in(roomNum).emit("contents", roomNum, nickname, message);
        });

        socket.on('disconnect', () => {
            const { nickname } = socket;
            const message = `${nickname}이 퇴장하셨습니다`;
            socket.broadcast.emit('leaveUser', message);
        });
    });
};