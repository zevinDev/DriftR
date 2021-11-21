var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: true
        }
    },
    scene: {

        preload: preload,
        create: create,
        update: update
        
    }
};

//Defines 'DriftR' As The Game
var DriftR = new Phaser.Game(config);

var OnBack = false

//Loads Stuff Before The Game Fully Loads So No Content Is missing While Playing Game
function preload ()
{
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

        //Speed Text (TEST) <---[If Anything Has A (TEST) Tag It Will Be Removed In Final Product]
        var text;
}

//Creates Anything When The Game Is Finished Preloading
function create ()
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

        this.physics.add.overlap(player, back, function () {
            OnBack = true;
          });

        //Speed Text (TEST)
        text = this.add.text(100, 100, '', { font: '16px Courier', fill: '#00ff00' });
}

//Functions That Happen Every InGame Tick
function update ()
{
    //Speed Text (TEST)
    speedp = Math.round(player.body.speed);
    text.x = player.body.position.x-300;
    text.y = player.body.position.y-300;

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
            this.physics.velocityFromRotation(player.rotation, 150, player.body.acceleration);
        } else {
            player.setAcceleration(0);
            player.body.drag.x = 160;
            player.body.drag.y = 160;
            this.physics.velocityFromRotation(player.rotation, 0, player.body.velocity);
        }
        if ((player.body.speed>15 && keyW.isUp) && (keyA.isDown || keyLEFT.isDown)) {
           
            player.setAngularVelocity(-100);
        }
        if ((player.body.speed>15 && keyW.isUp) && (keyD.isDown || keyRIGHT.isDown)) {
            
            player.setAngularVelocity(100);
        }

    //Speed Text And Coord Text (TEST)
    //text.setText('Speed: ' + speedp);
    //console.log('X: ' + player.x + 'Y: ' + player.y);


}

