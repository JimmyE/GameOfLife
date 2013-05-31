// requires gameLife.js
(function() {
    var self = this;
    var svg;
    var turnCntr = 0;
    var circleRadius = 5;    //radius
    var cellSize = 10;
    var boardSize = 310;


    $(document).ready(function() {

        $('body').on('click', '#StartGame', self.startGame);

        $('body').on('click', '#NextTurn', self.nextTurn);

        $('body').on('click', 'circle', self.circleClick);

        $('#NextTurn').attr('disabled', true);
        $('svg')
            .attr('width', boardSize)
            .attr('height', boardSize);

        svg = d3.select('svg');

        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .style('fill', "white")
            .on("click", self.clickGameSquare);
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

        self.turnCntr = 1;
        $('#NextTurn').attr('disabled', false);

        self.renderBoard();
    };

    this.nextTurn = function() {
        self.turnCntr = self.turnCntr  + 1;
        self.game.NextTurn();
        self.renderBoard();
    };

    this.circleClick = function() {
        var cx = $(this).attr('cx');
        var cy = $(this).attr('cy');
        console.log("circle click, data-loc: " + $(this).data('loc'));
        var cell = self.convertCoordinateToCell(cx, cy);
    };

    this.clickGameSquare = function(d, i) {
        var clickXY = d3.mouse(this);
        var cx = clickXY[0];
        var cy = clickXY[1];
        var cell = self.convertCoordinateToCell(cx, cy);
        self.addNewCell(cell);
    };

    this.convertCoordinateToCell = function(cx,cy) {
        var x = Math.floor(cx / cellSize);
        var y = Math.floor(cy / cellSize);
        return new Location(x, y);
    };

    this.addNewCell = function(location) {
        var board = self.game.GetBoard();
        board.AddCell(location);
        self.renderBoard();
    };

    this.renderBoard = function() {
        var board = self.game.GetBoard();

        var cells = board.getCells();

        console.log("turn #" + self.turnCntr + "  live cells " + cells.length);

        var coor = [];

        for (var i = 0; i < cells.length; i++ ){
        //    console.log("cell:", cells[i]);
            coor.push(self.convertLocationToD3Coordinate(cells[i]));
        }

        //console.log(coor);
        var d3Board = svg.selectAll("circle")
                         .data(coor);

        d3Board.enter().append("circle");
        d3Board.exit().remove();

        //update/refresh
        d3Board
            .transition()
            .duration(500)
            .attr('cx', function(d) { return (d[0] + 1) * cellSize;} )
            .attr('cy', function(d) { return (d[1] + 1) * cellSize;} )
            .attr('r', circleRadius)//todo? can't use self.circleRadius; why?
            .attr('data-loc', function(d) { return d[0] + "," + d[1];})
            .style('fill', function(d) {
                if (d[2] ){
                    return 'green';  //safe, cell will live another turn
                }
                return 'black';
            });
//            .style('fill', 'blue');

        $('#TurnFld').text(self.turnCntr);
    };

    this.convertLocationToD3Coordinate = function (location) {
//        var newX = (location.X + 1) * 10;
//        var newY = (location.Y + 1) * 10;
        return [ location.X, location.Y, location.SafeCell];
    };

    this.getTestData1 = function () {

        var cells = [
            new Location(0,0),
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
            new Location(12,20),
            new Location(0, 10),
            new Location(0, 11),
            new Location(20,10),
            new Location(20,11),
            new Location(19,10),
            new Location(22,10),
            new Location(22,11),
            new Location(23,10),
            new Location(29,29)
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
