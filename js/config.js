var config = {
    type: Phaser.AUTO,
    parent: "DriftR",
    width: 800,
    height: 800,
    scene: [ menu, mapselect, map2, map1, garage ],
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: true
        }
    },
    };

//Defines 'DriftR' As The Game
var Car = 'assets/images/Cars/player.png'
var DriftR = new Phaser.Game(config);
<<<<<<< HEAD
var mainPlayer = ('images/Cars/Player.png');
=======
>>>>>>> 80f3fc710968ad1a47c7138d5174c1a1662c6d56
