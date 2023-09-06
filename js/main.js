"use strict"
// 30フレームで定義
const gFleam = 30;
// ゲームマネージャークラス
const manager = new GameManager();

// 画面が起動したら
window.onload = function(){
    
    // 定期的に関数を呼び出す(gFleam毎)
    setInterval( function() {
        manager.job();
    }, gFleam);
}

document.addEventListener('keyup', manager.input);