function GraphicsRenderer( assetPath ) {

	var _assetPath = assetPath;
	if( !/\/$/.test( _assetPath ) ) {
		_assetPath += '/';
	}

	var _getBlockGeometry = function( block ) {
		var type = block.type;
		if( type == "redstone_dust" ) {
  		var texture = THREE.ImageUtils.loadTexture( _assetPath + 'redstone_dust.png' );
  		var material = new THREE.MeshLambertMaterial( { map: texture, transparent: true } );
  		var geometry = new THREE.Geometry();
  		geometry.vertices.push(
  		  new THREE.Vector3(-0.5,-0.4,-0.5),
  		  new THREE.Vector3(-0.5,-0.4, 0.5),
  		  new THREE.Vector3( 0.5,-0.4, 0.5),
  		  new THREE.Vector3( 0.5,-0.4,-0.5)
  		);
  		geometry.faces.push(
  		  new THREE.Face3( 0, 1, 2 ),
  		  new THREE.Face3( 0, 2, 3 ),
  		  new THREE.Face3( 2, 1, 0 ),
  		  new THREE.Face3( 3, 2, 0 )
  		);
  		var textureCoords = [
        [
    		  new THREE.Vector2( 1, 0 ),
    		  new THREE.Vector2( 1, 1 ),
    		  new THREE.Vector2( 0, 1 )
        ], [
    		  new THREE.Vector2( 1, 0 ),
    		  new THREE.Vector2( 0, 1 ),
    		  new THREE.Vector2( 0, 0 )
    		], [
    		  new THREE.Vector2( 0, 1 ),
    		  new THREE.Vector2( 1, 1 ),
    		  new THREE.Vector2( 1, 0 )
    		], [
    		  new THREE.Vector2( 0, 0 ),
    		  new THREE.Vector2( 0, 1 ),
    		  new THREE.Vector2( 1, 0 )
        ]
  		];
  		geometry.faceVertexUvs[0] = textureCoords;
  		geometry.computeFaceNormals();
  		var surface = new THREE.Mesh( geometry, material );
  		return surface;
		} else {
  		var texture = THREE.ImageUtils.loadTexture( _assetPath + type + '.png' );
  		var material = new THREE.MeshLambertMaterial( { map: texture } );
  		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  		var cube = new THREE.Mesh( geometry, material );
  		return cube;
		}
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
