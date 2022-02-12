

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX MENU SCENE XXXXXXXXXXXXXXXXXX
	/*		███    ███ ███████ ███    ██ ██    ██     ███████  ██████ ███████ ███    ██ ███████......................
            ████  ████ ██      ████   ██ ██    ██     ██      ██      ██      ████   ██ ██...........................
            ██ ████ ██ █████   ██ ██  ██ ██    ██     ███████ ██      █████   ██ ██  ██ █████........................
            ██  ██  ██ ██      ██  ██ ██ ██    ██          ██ ██      ██      ██  ██ ██ ██...........................
            ██      ██ ███████ ██   ████  ██████      ███████  ██████ ███████ ██   ████ ███████......................
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/

class MenuScene extends Phaser.Scene {
	constructor() {
		super('menu');
		this.key = 'menu';
		this.active = false;
		this.visible = false;
	}

	init(data){
		this.gameManager=data;
	}
	preload() {
	}
	create() {
		//--------------------------------------------------------------construct menu
//MENU WILL BE THE TEAM SELECTION SCREEN

		this.blackTeam_btn = this.add.image(0, 0, 'blackTeam_btn').setOrigin(0);
		this.whiteTeam_btn = this.add.image(this.cameras.main.width / 2, 0, 'whiteTeam_btn').setOrigin(0);

		this.blackTeam_btn.setInteractive();
		this.blackTeam_btn.on('pointerdown', function () {
			this.gameManager.selectTeam(BLACK);

		}, this);
		this.blackTeam_btn.on('pointerover', () => {
			this.blackTeam_btn.setTexture('blackTeam_btn_on');
		});
		this.blackTeam_btn.on('pointerout', () => {
			this.blackTeam_btn.setTexture('blackTeam_btn');
		});

		this.whiteTeam_btn.setInteractive();
		this.whiteTeam_btn.on('pointerdown', function () {
			this.gameManager.selectTeam(WHITE);
		}, this);
		this.whiteTeam_btn.on('pointerover', () => {
			this.whiteTeam_btn.setTexture('whiteTeam_btn_on');
		});
		this.whiteTeam_btn.on('pointerout', () => {
			this.whiteTeam_btn.setTexture('whiteTeam_btn');
		});
	}
	update() {

	}
}


