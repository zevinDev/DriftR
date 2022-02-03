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

        firstPlace = this.add.text(179, 524, map1leadername[0] + "-" + map1leader[0],{ fontFamily: 'Dogica', fontSize: 9, color: '#ffbe00' });
        firstPlace.visible = false;

        secondPlace = this.add.text(179, 545, map1leadername[1] + "-" + map1leader[1],{ fontFamily: 'Dogica', fontSize: 9, color: '#C0C0C0' });
        secondPlace.visible = false;

        thirdPlace = this.add.text(179, 566, map1leadername[2] + "-" + map1leader[2],{ fontFamily: 'Dogica', fontSize: 9, color: '#CD7F32' });
        thirdPlace.visible = false;

        fourthPlace = this.add.text(179, 587, map1leadername[3] + "-" + map1leader[3],{ fontFamily: 'Dogica', fontSize: 9, color: '#000000' });
        fourthPlace.visible = false;

        fifthPlace = this.add.text(179, 608, map1leadername[4] + "-" + map1leader[4],{ fontFamily: 'Dogica', fontSize: 9, color: '#000000' });
        fifthPlace.visible = false;

        sixthPlace = this.add.text(331, 524, map1leadername[5] + "-" + map1leader[5],{ fontFamily: 'Dogica', fontSize: 9, color: '#000000' });
        sixthPlace.visible = false;

        seventhPlace = this.add.text(331, 545, map1leadername[6] + "-" + map1leader[6],{ fontFamily: 'Dogica', fontSize: 9, color: '#000000' });
        seventhPlace.visible = false;

        eighthPlace = this.add.text(331, 566, map1leadername[7] + "-" + map1leader[7],{ fontFamily: 'Dogica', fontSize: 9, color: '#000000' });
        eighthPlace.visible = false;

        ninethPlace = this.add.text(331, 587, map1leadername[8] + "-" + map1leader[8],{ fontFamily: 'Dogica', fontSize: 9, color: '#000000' });
        ninethPlace.visible = false;

        tenthPlace = this.add.text(345, 608, map1leadername[9] + "-" + map1leader[9],{ fontFamily: 'Dogica', fontSize: 8, color: '#000000' });
        tenthPlace.visible = false;

        textvisible = false;

        mapbio = this.add.image(400, 570, 'mapbio')
        mapback = this.add.image(400, 216, 'mapback')
        const layer = this.add.layer();
        layer.add([mapselectback, mapback, map3select, map2select, map1select, mapbio, firstPlace, secondPlace, thirdPlace, fourthPlace, fifthPlace, sixthPlace, seventhPlace, eighthPlace, ninethPlace, tenthPlace])
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
            textvisible = true;
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
            textvisible = true;
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
            leadername = map1leadername;
            leadertime = map1leader;
            map1select.setFrame(2)
        } else if(mapselect == 2){
            leadername = map2leadername;
            leadertime = map2leader;
            map2select.setFrame(2)
        } else if(mapselect == 3){
            leadername = map3leadername;
            leadertime = map3leader;
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

        firstPlace.setText(leadername[0] + "-" + leadertime[0]);

        secondPlace.setText(leadername[1] + "-" + leadertime[1]);

        thirdPlace.setText(leadername[2] + "-" + leadertime[2]);

        fourthPlace.setText(leadername[3] + "-" + leadertime[3]);

        fifthPlace.setText(leadername[4] + "-" + leadertime[4]);

        sixthPlace.setText(leadername[5] + "-" + leadertime[5]);

        seventhPlace.setText(leadername[6] + "-" + leadertime[6]);

        eighthPlace.setText(leadername[7] + "-" + leadertime[7]);

        ninethPlace.setText(leadername[8] + "-" + leadertime[8]);

        tenthPlace.setText(leadername[9] + "-" + leadertime[9]);

        if(textvisible == true){
            firstPlace.visible = true;
            secondPlace.visible = true;
            thirdPlace.visible = true;
            fourthPlace.visible = true;
            fifthPlace.visible = true;
            sixthPlace.visible = true;
            seventhPlace.visible = true;
            eighthPlace.visible = true;
            ninethPlace.visible = true;
            tenthPlace.visible = true;
            mapbio.visible = true
        }
    }
})