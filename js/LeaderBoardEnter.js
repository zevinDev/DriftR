var LeaderBoardEnter = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "LeaderBoardEnter"
        });
    },

    preload: function() {

    },

    create: function() {
        if (currentMap == "map1") {
            mapList = "map1Leadername"
        } else if (currentMap == "map2") {
            mapList = "map2Leadername"
        } else if (currentMap == "map3") {
            mapList = "map3leadername"
        }
        ABC1 = this.add.image(300, 440, "ABC");
        ABC2 = this.add.image(400, 440, "ABC");
        ABC3 = this.add.image(500, 440, "ABC");
        letterFrame = 0;
        buttonPressed = true;
        enterPressed = true;
        pauseScene = this.add.image(400, 400, 'LeaderBoardEnterBox');
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        Done5 = true;
        placeValue = this.add.text(438, 202, placeValue, {
            fontFamily: 'Dogica',
            fontSize: 32,
            color: '#ffbe00'
        });
        var layer = this.add.layer();
        layer.add([ABC1, ABC2, ABC3])
        ABC = ABC1;
        ABCList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        letter1 = "";
        letter2 = "";
        letter3 = "";
    },
    update: function() {
        var pads = this.input.gamepad.gamepads;
        for (var i = 0; i < pads.length; i++)
        {
            var pad = pads[0];
            if(pad.A){
                p1Go = true
            }else {
                p1Go = false
            }
        }
        ABC.setFrame(letterFrame);
        if (keyDOWN.isDown && (letterFrame == 25 && buttonPressed == true)) {
            letterFrame = 0;
            buttonPressed = false;
        } else if (keyUP.isDown && (letterFrame == 0 && buttonPressed == true)) {
            letterFrame = 25;
            buttonPressed = false;
        } else if (keyUP.isDown && buttonPressed == true) {
            letterFrame = letterFrame - 1;
            buttonPressed = false;
        } else if (keyDOWN.isDown && buttonPressed == true) {
            letterFrame = letterFrame + 1;
            buttonPressed = false;
        }
        if (keyUP.isUp && keyDOWN.isUp) {
            buttonPressed = true;
        }




        if ((keyENTER.isDown || p1Go) && (ABC == ABC3 && enterPressed == true)) {
            letter3 = ABCList[letterFrame];
            UserName = letter1 + letter2 + letter3;
            enterPressed = false
            letterFrame = 0;
            var map1Leadername = localStorage.getItem(mapList);
            map1Leadername = JSON.parse(map1Leadername);
            map1Leadername.splice((placeValue - 1), 0, UserName);
            localStorage.setItem(mapList, JSON.stringify(map1Leadername));
            this.scene.launch("lapsComplete");
            this.scene.stop("LeaderBoardEnter");
        } else if (keyENTER.isDown && (ABC == ABC2 && enterPressed == true)) {
            letter2 = ABCList[letterFrame];
            ABC = ABC3;
            enterPressed = false;
            letterFrame = 0;
        } else if (keyENTER.isDown && (ABC == ABC1 && enterPressed == true)) {
            letter1 = ABCList[letterFrame];
            ABC = ABC2;
            enterPressed = false;
            letterFrame = 0;
        }
        if (keyENTER.isUp || p1Go == false) {
            enterPressed = true;
        }
    }
});
