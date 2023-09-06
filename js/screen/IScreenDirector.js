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
     * キーボード入力通知関数
     * @param {int} code EnumのDIRECTIONのcode
     */
    input(code){
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
}