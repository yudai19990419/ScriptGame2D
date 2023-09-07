class ScreenDirector extends IScreenDirector{

    constructor(){
        super();
        this.mapController = new MapController();
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
        this.nowScreen.createScreen();
    }

    // IScreenDirectorの実装
    gameStart(){
        // マップ画面を表示する
        this.nowScreen = this.mapController;
        this.nowScreen.createScreen();
    }

    // IScreenDirectorの実装
    gameEnd(){
        // ゲーム終了画面を表示する
        this.nowScreen = this.gameEndScreen;
        this.nowScreen.createScreen();
    }

    // IScreenDirectorの実装
    gameOver(){
        // ゲームオーバー画面を表示する
        this.nowScreen = this.gameOver;
        this.nowScreen.createScreen();
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
        if(this.nowScreen != null){
            // 表示している画面クラスにキー入力の情報を渡す
            this.nowScreen.inputDirection(code);
        }
    }
}