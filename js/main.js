"use strict"
const TEXT_FONT = "50px monospace";

window.onload = function(){
    const canvas = document.getElementById("main");
    const context = canvas.getContext("2d");
    context.font = TEXT_FONT;
    context.fillText("Hello world", 0, 64);
    context.fillText("update file", 20, 100);a59f694ad6dd6973c4d6367f24182af36d856
}