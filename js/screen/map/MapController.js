class MapController extends IScreen{

    // 座標（初期位置）
    // OPTIMIZE: マジックナンバー
    valueX = 16;
    valueY = 16;
    mapX = 0;
    mapY = 0;
    
    constructor() {
        super();
        this.mapCreater = new MapCreater();
        this.init();
        this.requestCode = -1;
        this.haveNotification = false;
        // 一歩前のプレイヤーの向きを一時保存
        this.pOrientation = this.mapCreater.pSyFront; 
    } 

    getValueX() {
        return this.valueX;
    }

    getValueY() {
        return this.valueY;
    }

    // 引数の値だけプレイヤーを移動
    moveX(num) {
        this.valueX += num;
        this.mapX   += num;
        if (this.hasObstacle()) {
            this.valueX -= num;
            this.mapX   -= num;
        } 
    }

    moveY(num) {
        this.valueY += num;
        this.mapY   += num;
        if (this.hasObstacle()) {
            this.valueY -= num;
            this.mapY   -= num;
        } 
    }

    // コマンド入力によるプレイヤーの移動
    inputDirection(direction){
        switch (direction) {
            case DIRECTION.UP.code: 
                this.moveY(-1);
                this.pOrientation = this.mapCreater.pSyBack;
                break;
            case DIRECTION.DOWN.code: 
                this.moveY(1);
                this.pOrientation = this.mapCreater.pSyFront;
                break;
            case DIRECTION.RIGHT.code: 
                this.moveX(1);
                this.pOrientation = this.mapCreater.pSyRight;
                break;
            case DIRECTION.LEFT.code: 
                this.moveX(-1);
                this.pOrientation = this.mapCreater.pSyLeft;
                break;
            default: 
                console.log("undefined code [%i]", direction);
                break;
        }
        console.log("Coordinate (X: " + this.valueX + ", Y: " + this.valueY + ")");
        this.resetScreen(this.context);
        this.mapCreater.displayMap(this.context, this.mapX, this.mapY);
        this.mapCreater.displayPlayer(this.context, 512, 512, this.pOrientation);
        // FIXME: 移動なしの場合戦闘発生しない。
        this.battle();
    }

    // ゲーム画面の表示（マップ、プレイヤー）
    // displayScreen;
    createScreen(){
        console.log("MapController::createScreen()");
        this.mapCreater.drawBackGround(this.context2);
        // this.displayScreen = setInterval(() => {
            this.resetScreen(this.context);
            this.mapCreater.displayMap(this.context, this.mapX, this.mapY);
            // TODO: 城とプレイヤーの初期位置を同期させる
            this.mapCreater.displayPlayer(this.context, 512, 512, this.pOrientation);
            // this.drawStatus(this.playerStatus);
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

    // 敵との遭遇時、戦闘画面への遷移を行う
    battle() {
        if (this.encount()) {
            // clearInterval(this.displayScreen);
            this.resetScreen(this.context);
            const battleScr = new BattleScreen();
            battleScr.createScreen();

            this.requestCode = REQUEST_CODE.BUTTLE;
            this.haveNotification = true;
        }
    }
    // 敵との遭遇確率
    encount() {
        let rNum = Math.random(); 
        const prob = [0, 0, 0, 0.2, 0, 0, 0.4, 0.6, 0, 0, 0, 0, 0, 0, 0, 0];   //敵の出現確率
        console.log("エンカウント率: " + prob[this.getMapElem()]);
        
        if (rNum < prob[this.getMapElem()]) {
            console.log("敵が現れた！！ 乱数: " + rNum);
            return true;
        } else {
            console.log("今日は良い天気ですね。 乱数: " + rNum);
            return false;
        }
    }

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