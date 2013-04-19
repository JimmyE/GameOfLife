
function Location(x, y) {
    this.X = x || 0;
    this.Y = y || 0;
}
Location.prototype.CalculateDistance = function(loc) {
    var dx = Math.abs (this.X - loc.X);
    var dy = Math.abs (this.Y - loc.Y);
    if (dx !== dy ){
        return dx + dy;
    }

    //else diagonal/caty-corner
    return dx;
};

function Board(){
}
Board.prototype.Initialize = function() {
};
Board.prototype.AreNeighbors = function(cell1, cell2) {
    //return cell1._x == cell2._x;
    var distance = cell1.Location.CalculateDistance(cell2.Location);
    return distance === 1;
};



function GameOfLife(){
    this._board = null;
}

GameOfLife.prototype.Initialize = function() {
    this._board = new Board();
    this._board.Initialize();
};





function Cell(location) {
    this.Location = location || new Location();
}
Cell.prototype.IsAlive = function(neighborCnt) {
    return neighborCnt === 2 || neighborCnt === 3;
};



