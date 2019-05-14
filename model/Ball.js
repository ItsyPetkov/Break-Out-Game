"use strict";

//x and y stand for x-position and y-position, r stands for radius
function Ball(x, y, r){
    var xPos = x;
    var yPos = y;
    var radius = r;
    var xSpeed = 0;
    var direction = Math.floor(Math.random() * 2) + 1;
    if(direction === 1){
        xSpeed = Math.floor(Math.random() * 5) + 1;
    }else if(direction === 2){
        xSpeed = (Math.floor(Math.random() * 5) + 1) * -1;
    }

    var ySpeed = -5;

    this.getXPos = function () {
        return xPos;
    };

    this.getYPos =  function () {
        return yPos;
    };

    this.getRadius = function () {
        return radius;
    };

    this.setXPos = function (number) {
        xPos = number;
    };

    this.setYPos = function (number) {
        yPos = number;
    };

    this.getXSpeed = function () {
        return xSpeed;
    };

    this.getYSpeed = function () {
        return ySpeed;
    };

    this.setXSpeed = function (number) {
        xSpeed = number;
    };

    this.setYSpeed = function (number) {
        ySpeed = number;
    };
}