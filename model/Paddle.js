"use strict";

//xuc and yuc stand for x-coordinate of upper-left corner and y-coordinate of upper-left corner
function Paddle(xuc, yuc, width, height){
    var xCordUpperCorner = xuc;
    var yCordUpperCorner = yuc;
    var rectWidth = width;
    var rectHeight = height;

    this.getHeight = function () {
        return rectHeight;
    };

    this.getWidth = function () {
        return rectWidth;
    };

    this.getxCord = function () {
        return xCordUpperCorner;
    };

    this.getyCord = function () {
        return yCordUpperCorner;
    };

    this.setxCord = function (number) {
        xCordUpperCorner = number;
    };

}
