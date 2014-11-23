function Map() {
	var blocks = {};
	var getKey = function( x, y, z ) {
		return x.toString() + ',' + y.toString() + ',' + z.toString();
	};
	this.setBlock = function( x, y, z, type ) {
		var key = getKey( x, y, z );
		blocks[ key ] = {
			position: { x:x, y:y, z:z },
			type: type,
			data: {}
		};
	};
	this.visitBlocks = function( visitor ) {
		for( var key in blocks ) {
			var block = blocks[key];
			visitor( block );
		}
	};
}