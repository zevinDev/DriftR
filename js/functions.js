function getTile(map, twoPlayer) {
    if (map == "map1" || "map2") {
        p1Tile = backLayer.getTileAtWorldXY(player.x, player.y, true);
        p1StartTile = startLine.getTileAtWorldXY(player.x, player.y, true);
        p1Check1Tile = check1.getTileAtWorldXY(player.x, player.y, true);
        p1Check2Tile = check2.getTileAtWorldXY(player.x, player.y, true);
        p1Check3Tile = check3.getTileAtWorldXY(player.x, player.y, true);
        if (twoPlayer == true) {
            p2Tile = backLayer.getTileAtWorldXY(player2.x, player2.y, true);
            p2StartTile = startLine.getTileAtWorldXY(player2.x, player2.y, true);
            p2Check1Tile = check1.getTileAtWorldXY(player2.x, player2.y, true);
            p2Check2Tile = check2.getTileAtWorldXY(player2.x, player2.y, true);
            p2Check3Tile = check3.getTileAtWorldXY(player2.x, player2.y, true);
        }
    } else if (map == "map3") {
        p1Tile = SlowDown.getTileAtWorldXY(player.x, player.y, true);
        p1StartTile = Finish_Start.getTileAtWorldXY(player.x, player.y, true);
        p1Check1Tile = CheckPoint1.getTileAtWorldXY(player.x, player.y, true);
        p1Check2Tile = CheckPoint2.getTileAtWorldXY(player.x, player.y, true);
        p1Check3Tile = CheckPoint3.getTileAtWorldXY(player.x, player.y, true);
        if (twoPlayer == true) {
            p2Tile = backLayer.getTileAtWorldXY(player2.x, player2.y, true);
            p2StartTile = startLine.getTileAtWorldXY(player2.x, player2.y, true);
            p2Check1Tile = check1.getTileAtWorldXY(player2.x, player2.y, true);
            p2Check2Tile = check2.getTileAtWorldXY(player2.x, player2.y, true);
            p2Check3Tile = check3.getTileAtWorldXY(player2.x, player2.y, true);
        }
    }
}
function setDefault(){

    localStorage.setItem("first_time", "1");
    localStorage.setItem("car", "assets/images/Cars/Player.png");
    localStorage.setItem("MainVolume", 50);
    localStorage.setItem("MusicVolume", 50);
    localStorage.setItem("stars", 1);
    localStorage.setItem("P1", true);
    localStorage.setItem("P2", false);
    localStorage.setItem("P3", false);
    localStorage.setItem("P4", false);
    localStorage.setItem("MGC", false); 
    localStorage.setItem("DBM", false);
    localStorage.setItem("grassMap", false);
    localStorage.setItem("snowMap", false);
    localStorage.setItem("busyBeach", false);
    localStorage.setItem("MSFade", 0);
    localStorage.setItem("GFade", 0);
    localStorage.setItem("DH", 5);
    localStorage.setItem("DW", 5);
    var map1Leader = [0, 0, 0, 0, 0]
    var map1Leadername = ["none", "none", "none", "none", "none"]
    var map1Leaderlist = [0, 0, 0, 0, 0]
    localStorage.setItem('map1Leader', JSON.stringify(map1Leader));
    localStorage.setItem('map1Leadername', JSON.stringify(map1Leadername));
    localStorage.setItem('map1Leaderlist', JSON.stringify(map1Leaderlist));
    var map2Leader = [0, 0, 0, 0, 0]
    var map2Leadername = ["none", "none", "none", "none", "none"]
    var map2Leaderlist = [0, 0, 0, 0, 0]
    localStorage.setItem('map2Leader', JSON.stringify(map2Leader));
    localStorage.setItem('map2Leadername', JSON.stringify(map2Leadername));
    localStorage.setItem('map2Leaderlist', JSON.stringify(map2Leaderlist));
    var map3leader = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var map3leadername = ["none", "none", "none", "none", "none"]
    var map3leaderlist = [0, 0, 0, 0, 0]
    localStorage.setItem('map3leader', JSON.stringify(map3leader));
    localStorage.setItem('map3leadername', JSON.stringify(map3leadername));
    localStorage.setItem('map3leaderlist', JSON.stringify(map3leaderlist));
}