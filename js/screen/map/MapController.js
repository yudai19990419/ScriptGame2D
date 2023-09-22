class MapController extends IScreen{

    constructor() {
        super();
        this.mapCreater = new MapCreater();
        this.init();
        // 座標（初期位置）
        // OPTIMIZE: マジックナンバー
        this.valueX = 16;
        this.valueY = 16;
        this.playerX = 512;
        this.playerY = 512;
        this.mapX = 0;
        this.mapY = 0;
        // 一歩前のプレイヤーの向きを一時保存
        this.pOrientation = this.mapCreater.pSyFront; 
        
        this.count = 0;
        this.displayScreen;
        this.fps = 30;   // フレームレート
    } 

    // 引数の値だけプレイヤーを移動
    moveX(num) {
        this.valueX += num;
        this.mapX += num;
    }

    moveY(num) {
        this.valueY += num;
        this.mapY += num;
    }

    // コマンド入力によるプレイヤーの移動
    inputDirection(direction){
        switch (direction) {
            case DIRECTION.UP.code: 
                this.moveY(-1);
                if (this.hasObstacle()) {
                    this.moveY(1);
                } else {
                    this.pOrientation = this.mapCreater.pSyBack;
                    this.encount();
                }
                break;
            case DIRECTION.DOWN.code: 
                this.moveY(1);
                if (this.hasObstacle()) {
                    this.moveY(-1);
                } else {
                    this.pOrientation = this.mapCreater.pSyFront;
                    this.encount();
                }
                break;
            case DIRECTION.RIGHT.code: 
                this.moveX(1);
                if (this.hasObstacle()) {
                    this.moveX(-1);
                } else {
                    this.pOrientation = this.mapCreater.pSyRight;
                    this.encount();
                }
                break;
            case DIRECTION.LEFT.code: 
                this.moveX(-1);
                if (this.hasObstacle()) {
                    this.moveX(1);
                } else {
                    this.pOrientation = this.mapCreater.pSyLeft;
                    this.encount();
                }
                break;
            default: 
                console.log("undefined code [%i]", direction);
                break;
        }
        console.log("Coordinate (X: " + this.valueX + ", Y: " + this.valueY + 
            ", pX: " + this.playerX + ", pY: " + this.playerY + ")");
    }

    // ゲーム画面の表示（マップ、プレイヤー）
    createScreen(){
        console.log("MapController::createScreen()");
        this.displayScreen = setInterval(() => {
            //console.log(this.count++);
            this.resetScreen(this.context);
            this.mapCreater.displayMap(this.context, this.mapX, this.mapY);
            this.mapCreater.displayPlayer(this.context, this.playerX, this.playerY,
                 this.pOrientation);
            //　タイマー処理停止
            // if (this.count > 500) {
            //     clearInterval(this.displayScreen);
            // }
        }, this.fps * 0.001);
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
        return this.mapCreater.getMap(this.valueX, this.valueY);
    }

    encount() {
        let rNum = Math.random(); 
        const prob = [0, 0, 0, 0.2, 0, 0, 0.4, 0.6, 0, 0, 0, 0, 0, 0, 0, 0];   //敵の出現確率
        console.log("エンカウント率: " + prob[this.getMapElem()]);
        
        if (rNum < prob[this.getMapElem()]) {
            console.log("敵が現れた！！ 乱数: " + rNum);
            // TODO: 現在のスクリーンをバッファ(Canvas)に保存

            // 戦闘画面の呼び出し
            // const battleScr = new BattleScreen();
            // battleScr.createScreen();
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