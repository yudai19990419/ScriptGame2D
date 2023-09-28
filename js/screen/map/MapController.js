class MapController extends IScreen{

    constructor() {
        super();
        this.mapCreater = new MapCreater();
        this.init();
        this.requestCode = -1;
        this.haveNotification = false;
        // 座標（初期位置）
        // OPTIMIZE: マジックナンバー
        this.valueX = 16;
        this.valueY = 16;
        this.mapX = 0;
        this.mapY = 0;
        // 一歩前のプレイヤーの向きを一時保存
        this.pOrientation = this.mapCreater.pSyFront; 
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
        console.log("Coordinate (X: " + this.valueX + ", Y: " + this.valueY + ")");
        this.resetScreen(this.context);
        this.mapCreater.displayMap(this.context, this.mapX, this.mapY);
        this.mapCreater.displayPlayer(this.context, 512, 512, this.pOrientation);
    }

    // ゲーム画面の表示（マップ、プレイヤー）
    // FIXME: 処理が重いため要改善
    // displayScreen;
    createScreen(){
        console.log("MapController::createScreen()");
        this.mapCreater.drawBackGround(this.context2);
        // this.displayScreen = setInterval(() => {
            this.resetScreen(this.context);
            this.mapCreater.displayMap(this.context, this.mapX, this.mapY);
            // FIXME: 城とプレイヤーの初期位置を同期させる
            this.mapCreater.displayPlayer(this.context, 512, 512, this.pOrientation);
            this.drawStatus(this.playerStatus);
        // }, /* mfps */ 0.001);
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
        return this.mapCreater.getMap(this.valueX, this.valueY);
    }

    // 敵との遭遇確率と戦闘画面への遷移
    encount() {
        let rNum = Math.random(); 
        const prob = [0, 0, 0, 0.2, 0, 0, 0.4, 0.6, 0, 0, 0, 0, 0, 0, 0, 0];   //敵の出現確率
        console.log("エンカウント率: " + prob[this.getMapElem()]);
        
        if (rNum < prob[this.getMapElem()]) {
            console.log("敵が現れた！！ 乱数: " + rNum);
            // 戦闘画面の呼び出し
            clearInterval(this.displayScreen);
            const battleScr = new BattleScreen();
            battleScr.createScreen();

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