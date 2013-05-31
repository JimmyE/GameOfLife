
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

var Location = function (x,y) {

    var X = x || 0;
    var Y = y || 0;

    var CalculateDistance = function(loc) {
        var dx = Math.abs (X - loc.X);
        var dy = Math.abs (Y - loc.Y);
        if (dx !== dy ){
            return dx + dy;
        }

        //else diagonal/caty-corner
        return dx;
    };

    var IsEqual = function (loc) {
        return (loc.X === X && loc.Y === Y);
    };

    var IsAlive = function(neighborCnt) {
        //where does this method belong? Game rules?
        return neighborCnt === 2 || neighborCnt === 3;
    };

    return {
        IsAlive : IsAlive,
        CalculateDistance : CalculateDistance,
        IsEqual : IsEqual,
        X : X,
        Y : Y
    };
};

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
var Board = function (maxX, maxY){
    maxX = maxX || 0;
    maxY = maxY || 0;
    if (maxX === 0 || maxY === 0) {
        throw new Error("Invalid board dimensions");
    }

    var TopEdge = new Location(maxX, 0);
    var RightEdge = new Location(0, maxY);

    var _liveCells = [];  //list of Locations

    var getLiveCellCount = function() { return _liveCells.length;};

    //returns list of ALL cells (occupied board locations)
    var getCells = function() {
        var result = [];

        for (var i = 0; i < _liveCells.length; i++) {
            var tmp = _liveCells[i];
            var nc = _countNeighbors(tmp);
            tmp.SafeCell = nc === 2 || nc === 3;
            result.push(tmp);
        }

        return result;
    };

    var addCell = function(cell) {

        if (_isLocationValid(cell)) {
            var existingCell = _getCellAt(cell);
            if (!existingCell) {
                //console.log("add cell", cell);
                _liveCells.push( cell );
            }
        } else {
            console.error("Invalid cell location: ", cell);
        }
    };

    var initializeBoard = function(cellList) {
        _liveCells = [];
        for (var i = 0; i < cellList.length; i++) {
            //var cell = cellList[i];
            addCell(cellList[i]);
        }
    };

    var evaluate = function() {
        var stillAlive = [];
        //debugger;

        // check live cells to see if they still live!
        for (var i = 0; i < _liveCells.length; i++) {
            var cell = _liveCells[i];
            if (cell.IsAlive(_countNeighbors(cell))) {
                stillAlive.push(cell);
                //console.log("still alive!", this._countNeighbors(cell));
            }
        }

        _liveCells = stillAlive;
       // this.PrintBoard();

        var newCells = [];
        //check dead cells for rebirth
        var emptyCells = _getEmptyCells();
        for (i = 0; i< emptyCells.length; i++) {
            var cell2 = emptyCells[i];
            //console.log("cell2", cell2, this._countNeighbors(cell2));
            if (_countNeighbors(cell2) === 3) {
                newCells.push(cell2);
                //console.log("Bring back! : " + cell2.X + "-" + cell2.Y, this._getLiveNeighbors(cell2));
            }
        }

        var unsortedCells = _liveCells.concat(newCells);

        _liveCells = unsortedCells.sort(function(r,l) {
            if (r.X !== l.X) {
                return r.X - l.X;
            }
            return r.Y - l.Y;
        });

        //this.PrintBoard();
    };

    var printBoard = function() {

        if (_liveCells.length === 0 ){
            console.log("Board is empty");
            return;
        }

        for (var i = 0; i < _liveCells.length; i++) {
            var cell = _liveCells[i];
            console.log("  " + cell.X + " " + cell.Y);
        }
    };

    var areNeighbors = function(cell1, cell2) {
        var distance = cell1.CalculateDistance(cell2);
        return distance === 1;
    };

    var _getEmptyCells = function() {
        //debugger;
        var emptyCells = [];
        for (var x = 0; x < TopEdge.X; x++) {
            for (var y = 0; y < RightEdge.Y; y++) {
                var tmp = _getCellAt(new Location(x, y));
                if (tmp === null) {
                    //console.log("empty cell: " + x + " " + y);
                    emptyCells.push(new Location(x,y));
                }
            }
        }

        return emptyCells;
    };

    var _getCellAt = function (location) {
        for (var i = 0; i < _liveCells.length; i++) {
            if ( _liveCells[i].IsEqual(location)) {
                return _liveCells[i];
            }
        }
        return null;
    };

    var _countNeighbors = function(location) {
        return _getLiveNeighbors(location).length;
    };

    var _getLiveNeighbors = function(location) {
        var neighbors = [];
        for (var i = 0; i < _liveCells.length; i++) {
            if (areNeighbors(location, _liveCells[i])) {
                neighbors.push(_liveCells[i]);
            }
        }
        return neighbors;
    };

    var _isLocationValid = function(cell) {
        if (cell.X < TopEdge.X && cell.X >= 0 &&
            cell.Y < RightEdge.Y && cell.Y >= 0){
            return true;
        }

        return false;
    };

    return {
        AddCell : addCell,
        AreNeighbors : areNeighbors,
        InitializeBoard : initializeBoard ,
        TopEdge : TopEdge,
        RightEdge: RightEdge,
        GetLiveCellCount : getLiveCellCount,
        getCells : getCells,
        PrintBoard: printBoard,
        Evaluate : evaluate,
        _getCellAtTestOnly : _getCellAt
    };
};

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
var GameOfLife = function(){
    var _board = null;

    var NewGame = function(boardHeight, boardWidth){
        _board = new Board(boardHeight, boardWidth);
        return _board;
    };

    var NextTurn = function() {
        _board.Evaluate();
    };

    var GetBoard = function() { return _board;};

    return {
        NewGame : NewGame,
        NextTurn : NextTurn,
        GetBoard: GetBoard
    }
};


