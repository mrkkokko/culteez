
// ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ // k o k k o // u t f - 8 // ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ //
// ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ // k o k k o // u t f - 8 // ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ //
// ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ // k o k k o // u t f - 8 // ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ //

/*
 *	create a closure and block
 *	the functions to be called
 *	outside except for the ones
 *	starting with 'W.'
 */
;!function(W){

	let	D = W.document;

	/*
	 *	description
	 */
//	variable = function(x,y,z) {
//		return;
//	}

	let	characterWindow = new gcOS.Element,
		fundingsWindow = new gcOS.Element,
		explorationWindow = new gcOS.Element;
	
	characterWindow.id = 'character';
	characterWindow.name = 'Kind';
	characterWindow.icon = 'character.png';
	characterWindow.Spawn();
	characterWindow.Update();
	
	fundingsWindow.id = 'fundings';
	fundingsWindow.name = 'Funds';
	fundingsWindow.icon = 'document.png';
	fundingsWindow.Spawn();
	fundingsWindow.Update();

	explorationWindow.id = 'exploration';
	explorationWindow.name = 'Inquiry';
	explorationWindow.icon = 'exploration.png';
	explorationWindow.Spawn();
	explorationWindow.Update();

/*
 *	'}' makes the closure and
 *	'(self)' iterate instantly
 *	the function
 */
}(self)
