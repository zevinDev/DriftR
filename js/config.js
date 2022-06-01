var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "DriftR",
        width: 800,
        height: 800
    },
    input: {
        gamepad: true
    },
    scene: [loading, menu, mapSelect, map3, map2, map1, garage, howTo, lapsComplete, LeaderBoardEnter, pauseMenu, options],
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: false
        }
    },
};

//Defines 'DriftR' As The Game
var DriftR = new Phaser.Game(config);
