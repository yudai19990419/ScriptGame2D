class GameStartScreen extends IScreen {

    constructor(){
        super();
        this.init();
        this.requestCode = -1;
        this.haveNotification = false;
    }

    // IScreenの実装
    createScreen(){
        console.log("GameStartScreen::createScreen()");
        // 画面をクリアする
        this.resetScreen(this.context);
        // 画像の表示
        let imgGara = Illustrator.getInstance().imgGaraDt;
        this.context.drawImage(imgGara, 0, 0, imgGara.width, imgGara.height, 0, 0, window.innerWidth, window.innerHeight);
        
        this.context.font      = "200px serif";
        this.context.strokeStyle = '#43b885';
        this.context.lineWidth = 2;
        this.context.strokeText("イガラシクエスト", window.innerWidth / 2, 200);
        this.context.textAlign = "center";
        
        this.context.font      = "100px monospace";
        this.context.fillStyle = "#000000";
        this.context.fillText("Enterでゲームスタート", window.innerWidth / 2, window.innerHeight / 4 * 3);
        
        // this.context.fillStyle = "#000000"; // 背景色を黒にする
        // this.context.fillRect(0, 0, this.width, this.height);
    }
    
    // IScreenの実装
    inputDirection(direction){
        if(direction == DIRECTION.ENTER.code){
            this.haveNotification = true;
            this.requestCode = REQUEST_CODE.GAME_START;
        }
    }

    // IScreenの実装
    isNotification(){
        let ret = this.haveNotification;
        this.haveNotification = false;
        return ret;
    }

    // IScreenの実装
    getNotification(){
        return this.requestCode;
    }

    setPlayerStatus(status){
        // 何もしない
        return;
    }
}