function Connection(socket, connection_list, id)
{
	connection_list.push(this);
	
	this.id = id;
	this.nome = '';
	this.socket = socket;
	this.connection_list = connection_list;
	this.current_room = 0;
	this.last_message = '';
	this.angulo = 0;
	this.x = 0;
	this.y = 0;
	
	/**
	 * Avisar o usuário da conexão
	 * (não necessariamente da sala)
	 * 
	 */
	this.notify_user_connected = function(connection)
	{
	}
	
	/**
	 * Avisar o usuário da desconexão
	 * (nesse caso sairá de qualquer sala)
	 */
	this.notify_user_disconnected = function(connection)
	{
	}
	
	this.notify_user_entered = function(connection)
	{
		
	}
	
	this.notify_user_exited = function(connection)
	{
		
	}
	
	this.notify_message_sent = function(connection)
	{
		
	}
	
	this.notify_user_moved = function(connection)
	{
		
	}
	
	/**
	 * Processar os dados
	 * 
	 */
	this.process = function(data)
	{
		var parametros = data.split("|");
		var comando = partes.shift();
		switch(comando)
		{
		
		// Entrar na sala
		case '01':
			this.current_room = parseInt(parametros[0]);
			this.nome = parametros[1];
			for(var i = 0; i < connection_list.length; i++)
			{
				if(connection_list[i].current_room == this.current_room)
					connection_list[i].notify_user_entered(this);
			}
			break;
			
		// Sair da sala
		case '02':
			for(var i = 0; i < connection_list.length; i++)
			{
				if(connection_list[i].current_room == this.current_room)
					connection_list[i].notify_user_exited(this);
			}
			this.current_room = 0;
			break;
		
		// Mandar Mensagem
		case '03':
			this.last_message = parametros[0];
			for(var i = 0; i < connection_list.length; i++)
			{
				if(connection_list[i].current_room == this.current_room)
					connection_list[i].notify_message_sent(this);
			}
			break;
			
		// Listar Salas
		case '04':
			
			break;

		// Listar Usuários
		case '05':
			var users = "";
			for(var i = 0; i < connection_list.length; i++)
			{
				if(connection_list[i].current_room == this.current_room)
				{
					users += connection_list[i].id + "|" + connection_list[i].nome + ((i == connection_list.length+1)?"":"|"); 
				}
			}
			socket.write("05|" + users);
			break;
		
		// Movimentar
		case '06':
			this.x = parseInt(parametros[0]);
			this.y = parseInt(parametros[1]);
			this.angulo = parseFloat(parametros[2]);
			
			for(var i = 0; i < connection_list.length; i++)
			{
				if(connection_list[i].current_room == this.current_room)
				{
					connection_list[i].notify_user_moved(this);
				}
			}
			break;
	}
}