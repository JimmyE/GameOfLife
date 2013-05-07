/**
 * Created with JetBrains WebStorm.
 * User: jim
 * Date: 5/6/13
 * Time: 8:48 PM
 * To change this template use File | Settings | File Templates.
 */


// requires gameLife.js
(function() {
    var self = this;
    var svg;


    $(document).ready(function() {

        $('body').on('click', '#StartGame', self.startGame);

        $('body').on('click', '#NextTurn', self.nextTurn);

        svg = d3.select('svg');

    });

    //this.game;

    this.game = new GameOfLife();

    //console.log("game: ", this.game);

    this.startGame = function() {
        console.log("game: ", self.game);

        self.game.NewGame(30,30);

        var cells = self.getTestData1();

        var board = self.game.GetBoard();
        board.InitializeBoard(cells);

        self.renderBoard();
    };

    this.nextTurn = function() {

    };

    this.renderBoard = function() {
        var board = self.game.GetBoard();
        //board.PrintBoard();

        var cells = board.GetCells();
        var coor = [];

        for (var i = 0; i < cells.length; i++ ){
            coor.push(self.convertLocationToD3Coordinate(cells[i]));
        }

        //console.log(coor);
        var circle = svg.selectAll("circle")
            .data(coor);

        circle.enter().append("circle");

        circle.exit().remove();

        //update/refresh
        circle.transition()
            .duration(1500)
            .attr('cx', function(d) { return d[0];} )
            .attr('cy', function(d) { return d[1];} )
            .attr('r', 4)
            .style('fill', 'blue');

    };

    this.convertLocationToD3Coordinate = function (location) {
        //return new [ (location.X + 1) * 10, (location.Y  + 1) * 10];
        var newX = (location.X + 1) * 10;
        var newY = (location.Y + 1) * 10;
        return [ newX, newY];
    };

    this.getTestData1 = function () {

        var cells = [ new Location(1,1),
            new Location(1,2),
            new Location(1,3),
            new Location(2,1),
            new Location(2,2),
            new Location(3,2),
            new Location(3,4),
            new Location(9,2),
            new Location(9,4),
            new Location(10,3),
            new Location(10,4),
            new Location(11,3),
            new Location(12,3),
            new Location(13,3),
            new Location(16,20),
            new Location(17,20),
            new Location(17,21),
            new Location(18,19),

            new Location(12,20)
        ];
        return cells;
    };

    this.getTestDataBounds = function () {

        var cells = [
            new Location(1,0), new Location(1,1), new Location(1,2), new Location(1,3), new Location(1,4),
            new Location(1,5), new Location(1,6), new Location(1,7), new Location(1,8), new Location(1,9),
            new Location(1,10), new Location(1,11), new Location(1,12), new Location(1,13), new Location(1,14),
            new Location(1,15), new Location(1,16), new Location(1,17), new Location(1,18), new Location(1,19),
            new Location(1,20), new Location(1,21), new Location(1,22), new Location(1,23), new Location(1,24),
            new Location(1,25), new Location(1,26), new Location(1,27), new Location(1,28), new Location(1,29),

            new Location(0,0), new Location(1,0), new Location(2,0), new Location(3,0), new Location(4,0),
            new Location(5,0), new Location(6,0), new Location(7,0), new Location(8,0), new Location(9,0),
            new Location(10,0), new Location(11,0), new Location(12,0), new Location(13,0), new Location(14,0),
            new Location(15,0), new Location(16,0), new Location(17,0), new Location(18,0), new Location(19,0),
            new Location(20,0), new Location(21,0), new Location(22,0), new Location(23,0), new Location(24,0),
            new Location(25,0), new Location(26,0), new Location(27,0), new Location(28,0), new Location(29,0)
        ];

        return cells;
    }
})();
