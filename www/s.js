var io = require('socket.io').listen(88);
var fs = require('fs');
var rooms = [];
var jsonFiles = [ // Name of json file
	"terms_0",
	"terms_1",
	"terms_2",
	"terms_3",
	"terms_4",
	"terms_5",
	"terms_6",
];
io.sockets.on('connection', function (s)
{
	s.on('room', function (data)
	{
		console.log(jsonFiles[data.room]);
		if(typeof jsonFiles[data.room] !== 'undefined' || jsonFiles[data.room] !== null){
			rooms[data.room] = '/data/' + data.room + '.json';
		}
		else if(typeof rooms[data.room] === 'undefined' || rooms[data.room] === null){
			rooms[data.room] = '/data/terms_' + Math.floor(Math.random() * 7) + '.json';
		}
		s.roomName = data.room;
	    s.join(data.room);
		fs.readFile(__dirname + rooms[data.room], 'utf8', function (err, data)
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
