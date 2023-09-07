class IScreen {

    constructor(){
        this.width = 120;
        this.height = 128;
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

    /**
     * 画面サイズの設定関数
     * @param {int} width 横幅
     * @param {int} height 縦幅
     */
    setScreenSize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.imageSmoothingEnabled = this.contextmsImageSmoothingEnabled = 0;

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        if( this.width / 120 < this.height / 128 ){
            this.height = this.width * 128 / 120;
        }else{
            this.width  = this.height * 120 / 128;
        }
    }

    /**
     * 画面全体クリア関数
     */
    resetScreen(){
        // 画面全体をクリアする
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
}