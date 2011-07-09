
function Personagem()
{
	this.cube = 0;
	this.velX=0;
	this.velZ=0;
	
	this.inicializar = function()
	{
		var materials = [];

		for ( var i = 0; i < 6; i ++ ) {
			materials.push( [ new THREE.MeshBasicMaterial( { color: 0x444444 } ) ] );
		}
		this.cube = new THREE.Mesh( new THREE.Cube( 100, 200, 100, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
		this.cube.position.y = 0;
		this.cube.overdraw = true;
	
	}
	
	this.atualizar = function()
	{
		this.cube.position.x-=this.velX;
		this.cube.position.z-=this.velZ;
	}
	
	this.getCube = function(){
		return this.cube;
	}
	
	this.getVelX = function(){
		return this.velX;
	}
	
	this.getVelZ = function(){
		return this.velZ;
	}
	
	 this.setVelX = function(parametro){
		this.velX = parametro ;
	}
	
	this.setVelZ = function(parametro){
		this.velZ = parametro;
	}
	
	
}