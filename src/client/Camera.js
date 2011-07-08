// classe da Camera

function Camera()
{
	this.threeCam = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	this.threeCam.position.y = 250;
	this.threeCam.position.z = 800;
	this.threeCam.target.position.y = 150;
	
	this.atualizar = function(personagem)
	{
		var angulo = personagem.rotation.y - (90 * Math.PI / 180);
		var nx = Math.cos(-angulo);
		var nz = Math.sin(-angulo);

		this.threeCam.position.y = personagem.position.y + 250;
		this.threeCam.position.x = personagem.position.x + (nx * 800);
		this.threeCam.position.z = personagem.position.z + (nz * 800);
		
		this.threeCam.target.position.x = personagem.position.x;
		this.threeCam.target.position.y = personagem.position.y;
		this.threeCam.target.position.z = personagem.position.z;	
	}
	
	this.getThreeCam = function()
	{
		return this.threeCam;
	}
}
