class TextMaker {

    /**
     * 初期化関数
     * @param {context} context HTMLElementから取得したコンテキスト
     * @param {String} message 表示させるメッセージ
     */
    static drawMessage(context, message) {
        console.log("drawMessage()");
        context.fillStyle = "rgba( 0, 0, 0, 0.75 )";
        context.fillRect( 4, 84, 120, 30 );
    
        context.font = "12px monospace";
        context.fillStyle = "#ffffff";
        context.fillText( gMessage1, 6, 96 );
    }

    static DrawStatus(){

    }
}