var timer = 0;
var timez = 0; 
var clocks = 0; //seconds
var test3 = 0; // milliseconds
var FinalTime= 0;
var map1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "map1"
        });
    },



    //Loads Stuff Before The Game Fully Loads So No Content Is missing While Playing Game
    preload: function() {
        var car = localStorage.getItem('car');
        this.load.image('player', car);
        //this.cameras.main.fadeIn(1000, 0, 0, 0)
    },
    //Creates Anything When The Game Is Finished Preloading
    create: function() {
        corgi = this.sound.add("corgi", {
            loop: true
        });
        corgi.play();
        //Creates The Player
        player = this.physics.add.sprite(2048, 2048, 'player');

        //Sets Colliders And Bounce
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

        //Defines Player MaxSpeed And Start Angle
        player.body.setMaxSpeed(500);
        player.angle = -90;

        //Creates Camera And Sets It To Follow Player
        camera = this.cameras.main;
        camera.startFollow(player);

        const tilemap1 = this.make.tilemap({
            key: 'tilemap1'
        })

        const map1_pallet = tilemap1.addTilesetImage('map1_pallet', 'map1_pallet', 8, 8, 1, 2)


        BackLayer = tilemap1.createLayer('Back', map1_pallet)
        TrackLayer = tilemap1.createLayer('Track', map1_pallet)
        BorderLayer = tilemap1.createLayer('Border', map1_pallet)
        //Defines Layers And Border Physics
        tilemap1.setCollisionByProperty({
            collides: true
        })
        const layer = this.add.layer();
        layer.add([player])
        //camera.setBounds(0, 0, xLimit, yLimit);

        this.physics.add.collider(player, BorderLayer);

        Timertext = this.add.text();

    },
    update: function() {

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
        player.setMaxVelocity(1000, 1000);
        //Defines All The Movement Controls For The Player
        if (player.body.speed > 15 && (keyA.isDown || keyLEFT.isDown)) {
            player.setAngularVelocity(-150);
        } else if (player.body.speed > 15 && (keyD.isDown || keyRIGHT.isDown)) {
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
        //This is the code for the timer function
        while (timer <= 100) { //The while loop infinitely counts up
            timer = timer + 1;
        }
        if (timer >= 100) {
            timer = 0;
            timez = timez + 1;
        }
        if (timez >= 60) {
            timez = 0;
            clocks = clocks + 1;
        }
        test3 = (timez * 1.666666666666667).toFixed(0)
        FinalTime = clocks + "." + test3
        Timertext.setText(FinalTime);
        Timertext.x = player.x - 200;
        Timertext.y = player.y - 200;
    }
});