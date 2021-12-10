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
var DriftR = new Phaser.Game(config);