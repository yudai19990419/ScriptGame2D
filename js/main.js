"use strict"
const TEXT_FONT = "50px monospace";

window.onload = function(){
    const canvas = document.getElementById("main");
    const context = canvas.getContext("2d");
    context.font = TEXT_FONT;
    context.fillText("Hello world", 0, 64);
    context.fillText("change file", 20, 100);
    context.fillTect("push request", 0, 0);
}