
function Personagem()
{
	this.cube;
	this.direcao;
	
	this.inicializar = function()
	{
		var materials = [];

		for ( var i = 0; i < 6; i ++ ) {
			materials.push( [ new THREE.MeshBasicMaterial( { color: 0x444444 } ) ] );
		}
		this.cube = new THREE.Mesh( new THREE.Cube( 100, 200, 100, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
		this.cube.position.y = 0;
		this.cube.overdraw = true;
		this.direcao = new THREE.Vector3(0,0,0);
	}
	
	this.atualizar = function()
	{
		var VEL_PERSONAGEM = 5;
		var direcaoFinal = new THREE.Vector3(0,0,0);
				// movimentação lateral
				
		var angulo = this.cube.rotation.y + (Math.PI/180);
		var ladoX = Math.cos(-angulo) * this.direcao.x;
		var ladoZ = Math.sin(-angulo) * this.direcao.x;

		direcaoFinal.x += ladoX * VEL_PERSONAGEM;
		direcaoFinal.z += ladoZ * VEL_PERSONAGEM;
				//////////////////

		// movimentação frontal
		angulo = this.cube.rotation.y - (90 * Math.PI/180);
		var frenteX = Math.cos(-angulo) * this.direcao.z;
		var frenteZ = Math.sin(-angulo) * this.direcao.z;

		direcaoFinal.x += (frenteX * VEL_PERSONAGEM);
		direcaoFinal.z += (frenteZ * VEL_PERSONAGEM);
				
		this.cube.position.x += direcaoFinal.x;
		this.cube.position.z += direcaoFinal.z;
		//////////////////////
	}
	
	this.normalizeDirecao = function()
	{
		this.direcao.normalize();
	}
	
	this.getCube = function(){
		return this.cube;
	}
	
	this.setDirecaoX = function(_direcao){
		this.direcao.x = _direcao;
	}
	this.setDirecaoZ = function(_direcao){
		this.direcao.z = _direcao;
	}
	
	
	
}