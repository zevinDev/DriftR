var car
var menu = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "menu" });
},
preload: function() {
    },
    create: function() {

        
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        var back = this.add.image(400, 400, 'mapselectback')
        var startButton = this.add.image(200, 600, 'start');
        var garageButton = this.add.image(600, 600, 'garage');
        var optionButton = this.add.image(600, 700, 'options');
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
                this.scene.start('mapselect')
                this.scene.stop();
            })
        })
        garageButton.setInteractive();
        garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            garageButton.setFrame(1)
        })
        garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            garageButton.setFrame(0)
        })
        garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('garage')
            this.scene.stop();
        })
        optionButton.setInteractive();
        optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            optionButton.setFrame(1)
        })
        optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            optionButton.setFrame(0)
        })
        optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('options')
            this.scene.stop();
        })
        
        const layer = this.add.layer();
        layer.add([back, startButton, garageButton, optionButton, howimage, exithelp])


    }
}
)
