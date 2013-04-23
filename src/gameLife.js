
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
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

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
function Board(maxX, maxY){
    maxX = maxX || 0;
    maxY = maxY || 0;
    if (maxX === 0 || maxY === 0) {
        throw new Error("Invalid board dimensions");
    }
    this.TopEdge = new Location(maxX, 0);
    this.RightEdge = new Location(0, maxY);
}
Board.prototype.AreNeighbors = function(cell1, cell2) {
    //return cell1._x == cell2._x;
    var distance = cell1.Location.CalculateDistance(cell2.Location);
    return distance === 1;
};


//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
function GameOfLife(){
    this._board = null;

    this.NewGame = function(boardHeight, boardWidth){
        this._board = new Board(boardHeight, boardWidth);
    };

    this.GetBoard = function() { return this._board;};
}



//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
function Cell(location) {
    this.Location = location || new Location();
}
Cell.prototype.IsAlive = function(neighborCnt) {
    return neighborCnt === 2 || neighborCnt === 3;
};



