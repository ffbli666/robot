
var robot = function( name ) {	
	var name = name;
	var log  = function ( string ) {
		console.log( name + ': ' + string );
	};

	log ( 'init' );

	var forward = function () {
		log ( 'forward' );
	};

	var back = function () {
		log ( 'back' );
	};

	var turnLeft = function () {
		log ( 'turnLeft' );
	};

	var turnRight = function () {
		log ( 'turnRight' );
	};

	return {
		forward: forward,
		back: back,
		turnLeft: turnLeft,
		turnRight: turnRight
	};
}
