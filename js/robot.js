(function () {
    //init canvas
    var canvas = document.querySelector("#canvas");
    var canvasSize = 501;
    var gridSize = 100;
    var maxX = parseInt(canvasSize/gridSize, 10);
    var maxY = parseInt(canvasSize/gridSize, 10);
    canvas.width = canvas.height = canvasSize;
    var ctx = canvas.getContext("2d");

    //map draw
    var Map = function () {
        var clear = function () {
            ctx.clearRect(0, 0, canvasSize, canvasSize);
        }
        var draw = function () {
            ctx.beginPath();
            ctx.lineWidth = 1;
            for (var i = 0.5; i <= canvasSize; i += gridSize) {
                ctx.moveTo(i,0.5);
                ctx.lineTo(i, 500.5);
                ctx.moveTo(0.5, i);
                ctx.lineTo(500.5, i);
            }
            ctx.stroke();
        }
        return {
            clear: clear,
            draw: draw,
        }
    }

    var Robot = function(robotName, initX, initY) {
        var name = robotName;
        var posX = initX || 0;
        var posY = initY || 0;
        var direction = 3;//up, right, down, left
        var img = document.createElement("img");
        img.src = "images/robot.png";
        var init = function () {
            log("init");
            draw();
        };

        var getStatus = function() {
            return {
                name: name,
                posX: posX,
                posY: posY,
                direction: direction
            };
        };
        /*
            ref: http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
        */
        var drawRotatedImage = function (image, x, y, angle) {
            // save the current co-ordinate system
            // before we screw with it
            ctx.save();

            // move to the middle of where we want to draw our image
            ctx.translate(x, y);

            // rotate around that point, converting our
            // angle from degrees to radians
            ctx.rotate(angle * Math.PI/180);

            // draw it up and to the left by half the width
            // and height of the image
            ctx.drawImage(image, -(image.width/2), -(image.height/2));

            // and restore the co-ords to how they were when we began
            ctx.restore();
        };

        var draw = function () {
            console.log(getStatus());
            //ctx.drawImage(img, posX*100, posY*100);
            var angle = (direction - 3) * 90;
            drawRotatedImage(img, posX*100 + 50, posY*100 + 50, angle);
        };

        var log  = function ( string ) {
            console.log( name + ': ' + string );
        };

        var forward = function () {
            log ( 'forward' );
            switch (direction) {
                case 1: //up
                    posY -= 1;
                    if(posY < 0)
                        posY = 0;
                    break;
                case 2: //right
                    posX += 1;
                    if (posX >= maxX)
                        posX = maxX - 1;
                    break;
                case 3: //down
                    posY += 1;
                    if (posY >= maxY)
                        posY = maxY - 1;
                    break;
                case 4: //left
                    posX -= 1;
                    if (posX < 0)
                        posX = 0;
                    break;
            }
            draw();
        };

        var back = function () {
            log ( 'back' );
            switch (direction) {
                case 1: //up
                    posY += 1;
                    if (posY >= maxY)
                        posY = maxY - 1;
                    break;
                case 2: //right
                    posX -= 1;
                    if (posX < 0)
                        posX = 0;
                    break;
                case 3: //down
                    posY -= 1;
                    if(posY < 0)
                        posY = 0;
                    break;
                case 4: //left
                    posX += 1;
                    if (posX >= maxX)
                        posX = maxX - 1;
                    break;
            }
            draw();
        };

        var turnLeft = function () {
            log ( 'turnLeft' );
            direction -= 1;
            if (direction <= 0)
                direction = 4;
            draw();
        };

        var turnRight = function () {
            log ( 'turnRight' );
            direction += 1;
            if (direction > 4)
                direction = 1;
            draw();
        };
        init();
        return {
            forward: forward,
            back: back,
            turnLeft: turnLeft,
            turnRight: turnRight
        };
    }

    window.Map = Map;
    window.Robot = Robot;
})();