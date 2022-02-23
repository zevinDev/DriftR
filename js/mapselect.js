var mapselect = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "mapselect"
        });
    },
    preload: function() {
 
    },
    create: function() {
        twoPlayer = false;
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        leadertime = [];
        leadername = [];
        testvar = true;
        test2var = true;
        test3var = true;
        Stars = parseInt(localStorage.getItem('Stars'));
        GRASS = localStorage.getItem('grassMap');
        SNOW = localStorage.getItem('snowMap');
        BEACH = localStorage.getItem('busyBeach');
        var backimage = this.add.graphics();
        backimage.fillStyle(0x37313b, 1);
        backimage.fillRect(0, 0, 800, 800);
        map3select = this.add.image(600, 208, 'map3select')
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

        firstPlaceT = this.add.text(198, 512, map1leadername[0] + "-" + map1leader[0],{ fontFamily: 'Dogica', fontSize: 16, color: '#ffbe00' });
        firstPlaceT.visible = false;

        secondPlaceT = this.add.text(198, 538, map1leadername[1] + "-" + map1leader[1],{ fontFamily: 'Dogica', fontSize: 16, color: '#C0C0C0' });
        secondPlaceT.visible = false;

        thirdPlaceT = this.add.text(198, 564, map1leadername[2] + "-" + map1leader[2],{ fontFamily: 'Dogica', fontSize: 16, color: '#CD7F32' });
        thirdPlaceT.visible = false;

        fourthPlaceT = this.add.text(198, 590, map1leadername[3] + "-" + map1leader[3],{ fontFamily: 'Dogica', fontSize: 16, color: '#000000' });
        fourthPlaceT.visible = false;

        fifthPlaceT = this.add.text(198, 614, map1leadername[4] + "-" + map1leader[4],{ fontFamily: 'Dogica', fontSize: 16, color: '#000000' });
        fifthPlaceT.visible = false;


        //this is for displaying current cash
        currency = this.add.text(550, 33, "Stars: " + Stars, { fontFamily: 'Dogica', fontSize: 32, color: '#000000' });
        var price = 0;

        //text if you don't have enough money
        var notEnoughMoney = this.add.text(25, 200, "You do not have enough Stars", { fontFamily: 'Dogica', fontSize: 32, color: '#e34d4d' });
        notEnoughMoney.visible = false;

        //The buy popup loads but is not visible
        infoPopUp = this.add.image(400, 400, 'infoPopUp');
        cancelButton = this.add.image(250, 625, 'cancelButton');
        buyButton = this.add.image(550, 625, 'buyButton');
        popUpText = this.add.text(150, 150, "Are you sure you want to buy" + "\n" + "this car for " + price + " Stars?", { fontFamily: 'Dogica', fontSize: 36, color: '#000000' });

        infoPopUp.visible = false;
        cancelButton.visible = false;
        buyButton.visible = false;
        popUpText.visible = false;

        cancelButton.setInteractive();
        cancelButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

            cancelButton.setFrame(1)
        })
        cancelButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            cancelButton.setFrame(0)
        })
        cancelButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            price = 0;
            infoPopUp.visible = false;
            cancelButton.visible = false;
            buyButton.visible = false;
            popUpText.visible = false;
            this.registry.destroy(); // destroy registry
            this.events.off(); // disable all active events
            this.scene.restart(); // restart current scene
        })

        buyButton.setInteractive();
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

            buyButton.setFrame(1)
        })
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            buyButton.setFrame(0)
        })
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            var Stars2 = localStorage.getItem('Stars');
            if (Stars2 - price >= 0) {
                localStorage.setItem("Stars", Stars2 - price);
                var finalPrice = localStorage.getItem("Stars");
                currency.setText("Stars: " + finalPrice)

                infoPopUp.visible = false;
                cancelButton.visible = false;
                buyButton.visible = false;
                popUpText.visible = false;

                //code below resets scene because buying something breaks the current scene but after restarting it seems fine
                //found it online
                //i found the problem but it would just be easier to restart the scene, it's because i dont create interactives for the rest of
                //the visuals since its only done if the car has been bought
                this.registry.destroy(); // destroy registry
                this.events.off(); // disable all active events
                this.scene.restart(); // restart current scene
            } else {
                infoPopUp.visible = false;
                cancelButton.visible = false;
                buyButton.visible = false;
                popUpText.visible = false;
                notEnoughMoney.visible = true;
            }
        });

        textvisible = false;

        mapbio = this.add.image(400, 570, 'mapbio')
        mapback = this.add.image(400, 216, 'mapback')
        //interactive for map1
        if (GRASS == "true") {
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
    } else if (GRASS == "false") {
        map1select.setFrame(3);
        map1select.setInteractive();
        map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    price = 0;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Stars?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        if (notEnoughMoney.visible == false) {
                            localStorage.setItem('grassMap', true);
                            textvisible = true;
                            localStorage.setItem('mapselect', 1);
                            testvar = true;
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
    }
       //interactive for map2
       if (SNOW == "true") {
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
        })
    } else if (SNOW == "false") {
        map2select.setFrame(3);
        map2select.setInteractive();
        map2select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    price = 0;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Stars?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        if (notEnoughMoney.visible == false) {
                            localStorage.setItem('snowMap', true);
                            textvisible = true;
                            localStorage.setItem('mapselect', 2);
                            test2var = true;
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
    }
              //interactive for map3
              if (BEACH == "true") {
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
                })
            } else if (BEACH == "false") {
                map3select.setFrame(3);
                map3select.setInteractive();
                map3select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        notEnoughMoney.visible = false;
                        if (infoPopUp.visible == false) {
                            price = 0;
                            popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Stars?");
                            infoPopUp.visible = true;
                            cancelButton.visible = true;
                            buyButton.visible = true;
                            popUpText.visible = true;
        
                            buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                                if (notEnoughMoney.visible == false) {
                                    localStorage.setItem('busyBeach', true);
                                    textvisible = true;
                                    localStorage.setItem('mapselect', 3);
                                    test3var = true;
                                } else {
                                    notEnoughMoney.visible = true;
                                }
                            })
                        }
                    })
            }
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

        checkbox = this.add.image(580,620, 'check_box');
        checkbox.setInteractive();
        checkbox.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if(twoPlayer == true){
                twoPlayer = false;
            } else{
                twoPlayer = true;
            }
        });

        console.log(map1leader)
        mapstart.visible = false;
        checkbox.visible = false;

        const layer = this.add.layer();
        layer.add([backimage, mapback, backButton, map3select, map2select, map1select, mapbio, mapstart, checkbox, firstPlaceT, secondPlaceT, thirdPlaceT, fourthPlaceT, fifthPlaceT, currency, infoPopUp, cancelButton, buyButton, popUpText, notEnoughMoney])
        mapbio.visible = false;
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
        if(localStorage.getItem('mapselect') != 1 && testvar == true && GRASS == "true"){
            testvar = false
            map1select.setFrame(0)

        }else if(localStorage.getItem('mapselect') != 2 && test2var == true && SNOW == "true"){
            test2var = false
            map2select.setFrame(0)

        } if(localStorage.getItem('mapselect') != 3 && test3var == true && BEACH == "true"){
            test3var = false
            map3select.setFrame(0)
        }

        firstPlaceT.setText(leadername[0] + "-" + leadertime[0]);

        secondPlaceT.setText(leadername[1] + "-" + leadertime[1]);

        thirdPlaceT.setText(leadername[2] + "-" + leadertime[2]);

        fourthPlaceT.setText(leadername[3] + "-" + leadertime[3]);

        fifthPlaceT.setText(leadername[4] + "-" + leadertime[4]);

        if(twoPlayer == true){
            checkbox.setFrame(1);
        } else{
            checkbox.setFrame(0)
        }
        if(textvisible == true){
            firstPlaceT.visible = true;
            secondPlaceT.visible = true;
            thirdPlaceT.visible = true;
            fourthPlaceT.visible = true;
            fifthPlaceT.visible = true;
            mapstart.visible = true;
            checkbox.visible = true;
            mapbio.visible = true
        }
    }
})