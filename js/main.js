"use strict"
const TEXT_FONT = "50px monospace";

window.onload = function(){
    const canvas = document.getElementById("main");
    const context = canvas.getContext("2d");
    context.font = TEXT_FONT;
    context.fillText("Hello world", 0, 64);
    
}