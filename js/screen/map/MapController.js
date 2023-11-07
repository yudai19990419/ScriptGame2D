class MapController extends IScreen{
    
    mapCreater = new MapCreater();
    #counter = 0;        // 内部カウンタ
    // 座標（初期位置）
    #valueX = 16;
    #valueY = 16;
    #playerX = 0;
    #playerY = 0;
    #playerOrientation = this.mapCreater.pSyFront;   // プレイヤーの向き
    #frameForward;   // プレイヤーのコマ送り（ON/OFF）
    #hasKey = false;
    #islockedDoor = true;
    
    constructor() {
        super();
        this.init();
        this.requestCode = -1;
        this.haveNotification = false;
    } 

    // 敵との遭遇時、戦闘画面へ遷移
    battle() {
        if (this.hasEncount()) {
            clearInterval(this.#frameForward);
            this.resetScreen(this.context);
            this.resetScreen(this.pContext);

            this.requestCode = REQUEST_CODE.BUTTLE;
            this.haveNotification = true;
        }
    }

    // ゲーム画面の表示（マップ、プレイヤー）
    createScreen(){
        console.log("MapController::createScreen()");
        // プレイヤー画像のコマ送り
        this.#frameForward = setInterval(() => {
            this.resetScreen(this.pContext);
            this.mapCreater.drawPlayer(this.pContext, (this.#counter % 2) * 8, this.#playerOrientation);
            this.#counter += 1;
        }, /* mfps^{-1} */ 500);
        this.mapCreater.drawBackGround(this.context2);
        this.resetScreen(this.context);
        this.mapCreater.drawMap(this.context, this.playerX, this.playerY);
        this.drawStatus(this.statusContext);
    }

    getNotification(){
        return this.requestCode;
    }

    getMapElem(){
        return this.mapCreater.getMap(this.valueX, this.valueY);
    }

    get valueX() {
        return this.#valueX;
    }

    get valueY() {
        return this.#valueY;
    }

    get playerX() {
        return this.#playerX;
    }

    get playerY() {
        return this.#playerY;
    }

    hasEncount() {
        const prob = [0, 0, 0, 0.2, 0, 0, 0.4, 0.6, 0, 0, 0, 0, 0, 0, 0, 0];   //敵の出現確率
        console.log("エンカウント率: " + prob[this.getMapElem()]);
        
        if (Math.random() < prob[this.getMapElem()]) {
            console.log("\"敵が現れた！！\"");
            return true;
        } else {
            console.log("\"今日は良い天気ですね。\"");
            return false;
        }
    }

    hasObstacle() {
        for (let obs of this.mapCreater.obstacle) {
            if (this.getMapElem() == obs) {
                return true;
            }
        } 
        return false;
    }

    isNotification(){
        let ret = this.haveNotification;
        this.haveNotification = false;
        return ret;
    }

    inputDirection(direction){
        switch (direction) {
            case DIRECTION.UP.code:
                this.#playerOrientation = this.mapCreater.pSyBack; 
                this.move(0, -1);
                break;
            case DIRECTION.DOWN.code: 
                this.#playerOrientation = this.mapCreater.pSyFront;
                this.move(0, 1);
                break;
            case DIRECTION.RIGHT.code: 
                this.#playerOrientation = this.mapCreater.pSyRight;
                this.move(1, 0);
                break;
            case DIRECTION.LEFT.code: 
                this.#playerOrientation = this.mapCreater.pSyLeft;
                this.move(-1, 0);
                break;
            default: 
                console.log("undefined code [%i]", direction);
                this.resetScreen(this.messageContext);
                break;
        }
    }

    // 引数の値だけプレイヤーを移動
    move(x, y) {
        this.#valueX    += x;
        this.#valueY    += y;
        this.#playerX   += x;
        this.#playerY   += y;
        if (this.hasObstacle()) {
            this.#valueX  -= x;
            this.#valueY  -= y;
            this.#playerX -= x;
            this.#playerY -= y;
            console.log(`Coordinate (X, Y) = (${this.valueX}, ${this.valueY})`);
        } else {
            console.log(`Coordinate (X, Y) = (${this.valueX}, ${this.valueY})`);
            this.occurEvent();
            this.renewScreen();
        }
    }

    // HACK
    occurEvent() {
        switch (this.getMapElem()) {
            case  9: this.drawMessage("魔王を倒して！");            break;
            case 10: 
            case 11: this.drawMessage("東の果てにも村があります。"); break;
            case 12: this.drawMessage("鍵は洞窟にあります。");      break;
            case 13: 
                if (!this.#hasKey) {
                    this.drawMessage("鍵を手に入れた。"); 
                    this.#hasKey = true;
                }
                break;
            case 14: 
                if (this.#hasKey) {
                    this.drawMessage("扉が開いた。");
                    this.#islockedDoor = false;
                } else {
                    this.move(0, -1);
                    this.drawMessage("扉を開くには鍵が必要です。");
                }
                break;
            case 15: this.drawMessage("魔王が現れた");  break;
            default: this.resetScreen(this.messageContext);        break;
        }
    }

    renewScreen() {
        this.resetScreen(this.context);
        this.mapCreater.drawMap(this.context, this.playerX, this.playerY);
        this.resetScreen(this.pContext);
        this.mapCreater.drawPlayer(this.pContext, (this.#counter % 2) * 8, this.#playerOrientation);
        // this.battle();
    }
}