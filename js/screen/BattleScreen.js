class BattleScreen extends IScreen {

    arrowIndex = 0;
    player   = Player.getInstance();
    opponent;
    // playerTurn;
    mapOperator = new MapOperator();

    constructor(){
        super();
        this.init();
        this.requestCode = -1;
        this.haveNotification = false;
        this.image = new Image();
        this.image.src = "img/monster.png";
        this.openedCommandScreen = false;
    }

    /**
     * テスト用の関数
     */
    viewEnemyStatus() {
        console.log(`${this.opponent.name}: Lv_${this.opponent.level} HP_${this.opponent.hp} A_${this.opponent.attack}`);
    }

    // IScreenの実装
    createScreen(){
        console.log("BattleScreen::createScreen()");
        this.context.fillStyle = "#000000"; // 背景色を黒にする
        this.context.fillRect(0, 0, this.width, this.height);

        this.opponent = CharacterManager.createEnemy(this.mapOperator.getMapElem());
        this.viewEnemyStatus();
        this.drawStatus(this.statusContext);
        this.drawMessage(`${this.opponent.name}が現れた`);
        this.#drawEnemyImage();
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

    executeCommand() {
        // HACK: IFのネスト
        if(this.arrowIndex == 0) {
            console.log("COMMAND: ATTACK");
            this.player.attackTarget(this.opponent);
            console.log(`HP: ${this.opponent.hp}`);
            if (this.opponent.hp == 0) {
                this.win();
            } else {
                this.opponent.attackTarget(this.player);
                this.drawStatus(this.statusContext);
                if(this.player.hp == 0) {
                    this.lose();
                }
            }
        } else {
            console.log("COMMAND: ESCAPE");
            this.initBattleSystem();
            this.requestCode = REQUEST_CODE.ESCAPE_SUCCESS;
            this.haveNotification = true;
        }
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

    setEnemyImage(imagePath, corrdinate){
        console.log("setEnemyImage");
        this.corrdinate = corrdinate;
        // this.#drawEnemyImage();
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

    #drawEnemyImage(){
        console.log("drawEnemyImage()");
        // if(this.image == null || this.corrdinate == null){
        //     return;
        // }
        this.pContext.drawImage(this.image, this.image.width / 4 * this.opponent.sx, 0,
             this.image.width / 4, this.image.height, Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight /2), 64, 64);
    }
}