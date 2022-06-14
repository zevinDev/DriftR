var pauseMenu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "pauseMenu"
        });
    },
    create: function() {
        pauseScene = this.add.image(400, 400, 'pauseMenu');
        keyESC1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        var selectedMap1;
        if (selectedMap == 1) {
            selectedMap1 = 'map1'
        } else if (selectedMap == 2) {
            selectedMap1 = 'map2'
        } else if (selectedMap == 3) {
            selectedMap1 = 'map3'
        }

        if (keyESC1.isDown && gamePaused == true) {
            gamePaused = false;
            this.scene.resume("map1");
            this.scene.stop();
        }

        var exit = this.add.image(400, 350, 'exit');
        var resume = this.add.image(400, 450, 'resume');
        var restart = this.add.image(400, 550, 'redo');

        exit.setInteractive();
        exit.on(pointerOver, () => {exit.setFrame(1)})
        exit.on(pointerOut, () => {exit.setFrame(0)})
        exit.on(pointerDown, () => {
            this.scene.start('mapSelect');
            gamePaused = false;
            this.scene.stop();
            this.scene.stop(selectedMap1);
        })

        resume.setInteractive();
        resume.on(pointerOver, () => {resume.setFrame(1)})
        resume.on(pointerOut, () => {resume.setFrame(0)})
        resume.on(pointerDown, () => {
            gamePaused = false;
            this.scene.resume(selectedMap1);
            this.scene.stop();
        })

        restart.setInteractive();
        restart.on(pointerDown, () => {
            gamePaused = false;
            this.scene.start(selectedMap1);
            this.scene.stop();
        })
    },
    update: function() {
        if (keyESC1.isDown && gamePaused == true) {
            gamePaused = false;
            this.scene.resume(currentMap);
            //this.scene.sleep("pauseMenu");
            this.scene.stop();
        }
    }
});