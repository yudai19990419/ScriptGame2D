class IScreenDirector {

    /**
     * 初期化関数
     */
    init(){
        throw "実装されていません";
    }

    /**
     * ゲーム開始関数
     */
    gameStart(){
        throw "実装されていません";
    }

    /**
     * ゲーム終了関数
     */
    gameEnd(){
        throw "実装されていません";
    }

    /**
     * ゲームオーバー関数
     */
    gameOver(){
        throw "実装されていません";
    }

    /**
     * バトル開始関数
     */
    battleStart(){
        throw "実装されていません";
    }

    /**
     * キーボード入力通知関数
     * @param {int} code EnumのDIRECTIONのcode
     */
    inputDirection(code){
        throw "実装されていません";
    }

    /**
     * マップ画面を表示する
     */
    moveMapScreen(){
        throw "実装されていません";
    }

    /**
     * スクリーンクラス側からの通知確認関数
     * @return bool値
     */
    isNotification(){
        throw "実装されていません";
    }

    /**
     * スクリーンクラス側からの通知取得関数
     * @return REQUEST_CODE(Enum)
     */
    getNotification(){
        throw "実装されていません";
    }

    /**
     * 画面サイズの設定関数
     * @param {int} width 横幅
     * @param {int} height 縦幅
     */
     setScreenSize(width, height){
        throw "実装されていません";
    }

    /**
     * Playerのステータスをセットする関数
     * @param {CharacterStatus} status キャラクターのステータス
     */
     setPlayerStatus(status){
        throw "実装されていません";
    }

    /**
     * 敵キャラのステータスをセットする関数
     * @param {} image 敵キャラの画像
     * @param {CharacterStatus} status キャラクターのステータス
     */
    setEnemy(image, corrdinate, status){
        throw "実装されていません";
    }

    /**
     * 逃げた結果をセットする関数
     * @param {bool} result 成功・失敗
     */
    setEscapeResult(result){
        throw "実装されていません";
    }

    /**
     * マップの現在マス取得関数
     * @return {MapElem} マップの現在マス
     */
    getMapElem(){
        throw "実装されていません";
    }
}