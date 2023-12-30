class Character {

    status = new CharacterStatus();
    #maxHp;
    #hp;
    #level;
    #attack;
    #deffence;
    // speed;
    // luck;
    
    constructor(){
        this.image = null;
    }

    get maxHp() {
        return this.#maxHp;
    }

    get hp() {
        return this.#hp;
    }
    
    get level() {
        return this.#level;
    }

    get attack() {
        return this.#attack;
    }

    get deffence() {
        return this.#deffence;
    }

    set maxHp(maxHp) {
        this.#maxHp = maxHp;
    }

    set hp(hp) {
        this.#hp = hp;
    }

    set level(level) {
        this.#level = level;
    }

    set attack(attack) {
        this.#attack = attack;
    }

    set deffence(deffence) {
        this.#deffence = deffence;
    }
    
    /**
     * 初期化関数
     */
    init(){
        // レベルに対してのステータスにする
        updateStatus();
    }

    /**
     * 攻撃関数
     * @param {Character}   target  攻撃対象
     * @returns {int} 残りHP
     */
    attackTarget(target){
        console.log(`Character::attack()`);
        // HPに攻撃ダメージを与える
        target.hp -= this.calcDamage(target);
        // HPがマイナス値になった場合
        if(target.hp < 0){
            target.hp = 0;
        }
    }

    /**
     * 逃げる
     * @return {bool} 成功・失敗
     */
    escape(){
        throw "実装されていません";
    }

    /**
     * 敵キャラの画像取得関数
     * @returns {HTMLImageElement} 敵キャラの画像
     */
    getImage(){
        return this.image;
    }

    /**
     * 敵キャラの画像位置取得関数
     * @returns {List<int>} 敵キャラの画像位置
     */
    // getImageCorrdinate(){
    //     return [this.corrdinateX, this.corrdinateY];
    // }

    /**
     * 敵キャラのステータス取得関数
     * @returns {CharacterStatus} 敵キャラのステータス
     */
    getStatus(){
        return this.status;
    }

    /**
     * 回復関数
     * HPを10回復する
     */
    heal(){
        // if(this.hp + 10 <= this.maxHp){
        //     this.hp += 10;
        // }
        // else{
        //     this.hp = this.maxHp;
        // }
        this.hp = this.maxHp;
        console.log(`[HEAL] HP: ${this.hp}`);
    }

    /**
     * 与えるダメージ計算関数
     * @returns {int} 実際に受けるダメージ
     */
    calcDamage(target){
        let damage = Math.floor(this.attack - target.deffence * 0.6 + 1);
        if(damage < 1){
            damage = 1
        }
        return damage;
    }

    /**
     * レベルに対応してステータスを更新する関数
     */
    updateStatus(){
        if(this.level == 1){
            return;
        }
        // ステータスの更新はレベル-1分
        let coefficient = this.level - 1;
        this.maxHp    = Math.floor(this.maxHp    * (coefficient * 1.4) + 1); 
        this.hp       = this.maxHp;
        this.attack   = Math.floor(this.attack   * (coefficient * 1.3) + 1); 
        this.deffence = Math.floor(this.deffence * (coefficient * 1.2) + 1); 
        // 経験値のMAX値はレベルが上がる毎に1.5倍
        this.maxExperiencePoint *= 1.5;
        // console.log("character:%s", this.status.Character);
        // console.log(this.status);
    }
}