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
var DriftR = new Phaser.Game(config);
//Variable for Currency (TEST) CAN BE CHANGED
var Dbucks = 2000;
    //Variables for unlocked vs locked cars
    var P1 = true;
    var P2 = false;
    var P3 = false;
    var P4 = false;
    var DBM = false;
    var MGC = false;