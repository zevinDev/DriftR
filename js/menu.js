class menu extends Phaser.Scene {
    constructor() { 
        super({key: 'menu'}); 
}
preload() {
    var backimage = this.add.graphics();
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    backimage.fillStyle(0xFFD966, 1);
    backimage.fillRect(0, 0, 800, 800);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: "Loading...",
    style: {
        font: "20px monospace",
        fill: "#000000"
    }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: "0%",
    style: {
        font: "18px monospace",
        fill: "#000000"
    }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: "",
    style: {
            font: "18px monospace",
            fill: "#000000"
    }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value) {
    percentText.setText(parseInt(value * 100) + "%");
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file) {
    assetText.setText("Loading asset: " + file.key);
    });
    this.load.on("complete", function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
    backimage.destroy();
    assetText.destroy();
        });

        //Loads All The Images
    this.load.image('turn1', 'assets/images/Tracks/GrassPack/Turn1.png');
    this.load.image('turn2', 'assets/images/Tracks/GrassPack/Turn2.png');
    this.load.image('turn3', 'assets/images/Tracks/GrassPack/Turn3.png');
    this.load.image('turn4', 'assets/images/Tracks/GrassPack/Turn4.png');
    this.load.image('verticle', 'assets/images/Tracks/GrassPack/Verticle.png');
    this.load.image('horizontal', 'assets/images/Tracks/GrassPack/Horizontal.png');
    this.load.image('border_u-d', 'assets/images/msc/small_u-d.png');
    this.load.image('border_l-r', 'assets/images/msc/small_l-r.png');
    this.load.image('checkpoint', 'assets/images/Tracks/VerticleCheckPoint.png')
    this.load.image('back', 'assets/images/Tracks/GrassPack/Back.png');
    this.load.image('LavaTrack', 'assets/images/Tracks/LavaPack/LavaTrack.png');
    this.load.image('LavaBack', 'assets/images/Tracks/LavaPack/LavaBackGround.png');
    this.load.image('player', mainPlayer);
    this.load.spritesheet('button', 'assets/images/UI/testbuttons.png',{frameWidth: 193, frameHeight: 71});
    this.load.spritesheet('start', 'assets/images/UI/button.png',{frameWidth: 153, frameHeight: 66});
    this.load.spritesheet('garageButton', 'assets/images/UI/GarageButton.png',{frameWidth: 153, frameHeight: 66});
    this.load.spritesheet('optionButton', 'assets/images/UI/OptionsButton.png',{frameWidth: 153, frameHeight: 66} );
    this.load.video('video1', 'assets/videos/GrassMenuVideo.mp4');
    this.load.audio('corgi', 'assets/sounds/Corgi_Banger.wav')
}
create() {
    var menuVideo = this.add.video(400,400, 'video1');
    menuVideo.play(true);
    menuVideo.setPaused(false);

        var startButton = this.add.image(200,600, 'start');
        startButton.setInteractive();
            startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                startButton.setFrame(1)
            })
            startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                startButton.setFrame(0)
            })
            startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start('mapselect')
                var socket = io();
            })

            var garageButton = this.add.image(600,600, 'garageButton');
            garageButton.setInteractive();
            garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                garageButton.setFrame(1)
            })
            garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                garageButton.setFrame(0)
            })
            garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start('garage')
            })

            var optionButton = this.add.image(600,700, 'optionButton');
            optionButton.setInteractive();
            optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                optionButton.setFrame(1)
            })
            optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                optionButton.setFrame(0)
            })
            optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start('options')
            })
        }  
}
