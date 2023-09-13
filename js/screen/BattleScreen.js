class BattleScreen extends IScreen {

    constructor(){
        super();
        this.init();
        this.requestCode = -1;
        this.haveNotification = false;
        this.arrowIndex = 0;
    }

    // IScreenの実装
    createScreen(){
        console.log("GameStartScreen::createScreen()");
        // 画面をクリアする
        this.resetScreen();
        this.context.fillStyle = "#000000"; // 背景色を黒にする
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.font = "30px monospace";
	    this.context.fillStyle = "#ffffff";
        this.context.fillText("BATTLE SCREEN", 100, 100);
        this.drawMessage(this.message);
        this.#drawCommand();
        if(this.enemyStatus != null){
            this.drawStatus(this.enemyStatus);
        }
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

    /**
     * Playerのステータスをセットする関数
     * @returns {CharacterStatus} キャラクターのステータス
     */
     setPlayerStatus(status){
        console.log(this.status);
        this.playerStatus = status;

    }

    /**
     * 敵キャラのステータスをセットする関数
     * @returns {CharacterStatus} キャラクターのステータス
     */
    setEnemyStatus(status){
        console.log(this.status);
        this.enemyStatus = status;
        this.message = status.character.toString() + "が現れた。";
        this.drawMessage(this.message);
    }

    /**
     * 逃げた結果をセットする関数
     * @returns {bool} 成功・失敗
     */
    setEscapeResult(result){
        return;
    }

    /**
     * 初期化関数
     * @param {String} message 表示させるメッセージ
     */
     drawMessage(message) {
        console.log("drawMessage()");
        this.context.lineWidth = 2;
        this.context.strokeStyle = "#ffffff";
        this.context.strokeRect( 190, this.height - 200, this.width - 200, 190);
        this.context.fillStyle = "rgba( 0, 0, 0, 1 )";
        this.context.fillRect( 190, this.height - 200, this.width - 200, 190);
        this.context.fillStyle = "rgba( 0, 0, 0, 0.75 )";
        this.context.fillRect( 190, this.height - 200, this.width - 200, 190);
    
        this.context.font = "40px monospace";
        this.context.fillStyle = "#ffffff";
        this.context.fillText( message, 310, this.height - 160 );
    }

    #drawCommand(){
        console.log("drawCommand()");
        if(this.playerStatus == null){
            return;
        }

        this.context.lineWidth = 2;
        this.context.strokeStyle = "#ffffff";
        this.context.strokeRect( 10, this.height - 200, 180, 190);
        this.context.fillStyle = "rgba( 0, 0, 0, 0.75 )";
        this.context.fillRect( 10, this.height - 200, 180, 190);
        
        this.context.font = "30px monospace";
        this.context.fillStyle = "#ffffff";

        var commands = ["戦う", "逃げる"];
        var height = this.height - 160;
        commands.forEach((command, index) => {
            if(index == this.arrowIndex){
                command = "=> " + command;
            }
            else{
                command = "      " + command;
            }

            this.context.fillText( command, 20, height );
            height += 50;
        })
    }
}