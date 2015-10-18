(function () {
    //init canvas
    var canvas = document.querySelector("#canvas");
    var canvasSize = 501;
    var gridSize = 100;
    var maxX = parseInt(canvasSize / gridSize, 10);
    var maxY = parseInt(canvasSize / gridSize, 10);
    canvas.width = canvas.height = canvasSize;
    var ctx = canvas.getContext("2d");

    //map draw
    var Map = function () {
        var clear = function () {
            ctx.clearRect(0, 0, canvasSize, canvasSize);
        };

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
        };

        return {
            clear: clear,
            draw: draw,
        };
    };

    //draw animation
    var Animation = function(imgSrc) {
        var img = document.createElement("img");
        img.src = imgSrc;
        var frameSize = 30;
        var imageSize = 98;
        var status = [];
        var frames = [];
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

        var addStatus = function(s) {
            status.push(s);
        };

        var run = function() {
            for(var i=0; i<status.length; i++) {
                var s = status[i];
                var nextS = status[i+1];
                if (!nextS) break;
                //console.log(s);

                //((nextS.direction - 3) * 90 - (s.direction - 3) * 90) / frameSizeframeSize;
                diffAngle =  (nextS.direction - s.direction) * 90 / frameSize;
                diffX = (nextS.x - s.x) * gridSize / frameSize;
                diffY = (nextS.y - s.y) * gridSize / frameSize;

                startAngle = (s.direction - 3) * 90;
                startX = s.x * gridSize;
                startY = s.y * gridSize;
                for (var j=1; j<=frameSize; j++) {
                    frames.push({
                        img: img,
                        x: startX + j*diffX,
                        y: startY + j*diffY,
                        angle: startAngle + j*diffAngle
                    });
                }
                setTimeout(function(){
                    draw();
                }, 1000/frameSize);
            }
        };

        var draw = function(prevFrame) {
            var frame = frames.shift();
            if (!frame) return;
            if (prevFrame) {
                ctx.clearRect(prevFrame.x, prevFrame.y, prevFrame.x + imageSize, prevFrame.y + imageSize);
            }
            //map.clear();
            map.draw();
            drawRotatedImage(frame.img, frame.x + 50, frame.y + 50, frame.angle);
            setTimeout(function(){
                draw(frame);
            }, 1000/frameSize);
        };

        var clearStatus = function() {
            status = [];
            frames = [];
        };

        return {
            addStatus: addStatus,
            clearStatus: clearStatus,
            run: run
        };
    };
    var map = new Map();
    map.draw();

    var Robot = function(robotName, initX, initY) {
        var name = robotName;
        var x = initX || 0;
        var y = initY || 0;
        var direction = 3;//up, right, down, left
        var am = new Animation("images/robot.png");
        var init = function () {
            setAnimation();
            setAnimation();
        };

        var setAnimation = function () {
            am.addStatus(getStatus());
        };

        var getStatus = function() {
            return {
                name: name,
                x: x,
                y: y,
                direction: direction
            };
        };

        var forward = function () {
            switch (direction) {
                case 1: //up
                    y -= 1;
                    if(y < 0)
                        y = 0;
                    break;
                case 2: //right
                    x += 1;
                    if (x >= maxX)
                        x = maxX - 1;
                    break;
                case 3: //down
                    y += 1;
                    if (y >= maxY)
                        y = maxY - 1;
                    break;
                case 4: //left
                    x -= 1;
                    if (x < 0)
                        x = 0;
                    break;
            }
            setAnimation();
        };

        var backward = function () {
            switch (direction) {
                case 1: //up
                    y += 1;
                    if (y >= maxY)
                        y = maxY - 1;
                    break;
                case 2: //right
                    x -= 1;
                    if (x < 0)
                        x = 0;
                    break;
                case 3: //down
                    y -= 1;
                    if(y < 0)
                        y = 0;
                    break;
                case 4: //left
                    x += 1;
                    if (x >= maxX)
                        x = maxX - 1;
                    break;
            }
            setAnimation();
        };

        var turnLeft = function () {
            direction -= 1;
            if (direction <= 0)
                direction = 4;
            am.addStatus(getStatus());
        };

        var turnRight = function () {
            direction += 1;
            if (direction > 4)
                direction = 1;
            setAnimation();
        };

        var run = function() {
            am.run();
        };

        init();

        return {
            forward: forward,
            backward: backward,
            turnLeft: turnLeft,
            turnRight: turnRight,
            run: run
        };
    }

    window.Map = map;
    window.Robot = Robot;
})();