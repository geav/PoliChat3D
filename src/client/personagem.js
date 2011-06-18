
function personagem()
{
	var cube;
	var velX=0;
	var velZ=0;
	
	this.inicializar = inicializar;
	this.atualizar = atualizar;
	this.getVelX = getVelX;
	this.setVelX = setVelX;
	this.getVelY = getVelY;
	this.setVelY = setVelY;
	
	
	function inicializar()
	{
		cube = new THREE.Mesh( new THREE.Cube( 200, 200, 200, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
		cube.position.y = 0;
		cube.overdraw = true;
		scene.addObject( cube );
	}
	
	function atualizar()
	{
		cube.position.x-=velX;
		cube.position.z-=velZ;
	}
	
	function getCube(){
		return cube;
	}
	
	function getVelX(){
		return velX;
	}
	
	function getVelZ(){
		return velZ;
	}
	
	function setVelX(_velX){
		velX = _velX ;
	}
	
	function setVelZ(_velZ){
		velY = _velZ;
	}
	
	
}