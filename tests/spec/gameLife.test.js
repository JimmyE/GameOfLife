describe ("Life Rules" , function() {

    beforeEach(function() {
        cell = new Location();
    });

    describe ("IsAlive rules", function () {
        it("when 1 neighbor return false", function () {
            expect(cell.IsAlive(1)).toBeFalsy();
        });
        it("when 2 neighbors return true", function () {
            expect(cell.IsAlive(2)).toBeTruthy();
        });
        it("when 3 neighbors return true", function () {
            expect(cell.IsAlive(3)).toBeTruthy();
        });
        it("when 4 neighbors return false", function () {
            expect(cell.IsAlive(4)).toBeFalsy();
        });
    });
});

describe ("Class construction and initialization", function() {
    it ("when class ctor given location then uses it", function(){
        var loc = new Location(1,2);
        //var c1 = new Cell(loc);

        expect(loc.X).toEqual(1);
        expect(loc.Y).toEqual(2);
    });
});

describe ("Board layout", function(){
    beforeEach(function() {
        board = new Board(3,3);
    });

    describe("AreNeighbors", function() {
        it ("when cells same row and next column then return true", function() {
            var c1 = new Location(1,2);
            var c2 = new Location(1,3);

            expect(board.AreNeighbors(c1, c2)).toBeTruthy();
        });

        it ("when cells catty-corner then return true", function() {
            var c1 = new Location(1,2);
            var c2 = new Location(2,3);

            expect(board.AreNeighbors(c1, c2)).toBeTruthy();
        });

        it ("when cells same row and 2 columns away then return false", function() {
            var c1 = new Location(1,2);
            var c2 = new Location(1,4);

            expect(board.AreNeighbors(c1, c2)).toBeFalsy();
        });


    });

    describe ("Board creation", function() {
        it ("when board created, sets max coordinates", function() {
            var edgeX = 5;
            var edgeY = 6;
            var newBoard = new Board(edgeX, edgeY);

            //console.log("newBoard:", newBoard);
            expect(newBoard.TopEdge.X).toEqual(edgeX);
            expect(newBoard.TopEdge.Y).toEqual(0);
            expect(newBoard.RightEdge.X).toEqual(0);
            expect(newBoard.RightEdge.Y).toEqual(edgeY);
        });

        it ("when board created, max coordinates are required", function() {
            expect( function() { new Board(1);}).toThrow(new Error("Invalid board dimensions"));
            expect( function() { new Board(0, 1);}).toThrow(new Error("Invalid board dimensions"));
        });
     });
});

describe ("Game creation", function() {
    it ("When create new game, set the board dimensions", function() {
        var game = new GameOfLife();
        game.NewGame(1,2);

        var board = game.GetBoard();
        expect(board.TopEdge.X).toEqual(1);
        expect(board.RightEdge.Y).toEqual(2);
    });

    it ("when board created with cells, live cells are saved", function() {
        var board = new Board(10,10);
        var cells = [ new Location(1,1), new Location(2,2)];

        board.InitializeBoard(cells);
        board.PrintBoard();
        expect(board.GetLiveCellCount()).toEqual(cells.length);
    });

    it ("when board created, duplicate cells are ignored", function() {
        var board = new Board(10,10);
        var cells = [ new Location(1,1), new Location(2,2), new Location(2,2)];

        board.InitializeBoard(cells);
        expect(board.GetLiveCellCount()).toEqual(2);
    });

    it ("when board created, cells out of bounds are ignored", function() {
        var board = new Board(10,10);
        var cells = [ new Location(1,1), new Location(100, 2), new Location(2,100)];
        board.InitializeBoard(cells);
        expect(board.GetLiveCellCount()).toEqual(1);
    });

    it ("when cell location is 0,0 then addCell is successful", function() {
        var board = new Board(10,10);
        board.AddCell(new Location(0,0));
        expect(board.GetLiveCellCount()).toEqual(1);
    });

    it ("when cell location is top right then addCell is successful", function() {
        var board = new Board(10,10);
        board.AddCell(new Location(9,9));   // board goes from 0-9
        expect(board.GetLiveCellCount()).toEqual(1);

    });

    it ("when cell location is top+1, then addCell fails", function() {
        var board = new Board(10,10);
        board.AddCell(new Location(10,10));
        expect(board.GetLiveCellCount()).toEqual(0);
    });

    it ("when cell location is less 0, then addCell fails", function() {
        var board = new Board(10,10);
        board.AddCell(new Location(-1,1));
        expect(board.GetLiveCellCount()).toEqual(0);
    });
});

describe ("Evaluate board", function () {
    beforeEach(function() {
        board = new Board(3,3);
    });

    it ("when board cell have no neighbors, then evaluate removes all of them", function(){
        var c1 = new Location(0,0);
        var c2 = new Location(2,2);
        board.InitializeBoard([c1, c2]);
        expect(board.GetLiveCellCount()).toEqual(2);  //confirm setup

        board.Evaluate();
        expect(board.GetLiveCellCount()).toEqual(0);
    });

    it ("when board cell has 2  neighbors, then evaluate keeps them", function(){
        var c1 = new Location(0,0);
        var c2 = new Location(0,1);
        var c3 = new Location(0,2);
        board.InitializeBoard([c1, c2, c3]);
        expect(board.GetLiveCellCount()).toEqual(3);  //confirm setup

        board.Evaluate();
        expect(board.GetLiveCellCount()).toEqual(1);  //cells 0,0 and 02,2 should be removed
    });

    it ("when 2 cells have same location, then AreNeigbors returns false", function(){
       var loc1 = new Location(1,1);
       expect(board.AreNeighbors(loc1, loc1)).toBeFalsy();
    });

    it ("when 2 cells are adjacent, then AreNeigbors returns true", function(){
        var loc1 = new Location(1,1);
        var loc2 = new Location(1,2);
        expect(board.AreNeighbors(loc1, loc2)).toBeTruthy();
    });

    it ("when 2 cells are catty-corner, then AreNeigbors returns true", function(){
        var loc1 = new Location(1,1);
        var loc2 = new Location(2,2);
        expect(board.AreNeighbors(loc1, loc2)).toBeTruthy();
    });

    it ("when 2 cells arenot adjacent, then AreNeigbors returns false", function(){
        var loc1 = new Location(1,1);
        var loc2 = new Location(1,3);
        expect(board.AreNeighbors(loc1, loc2)).toBeFalsy();
    });
});
