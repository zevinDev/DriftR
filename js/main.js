var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: false
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

//Loads Stuff Before The Game Fully Loads So No Content Is missing While Playing Game
function preload ()
{
        //Loads All The Images
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
        back = this.add.image(0,0, 'back');
        back.x = back.displayWidth / 2;
        back.y = back.displayHeight / 2;
        xLimit = back.displayWidth;
        yLimit = back.displayHeight;

        //Defines Layers And Border Physics
        const layer = this.add.layer();
        layer.add([back, player]);
        this.physics.add.collider(player, border);
        camera.setBounds(0, 0, xLimit, yLimit);

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
    text.setText('Speed: ' + speedp);
    console.log('X: ' + player.x + 'Y: ' + player.y);


}

