class GameOverScreen extends IScreen {

    constructor(){
        super();
        this.init();
    }

    // IScreenの実装
    createScreen(){
        console.log("GameOverScreen::createScreen()");
        // 画面をクリアする
        this.resetScreen(this.context);
        let canvas = document.getElementById("main");
        let ctx = canvas.getContext("2d");
        let imgGara = new Image();
        imgGara.src = "img/garashi.png";
        imgGara.onload = function() {
            ctx.drawImage(imgGara, 0, 0, imgGara.width, imgGara.height, 0, 0, window.innerWidth, window.innerHeight);
            ctx.font      = "120px monospace";
            ctx.fillStyle = "#000000";
            ctx.fillText("GAME OVER", 500, 120);

            ctx.font      = "100px monospace";
            ctx.fillStyle = "#000000";
            ctx.fillText("でた！負け惜しみィ！", 460, 880);

            ctx.font      = "40px monospace";
            ctx.fillStyle = "#000000";
            ctx.fillText("Enterでリセット", 1000, 960);
        }
    }

    // IScreenの実装
    inputDirection(direction){
        if(direction == DIRECTION.ENTER.code){
            console.log("GameOverScreen::inputDirection()");
            this.haveNotification = true;
            this.requestCode = REQUEST_CODE.CONTINUE;
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