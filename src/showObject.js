function showObject( object, parentElement ) {

	function centerObject( o ) {
		var boundingBox = new THREE.BoundingBoxHelper( o, 0xff0000 );
		boundingBox.update();
		var min = boundingBox.box.min;
		var max = boundingBox.box.max;
		o.position.x = - ( max.x + min.x ) / 2
		o.position.y = - ( max.y + min.y ) / 2
		o.position.z = - ( max.z + min.z ) / 2
		var container = new THREE.Object3D();
		container.add( o );
		return container;
	}

	parentElement = parentElement || document.body;
	object = centerObject( object );

	var width = 640;
	var height = 480;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( width, height );
	parentElement.appendChild( renderer.domElement );

	var camera = new THREE.PerspectiveCamera( 25, width / height, 0.1, 1000 );
	camera.position.set( 0, 15, 50 );
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

	var scene = new THREE.Scene();
	scene.add( object );
	scene.add( new THREE.AmbientLight( 0x444444 ) );
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
	directionalLight.position.set( -1, 1, 1 );
	scene.add( directionalLight );

	setInterval( function() {
		object.rotation.y += 0.002;
	}, 10 );

	var render = function () {
		requestAnimationFrame( render );
		renderer.render( scene, camera );
	};
	render();
}
