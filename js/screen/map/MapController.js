class MapController extends IScreen{
    playerX;
    playerY;

    // プレイヤーの座標を生成
    // 一旦 Virtualの実装は保留
    constructor() {
        super();
        //TODO: マジックナンバー512(初期位置)
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
        // TODO: マジックナンバー32(タイルサイズ)
        this.playerX += num * this.mapCreater.tileSize;
    }

    movePlayerY(num) {
        // TODO: マジックナンバー（タイルサイズ）
        this.playerY += num * 32;
    }

    // コマンド入力によるプレイヤーの移動
    inputDirection(direction){
        switch (direction) {
            case DIRECTION.UP.code: 
                this.movePlayerY(-1);
                break;
            case DIRECTION.DOWN.code: 
                this.movePlayerY(1);
                break;
            case DIRECTION.RIGHT.code: 
                this.movePlayerX(1);
                break;
            case DIRECTION.LEFT.code: 
                this.movePlayerX(-1);
                break;
            default: 
                console.log("undefined code [%i]", direction);
        }
        //FIXME: マップ再表示の影響による,プレイヤー移動時のマップの点滅
        this.createScreen();
    }

    // ゲーム画面の表示（マップ、プレイヤー）
    createScreen(){
        console.log("MapController::createScreen()");
        this.resetScreen(this.playerContext);
        this.resetScreen(this.context);
        this.mapCreater.displayMap(this.context);
        this.mapCreater.displayPlayer(this.playerContext, this.playerX, this.playerY);
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