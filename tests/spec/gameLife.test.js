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
        board = new Board();
        board.Initialize();
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
 });
