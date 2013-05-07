describe ("Life Rules" , function() {

    beforeEach(function() {
        cell = new Cell();
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
        var c1 = new Cell(loc);

        expect(c1.Location.X).toEqual(1);
        expect(c1.Location.Y).toEqual(2);
    });

    it ("when class ctor not given location then use default loc", function(){
        var c1 = new Cell();

        expect(c1.Location).toBeTruthy();
    });
});

describe ("Board layout", function(){
    beforeEach(function() {
        board = new Board(3,3);
    });

    describe("AreNeighbors", function() {
        it ("when cells same row and next column then return true", function() {
            var c1 = new Cell(new Location(1,2));
            var c2 = new Cell(new Location(1,3));

            expect(board.AreNeighbors(c1, c2)).toBeTruthy();
        });

        it ("when cells catty-corner then return true", function() {
            var c1 = new Cell(new Location(1,2));
            var c2 = new Cell(new Location(2,3));

            expect(board.AreNeighbors(c1, c2)).toBeTruthy();
        });

        it ("when cells same row and 2 columns away then return false", function() {
            var c1 = new Cell(new Location(1,2));
            var c2 = new Cell(new Location(1,4));

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


});

