class MapOperator extends IScreen {
    
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
    
    constructor() {
        super();
        this.init();
        this.requestCode = -1;
        this.haveNotification = false;
    } 

    // 敵との遭遇時、戦闘画面へ遷移
    battle() {
        if (MapEvent.hasEncount(this.getMapElem())) {
            clearInterval(this.#frameForward);
            this.resetScreen(this.context);
            this.resetScreen(this.pContext);

            this.requestCode = REQUEST_CODE.BUTTLE;
            this.haveNotification = true;
        }
    }

    // @Override
    // ゲーム画面の表示（マップ、プレイヤー）
    createScreen(){
        this.resetScreenAll();
        console.log("MapOperator::createScreen()");
        // プレイヤー画像のコマ送り
        this.#frameForward = setInterval(() => {
            this.resetScreen(this.pContext);
            this.mapCreater.drawPlayer(this.pContext, (this.#counter % 2) * 8, this.#playerOrientation);
            this.#counter += 1;
        }, /* mfps^{-1} */ 500);
        this.mapCreater.drawBackGround(this.context2);
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

    isNotification(){
        let ret = this.haveNotification;
        this.haveNotification = false;
        return ret;
    }

    // @Override
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
                console.log(`undefined code [${direction}]`);
                break;
        }
    }

    // 引数の値だけプレイヤーを移動
    move(x, y) {
        this.#valueX    += x;
        this.#valueY    += y;
        this.#playerX   += x;
        this.#playerY   += y;
        if (MapEvent.hasObstacle(this.getMapElem(), this.mapCreater.obstacle)) {
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
            case  9: 
                Player.getInstance().heal();
                this.drawStatus(this.statusContext);
                this.drawMessage("魔王を倒して！はいこれ回復薬！！\nHPが全回復した。");
                this.haveNotification = true;
                this.requestCode = REQUEST_CODE.HEAL;
                break;
            case 10: 
            case 11: 
                this.drawMessage("東の果てにも村があります。");
                break;
            case 12:
                this.drawMessage("鍵は洞窟にあります。");
                break;
            case 13: 
                if (!this.#hasKey) {
                    this.drawMessage("鍵を手に入れた。"); 
                    this.#hasKey = true;
                }
                break;
            case 14: 
                if (this.#hasKey) {
                    this.drawMessage("扉が開いた。");
                } else {
                    this.move(0, -1);
                    this.drawMessage("扉を開くには鍵が必要です。");
                }
                break;
            case 15: 
                this.drawMessage("魔王が現れた");
                // clearInterval(this.#frameForward);
                // this.resetScreen(this.pContext);
                this.mapCreater.drawDevil(this.pContext); 
                break;
            default: 
                this.resetScreen(this.messageContext);
                break;
        }
    }

    renewScreen() {
        this.resetScreen(this.context);
        this.mapCreater.drawMap(this.context, this.playerX, this.playerY);
        this.resetScreen(this.pContext);
        this.mapCreater.drawPlayer(this.pContext, (this.#counter % 2) * 8, this.#playerOrientation);
        this.battle();
    }

    resetMap(){
        this.#counter = 0;        // 内部カウンタ
        // 座標（初期位置）
        this.#valueX = 16;
        this.#valueY = 16;
        this.#playerX = 0;
        this.#playerY = 0;
        this.#playerOrientation = this.mapCreater.pSyFront;   // プレイヤーの向き
        this.#frameForward;   // プレイヤーのコマ送り（ON/OFF）
        this.#hasKey = false;
    }
}