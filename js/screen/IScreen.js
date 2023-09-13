class IScreen {

    constructor(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.message = "";
    }
    
    /**
     * 初期化関数
     */
    init(){
        this.canvas = document.getElementById("main");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
    }

    /**
     * 画面描画関数
     */
    createScreen(){
        throw "実装されていません";
    }

    /**
     * キーボード入力のコールバック関数
     * @param {int} direction DIRECTION(enum)
     */
    inputDirection(direction){
        throw "実装されていません";
    }

    /**
     * 通知があったかの確認関数
     * @returns {boolean}
     */
    isNotification(){
        throw "実装されていません";
    }

    /**
     * 通知取得関数
     * @returns {int} REQUEST_CODE
     */
    getNotification(){
        throw "実装されていません";
    }

    /**
     * Playerのステータスをセットする関数
     * @returns {CharacterStatus} キャラクターのステータス
     */
    setPlayerStatus(status){
        return;
    }

    /**
     * 敵キャラのステータスをセットする関数
     * @returns {CharacterStatus} キャラクターのステータス
     */
    setEnemyStatus(status){
        return;
    }

    /**
     * 逃げた結果をセットする関数
     * @returns {bool} 成功・失敗
     */
    setEscapeResult(result){
        return;
    }

    /**
     * 画面サイズの設定関数
     * @param {int} width 横幅
     * @param {int} height 縦幅
     */
    setScreenSize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.imageSmoothingEnabled = this.contextmsImageSmoothingEnabled = 0;

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        if( this.width / 120 < this.height / 128 ){
            this.height = this.width * 128 / 120;
        }else{
            this.width  = this.height * 120 / 128;
        }

        this.resetScreen();
        this.createScreen();
    }

    /**
     * 画面全体クリア関数
     */
    resetScreen(){
        // 画面全体をクリアする
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    /**
     * 初期化関数
     * @param {String} message 表示させるメッセージ
     */
    drawMessage(message) {
        console.log("drawMessage()");
        this.context.lineWidth = 2;
        this.context.strokeStyle = "#ffffff";
        this.context.strokeRect( 10, this.height - 200, this.width - 20, 190);
        this.context.fillStyle = "rgba( 0, 0, 0, 0.75 )";
        this.context.fillRect( 10, this.height - 200, this.width - 20, 190);
    
        this.context.font = "12px monospace";
        this.context.fillStyle = "#ffffff";
        this.context.fillText( message, 6, 96 );
    }

    drawStatus(status) {

    }
}