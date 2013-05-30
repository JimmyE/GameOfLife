
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

var Location = function (x,y) {
    var self = this;

    self.X = x || 0;
    self.Y = y || 0;

    self.CalculateDistance = function(loc) {
        var dx = Math.abs (self.X - loc.X);
        var dy = Math.abs (self.Y - loc.Y);
        if (dx !== dy ){
            return dx + dy;
        }

        //else diagonal/caty-corner
        return dx;
    };

    self.IsEqual = function (loc) {
        return (loc.X === self.X && loc.Y === self.Y);
    };

    self.IsAlive = function(neighborCnt) {
        //where does this method belong? Game rules?
        return neighborCnt === 2 || neighborCnt === 3;
    };

    return {
        IsAlive : self.IsAlive,
        CalculateDistance : self.CalculateDistance,
        IsEqual : self.IsEqual,
        X : self.X,
        Y : self.Y
    };
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

        // check live cells to see if they still live!
        for (var i = 0; i < this._liveCells.length; i++) {
            var cell = this._liveCells[i];
            if (cell.IsAlive(this._countNeighbors(cell))) {
                stillAlive.push(cell);
                //console.log("still alive!", this._countNeighbors(cell));
            }
        }

        this._liveCells = stillAlive;
       // this.PrintBoard();

        var newCells = [];
        //check dead cells for rebirth
        var emptyCells = this._getEmptyCells();
        for (i = 0; i< emptyCells.length; i++) {
            var cell2 = emptyCells[i];
            //console.log("cell2", cell2, this._countNeighbors(cell2));
            if (this._countNeighbors(cell2) === 3) {
                newCells.push(cell2);
                //console.log("Bring back! : " + cell2.X + "-" + cell2.Y, this._getLiveNeighbors(cell2));
            }
        }

        var unsortedCells = this._liveCells.concat(newCells);

        this._liveCells = unsortedCells.sort(function(r,l) {
            if (r.X !== l.X) {
                return r.X - l.X;
            }
            return r.Y - l.Y;
        });

        //this.PrintBoard();
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

    this._getEmptyCells = function() {
        //debugger;
        var emptyCells = [];
        for (var x = 0; x < this.TopEdge.X; x++) {
            for (var y = 0; y < this.RightEdge.Y; y++) {
                var tmp = this._getCellAt(new Location(x, y));
                if (tmp === null) {
                    //console.log("empty cell: " + x + " " + y);
                    emptyCells.push(new Location(x,y));
                }
            }
        }

        return emptyCells;
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
        /*
        var cnt = 0;
        for (var i = 0; i < this._liveCells.length; i++) {
            if (this.AreNeighbors(location, this._liveCells[i])) {
                cnt = cnt + 1;
            }
        }

        //console.log("NeighborCnt:", location, cnt);
        return cnt;
        */
        return this._getLiveNeighbors(location).length;
    };

    this._getLiveNeighbors = function(location) {
        var neighbors = [];
        for (var i = 0; i < this._liveCells.length; i++) {
            if (this.AreNeighbors(location, this._liveCells[i])) {
                neighbors.push(this._liveCells[i]);
            }
        }
        return neighbors;
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


