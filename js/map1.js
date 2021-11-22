var map1 = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "map1" });
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
        this.load.image('turn1', 'assets/images/Turn1.png');
        this.load.image('turn2', 'assets/images/Turn2.png');
        this.load.image('turn3', 'assets/images/Turn3.png');
        this.load.image('turn4', 'assets/images/Turn4.png');
        this.load.image('verticle', 'assets/images/Verticle.png');
        this.load.image('horizontal', 'assets/images/Horizontal.png');
        this.load.image('border_u-d', 'assets/images/small_u-d.png');
        this.load.image('border_l-r', 'assets/images/small_l-r.png');
        this.load.image('back', 'assets/images/Back.png');
        this.load.image('player','assets/images/Player.png');
        this.load.audio('cow', 'assets/sounds/Cow_Banger.wav');
        this.load.audio('corgi', 'assets/sounds/Corgi_Banger.wav');
        this.load.spritesheet('button', 'assets/images/testbuttons.png',{frameWidth: 193, frameHeight: 71});
},
//Creates Anything When The Game Is Finished Preloading
create: function()
{
        cow = this.sound.add("cow", { loop: true });
        //cow.play();
        corgi = this.sound.add("corgi", { loop: true });
        corgi.play();
        //Creates The Player
        player = this.physics.add.sprite(2048,2048, 'player');

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
        back = this.physics.add.image(0,0, 'back');
        back.x = back.displayWidth / 2;
        back.y = back.displayHeight / 2;
        xLimit = back.displayWidth;
        yLimit = back.displayHeight;

        //Creates Track
        track = this.add.group();
        track1 = track.create(496,3696, 'turn4');
        track2 = track.create(496,2896, 'verticle');
        track3 = track.create(496,2096, 'turn1');
        track4 = track.create(1296,2096, 'horizontal');
        track5 = track.create(2096,2096, 'turn3');
        track6 = track.create(2096,1296, 'turn2');
        track7 = track.create(1296,1296,'turn4');
        track8 = track.create(1296,496,'turn1');
        track9 = track.create(2096,496, 'horizontal');
        track10 = track.create(2896,496, 'turn2');
        track11 = track.create(2896,1296, 'verticle');
        track12 = track.create(2896,2096, 'turn4');
        track13 = track.create(3696,2096, 'turn2');
        track14 = track.create(3696,2896, 'verticle');
        track15 = track.create(3696,3696, 'turn3');
        track16 = track.create(2896,3696, 'turn4');
        track17 = track.create(2896,2969, 'turn2');
        track18 = track.create(2096,2969, 'horizontal');
        track19 = track.create(1296,2969,'turn1');
        track20 = track.create(1296,3696, 'turn3');

        
        //Defines Layers And Border Physics
        const layer = this.add.layer();
        layer.add([back, track1, track2, track3, track4, track5, track6, track7, track8, track9, track10, track11, track12, track13, track14, track15, track16, track17, track18, track19, track20, player]);
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
            player.setAngularVelocity(-120);
        } else if (player.body.speed>15 && (keyD.isDown || keyRIGHT.isDown)) {
            player.setAngularVelocity(120);
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
        if ((player.body.speed>15 && keyW.isUp) && (keyA.isDown || keyLEFT.isDown)) {
           // this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
            player.setAngularVelocity(-100);
        }
        if ((player.body.speed>15 && keyW.isUp) && (keyD.isDown || keyRIGHT.isDown)) {
            //this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
            player.setAngularVelocity(100);
        }}
});

