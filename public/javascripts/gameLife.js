
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

Location.prototype.GetNeighborLocations = function () {
    var results = [];
    //1 row above
    results.push( new Location(this.X - 1, this.Y + 1));
    results.push( new Location(this.X, this.Y + 1));
    results.push( new Location(this.X + 1, this.Y + 1));

    //same row height
    results.push( new Location(this.X - 1, this.Y));
    results.push( new Location(this.X + 1, this.Y));

    //1 row below
    results.push( new Location(this.X - 1, this.Y - 1));
    results.push( new Location(this.X, this.Y - 1));
    results.push( new Location(this.X + 1, this.Y - 1));

    return results;
};

Location.prototype.IsAlive = function(neighborCnt) {
    return neighborCnt === 2 || neighborCnt === 3;
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

    this._liveCells = [];  //list of Locations

    this.GetLiveCellCount = function() { return this._liveCells.length;};

    this.GetCells = function() {
        var result = [];

        //return this._liveCells;
        for (var i = 0; i < this._liveCells.length; i++) {
            var tmp = this._liveCells[i];
            var nc = this._countNeighbors(tmp);
            tmp.SafeCell = nc === 2 || nc === 3;
            result.push(tmp);
        }

        return result;
    };

    this.AddCell = function(cell) {
//        if (cell.X < this.TopEdge.X && cell.X >= 0 &&
//            cell.Y < this.RightEdge.Y && cell.Y >= 0){

        if (this._isLocationValid(cell)) {
            var existingCell = this._getCellAt(cell);
            if (!existingCell) {
                //console.log("add cell", cell);
                this._liveCells.push( cell );
            }
        } else {
            console.error("Invalid cell location: ", cell);
        }
    };

    this.InitializeBoard = function(cellList) {
        this._liveCells = [];
        for (var i = 0; i < cellList.length; i++) {
            //var cell = cellList[i];
            this.AddCell(cellList[i]);
        }
    };

    this.Evaluate = function() {
        var stillAlive = [];
        //debugger;
        for (var i = 0; i < this._liveCells.length; i++) {
            var cell = this._liveCells[i];
            if (cell.IsAlive(this._countNeighbors(cell))) {
                stillAlive.push(cell);
                //console.log("still alive!", this._countNeighbors(cell));
            }
        }

        this._liveCells = stillAlive;
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

    this._countNeighbors = function(location) {
        var cnt = 0;
        for (var i = 0; i < this._liveCells.length; i++) {
            if (this.AreNeighbors(location, this._liveCells[i])) {
                cnt = cnt + 1;
            }
        }

        //console.log("NeighborCnt:", location, cnt);
        return cnt;
    };

    this._isLocationValid = function(cell) {
        if (cell.X < this.TopEdge.X && cell.X >= 0 &&
            cell.Y < this.RightEdge.Y && cell.Y >= 0){
            return true;
        }

        return false;
    };
}
Board.prototype.AreNeighbors = function(cell1, cell2) {
    var distance = cell1.CalculateDistance(cell2);
    return distance === 1;
};


//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
function GameOfLife(){
    this._board = null;

    this.NewGame = function(boardHeight, boardWidth){
        this._board = new Board(boardHeight, boardWidth);
    };

    this.NextTurn = function() {
        this._board.Evaluate();
//        this._board.PrintBoard();
    };

    this.GetBoard = function() { return this._board;};
}


//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/*function Cell(location) {


    this.Location = location || new Location();
}
Cell.prototype.IsAlive = function(neighborCnt) {
    return neighborCnt === 2 || neighborCnt === 3;
};
 */
//function CreateCell(x, y) {
//    return new Cell(new Location(x,y));
//}


