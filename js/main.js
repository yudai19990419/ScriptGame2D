"use strict"

window.onload = function(){
    const canvas = document.getElementById("main");
    const context = canvas.getContext("2d");
    context.fillText("Hello world", 0, 64);
}