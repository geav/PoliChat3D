function Connection()
{
	this.enterRoom = function()
	{
		  
	}
	
	this.exitRoom = function()
	{
		
	}
	
	this.sendMessage = function()
	{
		
	}
	
	this.move = function()
	{
		
	}
	
	this.connect = function(host, port)
	{
		var socket = new Socket(host+":"+port); 
		socket.connect();
		
		socket.on('connect', function(){
			
		});
		socket.on('message', function(){
			
		}); 
		socket.on('disconnect', function(){
			
		});
	}
	
	this.disconnect = function()
	{
		socket.disconnect();
	}
	
	this.listUsers = function()
	{
		socket.send("1\0");
	}
	
	
}