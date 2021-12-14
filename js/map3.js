var map3 = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "map3" });
},
//Loads Stuff Before The Game Fully Loads So No Content Is missing While Playing Game
preload: function()
{
},
//Creates Anything When The Game Is Finished Preloading
create: function()
{
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
        SnowBack = this.physics.add.image(0,0, 'SnowBack');
        SnowBack.x = SnowBack.displayWidth / 2;
        SnowBack.y = SnowBack.displayHeight / 2;
        xLimit = SnowBack.displayWidth;
        yLimit = SnowBack.displayHeight;
        
        //Adds in the main track
        SnowTrack = this.physics.add.image(2048,2048, 'SnowTrack');
        // Track.x = Track.displayWidth / 2;
        // Track.y = Track.displayHeight / 2;
        // Track.scaleX(2);
        // Track.scaleY(2);


        // //Defines Layers And Border Physics
         const layer = this.add.layer();
         layer.add([SnowBack, SnowTrack, player]);
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

