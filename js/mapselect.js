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
        this.load.spritesheet('mapstart', 'assets/images/UI/mapstart.png', {
            frameWidth: 213,
            frameHeight: 80
        });
    },
    create: function() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        leadertime = [];
        leadername = [];
        testvar = true;
        test2var = true;
        test3var = true;
        mapselectback = this.add.image(400, 400, 'mapselectback')
        map3select = this.add.image(600, 208, 'selectmap1')
        map1select = this.add.image(200, 208, 'selectmap1')
        map2select = this.add.image(400, 208, 'map2select')
        map1leadername = localStorage.getItem('map1leadername');
        map1leadername = JSON.parse(map1leadername);
        map1leader = localStorage.getItem('map1leader');
        map1leader = JSON.parse(map1leader);
        map2leadername = localStorage.getItem('map2leadername');
        map2leadername = JSON.parse(map2leadername);
        map2leader = localStorage.getItem('map2leader');
        map2leader = JSON.parse(map2leader);
        map3leadername = localStorage.getItem('map3leadername');
        map3leadername = JSON.parse(map3leadername);
        map3leader = localStorage.getItem('map3leader');
        map3leader = JSON.parse(map3leader);
        localStorage.setItem('mapselect', 0);

        firstPlace = this.add.text(198, 512, map1leadername[0] + "-" + map1leader[0],{ fontFamily: 'Dogica', fontSize: 16, color: '#ffbe00' });
        firstPlace.visible = false;

        secondPlace = this.add.text(198, 538, map1leadername[1] + "-" + map1leader[1],{ fontFamily: 'Dogica', fontSize: 16, color: '#C0C0C0' });
        secondPlace.visible = false;

        thirdPlace = this.add.text(198, 564, map1leadername[2] + "-" + map1leader[2],{ fontFamily: 'Dogica', fontSize: 16, color: '#CD7F32' });
        thirdPlace.visible = false;

        fourthPlace = this.add.text(198, 590, map1leadername[3] + "-" + map1leader[3],{ fontFamily: 'Dogica', fontSize: 16, color: '#000000' });
        fourthPlace.visible = false;

        fifthPlace = this.add.text(198, 614, map1leadername[4] + "-" + map1leader[4],{ fontFamily: 'Dogica', fontSize: 16, color: '#000000' });
        fifthPlace.visible = false;



        textvisible = false;

        mapbio = this.add.image(400, 570, 'mapbio')
        mapback = this.add.image(400, 216, 'mapback')
        const layer = this.add.layer();
        layer.add([mapselectback, mapback, map3select, map2select, map1select, mapbio, firstPlace, secondPlace, thirdPlace, fourthPlace, fifthPlace])
        mapbio.visible = false;
        //interactive for map1
        map1select.setInteractive();
        map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            map1select.setFrame(1)
        })
        map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            map1select.setFrame(0)
        })
        map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            textvisible = true;
            localStorage.setItem('mapselect', 1);
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
            textvisible = true;
            localStorage.setItem('mapselect', 2);
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
            textvisible = true;
            localStorage.setItem('mapselect', 3);
            test3var = true;
        });
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
                this.scene.stop();
            })
        })
        mapstart = this.add.image(579, 483, 'mapstart');
        mapstart.setInteractive();
        mapstart.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            mapstart.setFrame(1)
        })
        mapstart.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            mapstart.setFrame(0)
        })
        mapstart.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if (localStorage.getItem('mapselect') == 1) {
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start('map1')
                    this.scene.stop();
                })
            } else if (localStorage.getItem('mapselect') == 2) {
                this.scene.start('map2')
                this.scene.stop();
            } else if (localStorage.getItem('mapselect') == 3) {
                this.scene.start('map3')
                this.scene.stop();
            }
        })
        mapstart.visible = false;
    },
    update: function() {
        if (localStorage.getItem('mapselect') == 1){
            leadername = map1leadername;
            leadertime = map1leader;
            map1select.setFrame(2)
        } else if(localStorage.getItem('mapselect') == 2){
            leadername = map2leadername;
            leadertime = map2leader;
            map2select.setFrame(2)
        } else if(localStorage.getItem('mapselect') == 3){
            leadername = map3leadername;
            leadertime = map3leader;
            map3select.setFrame(2)
        }
        if(localStorage.getItem('mapselect') != 1 && testvar == true){
            testvar = false
            map1select.setFrame(0)

        }else if(localStorage.getItem('mapselect') != 2 && test2var == true){
            test2var = false
            map2select.setFrame(0)

        } if(localStorage.getItem('mapselect') != 3 && test3var == true){
            test3var = false
            map3select.setFrame(0)

        }

        firstPlace.setText(leadername[0] + "-" + leadertime[0]);

        secondPlace.setText(leadername[1] + "-" + leadertime[1]);

        thirdPlace.setText(leadername[2] + "-" + leadertime[2]);

        fourthPlace.setText(leadername[3] + "-" + leadertime[3]);

        fifthPlace.setText(leadername[4] + "-" + leadertime[4]);


        if(textvisible == true){
            firstPlace.visible = true;
            secondPlace.visible = true;
            thirdPlace.visible = true;
            fourthPlace.visible = true;
            fifthPlace.visible = true;
            mapstart.visible = true;
            mapbio.visible = true
        }


    }
})