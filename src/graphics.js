function GraphicsRenderer( assetPath ) {

	var _assetPath = assetPath;
	if( !/\/$/.test( _assetPath ) ) {
		_assetPath += '/';
	}

	var _getBlockGeometry = function( block ) {
		var type = block.type;
		var data = block.data;
		if( type == "redstone_wire" ) {
			var texture = THREE.ImageUtils.loadTexture( _assetPath + 'redstone_dust.png' );
			var material = new THREE.MeshLambertMaterial( { map: texture, transparent: true } );

			var none = new THREE.Geometry();
			none.vertices.push(
				new THREE.Vector3(  0.5, -0.48, -0.5),
				new THREE.Vector3( -0.5, -0.48, -0.5),
				new THREE.Vector3(    0, -0.48,    0)
			);
			none.faces.push(
				new THREE.Face3( 0, 1, 2 )
			);
			none.faceVertexUvs[0] = [
				[
					new THREE.Vector2( 0, 0 ),
					new THREE.Vector2( 1, 0 ),
					new THREE.Vector2( 0.5, 0.25 )
				]
			];
			none.computeFaceNormals();

			var side = new THREE.Geometry();
			side.vertices.push(
				new THREE.Vector3(  0.5, -0.5,  -0.5),
				new THREE.Vector3( -0.5, -0.5, -0.5),
				new THREE.Vector3(    0, -0.48,    0)
			);
			side.faces.push(
				new THREE.Face3( 0, 1, 2 )
			);
			side.faceVertexUvs[0] = [
				[
					new THREE.Vector2( 0, 0.5 ),
					new THREE.Vector2( 1, 0.5 ),
					new THREE.Vector2( 0.5, 0.25 )
				]
			];
			side.computeFaceNormals();

			var up = new THREE.Geometry();
			up.vertices.push(
				new THREE.Vector3(  0.48, -0.48, -0.48),
				new THREE.Vector3( -0.48, -0.48, -0.48),
				new THREE.Vector3(    0, -0.48,    0),
				new THREE.Vector3( -0.5,  0.5, -0.5),
				new THREE.Vector3(  0.5,  0.5, -0.5)
			);
			up.faces.push(
				new THREE.Face3( 0, 1, 2 ),
				new THREE.Face3( 4, 1, 0 ),
				new THREE.Face3( 4, 3, 1 )
			);
			up.faceVertexUvs[0] = [
				[
					new THREE.Vector2( 0, 0.5 ),
					new THREE.Vector2( 1, 0.5 ),
					new THREE.Vector2( 0.5, 0.25 )
				],[
					new THREE.Vector2( 0, 1 ),
					new THREE.Vector2( 1, 0.5 ),
					new THREE.Vector2( 0, 0.5 )
				],[
					new THREE.Vector2( 0, 1 ),
					new THREE.Vector2( 1, 1 ),
					new THREE.Vector2( 1, 0.5 )
				]
			];
			up.computeFaceNormals();

			var styles = {
				none: none,
				side: side,
				up: up
			};

			var north = new THREE.Matrix4();
			var east = new THREE.Matrix4(); east.makeRotationY(Math.PI*1.5);
			var south = new THREE.Matrix4(); south.makeRotationY(Math.PI);
			var west = new THREE.Matrix4(); west.makeRotationY(Math.PI*0.5);

			var geometry = new THREE.Geometry();
			geometry.merge( styles[data.north] || none, north );
			geometry.merge( styles[data.south] || none, south );
			geometry.merge( styles[data.east] || none, east );
			geometry.merge( styles[data.west] || none, west );
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
