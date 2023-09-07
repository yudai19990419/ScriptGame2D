class IScreen {

    constructor(){
        this.width = 128;
        this.height = 120;
    }
    
    /**
     * 初期化関数
     */
    init(){
        this.canvas = document.getElementById("main");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
    }

    /**
     * 画面描画関数
     */
    createScreen(){
        throw "実装されていません";
    }

    /**
     * キーボード入力のコールバック関数
     * @param {int} direction DIRECTION(enum)
     */
    inputDirection(direction){
        throw "実装されていません";
    }

    /**
     * 通知があったかの確認関数
     * @returns {boolean}
     */
    isNotification(){
        throw "実装されていません";
    }

    /**
     * 通知取得関数
     * @returns {int} REQUEST_CODE
     */
    getNotification(){
        throw "実装されていません";
    }
}