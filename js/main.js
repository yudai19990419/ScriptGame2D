"use strict"


// 画面が起動したら
window.onload = function(){
    
    // 30フレームで定義
    const gFleam = 30;
    // ゲームマネージャークラス
    const manager = new GameManager();
    // 画面サイズを合わせる
    resize();
    
    // 定期的に関数を呼び出す(gFleam毎)
    setInterval( function() {
        manager.job();
    }, gFleam);

    function inputIvent(event) {
        manager.input(event);
    }

    function resize(){
        // manager.setScreenSize(window.innerWidth, window.innerHeight);
    }

    // TODO:ここが動かないため修正必須
    // 非同期の処理のため、クラスが定義されていないことになる
    document.addEventListener('keydown', inputIvent);
    window.addEventListener( "resize", function(){ resize() } );
}