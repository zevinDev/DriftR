var mapselect = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "mapselect"
        });
    },
    preload: function() {
        this.load.image('mapselectback', 'assets/images/UI/mapselectback.png');
        this.load.image('mapbio', 'assets/images/UI/mapbio.png');
        this.load.image('mapback', 'assets/images/UI/MapSelectTop1.png');
        this.load.spritesheet('backButton', 'assets/images/UI/BackButton.png', {
            frameWidth: 164,
            frameHeight: 80
        });
        this.load.spritesheet('selectmap1', 'assets/images/UI/MapSelectMap1Test.png', {
            frameWidth: 186,
            frameHeight: 184
        });
        this.load.spritesheet('map2select', 'assets/images/UI/MapSelectMap1Test.png', {
            frameWidth: 186,
            frameHeight: 184
        });
        this.load.spritesheet('map1select', 'assets/images/UI/MapSelectMap1Test.png', {
            frameWidth: 186,
            frameHeight: 184
        });
    },
    create: function() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        mapselect;
        testvar = true;
        test2var = true;
        test3var = true;
        mapselectback = this.add.image(400, 400, 'mapselectback')
        map3select = this.add.image(600, 208, 'selectmap1')
        map1select = this.add.image(200, 208, 'selectmap1')
        map2select = this.add.image(400, 208, 'map2select')

        mapbio = this.add.image(400, 570, 'mapbio')
        mapback = this.add.image(400, 216, 'mapback')
        const layer = this.add.layer();
        layer.add([mapselectback, mapback, map3select, map2select, map1select, mapbio])
        mapbio.visible = false
        //interactive for map1
        map1select.setInteractive();
        map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            map1select.setFrame(1)
        })
        map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            map1select.setFrame(0)
        })
        map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            mapbio.visible = true
            mapselect = 1;
            testvar = true;
        })
        //interactive for map 2
        map2select.setInteractive();
        map2select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            map2select.setFrame(1)
        })
        map2select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            map2select.setFrame(0)
        })
        map2select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            mapbio.visible = true
            mapselect = 2;
            test2var = true;
        });
        //interactive for map 3
        map3select.setInteractive();
        map3select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            map3select.setFrame(1)
        })
        map3select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            map3select.setFrame(0)
        })
        map3select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            mapbio.visible = true
            mapselect = 3;
            test3var = true;
        });
        //interactive for starting the map
        mapbio.setInteractive();
        mapbio.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if (mapselect == 1) {
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start('map1')
                })
            } else if (mapselect == 2) {
                this.scene.start('map2')
            } else if (mapselect == 3) {
                this.scene.start('map3')
            }
        })
        //backgrond UI
        backButton = this.add.image(100, 50, 'backButton');
        backButton.setInteractive();
        backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            backButton.setFrame(1)
        })
        backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            backButton.setFrame(0)
        })
        backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('menu')
            })
        })
    },
    update: function() {
        if (mapselect == 1){
            map1select.setFrame(2)
        } else if(mapselect == 2){
            map2select.setFrame(2)
        } else if(mapselect == 3){
            map3select.setFrame(2)
        }
        if(mapselect != 1 && testvar == true){
            testvar = false
            map1select.setFrame(0)

        }else if(mapselect != 2 && test2var == true){
            test2var = false
            map2select.setFrame(0)

        } if(mapselect != 3 && test3var == true){
            test3var = false
            map3select.setFrame(0)

        }
    }
})