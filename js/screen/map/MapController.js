class MapController extends IScreen{

    // プレイヤーの座標を生成
    // 一旦 Virtualの実装は保留
    constructor() {
        super();
        this.playerPointX = 0;
        this.playerPointY = 0;
        this.init();
        this.mapCreater = new MapCreater(this.playerPointX, this.playerPointY);
    }

    getPlayerPointX() {
        return this.playerPointX;
    }

    getPlayerPointY() {
        return this.playerPointY;
    }

    // 引数の値だけプレイヤーを移動
    movePlayerX(num) {
        this.playerPointX += num;
    }

    movePlayerY(num) {
        this.playerPointY += num;
    }

    // コマンド入力によるプレイヤーの移動
    inputDirection(direction){
        switch (direction) {
            case DIRECTION.UP.code: 
                this.movePlayerY(1);
                break;
            case DIRECTION.DOWN.code: 
                this.movePlayerY(-1);
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
    }

    createScreen(){
        this.resetScreen();
        this.mapCreater.drawTileMap(this.context);
    }

    isNotification(){
        // 通知するものはないためfalse固定
        return false;
    }

    getNotification(){
        // 通知するものはないため固定で-1
        return -1;
    }
}