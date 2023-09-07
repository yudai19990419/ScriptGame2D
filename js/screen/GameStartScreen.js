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
        this.context.fillStyle = "#000000"; // 背景色を黒にする
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.font = "12px monospace";
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
        return this.haveNotification;
    }

    // IScreenの実装
    getNotification(){
        return this.requestCode;
    }
}