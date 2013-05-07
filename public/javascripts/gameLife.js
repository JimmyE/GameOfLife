
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

Location.prototype.IsEqual = function (loc) {
    return (loc.X === this.X && loc.Y === this.Y);
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

    this._liveCells = [];
    this.GetLiveCellCount = function() { return this._liveCells.length;};
    this.GetCells = function() { return this._liveCells;};

    this.InitializeBoard = function(cellList) {
        this._liveCells = [];
        for (var i = 0; i < cellList.length; i++) {

            var cell = cellList[i];
            if (cell.X < this.TopEdge.X && cell.Y < this.RightEdge.Y ){
               var existingCell = this._getCellAt(cell);
                if (!existingCell) {
                    //console.log("add cell", cell);
                    this._liveCells.push( cell );
                }
            }
        }
    };

    this.PrintBoard = function() {

        if (this._liveCells.length === 0 ){
            console.log("Board is empty");
            return;
        }

        for (var i = 0; i < this._liveCells.length; i++) {
            var cell = this._liveCells[i];
            console.log("  " + cell.X + " " + cell.Y);
        }
    };

    this._getCellAt = function (location) {
        for (var i = 0; i < this._liveCells.length; i++) {
            if ( this._liveCells[i].IsEqual(location)) {
                return this._liveCells[i];
            }
        }
        return null;
    };


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

function CreateCell(x, y) {
    return new Cell(new Location(x,y));
}


