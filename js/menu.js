var car
var menu = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "menu" });
},
preload: function() {
    },
    create: function() {

        var backimage = this.add.graphics();
        backimage.fillStyle(0x37313b, 1);
        backimage.fillRect(0, 0, 800, 800);
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        var startButton = this.add.image(200, 600, 'start');
        var exitButton = this.add.image(200, 700, 'exit');
        var garageButton = this.add.image(600, 600, 'garage');
        var optionButton = this.add.image(600, 700, 'options');
        var logo = this.add.image(400, 200, 'logo');
        var exithelp = this.add.image(640,150,'X');
        

        
        exithelp.visible = false;
        if(howto == true) {
            startButton.visible = false;
            garageButton.visible = false;
            optionButton.visible = false;
            howimage = this.add.image(400,400,'howto')
            exithelp.visible = true;
            exithelp.setInteractive();
            exithelp.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            startButton.visible = true;
            garageButton.visible = true;
            optionButton.visible = true;
            exithelp.visible = false;
            howimage.visible = false;
            howto = false;
        })
        }else{
            howimage = this.add.image(400,400,'howto')
            howimage.visible = false;
        }


        startButton.setInteractive();
        startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            startButton.setFrame(1)
        })
        startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            startButton.setFrame(0)
        })
        startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('mapSelect')
                this.scene.stop();
            })
        })
        exitButton.setInteractive();
        exitButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            exitButton.setFrame(1)
        })
        exitButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            exitButton.setFrame(0)
        })
        exitButton.setInteractive();
        exitButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if (confirm("Are You Sure You Want To EXIT?")) {
                window.close();
              }
        })
        garageButton.setInteractive();
        garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            garageButton.setFrame(1)
        })
        garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            garageButton.setFrame(0)
        })
        garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('garage')
            this.scene.stop();
        })
        })
        optionButton.setInteractive();
        optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            optionButton.setFrame(1)
        })
        optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            optionButton.setFrame(0)
        })
        optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('options')
            this.scene.stop();
        })
        })
        
        const layer = this.add.layer();
        layer.add([backimage, exitButton, startButton, garageButton, optionButton, logo, howimage, exithelp])


    }
}
)
