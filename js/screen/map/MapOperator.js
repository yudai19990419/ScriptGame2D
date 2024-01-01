class MapOperator extends IScreen {
    
    mapCreater = new MapCreater();
    #counter = 0;        // 内部カウンタ
    // HACK: 排他制御
    isLoading = false;
    // 座標（初期位置）
    #valueX = 16;
    #valueY = 16;
    #posX = 0;
    #posY = 0;
    #playerOrientation = this.mapCreater.pSyFront;   // プレイヤーの向き
    #frameForward;   // プレイヤーのコマ送り（ON/OFF）
    #hasKey = false;
    
    constructor() {
        super();
        this.init();
        this.requestCode = -1;
        this.haveNotification = false;
    } 

    /**
     * 戦闘画面へ遷移させる関数
     */
    transitionPage() {
            clearInterval(this.#frameForward);
            this.resetScreenAll();
            this.requestCode = REQUEST_CODE.BUTTLE;
            this.haveNotification = true;
    }

    // @Override
    // ゲーム画面の表示（マップ、プレイヤー）
    createScreen(){
        this.isLoading = false;
        console.log("MapOperator::createScreen()");
        this.resetScreenAll();
        // プレイヤー画像のコマ送り
        this.#frameForward = setInterval(() => {
            this.displayPlayer();
            this.#counter += 1;
        }, /* mfps^{-1} */ 500);
        this.mapCreater.drawBackGround(this.context2);
        this.mapCreater.drawMap(this.context, this.posX, this.posY);
        this.drawStatus(this.statusContext);
    }

    displayMap() {
        this.resetScreen(this.context);
        this.mapCreater.drawMap(this.context, this.posX, this.posY);
    }

    displayPlayer() {
        this.resetScreen(this.pContext);
        this.mapCreater.drawPlayer(this.pContext, (this.#counter % 2) * 8, this.#playerOrientation);
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

    get posX() {
        return this.#posX;
    }

    get posY() {
        return this.#posY;
    }

    isNotification(){
        let ret = this.haveNotification;
        this.haveNotification = false;
        return ret;
    }
    // @Override
    inputDirection(direction){
        // キー入力を受け付けていない場合
        if(this.isLoading) {
            return;
        }
        switch (direction) {
            case DIRECTION.UP.code:
                this.#playerOrientation = this.mapCreater.pSyBack;
                this.displayPlayer();
                this.move(0, -1);
                break;
            case DIRECTION.DOWN.code: 
                this.#playerOrientation = this.mapCreater.pSyFront;
                this.displayPlayer();
                this.move(0, 1);
                break;
            case DIRECTION.RIGHT.code: 
                this.#playerOrientation = this.mapCreater.pSyRight;
                this.displayPlayer();
                this.move(1, 0);
                break;
            case DIRECTION.LEFT.code: 
                this.#playerOrientation = this.mapCreater.pSyLeft;
                this.displayPlayer();
                this.move(-1, 0);
                break;
            default: 
                console.log(`undefined code [${direction}]`);
                break;
        }
        this.resetScreen(this.messageContext);
    }


    /**
     * 引数の値だけプレイヤーを移動させる関数
     * 
     * @param {int} x 水平方向の値（右方向が正）
     * @param {int} y 垂直方向の値（下方向が正）
     */
    move(x, y) {
        this.#valueX    += x;
        this.#valueY    += y;
        // 移動した先が障害物の場合
        if (MapEvent.hasObstacle(this.getMapElem(), this.mapCreater.obstacle)) {
            this.#valueX  -= x;
            this.#valueY  -= y;
        } else {
            this.scrollMap(x, y);
        }
        console.log(`Coordinate (X, Y) = (${this.valueX}, ${this.valueY})`);
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
                Player.getInstance().heal();
                this.drawMessage("東の果てにも村があります。");
                break;
            case 12:
                Player.getInstance().heal();
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
                    // FIXME: move()後、敵出現しないように設定
                    this.move(0, -1);
                    this.drawMessage("扉を開くには鍵が必要です。");
                }
                break;
            case 15: 
                this.drawMessage("魔王が現れた");
                break;
            default: 
                break;
        }
        this.isLoading = false;
    }

    hasEvent() {
        const eventElem = [9, 10 , 11, 12, 13, 14, 15];
        for (let obj of eventElem) {
            if (this.getMapElem() == obj) {
                return true;
            }
        }
        return false;
    }

    processEvent() {
        if (this.hasEvent()) {
            this.occurEvent();
        } else if (MapEvent.hasEncount(this.getMapElem())) { 
            this.transitionPage();
        } else {
            this.isLoading = false;
        }
    }

    /**
     * 画面上のマップをスクロールする関数
     * @param {int} x 水平方向へ移動するピクセル数（x>0: 右方向） 
     * @param {int} y 垂直方向へ移動するピクセル数 (y>0: 下方向)
     */
    scrollMap(x, y) {
        this.isLoading = true;
        // TODO: TILESIZEの同期
        const TILESIZE = 64;
        let dx = Math.abs(x * TILESIZE);
        let dy = Math.abs(y * TILESIZE);
        let time = 0;
        const moveToNextTile = setInterval(() => {
            time++;
            let value = this.#uniformAccelerationMotion(1, 0, time);
            if (dx == 0) {
                if (value > dy) {
                    value = dy;
                }
                if (y < 0) {
                    this.#posY -= value;
                } else {
                    this.#posY += value;
                }
                dy -= value;
            } else if (dy == 0) {
                if (value > dx) {
                    value = dx;
                }
                if (x < 0) {
                    this.#posX -= value;
                } else {
                    this.#posX += value;
                }
                dx -= value;
            }
            this.displayMap();

            if(dx == 0 && dy == 0) {
                clearInterval(moveToNextTile);
                this.processEvent();
            }
        }, /* mfps^{-1} */ 30);
    }

    /**
     * 等加速度運動 
     * @param {int} acceleration 加速度
     * @param {int} initialVelocity 初速度
     * @param {int} time 時間
     * @returns 
     */
    #uniformAccelerationMotion(acceleration, initialVelocity, time) {
        return 1 / 2 * acceleration * time * time + initialVelocity * time;
    }

    resetMap(){
        this.#counter = 0;        // 内部カウンタ
        // 座標（初期位置）
        this.#valueX = 16;
        this.#valueY = 16;
        this.#posX = 0;
        this.#posY = 0;
        this.#playerOrientation = this.mapCreater.pSyFront;   // プレイヤーの向き
        this.#frameForward;   // プレイヤーのコマ送り（ON/OFF）
        this.#hasKey = false;
    }
}