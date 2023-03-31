
// ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ // k o k k o // u t f - 8 // ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ //
// ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ // k o k k o // u t f - 8 // ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ //
// ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ // k o k k o // u t f - 8 // ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ //

/*
 *	this script-library needs 4 div-elements
 *	of id "taskbar", "desktop" inside a 
 *	"computer" element and a "wallppr"
 *	outside
 */

/*
 *	create a closure and block
 *	the functions to be called
 *	outside except for the ones
 *	starting with 'W.'
 */
;!function(W){

	let	D = W.document;

	/*
	 *	function to move the given 'gcos draggable'
	 *	elements on every mousedown event happening
	 */
	MoveWindow = function(w) {
		// magical code to make it so the right-click
		// doesn't f4#& up the function
		if (w.buttons !== 1) return;
		
		// element position is relative to top left corner
		// this is needed to get the difference from the
		// corner and the cursor coordinates to calculate
		// the positioning difference ;
		// the 'that' is needed to refer to the current
		// parent element of the one actually draggable
		let	that = this.parentElement.parentElement,
			dx = w.clientX - that.offsetLeft,
			dy = w.clientY - that.offsetTop;
		
		// the 'move' function moves the 'that' element
		// referring to the current cursor position
		move = function(v) {
			that.style.left = (v.clientX - dx) + 'px';
			that.style.top = (v.clientY - dy) + 'px';
			// modify the graphic of cursor
			that.style.cursor = "move";
		}
		
		// serves to bring to front the latest moved element
		FrontWindow(that);
		
		// the 'halt' function serves to stop following
		// and moving the current cursor to reposition
		halt = function(v) {
			D.removeEventListener('mousemove', move);
			D.removeEventListener('mouseup', halt);
			// make the cursor back to normal
			that.style.cursor = "default";
		}
		
		// these serves to get the "window" to follow
		// at the right time
		D.addEventListener('mouseup', halt);
		D.addEventListener('mousemove', move);
	},

	/*
	 *	function to resize the given 'gcos resizable'
	 *	elements on every mousedown event happening
	 */
	ResizeWindow = function(w) {
		// magical code to make it so the right-click
		// doesn't f4#& up the function
		if (w.buttons !== 1) return;
		
		// 'that' is saved for the same reason as before ;
		// the dimension of the element are relative to
		// the bottom right corner and as the moveWindow
		// this have to take count of cursor position
		let	that = this.parentElement.parentElement,
			dx = w.clientX - that.clientWidth,
			dy = w.clientY - that.clientHeight;
		
		// the 'move' function moves the 'that' element
		// referring to the current cursor position
		resize = function(v) {
			that.style.width = (v.clientX - dx) + 'px';
			that.style.height = (v.clientY - dy) + 'px';
		}
		
		// serves to bring to front the latest moved element
		FrontWindow(that);
		
		// the 'halt' function serves to stop following
		// and moving the current cursor to reposition
		halt = function() {
			D.removeEventListener('mousemove', resize);
			D.removeEventListener('mouseup', halt);
		}
		
		// these serves to get the "window" to follow
		// at the right time
		D.addEventListener('mouseup', halt);
		D.addEventListener('mousemove', resize);
	}
	
	/*
	 *	function to minimize the window to only the
	 *	header ;
	 *	it works by adding the !important; class
	 *	'minimized'
	 */
	MinimizeWindow = function(w) {
		// 'that' is saved for simplicity
		let	that = w.parentElement.parentElement;
		
		// toggle 'minimized' class
		that.classList.toggle('minimized');
	},

	/*
	 *	function to remove permanently the window from
	 *	the DOM
	 */
	KillWindow = function(w) {
		// 'that' is saved for simplicity
		let	that = w.parentElement.parentElement;
		
		// the 'kill' function kills the 'that' element
		// referring to the 'div' parent
		that.classList.add('closed');
		that.classList.remove('minimized');
	},
	
	/*
	 *	function to frontmost a clicked window
	 */
	FrontWindow = function(t) {
		// removes class 'frontmost' to all windows
		$('.window').forEach( (e) => e.classList.remove('frontmost') );
		
		// frontmosts it as layer
		t.parentNode.appendChild(t);
		
		// adds 'frontmost' class to frontmosted window
		t.classList.add('frontmost');
	},

	/*
	 *	description
	 */
	MoveFile = function(v) {
		// magical code to make it so the right-click
		// doesn't f4#& up the function
		if (v.buttons !== 1) return;
		
		// initialize
		// 't' for the timeout
		// 'that' for reference of the file
		// 'd's for the moving function
		let	t, that = this.parentElement,
			dx = v.clientX - that.offsetLeft,
			dy = v.clientY - that.offsetTop;
		
		down = function() {
			t = setTimeout(() => {
				// adds the move function
				D.addEventListener('mousemove', move);
				// adds a class to modify it's style
				that.classList.add('dragging');
				// removes the event itself for reusability
				D.removeEventListener('mousedown', down);
			}, 200);
		}
		
		move = function(v) {
			// move the effective file
			that.style.left = (v.clientX - dx) + 'px';
			that.style.top = (v.clientY - dy) + 'px';
			// modify the graphic of cursor
			that.style.cursor = "move";
		}
		
		halt = function(v) {
			// resets the timer for reusability
			clearTimeout(t);
			// moves the file
			if (
				that.classList.contains('dragging') &&
				that.getAttribute('window') != theFolder.parentNode.parentNode.getAttribute('window')
				) {
				theFolder.appendChild(that);
			}
			// removes the class
			that.classList.remove('dragging');
			// make the cursor back to normal
			that.style.cursor = "default";
			// removes the events of function for reusability
			D.removeEventListener('mousedown', down);
			D.removeEventListener('mousemove', move);
			D.removeEventListener('mouseup', halt);
			return;
		}
		
		// serves the functions
		D.addEventListener('mousedown',down);
		D.addEventListener('mouseup',halt);
	}

	/*
	 *	description
	 */
//	variable = function(x,y,z) {
//		return;
//	}

	/*
	 *	major object
	 */
	W.gcOS = {};

	/*
	 *	description
	 */
	gcOS.Window = class gWindow {
		id = 'generic';
		name = 'Window';
		
		move = true;
		mini = true;
		kill = true;
		size = true;
		
		
		closed = true;
		folder = false;
		
		root = {};
		content;
		
		Spawn() {
			// protections
			if ($('.window[window="'+this.id+'"]').length != 0) return;
			
			this.root.window = jC.DOM('div.window[window="' + this.id + '"]' + (this.closed ? '.closed' : ''),$('#desktop')[0]); // window
			this.root.header = jC.DOM('div.header',this.root.window); // header
			this.root.title = jC.DOM('p.title',this.root.header); // header title
			this.root.minimizer = jC.DOM('p' + (this.mini ? '.minimizer' : ''),this.root.header); // header minimizer
			this.root.killer = jC.DOM('p' + (this.kill ? '.killer' : ''),this.root.header); // header killer
			this.root.mainer = jC.DOM('div.mainer',this.root.window); // mainer
			this.root.content = jC.DOM('div.content' + (this.folder ? '.folder' : ''),this.root.mainer); // mainer content
			this.root.footer = jC.DOM('div.footer',this.root.window); // footer
			this.root.resizer = jC.DOM('p' + (this.size ? '.resizer' : ''),this.root.footer); // footer resizer
			
			// add the eventlisteners
			if (this.move) this.root.title.addEventListener('mousedown', MoveWindow);
			if (this.size) this.root.resizer.addEventListener('mousedown', ResizeWindow);
			
			// name the window
			this.root.title.innerText = this.name;
		}
		
		Update() {
			// update attribute
			this.root.window.setAttribute('window',this.id);
			// update window name
			this.root.title.innerText = this.name;
			// update classes
			if (this.closed) this.root.window.classList.add('closed');
			else this.root.window.classList.remove('closed');
			if (this.mini) this.root.minimizer.classList.add('minimizer');
			else this.root.minimizer.classList.remove('minimizer');
			if (this.kill) this.root.killer.classList.add('killer');
			else this.root.killer.classList.remove('killer');
			if (this.size) this.root.resizer.classList.add('resizer');
			else this.root.resizer.classList.remove('resizer');
			// update eventlisteners
			if (this.move) this.root.title.addEventListener('mousedown', MoveWindow);
			else this.root.title.removeEventListener('mousedown', MoveWindow);
			if (this.size) this.root.resizer.addEventListener('mousedown', ResizeWindow);
			else this.root.resizer.removeEventListener('mousedown', ResizeWindow);
			// update if is folder
			if (this.folder) this.root.content.classList.add('folder');
			else this.root.content.classList.remove('folder');
			// update content
			if (this.content) this.root.content.innerHTML = this.content;
		}
		
		Delete() {
			$('#desktop')[0].removeChild(this.root.window);
		}
		
		MoveTo(x,y) {
			x = String(x); y = String(y);
			this.root.window.style.left = x;
			this.root.window.style.top = y;
		}
		
		ResizeTo(x,y) {
			x = String(x); y = String(y);
			this.root.window.style.width = x;
			this.root.window.style.height = y;
		}
	}
	
	/*
	 *	description
	 */
	gcOS.File = class gFile {
		id = 'generic';
		name = 'Window';
		icon = 'default.png';
		
		root = {};
		
		Spawn() {
			// protections
			if ($('.file[window="'+this.id+'"]').length != 0) return;
			
			// create the html elements
			this.root.file = jC.DOM('div.file[window="' + this.id + '"]',$('#desktop')[0]);	// file element
			this.root.icon = jC.DOM('img[src="assets/icons/' + this.icon + '"]',this.root.file);	// logo of file
			this.root.name = jC.DOM('p',this.root.file);	// text of file
			
			// rename file element as name given
			this.root.name.innerText = this.name;
			
			// adds event listeners
			this.root.icon.addEventListener('mousedown', MoveFile);
		}
		
		Update() {
			this.root.file.setAttribute('window',this.id);
			this.root.icon.src = "assets/icons/" + this.icon;
			this.root.name.innerText = this.name;
		}
		
		Delete() {
			this.root.file.parentNode.removeChild(this.root.file);
		}
		
		MoveTo(d) {
			d.appendChild(this.root.file);
		}
	}

	/*
	 *	description
	 */
	gcOS.Element = class gElement {
		id = 'generic';
		name = 'Window';
		icon = 'default.png';
		
		move = true;
		mini = true;
		kill = true;
		size = true;
		
		folder = false;
		
		content;
		
		window = new gcOS.Window;
		file = new gcOS.File;
		
		Spawn() {
			this.window.Spawn();
			this.file.Spawn();
		}
		
		Update() {
			this.window.id = this.id;
			this.file.id = this.id;
			this.window.name = this.name;
			this.file.name = this.name;
			
			this.window.move = this.move;
			this.window.mini = this.mini;
			this.window.kill = this.kill;
			this.window.size = this.size;
			this.window.folder = this.folder;
			
			this.window.content = this.content;
			
			this.file.icon = this.icon;
			
			this.window.Update();
			this.file.Update();
		}
		
		Delete() {
			this.window.Delete();
			this.file.Delete();
		}
	}

	/*
	 *	right-click context menu
	 */
	gcOS.Menu = class gMenu {
		id = 'context';
		name = 'Menu';
		
		open = false;
		
		root = {};
		actions = {};
		
		Spawn(x,y) {
			if (Menu.open) Menu.Delete();
			
			x = Number(x) || 0; y = Number(y) || 0;
			
			this.root = jC.DOM('div.menu',$('#desktop')[0]);
			
			this.root.classList.remove('empty');
			if (Object.keys(Menu.actions).length == 0) this.root.classList.add('empty');
			
			this.root.style.left = x + 'px';
			this.root.style.top = y + 'px';
			
			for (let a in this.actions) {
				let q = jC.DOM('button.action',this.root);
				q.innerText = a;
				q.addEventListener('click',this.actions[a]);
			}
			
			this.open = true;
		}
		
		Delete() {
			$('#desktop')[0].removeChild(this.root);
			this.open = false;
			this.root.classList.remove('empty');
		}
	}
	let Menu = new gcOS.Menu;

	/*
	 *	right-click context menu
	 */
	gcOS.Game = class gGame {
		version = 'v0.0';
	}
	Game = new gcOS.Game;

	/*
	 *	description
	 */
	let theFolder;
	D.onmouseover = function(v) {
		// get the actual target
		// for event delegation
		let t = v.target;
		// while function to check elements upperwards
		while (t != this) {
			if (t.classList.contains('folder')) {
				theFolder = t;
				break;
			}
			else if (t.id == 'desktop') {
				theFolder = t;
				break;
			}
			// else get the target above
			t = t.parentNode;
		}
	}

	/*
	 *	right-click context event
	 *	delegable (?)
	 */
	D.oncontextmenu = function(v) {
		// prevents default
		v.preventDefault();
		// magical code to make it so the right-click
		// doesn't f4#& up the function
		if (v.buttons !== 0) return;
		// get the actual target
		let t = v.target;
		// reset the menu functions
		Menu.actions = {};
		// while function to check elements upperwards
		while (t != this) {
			// if it is menu or menu action: exit
			if (t.classList.contains('menu')) return;
			// context menu for files
			if (t.classList.contains('file')) {
				let e = t.getAttribute('window');
				Menu.actions.Hide = function() { let l = $('div[window="' + e + '"]'); for (s of l) { s.parentNode.removeChild(s); } Menu.Delete(); };
			}
			// context menu generic
			Menu.actions.Reset = function() { for (o of l) { o.Spawn(); } Menu.Delete(); };
			// else get the target above
			t = t.parentNode;
		}
		// summon the context menu
		Menu.Spawn(v.clientX,v.clientY);
	}

	/*
	 *	event delegation functions
	 */
	// mono-click event delegation
	D.onclick = function(v) {
		// get the actual target
		// for event delegation
		let t = v.target;
		// window killer
		if (t.classList.contains('killer')) {
			KillWindow(t);
			return;
		}
		// window minimizer
		if (t.classList.contains('minimizer')) {
			MinimizeWindow(t);
		}
		// while function to check elements upperwards
		while (t != this) {
			// check if the target has class 'window'
			// and if yes then bring it up and exit
			if (t.classList.contains('window')) {
				FrontWindow(t);
				return;
			}
			if (['INPUT','TEXTAREA'].includes(t.tagName)) {
				return;
			}
			if (t.classList.contains('menu')) return;
			// else get the target above
			t = t.parentNode;
		}
		// else kill a present Menu
		if (Menu.open) Menu.Delete();
		v.preventDefault();
	};

	/*
	 *	event delegation functions
	 */
	// double-click event delegation
	D.ondblclick = function(v) {
		// get the actual target
		// for event delegation
		let t = v.target;
		// while function to check elements upperwards
		while (t != this) {
			if (t.classList.contains('file')) {
			//	spawnWindow(t.querySelector('p').innerText,'Hemlo');
			//	return;
				let e = $('.window');
				// check if there is a window with
				// attribute data-window of same
				// name of the doubleclicked file
				e.forEach((m) => {
					if (m.getAttribute('window') == t.getAttribute('window')) {
						m.classList.remove('closed');
						m.classList.remove('minimized');
						FrontWindow(m);
						return;
					}
				})
			}
			// else get the target above
			t = t.parentNode;
		}
		v.preventDefault();
	};

/*
 *	'}' makes the closure and
 *	'(self)' iterate instantly
 *	the function
 */
}(self)
