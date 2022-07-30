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
         deviceHeight = localStorage.getItem('Heightlol');
         P1 = localStorage.getItem('P1');
         deviceWidth = localStorage.getItem('Widthlol');
console.log(deviceHeight);
console.log(localStorage.getItem('Widthlol'));
console.log(deviceWidth);
console.log(localStorage.getItem('MSFade'));
        var backimage = this.add.graphics();
        backimage.fillStyle(0x37313b, 1);
        backimage.fillRect(0, 0, 4000, 4000);
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        var startButton = this.add.image(this.cameraX, this.cameraY, 'start');
        var exitButton = this.add.image(200, 700, 'exit');
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

        exitButton.setInteractive();
        exitButton.on(pointerOver, () => {exitButton.setFrame(1)})
        exitButton.on(pointerOut, () => {exitButton.setFrame(0)})
        exitButton.on(pointerDown, () => {
            if (confirm("Are You Sure You Want To EXIT?")) {
                window.close();
            }
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
        layer.add([backimage, exitButton, startButton, garageButton, optionButton, logo, miata])
    }
});