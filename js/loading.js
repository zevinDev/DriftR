var loading = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "loading" });
},
preload: function() {
        var backimage = this.add.graphics();
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        backimage.fillStyle(0x37313b, 1);
        backimage.fillRect(0, 0, 800, 800);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: "Loading...",
            style: {
                fontFamily: 'Dogica',
                fontSize: 32,
                fill: "#000000"
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: "0%",
            style: {
                fontFamily: 'Dogica',
                fontSize: 24,
                fill: "#000000"
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: "",
            style: {
                fontFamily: 'Dogica',
                fontSize: 24,
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
        this.load.image('howto', 'assets/images/UI/howto.png');
        this.load.image('X', 'assets/images/UI/X.png')
        this.load.image('map1_pallet', 'assets/tilesets/map1_pallet.png')
        this.load.image('map2_pallet', 'assets/tilesets/map2_pallet.png')
        this.load.image('lockedIcon', 'assets/images/Garage/LockedCar.png');
        this.load.image('player1', 'assets/images/Cars/Player.png');
        this.load.image('player2', 'assets/images/Cars/LimeCar.png');
        this.load.image('player3', 'assets/images/Cars/MagentaCar.png');
        this.load.image('player4', 'assets/images/Cars/InitialDCar.png');
        this.load.image('darkbirdmobile', 'assets/images/Cars/DarkBirdMobile.png');
        this.load.image('mgcar', 'assets/images/Cars/MGKCar.png');
        this.load.image('infoPopUp', 'assets/images/Garage/InfoPopUp.png');
        this.load.image('redo', 'assets/images/UI/redo.png')
        this.load.image('pauseMenu', 'assets/images/UI/pauseScreen.png');
        this.load.image('LeaderBoardEnterBox', 'assets/images/UI/LeaderBoardScreen.png');
        this.load.image('mapbio', 'assets/images/UI/mapbio.png');
        this.load.image('mapback', 'assets/images/UI/MapSelectTop1.png');
        this.load.image('logo', 'assets/images/UI/Logo_Test.png');

        this.load.tilemapTiledJSON('tilemap2', 'assets/tilesets/map2.json');
        this.load.tilemapTiledJSON('tilemap1', 'assets/tilesets/map1.json');

        this.load.audio('corgi', 'assets/sounds/Corgi_Banger.wav');
        this.load.audio('snowmap','assets/sounds/metro beat.mp3');

        this.load.spritesheet('backButton', 'assets/images/UI/BackButton.png', { frameWidth: 164, frameHeight: 80 });
        this.load.spritesheet('selectmap1', 'assets/images/UI/MapSelectMap1Test.png', { frameWidth: 186, frameHeight: 184 });
        this.load.spritesheet('map2select', 'assets/images/UI/MapSelectMap2Test.png', { frameWidth: 186, frameHeight: 184 });
        this.load.spritesheet('map3select', 'assets/images/UI/MapSelectMap3Test.png', { frameWidth: 186, frameHeight: 184 });
        this.load.spritesheet('map1select', 'assets/images/UI/MapSelectMap1Test.png', { frameWidth: 186, frameHeight: 184 });
        this.load.spritesheet('mapstart', 'assets/images/UI/mapstart.png', { frameWidth: 213, frameHeight: 80 });
        this.load.spritesheet('VolControl', 'assets/images/UI/Right Button.png', { frameWidth: 32.2, frameHeight: 52 });
        this.load.spritesheet('Ind', 'assets/images/UI/Indicator.png', { frameWidth: 32.2, frameHeight: 52 });
        this.load.spritesheet('exit', 'assets/images/UI/exit.png', { frameWidth: 213, frameHeight: 80 });
        this.load.spritesheet('resume', 'assets/images/UI/resume.png', { frameWidth: 213, frameHeight: 80 });
        this.load.spritesheet('ABC', 'assets/images/UI/nameselect.png', { frameWidth: 56, frameHeight: 60 });
        this.load.spritesheet('endScreen', 'assets/images/UI/EndScreen.png', { frameWidth: 800, frameHeight: 800 });
        this.load.spritesheet('cancelButton', 'assets/images/Garage/CancelButton.png', { frameWidth: 264, frameHeight: 104 });
        this.load.spritesheet('buyButton', 'assets/images/Garage/BuyButton.png', { frameWidth: 264, frameHeight: 104 });
        this.load.spritesheet('backButton', 'assets/images/UI/BackButton.png', { frameWidth: 165, frameHeight: 80 });
        this.load.spritesheet('garageIcon', 'assets/images/Garage/CarButton.png', { frameWidth: 144, frameHeight: 160 });
        this.load.spritesheet('start', 'assets/images/UI/START.png', { frameWidth: 213, frameHeight: 80 });
        this.load.spritesheet('garage', 'assets/images/UI/GARAGE.png', { frameWidth: 213, frameHeight: 80 });
        this.load.spritesheet('options', 'assets/images/UI/OPTIONS.png', { frameWidth: 213, frameHeight: 80 });

        var firstTime = localStorage.getItem("first_time");
        if (!firstTime) {
            // first time loaded!
            localStorage.setItem("first_time", "1");
            localStorage.setItem("car", "assets/images/Cars/Player.png");
            localStorage.setItem("MainVolume", 50);
            localStorage.setItem("MusicVolume", 50);
            localStorage.setItem("Stars", 1);
            localStorage.setItem("P1", true);
            localStorage.setItem("P2", false);
            localStorage.setItem("P3", false);
            localStorage.setItem("P4", false);
            localStorage.setItem("MGC", false);
            localStorage.setItem("DBM", false);
            localStorage.setItem("grassMap", false);
            localStorage.setItem("snowMap", false);
            localStorage.setItem("busyBeach", false);
            var map1leader = [0, 0, 0, 0, 0]
            var map1leadername = ["none", "none", "none", "none", "none"]
            var map1leaderlist = [0, 0, 0, 0, 0]
            localStorage.setItem('map1leader', JSON.stringify(map1leader));
            localStorage.setItem('map1leadername', JSON.stringify(map1leadername));
            localStorage.setItem('map1leaderlist', JSON.stringify(map1leaderlist));
            var map2leader = [0, 0, 0, 0, 0]
            var map2leadername = ["none", "none", "none", "none", "none"]
            var map2leaderlist = [0, 0, 0, 0, 0]
            localStorage.setItem('map2leader', JSON.stringify(map2leader));
            localStorage.setItem('map2leadername', JSON.stringify(map2leadername));
            localStorage.setItem('map2leaderlist', JSON.stringify(map2leaderlist));
            var map3leader = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            var map3leadername = ["none", "none", "none", "none", "none"]
            var map3leaderlist = [0, 0, 0, 0, 0]
            localStorage.setItem('map3leader', JSON.stringify(map3leader));
            localStorage.setItem('map3leadername', JSON.stringify(map3leadername));
            localStorage.setItem('map3leaderlist', JSON.stringify(map3leaderlist));
            howto = true;
        } else {
            console.log('Not first time loaded')
            localStorage.setItem("paused", "0");
            howto = false;
        }

    },
create: function() {
    this.scene.start('menu')
    this.scene.stop();
    }
})
