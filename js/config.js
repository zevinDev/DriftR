var config = {
    type: Phaser.AUTO,
    parent: "DriftR",
    width: 800,
    height: 800,
    scene: [ menu, options, mapselect, map3, map2, map1, garage ],
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

