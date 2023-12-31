"use strict"


// 画面が起動したら
window.onload = function(){
    // 30フレームで定義
    const gFrame = 30;
    // ゲームマネージャークラス
    const manager = new GameManager();
    // 画面サイズを合わせる
    resize();

    // 定期的に関数を呼び出す(gFrame毎)
    setInterval( function() {
        manager.job();
    }, gFrame);

    function inputEvent(event) {
        manager.input(event);
    }

    function resize(){
        manager.setScreenSize(window.innerWidth, window.innerHeight);
    }

    // TODO:ここが動かないため修正必須
    // 非同期の処理のため、クラスが定義されていないことになる
    document.addEventListener('keydown', inputEvent);
    window.addEventListener( "resize", function(){ resize() } );
}