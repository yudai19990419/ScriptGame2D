class BattleScreen extends IScreen {
    arrowIndex = 0;
    player   = Player.getInstance();
    opponent;
    #SECONDS_TO_DISPLAY = 1;
    mapElem;

    constructor(){
        super();
        this.init();
        this.requestCode = -1;
        this.haveNotification = false;
        this.openedCommandScreen = false;
    }

    // IScreenの実装
    createScreen(){
        console.log("BattleScreen::createScreen()");
        this.context.fillStyle = "#000000"; // 背景色を黒にする
        this.context.fillRect(0, 0, this.width, this.height);
        
        this.opponent = CharacterManager.createEnemy(this.mapElem);
        console.log(`${this.opponent.name}: Lv_${this.opponent.level} HP_${this.opponent.hp} A_${this.opponent.attack}`);
        this.drawStatus(this.statusContext);
        this.drawMessage(`${this.opponent.name}が現れた`);
        this.#drawEnemyImage(this.opponent.image);
    }

    // IScreenの実装
    inputDirection(direction){
        switch (direction) {
            case DIRECTION.ENTER.code: 
                if(this.openedCommandScreen) {
                    this.executeCommand();
                } else {
                    this.#drawCommand();
                }
                break;
            case DIRECTION.UP.code: 
                this.arrowIndex = 0;
                this.#drawCommand();
                break;
            case DIRECTION.DOWN.code : 
                this.arrowIndex = 1;
                this.#drawCommand();
                break;
            default: 
                this.#drawCommand();
                break;
        }
    }

    initBattleSystem() {
        this.openedCommandScreen = false;
        this.arrowIndex = 0;
    }

    /**
     * 入力されたコマンドを実行する関数
     * @returns コマンド実行結果による画面遷移
     */
    async executeCommand() {
        if(this.arrowIndex == 0) {
            console.log("COMMAND: ATTACK");
            // TODO: 与ダメージ量を表示する
            await this.showBattleDialog(`プレイヤーの攻撃`, this.#SECONDS_TO_DISPLAY,
                () => {
                    this.player.attackTarget(this.opponent);
                    console.log(`HP: ${this.opponent.hp}`);     
                }
            );
        } else {
            console.log("COMMAND: ESCAPE");
            this.initBattleSystem();
            this.requestCode = REQUEST_CODE.ESCAPE_SUCCESS;
            this.haveNotification = true;
            return;
        }
        if (this.opponent.hp == 0) {
            return this.win();
        } 
        // 敵の攻撃
        await this.showBattleDialog(`${this.opponent.name}の攻撃`, this.#SECONDS_TO_DISPLAY,  
                    () => {
                        this.opponent.attackTarget(this.player);
                        this.drawStatus(this.statusContext);
                        this.#drawCommand()
                    }
                );
        if(this.player.hp == 0) {
            return this.lose();
        } 
    }

    /**
     * 戦闘ダイアログの表示を行う関数
     * @param {string} msg 表示するメッセージ
     * @param {number} sec 表示する秒数
     * @param {any} callback ダイアログ表示中に実行する関数
     * @returns {Promise}
     */
    async showBattleDialog(msg, sec, callback) {
        return new Promise((resolve) => {
            this.drawMessage(msg);
            setTimeout(() => {
                this.resetScreen(this.messageContext);
                callback();
                resolve();
            }, sec * 1000);
        });
    }

    /**
     * 戦闘勝利時の処理を行う関数
     */
    win() {
        this.player.addExperiencePoint(this.opponent.dropExperiencePoint);
        this.initBattleSystem();
        this.requestCode      = REQUEST_CODE.RETURN_MAP;
        this.haveNotification = true;
    }

    /**
     * 戦闘敗北時の処理を行う関数
     */
    lose() {
        this.resetScreenAll();
        this.requestCode      = REQUEST_CODE.GAME_OVER;
        this.haveNotification = true;
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
        console.log(status);
        this.enemyStatus = status;
        // this.drawMessage(`${status.character.toString()}が現れた。`);
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
        this.openedCommandScreen = true;

        this.resetScreen(this.messageContext);
        this.messageContext.lineWidth = 2;
        this.messageContext.strokeStyle = "#ffffff";
        this.messageContext.strokeRect( 10, this.height - 200, 180, 190);
        this.messageContext.fillStyle = "rgba( 0, 0, 0, 0.75 )";
        this.messageContext.fillRect( 10, this.height - 200, 180, 190);
        
        this.messageContext.font = "30px monospace";
        this.messageContext.fillStyle = "#ffffff";

        let commands = ["戦う", "逃げる"];
        let height = this.height - 160;
        commands.forEach((command, index) => {
            if(index == this.arrowIndex){
                command = "▶ " + command;
            }
            else{
                command = "  " + command;
            }

            this.messageContext.fillText( command, 20, height );
            height += 50;
        })
    }

    /**
     * 敵の姿を表示する
     * @param {Image} image 敵の画像 
     */
    #drawEnemyImage(image){
        // TODO: 画像サイズの統一を行う
        if (image.width < 500) {
            this.pContext.drawImage(image, image.width / 4 * this.opponent.sx, 0, image.width / 4, image.height,
                Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight /2), 64 /* tileSize */, 64 /*tileSize*/);
        } else {
            this.pContext.drawImage(image, 0, 0, image.width, image.height,
                Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight /2), 64 /* tileSize */, 64 /*tileSize*/);
        }
    }
}