var io = require('socket.io').listen(88);

io.sockets.on('connection', function (s)
{
	s.emit('G', { hello: 'world' });
});
