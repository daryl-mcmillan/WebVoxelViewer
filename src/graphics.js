function GraphicsRenderer( assetPath ) {

	var _assetPath = assetPath;
	if( !/\/$/.test( _assetPath ) ) {
		_assetPath += '/';
	}

	var _getBlockGeometry = function( block ) {
		var type = block.type;
		var texture = THREE.ImageUtils.loadTexture( _assetPath + type + '.png' );
		var material = new THREE.MeshLambertMaterial( { map: texture } );
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var cube = new THREE.Mesh( geometry, material );
		return cube;
	};
	this.getBlockGeometry = _getBlockGeometry;

	this.getMapGeometry = function( map ) {
		var group = new THREE.Object3D();
		map.visitBlocks(function( block ) {
			var geom = _getBlockGeometry( block );
			var p = block.position;
			geom.position.set( p.x, p.y, p.z );
			group.add( geom );
		});
		return group;
	};

}
