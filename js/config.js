var config = {
    plugins: PhaserPluginInspector.DefaultPluginsConfig,
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "DriftR",
        width: 800,
        height: 800
    },
    scene: [menu, mapselect, map3, map2, map1, garage, options],
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

//Unlocked/Locked variables for garage (needs to be made a global variable)
var P1 = true;
var P2 = false;
var P3 = false;
var P4 = false;
var MGC = false;
var DBM = false;

//Currency (also needs to be made a global variable)
var Dbucks = 1000;