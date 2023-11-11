class CharacterManager {

    static enemySpecies;
    static enemyLv;
    static enemyNum;

    constructor() {
        this.player = Player.getInstance();
        this.enemy = null;
    }

    /**
     * 初期化関数
     */
    init(){
        throw "実装されていません";
    }

    /**
     * バトルスタート関数
     * @param {MapElem} mapElem マップの要素(Enum)
     */
    buttleStart(mapElem) {
        this.loadEnemy(mapElem);
    }

    /**
     * 敵キャラへの攻撃関数
     */
    attackEnemy(){
        this.enemy.attackDamage(this.player.attack);
    }

    /**
     * Playerへの攻撃関数
     */
    attackPlayer(){
        this.player.attack(this.enemy.getStatus().attack);
    }

    /**
     * 逃げる
     * @return {bool} 成功・失敗
     */
    escape(){
        return this.enemy.escape();
    }

    /**
     * 敵キャラの画像取得関数
     * @returns {HTMLImageElement} 敵キャラの画像
     */
    getImage(){
        return this.enemy.getImage();
    }

    /**
     * 敵キャラの画像位置取得関数
     * @returns {List<int>} 敵キャラの画像位置
     */
    getImageCorrdinate(){
        return this.enemy.getImageCorrdinate();
    }

    /**
     * 敵キャラのステータス取得関数
     * @returns {CharacterStatus} 敵キャラのステータス
     */
    getEnemyStatus(){
        return this.enemy.getStatus();
    }

    /**
     * Playerのステータス取得関数
     * @returns {CharacterStatus} Playerのステータス
     */
    getPlayerStatus(){
        return this.player.getStatus();
    }

    /**
     * 敵キャラが取得可能かの確認関数
     * @returns {bool} 可能・不可能
     */
    canGetEnemy(){
        if(this.enemy == null){
            return false;
        }

        return true;
    }

    /**
     * Playerの回復
     */
    healPlayer(){
        this.player.heal();
    }

    /**
     * 敵キャラを倒したことの通知関数
     */
    enemyDown(){
        var value = this.enemy.getStatus().experiencePoint;
        this.player.addExperiencePoint(value);
    }

    /**
     * 敵キャラの生成関数
     * @param {MapElem} mapElem マップ要素(Enum)
     */
    static loadEnemy(mapElem){
        console.log("loadEnemy()");
        var enemyList = [];
        var playerLv = Player.getInstance().level;
        var maxLv = 0;
        var minLv = 0;
        switch(mapElem){
            case MAP_ELEM.PLAIN:
                enemyList = [ENEMY.SLIME, ENEMY.SLIME, ENEMY.SLIME, ENEMY.RABBIT, ENEMY.RABBIT, ENEMY.RABBIT, ENEMY.THIEF];
                maxLv = playerLv + 3;
                minLv = playerLv - 3;
                break;
            case MAP_ELEM.FOREST:
                enemyList = [ENEMY.SLIME, ENEMY.SLIME, ENEMY.SLIME, ENEMY.RABBIT, ENEMY.RABBIT, ENEMY.RABBIT, ENEMY.THIEF, ENEMY.THIEF, ENEMY.KNIGHT];
                maxLv = playerLv + 4;
                minLv = playerLv - 3;
                break;
            case MAP_ELEM.MOUNTAIN:
                enemyList = [ENEMY.SLIME, ENEMY.RABBIT, ENEMY.THIEF, ENEMY.THIEF, ENEMY.KNIGHT];
                maxLv = playerLv + 7;
                minLv = playerLv - 2;
                break;
            default:
                console.log("error map elem");
                enemyList = [ENEMY.SLIME, ENEMY.RABBIT, ENEMY.THIEF, ENEMY.KNIGHT];
                maxLv = 99;
                minLv = 99;
                break;
        }

        if(maxLv > 99){
            maxLv = 99;
        }
        if(minLv < 1){
            minLv = 1;
        }

        this.enemyNum   = Math.floor(Math.random() * enemyList.length);
        this.enemyLv    = Math.floor(Math.random() * (maxLv - minLv) + minLv);
        this.enemySpecies = enemyList[this.enemyNum];
    }

    /**
     * 敵キャラクラスの生成関数
     * @param {ENEMY} enemyNum 敵キャラの番号(Enum)
     * @param {int} lv 敵キャラのレベル
     */
    static createEnemy(mapElem){
        this.loadEnemy(mapElem);
        console.log(`CharacterManager.createEnemy : enemy_${this.enemyNum}, level_${this.enemyLv}`);
        switch(this.enemySpecies){
            case ENEMY.SLIME:
                return new Slime(this.enemyLv);
            case ENEMY.RABBIT:
                return new Rabbit(this.enemyLv);
            case ENEMY.THIEF:
                return new Thief(this.enemyLv);
            case ENEMY.KNIGHT:
                return new Knight(this.enemyLv);
            default:
                console.log("undefined enemy [%i]", this.enemyNum);
        }
    }
}