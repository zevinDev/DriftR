var config = {
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "DriftR",
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
    },
    input: {
        gamepad: true
    },
    scene: [loading, menu, mapSelect, map3, map2, map1, garage, howTo, lapsComplete, LeaderBoardEnter, pauseMenu, options],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

var DriftR = new Phaser.Game(config);
