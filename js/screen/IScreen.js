class IScreen {

    constructor(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.message = "";
        this.playerStatus = null;
    }
    
    /**
     * 初期化関数
     */
    init(){
        this.canvas           = document.getElementById("main");
        this.backgroundCanvas = document.getElementById("background");
        this.playerCanvas     = document.getElementById("player");
        this.messageCanvas    = document.getElementById("message");
        this.statusCanvas     = document.getElementById("status");

        this.canvas.width           = this.width;
        this.backgroundCanvas.width = this.width;
        this.playerCanvas.width     = this.width;
        this.messageCanvas.width    = this.width;
        this.statusCanvas.width     = this.width;

        this.canvas.height           = this.height;
        this.backgroundCanvas.height = this.height;
        this.playerCanvas.height     = this.height;
        this.messageCanvas.height    = this.height;
        this.statusCanvas.height     = this.height;

        this.context        = this.canvas.getContext("2d");
        this.context2       = this.backgroundCanvas.getContext("2d");
        this.pContext       = this.playerCanvas.getContext("2d");
        this.messageContext = this.messageCanvas.getContext("2d");
        this.statusContext  = this.statusCanvas.getContext("2d");
    }

    /**
     * 画面更新関数
     */
    updateScreen(){
        this.createScreen();
        if(this.playerStatus != null){
            // this.drawStatus(this.playerStatus);
        }
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
        console.log(status);
        this.playerStatus = status;
        // this.drawStatus(this.playerStatus);
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
        // this.canvas.width = width;
        // this.canvas.height = height;
        // this.context.imageSmoothingEnabled = this.contextmsImageSmoothingEnabled = 0;

        // this.width = this.canvas.width;
        // this.height = this.canvas.height;

        // if( this.width / 120 < this.height / 128 ){
        //     this.height = this.width * 128 / 120;
        // }else{
        //     this.width  = this.height * 120 / 128;
        // }

        this.reSizeScreen(this.canvas          , this.context       , width, height);
        this.reSizeScreen(this.backgroundCanvas, this.context2      , width, height);
        this.reSizeScreen(this.playerCanvas    , this.pContext      , width, height);
        this.reSizeScreen(this.messageCanvas   , this.messageContext, width, height);
        this.reSizeScreen(this.statusCanvas    , this.statusContext , width, height);

        // this.resetScreen();
        this.createScreen();
    }

    reSizeScreen(canvas, context, width, height){
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = this.contextmsImageSmoothingEnabled = 0;

        width = this.canvas.width;
        height = this.canvas.height;

        if( width / 120 < height / 128 ){
            height = width * 128 / 120;
        }else{
            width  = height * 120 / 128;
        }
    }

    /**
     * 画面全体クリア関数
     */
    resetScreen(context){
        console.log("IScreen::resetScreen()");
        // 画面全体をクリアする
        context.clearRect(0,0, this.width, this.height);
    }

    resetScreenAll() {
        this.resetScreen(this.context);
        this.resetScreen(this.context2);
        this.resetScreen(this.pContext);
        this.resetScreen(this.messageContext);
        this.resetScreen(this.statusContext);
    }

    /**
     * 初期化関数
     * @param {String} message 表示させるメッセージ
     */
    drawMessage(message) {
        console.log("drawMessage()");
        this.resetScreen(this.messageContext)
        this.messageContext.lineWidth = 2;
        this.messageContext.strokeStyle = "#ffffff";
        this.messageContext.strokeRect( 10, this.height - 200, this.width - 20, 190);
        this.messageContext.fillStyle = "rgba( 0, 0, 0, 0.75 )";
        this.messageContext.fillRect( 10, this.height - 200, this.width - 20, 190);
    
        this.messageContext.font = "30px monospace";
        this.messageContext.fillStyle = "#ffffff";
        this.messageContext.fillText( message, 20, this.height - 160 );
    }

    drawStatus(context) {
        console.log("drawStatus()");
        this.resetScreen(context)
        context.lineWidth = 2;
        context.strokeStyle = "#ffffff";
        context.strokeRect(/*x=*/10, /*y=*/10, /*width=*/180, /*height=*/100);
        context.fillStyle = "rgba( 0, 0, 0, 0.75 )";
        context.fillRect  (/*x=*/10, /*y=*/10, /*width=*/180, /*height=*/100);
    
        context.font = "30px monospace";
        context.fillStyle = "#ffffff";
        
        const player = Player.getInstance();
        let hp = `HP : ${player.hp}`;
        context.fillText( hp, 20, 40 );
        let lv = `Lv : ${player.level}`;
        context.fillText( lv, 20, 70 );
        let ex = `Ex : ${player.experiencePoint} / ${player.maxExperiencePoint}`;
        context.fillText( ex, 20, 100 );
    }
}