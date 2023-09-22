class MapController extends IScreen{
    // 一旦 Virtualの実装は保留
    constructor() {
        super();
        this.mapCreater = new MapCreater();
        this.init();
        this.requestCode = -1;
        this.haveNotification = false;
        // 座標（初期位置）
        // OPTIMIZE: マジックナンバー
        this.mapX = 16;
        this.mapY = 16;
        this.playerX = this.mapX * this.mapCreater.tileSize;
        this.playerY = this.mapY * this.mapCreater.tileSize;
        // 一歩前のプレイヤーの向きを一時保存
        this.pBuffer = this.mapCreater.pSyFront;    
    } 

    getplayerX() {
        return this.playerX;
    }

    getplayerY() {
        return this.playerY;
    }

    // 引数の値だけプレイヤーを移動
    moveX(num) {
        this.mapX += num;
        this.playerX = this.mapX * this.mapCreater.tileSize;
    }

    moveY(num) {
        this.mapY += num;
        this.playerY = this.mapY * this.mapCreater.tileSize;
    }

    // コマンド入力によるプレイヤーの移動
    inputDirection(direction){
        this.mapCreater.delAfterImg(this.context, this.playerX, this.playerY);
        let pSy;

        switch (direction) {
            case DIRECTION.UP.code: 
                this.moveY(-1);
                if (this.hasObstacle()) {
                    this.moveY(1);
                } else {
                    pSy = this.mapCreater.pSyBack;
                }
                break;
            case DIRECTION.DOWN.code: 
                this.moveY(1);
                if (this.hasObstacle()) {
                    this.moveY(-1);
                } else {
                    pSy = this.mapCreater.pSyFront;
                }
                break;
            case DIRECTION.RIGHT.code: 
                this.moveX(1);
                if (this.hasObstacle()) {
                    this.moveX(-1);
                } else {
                    pSy = this.mapCreater.pSyRight;
                }
                break;
            case DIRECTION.LEFT.code: 
                this.moveX(-1);
                if (this.hasObstacle()) {
                    this.moveX(1);
                } else {
                    pSy = this.mapCreater.pSyLeft;
                }
                break;
            default: 
                console.log("undefined code [%i]", direction);
                break;
        }
        console.log("Coordinate (X: " + this.mapX + ", Y: " + this.mapY + 
            ", pX: " + this.playerX + ", pY: " + this.playerY + ")");

        if (pSy != null) {
            this.mapCreater.displayPlayer(this.context, this.playerX, this.playerY, pSy);
            this.pBuffer = pSy;
            this.encount();
        } else {
            this.mapCreater.displayPlayer(this.context, this.playerX, this.playerY, this.pBuffer);
        }
    }

    // ゲーム画面の表示（マップ、プレイヤー）
    createScreen(){
        console.log("MapController::createScreen()");
        this.resetScreen(this.context);
        this.mapCreater.displayMap(this.context);
        this.mapCreater.displayPlayer(this.context, this.playerX, this.playerY, this.mapCreater.pSyFront);
    }

    isNotification(){
        let ret = this.haveNotification;
        this.haveNotification = false;
        return ret;
    }

    getNotification(){
        return this.requestCode;
    }

    getMapElem(){
        return this.mapCreater.getMap(this.mapX, this.mapY);
    }

    encount() {
        let rNum = Math.random(); 
        const prob = [0, 0, 0, 0.2, 0, 0, 0.4, 0.6, 0, 0, 0, 0, 0, 0, 0, 0];   //敵の出現確率
        console.log("エンカウント率: " + prob[this.getMapElem()]);
        
        if (rNum < prob[this.getMapElem()]) {
            console.log("敵が現れた！！ 乱数: " + rNum);
            // TODO: 現在のスクリーンをバッファ(Canvas)に保存

            // 戦闘画面の呼び出し
            this.requestCode = REQUEST_CODE.BUTTLE;
            this.haveNotification = true;
        } else {
            console.log("今日は良い天気ですね。 乱数: " + rNum);
        }
    }

    // 障害物判定
    hasObstacle() {
        const obs = this.mapCreater.obstacle;
        for (let i = 0; i < obs.length; i++) {
            if (this.getMapElem() == obs[i]) {
                return true;
            }
        } 
        return false;
    }
}