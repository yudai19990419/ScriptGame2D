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
        this.context.fillStyle = "#000000"; // 背景色を黒にする
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.font = "30px monospace";
	    this.context.fillStyle = "#ffffff";
        this.context.fillText("Enterでゲームスタート", 40, 40);
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