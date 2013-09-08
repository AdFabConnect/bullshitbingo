var io = require('socket.io').listen(88);
var fs = require('fs');

io.sockets.on('connection', function (s)
{
	s.on('room', function (data)
	{
		s.roomName = data.room;
	    s.join(data.room);
		fs.readFile(__dirname + '/data/terms.json', 'utf8', function (err, data)
		{
			if (err) {
				console.log('Error: ' + err);
				return;
			}
			data = JSON.parse(data);
			s.emit('terms', data);
		});
    });
    
	s.on('leave', function (data)
	{
	    s.leave(data.room);
    });
    
	s.on('victory', function ()
	{
        s.broadcast.to(s.roomName).emit('end'); // e: to broadcast stuff when a room user has left it
    });
    
	s.on('disconnect', function ()
	{
		console.log('DISCONNECT');
        //io.sockets.in(client.currentRoom).emit('test'); // e: to broadcast stuff when a room user has left it
        
    });
});
