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
