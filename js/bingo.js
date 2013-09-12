/**
 * Bingo Object : initialize the game
 */
var Bingo = {
    
    container : null,
    
    itemPerCollum : 4,
    
    itemPerRow : 4,
    
    json : null,
    
    socket : null,
    
    ui : null,
    
    wrapper : null,
    
    join : null,
    
    create : null,
    
    hasTerms : false,
    
    server : 'http://192.168.1.34:88/', // local home
    //server : 'http://ic.adfab.fr:88/' // server IC
    
    isConnected : false,
    
    getElement : function ()
    {
    	Bingo.wrapper = document.querySelector('.wrapper');
    	Bingo.ui = document.querySelector('.ui');
    	Bingo.join = document.getElementById('join');
    	Bingo.create = document.getElementById('create');
    },
    
    /**
     * 
     */
    init : function ()
    {
    	if(typeof Bingo.wrapper === "undefined" || Bingo.wrapper === null) Bingo.getElement();
    	Bingo.ui.style.display = 'block';
    	Bingo.wrapper.style.display = 'none';
    	var newRoom = function (e)
    	{
			Bingo.join.removeEventListener('click', newRoom);
			Bingo.create.removeEventListener('click', newRoom);
			var roomName = prompt("Name of the room", "room name");
			if (roomName != null) {
				Bingo.roomName = roomName;
				Bingo.play(roomName);
			}
    	};
    	Bingo.join.addEventListener('click', newRoom);
    	Bingo.create.addEventListener('click', newRoom);
    	
        window.addEventListener('VICTORY', function ()
        {
        	Bingo.hasTerms = false;
        	Bingo.socket.emit('victory', {});
            var confirmation = confirm('VICTORY ! play again ?');
            if(confirmation) Bingo.play();
            this.removeEventListener('click', arguments.callee);
            Bingo.socket.emit('leave', { room : Bingo.roomName });
	    	Bingo.isConnected = false;
	    	Bingo.socket.disconnect();
	    	Bingo.init();
        });
    },
    
    play : function (roomToConnect)
    {
    	if(typeof Bingo.socket !== "undefined" && Bingo.socket !== null && !Bingo.socket.socket.connected){
            Bingo.socket.socket.reconnect();
    	}
    	else{
	    	Bingo.socket = io.connect(Bingo.server);
    	}
	    Bingo.socket.on('connect', function ()
	    {
	    	if(Bingo.isConnected) return;
	    	Bingo.isConnected = true;
	        Bingo.socket.emit('room', { room : roomToConnect });
	    });
	    Bingo.socket.on('terms', function (json)
	    {
	    	if(Bingo.hasTerms) return;
	    	Bingo.ui.style.display = 'none';
	    	Bingo.wrapper.style.display = 'block';
	    	Bingo.json = json;
    		Grid.init(Bingo.json);
	    	Bingo.hasTerms = true;
	    });
	    Bingo.socket.on('end', function ()
	    {
	    	Bingo.hasTerms = false;
	    	Bingo.isConnected = false;
	    	Bingo.socket.emit('leave', { room : roomToConnect });
	    	Bingo.socket.disconnect();
	    	Bingo.init();
	    });
    }
};

if(document.loaded) Bingo.init();
else {
    if (window.addEventListener) window.addEventListener('load', Bingo.init, false);
    else window.attachEvent('onload', Bingo.init);
}
