var map2 = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "map2" });
},
//Loads Stuff Before The Game Fully Loads So No Content Is missing While Playing Game
preload: function()
{
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: "Loading...",
        style: {
            font: "20px monospace",
            fill: "#ffffff"
        }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: "0%",
        style: {
            font: "18px monospace",
            fill: "#ffffff"
        }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: "",
        style: {
            font: "18px monospace",
            fill: "#ffffff"
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
        assetText.destroy();
        });

    
        //Loads All The Images
        this.load.image('turn1', 'assets/images/Tracks/GrassPack/Turn1.png');
        this.load.image('turn2', 'assets/images/Tracks/GrassPack/Turn2.png');
        this.load.image('turn3', 'assets/images/Tracks/GrassPack/Turn3.png');
        this.load.image('turn4', 'assets/images/Tracks/GrassPack/Turn4.png');
        this.load.image('verticle', 'assets/images/Tracks/GrassPack/Verticle.png');
        this.load.image('horizontal', 'assets/images/Tracks/GrassPack/Horizontal.png');
        this.load.image('LavaTrack', 'assets/images/Tracks/LavaPack/LavaTrack.png');
        this.load.image('border_u-d', 'assets/images/msc/small_u-d.png');
        this.load.image('border_l-r', 'assets/images/msc/small_l-r.png');
        this.load.image('back', 'assets/images/Tracks/GrassPack/Back.png');
        this.load.image('LavaBack', 'assets/images/Tracks/LavaPack/LavaBackGround.png');
        this.load.image('player','assets/images/Cars/Player.png');
        this.load.image('checkpoint', 'assets/images/Tracks/VerticleCheckPoint.png')
        this.load.audio('cow', 'assets/sounds/Cow_Banger.wav');
        this.load.audio('corgi', 'assets/sounds/Corgi_Banger.wav');
        this.load.spritesheet('button', 'assets/images/UI/testbuttons.png',{frameWidth: 193, frameHeight: 71});
},
//Creates Anything When The Game Is Finished Preloading
create: function()
{
       // cow = this.sound.add("cow", { loop: true });
        //cow.play();
       // corgi = this.sound.add("corgi", { loop: true });
      //  corgi.play();
     strack = this.sound.add("corgi", { loop: true });
        strack.play();
        //Creates The Player
        player = this.physics.add.sprite(400,3396, 'player');

        //Sets Colliders And Bounce
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

        //Defines Player MaxSpeed And Start Angle
        player.body.setMaxSpeed(500);
        player.angle = -90;

        //Creates Camera And Sets It To Follow Player
        camera = this.cameras.main;
        camera.startFollow(player);

        //Defines The Border
        border = this.physics.add.staticGroup();
        border.create(0,2048, 'border_u-d');
        border.create(4096, 2048, 'border_u-d');
        border.create(2048, 0, 'border_l-r');
        border.create(2048, 4096, 'border_l-r');

        //Defines All Of The Backgrounds Variables
        LavaBack = this.physics.add.image(0,0, 'LavaBack');
        LavaBack.x = LavaBack.displayWidth / 2;
        LavaBack.y = LavaBack.displayHeight / 2;
        xLimit = LavaBack.displayWidth;
        yLimit = LavaBack.displayHeight;
        
        //Adds in the main track
        Track = this.physics.add.image(2048,2048, 'LavaTrack')
        //CheckPoint
        CheckPoint = this.physics.add.image(400,3396,'checkpoint')

        // //Defines Layers And Border Physics
         const layer = this.add.layer();
         layer.add([LavaBack, Track, CheckPoint, player]);
         this.physics.add.collider(player, border);
         camera.setBounds(0, 0, xLimit, yLimit);


        
},
update: function()
{
    //Defines Keyboard Keys
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    //Defines Friction, Mass, and Velocity For The Player
    //player.setFriction(30,30);
    //player.setMass(100);
    player.setMaxVelocity(1000,1000);


        //Defines All The Movement Controls For The Player
        if (player.body.speed>15 && (keyA.isDown || keyLEFT.isDown)) {
            player.setAngularVelocity(-150);
        } else if (player.body.speed>15 && (keyD.isDown || keyRIGHT.isDown)) {
            player.setAngularVelocity(150);
        } else {
            player.setAngularVelocity(0);
        }
        if (keyW.isDown || keyUP.isDown) {
            this.physics.velocityFromRotation(player.rotation, 700, player.body.acceleration);
        } else {
            player.setAcceleration(0);
            player.body.drag.x = 160;
            player.body.drag.y = 160;
            this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
        }
        }
});

