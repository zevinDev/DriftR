var car
class menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'menu'
        });
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

        this.load.on("progress", function(value) {
            percentText.setText(parseInt(value * 100) + "%");
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on("fileprogress", function(file) {
            assetText.setText("Loading asset: " + file.key);
        });
        this.load.on("complete", function() {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            backimage.destroy();
            assetText.destroy();
        });

        //Loads All The Images
        var firstTime = localStorage.getItem("first_time");
        if (!firstTime) {
            // first time loaded!
            localStorage.setItem("first_time", "1");
            localStorage.setItem("car", "assets/images/Cars/Player.png");
            localStorage.setItem("MainVolume", 50);
            localStorage.setItem("MusicVolume", 50);
            localStorage.setItem("Dbucks", 2000);
            localStorage.setItem("P1", true);
            localStorage.setItem("P2", false);
            localStorage.setItem("P3", false);
            localStorage.setItem("P4", false);
            localStorage.setItem("MGC", false);
            localStorage.setItem("DBM", false);
            var map1leader = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            var map1leadername = ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none"]
            var map1leaderlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            localStorage.setItem('map1leader', JSON.stringify(map1leader));
            localStorage.setItem('map1leadername', JSON.stringify(map1leadername));
            localStorage.setItem('map1leaderlist', JSON.stringify(map1leaderlist));
            var map2leader = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            var map2leadername = ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none"]
            var map2leaderlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            localStorage.setItem('map2leader', JSON.stringify(map2leader));
            localStorage.setItem('map2leadername', JSON.stringify(map2leadername));
            localStorage.setItem('map2leaderlist', JSON.stringify(map2leaderlist));
            var map3leader = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            var map3leadername = ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none"]
            var map3leaderlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            localStorage.setItem('map3leader', JSON.stringify(map3leader));
            localStorage.setItem('map3leadername', JSON.stringify(map3leadername));
            localStorage.setItem('map3leaderlist', JSON.stringify(map3leaderlist));
            console.log('First');
        } else {
            console.log('Not first time loaded')
        }
        car = localStorage.getItem('car');
        localStorage.setItem("paused", "0");


        this.load.image('checkpoint', 'assets/images/Tracks/VerticleCheckPoint.png')
        this.load.image('LavaTrack', 'assets/images/Tracks/LavaPack/LavaTrack.png');
        this.load.image('LavaBack', 'assets/images/Tracks/LavaPack/LavaBackGround.png');
        this.load.image('SnowBack', 'assets/images/Tracks/SnowPack/CompletedSnowBack.png');
        this.load.image('SnowTrack', 'assets/images/Tracks/SnowPack/SnowTrackHalfScale.png');
        this.load.image('mapselectback', 'assets/images/UI/mapselectback.png');


        this.load.spritesheet('start', 'assets/images/UI/START.png', {
            frameWidth: 213,
            frameHeight: 80
        });
        this.load.spritesheet('garage', 'assets/images/UI/GARAGE.png', {
            frameWidth: 213,
            frameHeight: 80
        });
        this.load.spritesheet('options', 'assets/images/UI/OPTIONS.png', {
            frameWidth: 213,
            frameHeight: 80
        });
        this.load.audio('corgi', 'assets/sounds/Corgi_Banger.wav')
        this.load.image('map1_pallet', 'assets/tilesets/map1_pallet.png')
        this.load.tilemapTiledJSON('tilemap1', 'assets/tilesets/map1.json')
        this.load.image('map2_pallet', 'assets/tilesets/map2_pallet.png')
        this.load.tilemapTiledJSON('tilemap2', 'assets/tilesets/map2.json')

    }
    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        var back = this.add.image(400, 400, 'mapselectback')

        var startButton = this.add.image(200, 600, 'start');
        startButton.setInteractive();
        startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            startButton.setFrame(1)
        })
        startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            startButton.setFrame(0)
        })
        startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('mapselect')
            })
        })

        var garageButton = this.add.image(600, 600, 'garage');
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

        var optionButton = this.add.image(600, 700, 'options');
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

        const layer = this.add.layer();
        layer.add([back, startButton, garageButton, optionButton])


    }
}