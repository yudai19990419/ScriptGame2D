class GameManager {
    constructor(){
        this.screenDirector = new ScreenDirector();
        this.characterManager = new CharacterManager();
        this.init();
    }

    /**
     * 初期化関数
     */
    init(){
        // スクリーンを初期化する
        this.screenDirector.init();
    }

    // getCounter() {
    //     return this.counter;
    // }

    
    /**
     * 画面サイズの設定関数
     * @param {int} width 横幅
     * @param {int} height 縦幅
     */
     setScreenSize(width, height){
        this.screenDirector.setScreenSize(width, height);
    }

    /**
     * 定期的に呼ばれる関数(ゲームの状態監視を行う)
     */
    job(){
        // スクリーンから通知があったかを確認
        if(this.screenDirector.isNotification()){
            // 通知を取得し処理を行う
            this.#checkRequestCode(this.screenDirector.getNotification());
        }
    }

    /**
     * スクリーンからの通知番号から処理を行う
     * @param {int} code 通知番号(REQUEST_CODE)
     */
    #checkRequestCode(code){
        console.log("#checkRequestCode() : code [%i]", code);
        switch(code) {
            case REQUEST_CODE.CONTINUE :
                this.screenDirector.init();
                break;
            case REQUEST_CODE.HEAL:
                this.characterManager.healPlayer();
                break;
            case REQUEST_CODE.BUTTLE:
                this.screenDirector.battleStart();
                // this.characterManager.buttleStart(this.screenDirector.getMapElem());
                break;
            case REQUEST_CODE.ATTACK_PLAYER:
                this.characterManager.attackPlayer();
                break;
            case REQUEST_CODE.ATTACK_ENEMY:
                this.characterManager.attackEnemy();
                break;
            case REQUEST_CODE.ESCAPE:
                this.screenDirector.setEscapeResult(this.characterManager.escape());
                break;
            case REQUEST_CODE.BOSS:
                break;
            case REQUEST_CODE.GET_KEY:
                break;
            case REQUEST_CODE.GAME_START:
                this.characterManager.init();
                this.screenDirector.gameStart();
                break;
            case REQUEST_CODE.GANE_END:
                this.screenDirector.gameEnd();
                break;
            case REQUEST_CODE.RETURN_MAP:
                this.screenDirector.moveMapScreen();
                break;
            case REQUEST_CODE.ESCAPE_SUCCESS:
                this.screenDirector.moveMapScreen();
                break;
            case REQUEST_CODE.ENEMY_DOWN:
                this.characterManager.enemyDown();
                break;
            case REQUEST_CODE.GAME_OVER:
                this.screenDirector.gameOver();
                break;
            default:
                console.log("undefined code [%i]", code);
                return;
        }

        // ステータスをセットする
        this.#setStatusToScreen();
    }

    #setStatusToScreen(){
        this.screenDirector.setPlayerStatus(this.characterManager.getPlayerStatus());
        // 敵キャラが生成されているかの確認
        if(this.characterManager.canGetEnemy()){
            this.screenDirector.setEnemy(this.characterManager.getImage(), this.characterManager.getImageCorrdinate(), this.characterManager.getEnemyStatus());
        }
    }

    /**
     * キーボード入力変換関数
     * @param {object} event キーボードのリスナーから渡されるオブジェクト
     */
    input(event){
        var direction = 0;
        if(event.key == DIRECTION.UP.key){
            direction = DIRECTION.UP.code;
        }
        else if(event.key == DIRECTION.DOWN.key){
            direction = DIRECTION.DOWN.code;
        }
        else if(event.key == DIRECTION.RIGHT.key){
            direction = DIRECTION.RIGHT.code;
        }
        else if(event.key == DIRECTION.LEFT.key){
            direction = DIRECTION.LEFT.code;
        }
        else if(event.key == DIRECTION.ENTER.key){
            direction = DIRECTION.ENTER.code;
        }
        else if(event.key == DIRECTION.ARROW_UP.key){
            direction = DIRECTION.ARROW_UP.code
        }
        else if(event.key == DIRECTION.ARROW_DOWN.key){
            direction = DIRECTION.ARROW_DOWN.code
        }
        else if(event.key == DIRECTION.ARROW_RIGHT.key){
            direction = DIRECTION.ARROW_RIGHT.code
        }
        else if(event.key == DIRECTION.ARROW_LEFT.key){
            direction = DIRECTION.ARROW_LEFT.code
        }
        else{
            console.log("input undefined key [%s]", event.key);
            return;
        }

        console.log("direction [%i]", direction);
        this.screenDirector.inputDirection(direction);
    }
}