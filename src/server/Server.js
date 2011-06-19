var net = require('net');

function Server(host, port)
{
	var host = host;
	var port = port;
	
	var connection_list = array();
	var nextId = 1;
	
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
			var connection = new Connection(socket, connection_list, nextId);
			nextId++;
			
			for(var i = 0; i < connection_list.length; i++)
			{
				connection_list[i].notify_user_connected(connection);
			}
			sys.puts('Usuario conectando');
		}
		
		/**
		 * If receiving policy request, send Policy XML
		 * If receiving another data, treat it. 
		 */
		function on_data(data)
		{
			if(String(data).indexOf('<policy-file-request/>') != -1)
			{
				sys.puts(policy());
				socket.write(policy() + '\0');
			}
			else
			{
				for(var i = 0; i < connection_list.length; i++)
				{
					connection_list[i].process(data);
				}
			}
		}
		/**
		 * When the client finishes connection
		 * 
		 */
		function on_end()
		{
			sys.puts('on_end');
			disconnect();
		}
		/**
		 * Disconnect the client
		 * 
		 */
		function disconnect()
		{
			var desconectado;
			sys.puts('disconnect');
			for(var i = 0; i < connection_list.length; i++)
			{
				if(connection_list[i].socket == socket)
				{
					desconectado = connection_list[i];
					connection_list.splice(i, 1);
					socket.end();
					connection_list
					break;
				}
			}
			for(var i = 0; i < connection_list.length; i++)
			{
				connection_list[i].notify_user_disconnected(desconectado);
			}
		}
		
		/**
		 * When there is an error connecting 
		 * 
		 */
		function on_error()
		{
			console.log('on_error');
			disconnect();
		}
		
		/**
		 * When the server tries to send and
		 * has a timeout
		 * 
		 */
		function on_timeout()
		{
			console.log('on_timeout');
			disconnect();
		}
		
		/**
		 * Create Security Policy
		 * 
		 */
		function policy()
		{
			var xml = '<?xml version="1.0"?>'+
			          '<!DOCTYPE cross-domain-policy SYSTEM '+
					  '"http://www.adobe.com/xml/dtds/cross-domain-policy.dtd">'+
					  '<cross-domain-policy>'+
					  '<allow-access-from domain="*" to-ports="7000"/>'+
					  '</cross-domain-policy>';
			
			return xml;
		}
	});
	
	function start()
	{
		server.listen(host, port);
		console.log('Server starting at address ' + host + ":" + port);
	}
	
	function stop()
	{
		while(connection_list.length > 0)
		{
			connection_list.pop().socket.end();
		}
	}
}

var server = new Server('localhost',7000);
server.start();
