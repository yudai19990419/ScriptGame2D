class BattleScreen extends IScreen {

    constructor(){
        super();
        this.init();
        this.requestCode = -1;
        this.haveNotification = false;
        this.arrowIndex = 0;
        this.image = null;
        this.corrdinate = null;
    }

    // IScreenの実装
    createScreen(){
        console.log("BattleScreen::createScreen()");
        // 画面をクリアする
        this.resetScreen(this.context);
        this.context.fillStyle = "#000000"; // 背景色を黒にする
        this.context.fillRect(0, 0, this.width, this.height);

        this.drawMessage(this.message);
        this.#drawCommand();
        if(this.playerStatus != null){
            this.drawStatus(this.playerStatus);
        }
        this.#drawEnemyImage();
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
     * @param {bool} result 成功・失敗
     */
    setEscapeResult(result){
        if(result){
            this.haveNotification = true;
            this.requestCode = REQUEST_CODE.ESCAPE_SUCCESS;
            return;
        }

        this.drawMessage("逃げられませんでした。");
    }

    setEnemyImage(image, corrdinate){
        this.image = image;
        this.corrdinate = corrdinate;
        this.#drawEnemyImage();
    }

    /**
     * メッセージ描画関数(override)
     * @param {String} message 表示させるメッセージ
     */
     drawMessage(message) {
        console.log("drawMessage()");
        this.resetScreen(this.messageContext);
        this.messageContext.lineWidth = 2;
        this.messageContext.strokeStyle = "#ffffff";
        this.messageContext.strokeRect( 190, this.height - 200, this.width - 200, 190);
        // 薄い黒で塗りつぶす
        this.messageContext.fillStyle = "rgba( 0, 0, 0, 0.75 )";
        this.messageContext.fillRect( 190, this.height - 200, this.width - 200, 190);
    
        this.messageContext.font = "40px monospace";
        this.messageContext.fillStyle = "#ffffff";
        this.messageContext.fillText( message, 310, this.height - 160 );
    }

    #drawCommand(){
        console.log("drawCommand()");

        this.resetScreen(this.statusContext)
        this.statusContext.lineWidth = 2;
        this.statusContext.strokeStyle = "#ffffff";
        this.statusContext.strokeRect( 10, this.height - 200, 180, 190);
        this.statusContext.fillStyle = "rgba( 0, 0, 0, 0.75 )";
        this.statusContext.fillRect( 10, this.height - 200, 180, 190);
        
        this.statusContext.font = "30px monospace";
        this.statusContext.fillStyle = "#ffffff";

        var commands = ["戦う", "逃げる"];
        var height = this.height - 160;
        commands.forEach((command, index) => {
            if(index == this.arrowIndex){
                command = "=> " + command;
            }
            else{
                command = "      " + command;
            }

            this.statusContext.fillText( command, 20, height );
            height += 50;
        })

        this.drawStatus();
    }

    #drawEnemyImage(){
        console.log("drawEnemyImagea()");
        if(this.image == null || this.corrdinate == null){
            return;
        }

        this.resetScreen(this.playerContext)
        this.playerContext.drawImage(this.image, this.corrdinate[0], 0, this.image.width/4, this.corrdinate[1], 300, 400, 32, 32);
    }
}