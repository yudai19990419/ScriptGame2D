class ScreenDirector extends IScreenDirector{

    constructor(){
        super();
        this.mapOperator = new MapOperator();
        this.battleScreen = new BattleScreen();
        this.gameOverScreen = new GameOverScreen();
        this.gameStartScreen = new GameStartScreen();
        this.gameEndScreen = new GameEndScreen();

        // 型：IScreen
        // 画面に表示している画面クラス
        this.nowScreen = null;
    }

    // IScreenDirectorの実装
    init(){
        // ゲーム開始画面を表示する
        this.nowScreen = this.gameStartScreen;
        // this.nowScreen.updateScreen();
        this.gameStartScreen.createScreen();
    }

    // IScreenDirectorの実装
    gameStart(){
        console.log("gameStart()");
        // マップ画面を表示する
        this.moveMapScreen();
    }

    // IScreenDirectorの実装
    gameEnd(){
        // ゲーム終了画面を表示する
        this.nowScreen = this.gameEndScreen;
        this.nowScreen.updateScreen();
    }

    // IScreenDirectorの実装
    gameOver(){
        // テスト用
        this.init();
        // ゲームオーバー画面を表示する
        // this.nowScreen = this.gameOver;
        // this.nowScreen.updateScreen();
    }

    // IScreenDirectorの実装
    battleStart(){
        // 戦闘画面を表示する
        this.nowScreen = this.battleScreen;
        this.nowScreen.updateScreen();
    }

    // IScreenDirectorの実装
    moveMapScreen() {
        if(this.nowScreen == this.mapOperator){
            // すでにマップを表示している場合は何もしない
            return;
        }
        // マップ画面を表示する
        this.nowScreen = this.mapOperator;
        this.nowScreen.updateScreen();
    }

    // IScreenDirectorの実装
    isNotification(){
        if(this.nowScreen != null){
            // 表示している画面クラスを通知があるか確認する
            return this.nowScreen.isNotification();
        }

        return false;
    }

    // IScreenDirectorの実装
    getNotification(){
        if(this.nowScreen != null){
            // 表示している画面クラスから通知を取得
            return this.nowScreen.getNotification();
        }

        return -1;
    }

    // IScreenDirectorの実装
    inputDirection(code) {
        console.log("input");
        if(this.nowScreen != null){
            // 表示している画面クラスにキー入力の情報を渡す
            this.nowScreen.inputDirection(code);
        }
    }

    // IScreenDirectorの実装
    setScreenSize(width, height){
        if(this.nowScreen != null){
            this.nowScreen.setScreenSize(width, height);
            this.nowScreen.updateScreen();
        }
    }

    // IScreenDirectorの実装
    setPlayerStatus(status){
        if(this.nowScreen != null){
            this.nowScreen.setPlayerStatus(status);
        }
    }

    // IScreenDirectorの実装
    setEnemy(image, corrdinate, status){
        if(this.nowScreen != null){
            this.nowScreen.setEnemyStatus(status);
        }

        this.battleScreen.setEnemyImage(image, corrdinate);
    }

    // IScreenDirectorの実装
    setEscapeResult(result){
        if(this.nowScreen != null){
            this.nowScreen.setEscapeResult(result);
        }
    }

    // IScreenDirectorの実装
    getMapElem(){
        return this.mapOperator.getMapElem();
    }
}