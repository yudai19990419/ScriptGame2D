/**
 * Singleton
 * インスタンス生成はgetInstance()を用いる
 */

class Player extends Character {

    static #player = new Player();

    experiencePoint;
    maxExperiencePoint;
    // TODO: 一度しかインスタンス生成できないよう修正
    constructor() {
        super();
        this.initPlayerLevel();
    }

    static getInstance() {
        return this.#player;
    }

    initPlayerLevel(){
        this.maxHp              =         10;
        this.hp                 = this.maxHp;
        this.level              =          1;
        this.attack             =          3;
        this.deffence           =          2;
        this.experiencePoint    =          0;
        this.maxExperiencePoint =         10;
    }

    /**
     * シングルトンのインスタンスを取得する関数
     * 
     * @returns インスタンス
     */
    static getInstance() {
        return this.#player;
    }

    get experiencePoint() {
        return this.experiencePoint;
    }

    get maxExperiencePoint() {
        return this.maxExperiencePoint;
    }

    /**
     * 経験値のadd関数
     * @param {int} experiencePoint 経験値
     */
    addExperiencePoint(experiencePoint) {
        this.experiencePoint += experiencePoint;
        // 経験値が経験値Max値よりも大きい時
        while(this.experiencePoint >= this.maxExperiencePoint){
            this.levelUp();
        }
    }

    /**
     * レベルアップ時の処理を行う関数
     */
    levelUp() {
        console.log(`LEVEL UP!!`)
        this.level++;
        this.experiencePoint -= this.maxExperiencePoint;
        this.updateStatus();
        this.confirmCurrentStatus();
    }

    /**
     * 現在のステータスをコンソールに表示する関数
     */
    confirmCurrentStatus() {
        console.log(`MAX_HP  : ${this.maxHp}`);
        console.log(`HP      : ${this.hp}`);
        console.log(`LEVEL   : ${this.level}`);
        console.log(`ATTACK  : ${this.attack}`);
        console.log(`DEFFENCE: ${this.deffence}`);
        console.log(`EXP     : ${this.experiencePoint}`);
        console.log(`MAX_EXP : ${this.maxExperiencePoint}`)
    }
}