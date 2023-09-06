class IScreen {
    height = 120;
    width = 128;

    /**
     * 初期化関数
     */
    init(){
        this.canvas = document.createElement( "canvas" );
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext( "2d" );
    }

    /**
     * 画面作成関数
     */
     createScreen(){
        throw "実装されていません";
    }

    /**
     * 画面作成関数
     */
    inputDirection(direction){
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