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
        let canvas = document.getElementById("main");
        let ctx = canvas.getContext("2d");
        let imgGara = new Image();
        imgGara.src = "img/garashi_dt.png";
        imgGara.onload = function() {
            ctx.drawImage(imgGara, 0, 0, imgGara.width, imgGara.height, 0, 0, window.innerWidth, window.innerHeight);
            ctx.font      = "100px monospace";
            ctx.fillStyle = "#000000";
            ctx.fillText("Enterでゲームスタート", 400, 900);

            ctx.font      = "200px serif";
            ctx.strokeStyle = '#43b885';
            ctx.lineWidth = 2;
            ctx.strokeText("イガラシクエスト", 50, 200);
        }
        
        // this.context.fillStyle = "#000000"; // 背景色を黒にする
        // this.context.fillRect(0, 0, this.width, this.height);

        // this.context.font      = "50px monospace";
	    // this.context.fillStyle = "#000000";
        // this.context.fillText("Enterでゲームスタート", 40, 70);
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