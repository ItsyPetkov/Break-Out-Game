"use strict";

function BrickBreakerView() {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    var paddle = new Paddle(325,1150,250,25);
    var ball = new Ball(canvas.width/2, canvas.height/2, 20);
    var bricks = [];
    var rows = 15;
    var columns = 4;
    var velocity = 0;
    var bricksDestroyed = 0;

    for(var i = 0; i < columns; i++){
        bricks[i] = [];
        for(var j = 0 ; j < rows; j++){
            bricks[i][j] = {x: 0, y: 0, state: 1};
        }
    }

     this.drawObjects = function () {
         ctx.clearRect(0,0,canvas.width,canvas.height);

         //drawing the bricks
         for(var k = 0; k < columns; k++){
             for(var l = 0; l < rows; l++){
                 if(bricks[k][l].state === 1){
                     var brickXPos = (l * (50 + 10)) + 10;
                     var brickYPos = (k * (105 + 10)) + 10;
                     bricks[k][l].x = brickXPos;
                     bricks[k][l].y = brickYPos;
                     ctx.beginPath();
                     ctx.rect(brickXPos, brickYPos, 50, 105);
                     ctx.fillStyle = "#1B5E20";
                     ctx.fill();
                     ctx.closePath();
                 }
             }
         }

         //drawing the paddle
         ctx.beginPath();
         ctx.rect(paddle.getxCord(), paddle.getyCord(), paddle.getWidth(), paddle.getHeight());
         ctx.fillStyle = "#1B5E20";
         ctx.fill();
         ctx.closePath();

         //drawing the ball
         ctx.beginPath();
         ctx.arc(ball.getXPos(), ball.getYPos(), ball.getRadius(), 0, 360);
         ctx.fillStyle = "#00C853";
         ctx.fill();
         ctx.stroke();
         ctx.closePath();

         //change direction if the ball collides with the walls of the canvas
         if(ball.getYPos() > canvas.height - ball.getRadius()){
             ball.setYSpeed(ball.getYSpeed() * -1);
             document.location.reload();
         }

         if( ball.getYPos() - ball.getRadius() < 0){
             ball.setYSpeed(ball.getYSpeed() * -1);
         }

         if(ball.getXPos() > canvas.width - ball.getRadius() || ball.getXPos() < ball.getRadius()){
             ball.setXSpeed(ball.getXSpeed() * -1);
         }

         //change direction if the ball collides with the paddle
         if(ball.getYPos() < paddle.getyCord() &&
             ball.getYPos() > paddle.getyCord() - ball.getRadius() &&
             ball.getXPos() > paddle.getxCord() - ball.getRadius() &&
             ball.getXPos() < paddle.getxCord() + paddle.getWidth() + ball.getRadius() &&
             ball.getYPos() > 0)
         {
             ball.setYSpeed(ball.getYSpeed() * -1);
         }

         //change direction if the ball collides with a brick
         for(var i = 0; i < columns; i++){
             for(var j = 0; j < rows; j++){
                 var currentBrick = bricks[i][j];
                 if(currentBrick.state === 1){
                     if(ball.getXPos() - ball.getRadius() > currentBrick.x && ball.getXPos() - ball.getRadius() < currentBrick.x + 50 &&
                        ball.getYPos() - ball.getRadius() > currentBrick.y && ball.getYPos() - ball.getRadius() < currentBrick.y + 105)
                     {
                         ball.setYSpeed(ball.getYSpeed() * -1);
                         currentBrick.state = 0;
                         bricksDestroyed++;
                         if(bricksDestroyed === 60){
                             document.location.reload();
                         }
                     }
                 }
             }
         }

         //moving the ball
         ball.setXPos(ball.getXPos() + ball.getXSpeed());
         ball.setYPos(ball.getYPos() + ball.getYSpeed());


    };

    setInterval(this.drawObjects, 10);

    //making the paddle move
    if (window.DeviceMotionEvent){
        window.addEventListener("devicemotion", function(event){
            var x = event.accelerationIncludingGravity.x, y=event.accelerationIncludingGravity.y, z=event.accelerationIncludingGravity.z, roll;
            roll = Math.atan( -x / Math.sqrt(y*y + z*z)) * 180 / Math.PI;
            if(roll < -10 && paddle.getxCord() > 0){
                velocity = -10;
                paddle.setxCord(paddle.getxCord() + velocity);
            }
            else if(roll > 10 && paddle.getxCord() < canvas.width - paddle.getWidth()){
                velocity = 10;
                paddle.setxCord(paddle.getxCord() + velocity);
            }else{
                velocity = 0;
                paddle.setxCord(paddle.getxCord() + velocity);
            }
        });
    }

}
