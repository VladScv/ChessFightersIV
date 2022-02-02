const loaderScene = {
	key: 'loader',
	active: true,
	preload: bootLoader,
	create: bootCreate
};


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX LOADER SCENE XXXXXXXXXXXXXXXX
/*		██████   ██████   ██████  ████████     ██       ██████   █████  ██████  ███████ ██████..................
		██   ██ ██    ██ ██    ██    ██        ██      ██    ██ ██   ██ ██   ██ ██      ██   ██.................
		██████  ██    ██ ██    ██    ██        ██      ██    ██ ███████ ██   ██ █████   ██████..................
		██   ██ ██    ██ ██    ██    ██        ██      ██    ██ ██   ██ ██   ██ ██      ██   ██.................
		██████   ██████   ██████     ██        ███████  ██████  ██   ██ ██████  ███████ ██   ██.................
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/

//-------------------------------------------------------------------------- LOAD FIRST ASSETS
function bootLoader() {
	//first load, loads all assets
	// console.log(Fighter.fighterStateManager.values[0]);
	this.load.image('sky', 'assets/sky.png');
	this.load.image('space', 'assets/space3.png');
	this.load.image('logo', 'phaser3-logo.png');
	this.load.image('redp', 'assets/redp.png');
//TODO for loop with white/black and fighterType values
	this.load.spritesheet('ROOK_white_idle','assets/ROOK_white_idle.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.spritesheet('ROOK_white_walk','assets/ROOK_white_walk.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.spritesheet('ROOK_white_attack1','assets/ROOK_white_attack1.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.spritesheet('ROOK_white_attack2','assets/ROOK_white_attack2.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.spritesheet('ROOK_white_defense','assets/ROOK_white_defense.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.spritesheet('ROOK_white_hit','assets/ROOK_white_hit.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.image('bg','assets/black_bg.png');
	this.load.image('logicFloor','assets/logicFloor.png');
	this.load.image('select_btn','assets/selectButton.png');
	this.load.image('blackTeam_btn','assets/selectTeam_black.png');
	this.load.image('blackTeam_btn_on','assets/selectTeam_black_on.png');
	this.load.image('whiteTeam_btn','assets/selectTeam_white.png');
	this.load.image('whiteTeam_btn_on','assets/selectTeam_white_on.png');
	this.load.spritesheet('_countdown','assets/countdown.png',{ frameWidth: 50, frameHeight: 50 });
	//-----------------------------------------------------------------------loading screen
	//LOAD SECUENTIALIMAGES
	for (let i = 0; i < 5; i++) {
		this.load.image('logo'+i, 'phaser3-logo.png');
	}

	//------------------------------------------Create loading bar boxes
	let progressBox = this.add.graphics();
	progressBox.fillStyle(0x222222, 0.8);
	progressBox.fillRect(440, 320, 320, 50);
	let progressBar = this.add.graphics();
	let width = this.cameras.main.width;
	let height = this.cameras.main.height;
	let loadingText = this.make.text({
		x: width / 2,
		y: height / 2 - 80,
		text: 'Loading...',
		style: {
			font: '20px monospace',
			fill: '#ffffff'
	}
	});
	loadingText.setOrigin(0.5, 0.5);
	let percentText = this.make.text({
		x: width / 2,
		y: height / 2 + 10,
		text: '0%',
		style: {
			font: '18px monospace',
			fill: '#ffffff'
		}
	});
	percentText.setOrigin(0.5, 0.5);
	let fileText = this.make.text({
		x: width / 2,
		y: height / 2 + 80,
		text: 'please wait... ',
		style: {
			font: '14px monospace',
			fill: '#ffffff'
		}
	});
	fileText.setOrigin(0.5, 0.5);
	
	this.load.on('progress', function (value) {
		progressBar.clear();
		progressBar.fillStyle(0xffffff, 1);
		progressBar.fillRect(450, 330, 300 * value, 30);
		percentText.setText((value * 100) + '%');
	});
				
	this.load.on('fileprogress', function (file) {
		fileText.setText('loading file:'+ file.src);
	});

	this.load.on('complete', function () {
		//SHOW SPLASH SCREEN
		progressBar.destroy();
		progressBox.destroy();
		loadingText.destroy();
		percentText.destroy();
		fileText.destroy();
		
	});
}


//-------------------------------------------------------------------------- SPLASH SCREEN
function bootCreate() {

	let loadImage = this.add.image(0, 0, 'space').setOrigin(0); //Background
	let particles = this.add.particles('redp'); //particles stuff
	let emitter = particles.createEmitter({
		speed: 100,
		scale: { start: 1, end: 0 },
		blendMode: 'ADD'
	});
	let logo = this.physics.add.image(400, 100, 'logo');
	let clickText = this.make.text({
		x: 1200 / 2,
		y: 740-740 / 5 ,
		text: 'click to start',
		style: {
			font: '26px monospace',
			fill: '#ffffff'
		}
	}).setOrigin(0.5, 0.5);
	logo.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);
	emitter.startFollow(logo);
	//ADD A 'CLICK TO START'
	this.input.once(Phaser.Input.Events.POINTER_DOWN, function () {
		loadImage.destroy();
		particles.destroy();
		logo.destroy();
		clickText.destroy();
		game.scene.start('menu');
		// this.children.removeAll();// not necessary, it cleans screen when changing SCENE
		//coz we use "start" function, otherwise, "launch" will start a new scene WITH current scene
	}, game); // <-- "this" means scope = game
}

