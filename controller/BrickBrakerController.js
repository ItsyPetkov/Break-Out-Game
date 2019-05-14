"use strict";
/* globals BrickBreakerView */
var view = new BrickBreakerView();
var controller;

function BrickBreakerController(){

    this.display = function () {
        view.drawObjects();
    };
}

controller = new BrickBreakerController();
window.addEventListener("load", controller.display);
