var net = require('net');

function Server(host, port)
{
	var host = host;
	var port = port;
	
	var connection_list = array();
	
	var server = net.createServer(function(socket)
	{
		socket.on('connect', on_connect);
		socket.on('data', on_data);
		socket.on('end', on_end);
		socket.on('error', on_error);
		socket.on('timeout', on_timeout);
		
		function on_connect()
		{
			sys.puts('Usuario tentando se conectar');
			for(var i = 0; i < connection_list.length; i++)
			{
				if(connection_list[i].socket == socket)
				{
					sys.puts('Ele já existe na lista');
					return;
				}
			}
			var connection = new Connection(socket);
			connection_list.push(connection);
			sys.puts('Usuario conectando');
		}
		
		function on_data(data)
		{
			
		}
		
		function on_end()
		{
			sys.puts('on_end');
			disconnect();
		}
		
		function disconnect()
		{
			sys.puts('disconnect');
			for(var i = 0; i < connection_list.length; i++)
			{
				if(connection_list[i].socket == socket)
				{
					socket_list.splice(i, 1);
					socket.end();
					return;
				}
			}
		}
		
		function on_error()
		{
			
		}
		
		function on_timeout()
		{
			
		}
	});
	
	function start()
	{
		server.listen(host, port)
	}
	
	function stop()
	{
		
	}
}

var server = new Server('localhost',7000);
server.start();
