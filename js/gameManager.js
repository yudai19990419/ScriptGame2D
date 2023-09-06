class GameManager {
    constructor(){
        this.screenDirector = new ScreenDirector();
        this.init();
    }

    /**
     * 初期化関数
     */
    init(){
        // スクリーンを初期化する
        this.screenDirector.init();
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
                break;
            case REQUEST_CODE.HEAL:
                break;
            case REQUEST_CODE.BUTTLE:
                break;
            case REQUEST_CODE.BOSS:
                break;
            case REQUEST_CODE.GET_KEY:
                break;
            default:
                console.log("undefined code [%i]", code);
        }
    }

    /**
     * キーボード入力変換関数
     * @param {object} event キーボードのリスナーから渡されるオブジェクト
     */
    input(event){
        let direction = null;
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
        else{
            console.log("input undefined key [%s]", event.key);
            return;
        }

        this.screenDirector.input(direction);
    }
}