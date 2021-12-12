var config = {
    type: Phaser.AUTO,
    parent: "DriftR",
    width: 800,
    height: 800,
    scene: [ menu, mapselect, map2, map1, garage, options ],
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
