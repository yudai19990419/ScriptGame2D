class MapController extends IScreen{
    playerX;
    playerY;

    // プレイヤーの座標を生成
    // 一旦 Virtualの実装は保留
    constructor() {
        super();
        //FIXME: マジックナンバー512(初期位置)
        this.playerX = 512;
        this.playerY = 512;
        this.mapCreater = new MapCreater(this.playerX, this.playerY);
        this.init();
    }

    getplayerX() {
        return this.playerX;
    }

    getplayerY() {
        return this.playerY;
    }

    // 引数の値だけプレイヤーを移動
    movePlayerX(num) {
        this.playerX += num * this.mapCreater.tileSize;
    }

    movePlayerY(num) {
        this.playerY += num * this.mapCreater.tileSize;
    }

    // コマンド入力によるプレイヤーの移動
    inputDirection(direction){
        let pSy;
        // OPTIMIZE: delAfterImg,displayPlayerの複数使用
        switch (direction) {
        case DIRECTION.UP.code: 
            this.mapCreater.delAfterImg(this.context, this.playerX, this.playerY);
            this.movePlayerY(-1);
            pSy = this.mapCreater.pSyBack;
            this.mapCreater.displayPlayer(this.context, this.playerX, this.playerY, pSy);
            break;
        case DIRECTION.DOWN.code: 
            this.mapCreater.delAfterImg(this.context, this.playerX, this.playerY);
            this.movePlayerY(1);
            pSy = this.mapCreater.pSyFront;
            this.mapCreater.displayPlayer(this.context, this.playerX, this.playerY, pSy);
            break;
        case DIRECTION.RIGHT.code: 
            this.mapCreater.delAfterImg(this.context, this.playerX, this.playerY);
            this.movePlayerX(1);
            pSy = this.mapCreater.pSyRight;
            this.mapCreater.displayPlayer(this.context, this.playerX, this.playerY, pSy);
            break;
        case DIRECTION.LEFT.code: 
            this.mapCreater.delAfterImg(this.context, this.playerX, this.playerY);
            this.movePlayerX(-1);
            pSy = this.mapCreater.pSyLeft;
            this.mapCreater.displayPlayer(this.context, this.playerX, this.playerY, pSy);
            break;
        default: 
            console.log("undefined code [%i]", direction);
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
        // 通知するものはないためfalse固定
        return false;
    }

    getNotification(){
        // 通知するものはないため固定で-1
        return -1;
    }

    getMapElem(){
        return this.mapCreater.getMap(this.playerX, this.playerY);
    }
}