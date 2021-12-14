var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "DriftR",
        width: 800,
        height: 800
    },
    scene: [ menu, mapselect, map3, map2, map1, garage, options ],
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: true
        }
    },
    };

//Defines 'DriftR' As The Game
var Car = 'assets/images/Cars/Player.png'
var DriftR = new Phaser.Game(config);
