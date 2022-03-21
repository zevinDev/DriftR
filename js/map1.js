var map1 = new Phaser.Class({ //initalizes and creates the scene for map1
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "map1"
        });
    },

    preload: function() {
        var car = localStorage.getItem('car');
        this.load.image('player', car);
    },

    create: function() {
        currentMap = "map1"
        placeValue = 0;
        usedBoostPad1 = false;

        //Creates The Player
        player = this.physics.add.sprite(375, 3300, 'player');
        player.body.setMaxSpeed(500);
        player.angle = -90;
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        extendedBackground = this.add.image(2048, 2048, 'extendedBackground');
        boostpad1 = this.physics.add.sprite(2000, 300, 'player');
        canMove = true;

        //Sets Colliders And Bounce
        if (twoPlayer == true) {
            player2 = this.physics.add.sprite(435, 3300, 'player2');
            player2.setBounce(0.2);
            player2.setCollideWorldBounds(false);
            player2.body.setMaxSpeed(500);
            player2.angle = -90;
            camera = this.cameras.main;
            camera.setSize(camera.width, (camera.height / 2) - 4);
            camera.startFollow(player);
            var camera1 = this.cameras.add();
            camera1.setSize(camera1.width, (camera1.height / 2) - 4);
            camera1.setPosition(0, 400);
            camera1.startFollow(player2);
            this.physics.add.collider(player, player2)
            canMove = false;
        } else {
            camera = this.cameras.main;
            camera.startFollow(player);
        };

        const tileMap1 = this.make.tilemap({
            key: 'tileMap1'
        })

        const map1Pallet = tileMap1.addTilesetImage('map1Pallet', 'map1Pallet', 8, 8, 1, 2);

        backLayer = tileMap1.createLayer('Back', map1Pallet)
        trackLayer = tileMap1.createLayer('Track', map1Pallet)
        startLine = tileMap1.createLayer('Start', map1Pallet)
        check1 = tileMap1.createLayer('check1', map1Pallet)
        check2 = tileMap1.createLayer('check2', map1Pallet)
        check3 = tileMap1.createLayer('check3', map1Pallet)
        borderLayer = tileMap1.createLayer('Border', map1Pallet)

        borderLayer.setCollisionByProperty({
            collides: true
        })
        backLayer.setCollisionByProperty({
            collides: true
        })


        this.physics.add.collider(player, borderLayer);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        borderLayer = this.add.text(0, 0, "", {
            fontFamily: 'Dogica'
        });
        timer = 0;
        timez = 0;
        seconds = 0;
        minutes = 0;
        milliseconds = 0;
        timerOn = false;
        countdownTimer = true;
        check1Pass = true;
        check2Pass = true;
        check3Pass = true;
        lapCount = 0;
        finalTime = 0;
        boostpads = this.add.group();
        boostpads.add(boostpad1);
        cars = this.add.group();
        cars.add(player);
        const layer = this.add.layer();
        layer.add([player, boostpad1])
        if (twoPlayer == true) {
            layer.add([player2]);
            cars.add(player2);
            this.physics.add.collider(player2, borderLayer);
            camera1.ignore(borderLayer)
        }

        this.physics.add.overlap(cars, boostpads, function(user, boostpad) {
            if (boostpad == boostpad1 && usedBoostPad1 == false) {
                usedBoostPad1 = true;
                user.body.setMaxSpeed(1000);
                user.body.velocity.normalize()
                    .scale(1000);
                setTimeout(function() {
                    user.body.setMaxSpeed(500);
                }, 500);
            }
        });

        if (twoPlayer == true) {
            countDown = this.add.text(370, 3150, "", {
                fontFamily: 'Dogica',
                fontSize: 40,
                color: '#ffbe00'
            });
            layer.add([countDown]);
            setTimeout(function() {
                countDown.setText(" 3");
            }, 1000);
            setTimeout(function() {
                countDown.setText(" 2");
            }, 2000);
            setTimeout(function() {
                countDown.setText(" 1");
            }, 3000);
            setTimeout(function() {
                countDown.setText("GO!");
                canMove = true;
                timerOn = true;
            }, 4000);
            setTimeout(function() {
                countDown.destroy();
            }, 5000);
        }
    },

    update: function() {
        if (canMove == true) {
            this.input.keyboard.enabled = true;
        } else {
            this.input.keyboard.enabled = false
        }
        getTile(currentMap, twoPlayer);


        player.setMaxVelocity(9999, 9999);
        if (player.body.speed > 15 && (keyLEFT.isDown)) {
            player.setAngularVelocity(-150);
        } else if (player.body.speed > 15 && (keyRIGHT.isDown)) {
            player.setAngularVelocity(150);
        } else {
            player.setAngularVelocity(0);
        }
        if (keyUP.isDown && player.body.speed < 516) {
            this.physics.velocityFromRotation(player.rotation, 700, player.body.acceleration);
        } else if (player.body.speed > 400) {
            this.physics.velocityFromRotation(player.rotation, (player.body.speed - 75), player.body.velocity);
        } else {
            player.setAcceleration(0);
            player.body.drag.x = 160;
            player.body.drag.y = 160;
            this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
        }

        //this slows down the car in grass 
        if (p1Tile.index == 4 || p1Tile.index == 5 || p1Tile.index == 6 || p1Tile.index == 7 || p1Tile.index == 8 || p1Tile.index == 9) {
            player.setMaxVelocity(100, 100); //Player cannot accelerate past 100
            player.setAcceleration(0);
            if (player.body.speed > 15 && (keyLEFT.isDown)) {
                player.setAngularVelocity(-50);
            } else if (player.body.speed > 15 && (keyRIGHT.isDown)) {
                player.setAngularVelocity(50);
            } else {
                player.setAngularVelocity(0);
            }
            if (keyUP.isDown) {
                this.physics.velocityFromRotation(player.rotation, 100, player.body.velocity);
            } else {
                player.setAcceleration(0);
                player.body.drag.x = 300;
                player.body.drag.y = 300;
                this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
            }
        }
        //player2's movement
        if (twoPlayer == true) {
            player2.setMaxVelocity(9999, 9999);
            if (player2.body.speed > 15 && (keyA.isDown)) {
                player2.setAngularVelocity(-150);
            } else if (player2.body.speed > 15 && (keyD.isDown)) {
                player2.setAngularVelocity(150);
            } else {
                player2.setAngularVelocity(0);
            }
            if (keyW.isDown && player2.body.speed < 516) {
                this.physics.velocityFromRotation(player2.rotation, 700, player2.body.acceleration);
            } else if (player2.body.speed > 400) {
                this.physics.velocityFromRotation(player2.rotation, (player2.body.speed - 75), player2.body.velocity);
            } else {
                player2.setAcceleration(0);
                player2.body.drag.x = 160;
                player2.body.drag.y = 160;
                this.physics.velocityFromRotation(player2.rotation, player2.body.speed, player2.body.velocity);
            }
            //this slows down the car in grass 
            if (p2Tile.index == 4 || p2Tile.index == 5 || p2Tile.index == 6 || p2Tile.index == 7 || p2Tile.index == 8 || p2Tile.index == 9) {
                player2.setMaxVelocity(100, 100); //Player cannot accelerate past 100
                player2.setAcceleration(0);
                if (player2.body.speed > 15 && (keyA.isDown)) {
                    player2.setAngularVelocity(-50);
                } else if (player2.body.speed > 15 && (keyD.isDown)) {
                    player2.setAngularVelocity(50);
                } else {
                    player2.setAngularVelocity(0);
                }
                if (keyW.isDown) {
                    this.physics.velocityFromRotation(player2.rotation, 100, player2.body.velocity);
                } else {
                    player2.setAcceleration(0);
                    player2.body.drag.x = 300;
                    player2.body.drag.y = 300;
                    this.physics.velocityFromRotation(player2.rotation, player2.body.speed, player2.body.velocity);
                }
            }
        }
        //This is the code for the timer function
        if (timerOn == true) {
            while (timer <= 100) {
                timer = timer + 01;
            }
        }
        if (timer >= 100) {
            timer = 00;
            timez = timez + 01;
        }
        if (timez >= 60) {
            timez = 00;
            seconds = seconds + 01;
        }
        if (seconds >= 60) {
            seconds = 00;
            minutes = minutes + 01;
        }
        milliseconds = (timez * 1.666666666666667)
            .toFixed(0)
        if (minutes > 00) {
            finalTime = minutes.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }) + "." + seconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }) + "." + milliseconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
        } else if (seconds > 00) {
            finalTime = seconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }) + "." + milliseconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
        } else {
            finalTime = milliseconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
        }

        LeaderTime = (minutes * 60)
            .toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }) + seconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }) + (milliseconds / 100)
            .toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
        borderLayer.setText(finalTime);
        borderLayer.x = player.x - 200;
        borderLayer.y = player.y - 150;

        if (keyESC.isDown && localStorage.getItem('paused') == "0") {
            localStorage.setItem("paused", "1");
            this.scene.pause();
            this.scene.launch("pauseMenu");
        }

        if (twoPlayer == true) {
            if (p1Check1Tile.index == 6 || p1Check1Tile.index == 0 || p1Check1Tile.index == 1 || p2Check1Tile.index == 6 || p2Check1Tile.index == 0 || p2Check1Tile.index == 1) {
                if (check1Pass == false && check2Pass == false && check3Pass == false) {
                    check1Pass = true;
                    console.log("Check 1 passed")
                }
            }

            if (p1Check2Tile.index == 6 || p1Check2Tile.index == 0 || p1Check2Tile.index == 1 || p2Check2Tile.index == 6 || p2Check2Tile.index == 0 || p2Check2Tile.index == 1) {
                if (check1Pass == true && check2Pass == false && check3Pass == false) {
                    check2Pass = true;
                    console.log("Check 2 passed")
                }
            }

            if (p1Check3Tile.index == 6 || p1Check3Tile.index == 0 || p1Check3Tile.index == 1 || p2Check3Tile.index == 6 || p2Check3Tile.index == 0 || p2Check3Tile.index == 1) {
                if (check1Pass == true && check2Pass == true && check3Pass == false) {
                    check3Pass = true;
                    console.log("Check 3 passed")
                }
            }

            if (p1StartTile.index == 9 || p1StartTile.index == 10 || p2StartTile.index == 9 || p2StartTile.index == 10) {
                if (lapCount == 0) {
                    check1Pass = false;
                    check2Pass = false;
                    check3Pass = false;
                    lapCount = lapCount + 1;
                } else if (lapCount > 0 && lapCount < 3 && check1Pass == true && check2Pass == true && check3Pass == true) {
                    check1Pass = false;
                    check2Pass = false;
                    check3Pass = false;
                    lapCount = lapCount + 1;
                    usedBoostPad1 = false;
                    console.log(lapCount);
                } else if (lapCount == 3 && check1Pass == true && check2Pass == true && check3Pass == true) {
                    check1Pass = false;
                    check2Pass = false;
                    check3Pass = false;
                    timerOn = false
                    var map1Leader = localStorage.getItem('map1Leader');
                    map1Leader = JSON.parse(map1Leader);
                    map1Leader = map1Leader.slice(0, 5);
                    var map1Leaderlist = localStorage.getItem('map1Leaderlist');
                    map1Leaderlist = JSON.parse(map1Leaderlist);
                    map1Leaderlist = map1Leaderlist.slice(0, 5);
                    var done = false;
                    for (var i = 0; i < 5; i++) {
                        if (done == false) {
                            if (LeaderTime < map1Leaderlist[i]) {
                                map1Leader.splice(i, 0, finalTime);
                                map1Leaderlist.splice(i, 0, LeaderTime);
                                localStorage.setItem('map1Leaderlist', JSON.stringify(map1Leaderlist));
                                localStorage.setItem('map1Leader', JSON.stringify(map1Leader));
                                placeValue = i + 1;
                                this.scene.launch("LeaderBoardEnter");
                                this.scene.pause();
                                done = true;
                            } else if (map1Leaderlist[i] == 0) {
                                map1Leader.splice(i, 0, finalTime);
                                map1Leaderlist.splice(i, 0, LeaderTime);
                                localStorage.setItem('map1Leaderlist', JSON.stringify(map1Leaderlist));
                                localStorage.setItem('map1Leader', JSON.stringify(map1Leader));
                                placeValue = i + 1;
                                this.scene.launch("LeaderBoardEnter");
                                this.scene.pause();
                                done = true;
                            }
                        }
                    }
                    if (done != true) {
                        this.scene.launch("lapsComplete");
                        this.scene.pause();
                    }
                }
            }
        } else {
            if (p1Check1Tile.index == 6 || p1Check1Tile.index == 0 || p1Check1Tile.index == 1) {
                if (check1Pass == false && check2Pass == false && check3Pass == false) {
                    check1Pass = true;
                    console.log("Check 1 passed")
                }
            }

            if (p1Check2Tile.index == 6 || p1Check2Tile.index == 0 || p1Check2Tile.index == 1) {
                if (check1Pass == true && check2Pass == false && check3Pass == false) {
                    check2Pass = true;
                    console.log("Check 2 passed")
                }
            }

            if (p1Check3Tile.index == 6 || p1Check3Tile.index == 0 || p1Check3Tile.index == 1) {
                if (check1Pass == true && check2Pass == true && check3Pass == false) {
                    check3Pass = true;
                    console.log("Check 3 passed")
                }
            }

            if (p1StartTile.index == 9 || p1StartTile.index == 10) {
                if (lapCount == 0) {
                    timerOn = true
                    check1Pass = false;
                    check2Pass = false;
                    check3Pass = false;
                    lapCount = lapCount + 1;
                } else if (lapCount > 0 && lapCount < 3 && check1Pass == true && check2Pass == true && check3Pass == true) {
                    check1Pass = false;
                    check2Pass = false;
                    check3Pass = false;
                    lapCount = lapCount + 1;
                    usedBoostPad1 = false;
                    console.log(lapCount);
                } else if (lapCount == 3 && check1Pass == true && check2Pass == true && check3Pass == true) {
                    check1Pass = false;
                    check2Pass = false;
                    check3Pass = false;
                    timerOn = false
                    var map1Leader = localStorage.getItem('map1Leader');
                    map1Leader = JSON.parse(map1Leader);
                    map1Leader = map1Leader.slice(0, 5);
                    var map1Leaderlist = localStorage.getItem('map1Leaderlist');
                    map1Leaderlist = JSON.parse(map1Leaderlist);
                    map1Leaderlist = map1Leaderlist.slice(0, 5);
                    var done = false;
                    for (var i = 0; i < 5; i++) {
                        if (done == false) {
                            if (LeaderTime < map1Leaderlist[i]) {
                                map1Leader.splice(i, 0, finalTime);
                                map1Leaderlist.splice(i, 0, LeaderTime);
                                localStorage.setItem('map1Leaderlist', JSON.stringify(map1Leaderlist));
                                localStorage.setItem('map1Leader', JSON.stringify(map1Leader));
                                placeValue = i + 1;
                                this.scene.launch("LeaderBoardEnter");
                                this.scene.pause();
                                done = true;
                            } else if (map1Leaderlist[i] == 0) {
                                map1Leader.splice(i, 0, finalTime);
                                map1Leaderlist.splice(i, 0, LeaderTime);
                                localStorage.setItem('map1Leaderlist', JSON.stringify(map1Leaderlist));
                                localStorage.setItem('map1Leader', JSON.stringify(map1Leader));
                                placeValue = i + 1;
                                this.scene.launch("LeaderBoardEnter");
                                this.scene.pause();
                                done = true;
                            }
                        }
                    }
                    if (done != true) {
                        this.scene.launch("lapsComplete");
                        this.scene.pause();
                    }
                }
            }
        }
    }
});
