var car
var menu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "menu"
        });
    },
    preload: function() {
        gamePaused = false;
    },
    create: function() {
        var backimage = this.add.graphics();
        const music = this.sound.add('corgi');
        music.play();
        backimage.fillStyle(0x37313b, 1);
        backimage.fillRect(0, 0, 800, 800);
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        var startButton = this.add.image(200, 600, 'start');
        var creditsButton = this.add.image(200, 700, 'credits');
        var garageButton = this.add.image(600, 600, 'garage');
        var optionButton = this.add.image(600, 700, 'options');
        var logo = this.add.image(400, 200, 'logo');
        var miata = this.add.image(400, 375, 'miata');
        let fadeOut = (sceneChoice) => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start(sceneChoice);
                this.scene.stop();
            })
        }

        startButton.setInteractive();
        startButton.on(pointerOver, () => {startButton.setFrame(1)});
        startButton.on(pointerOut, () => {startButton.setFrame(0)});
        startButton.on(pointerDown, () => {fadeOut('mapSelect')})

        creditsButton.setInteractive();
        creditsButton.on(pointerOver, () => {creditsButton.setFrame(1)})
        creditsButton.on(pointerOut, () => {creditsButton.setFrame(0)})
        creditsButton.on(pointerDown, () => {
        fadeOut('creditsScene')
        })

        garageButton.setInteractive();
        garageButton.on(pointerOver, () => {garageButton.setFrame(1)})
        garageButton.on(pointerOut, () => {garageButton.setFrame(0)})
        garageButton.on(pointerDown, () => {fadeOut('garage')})

        optionButton.setInteractive();
        optionButton.on(pointerOver, () => {optionButton.setFrame(1)})
        optionButton.on(pointerOut, () => {optionButton.setFrame(0)})
        optionButton.on(pointerDown, () => {fadeOut('options')})

        const layer = this.add.layer();
        layer.add([backimage, creditsButton, startButton, garageButton, optionButton, logo, miata])
    }
});