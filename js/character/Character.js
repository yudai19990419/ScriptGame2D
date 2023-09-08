class Character {

    constructor(){
        this.status = new CharacterStatus();
        this.maxHp = 0;
        this.image = null;
        this.corrdinateX = 0;
        this.corrdinateY = 0;
    }
    
    /**
     * 初期化関数
     */
    init(){
        throw "実装されていません";
    }

    /**
     * 攻撃関数
     * @param {int} attackDamage 与えるダメージ
     * @returns {int} 残りHP
     */
    attack(attackDamage){
        console.log("attack() : attackDamage[%i]", attackDamage);
        // HPに攻撃ダメージを与える
        this.status.hp = this.status.hp - this.calcDamage(attackDamage);
        // HPがマイナス値になった場合
        if(this.status.hp < 0){
            this.status.hp = 0;
        }

        return this.status.hp;
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
    getImageCorrdinate(){
        return [this.corrdinateX, this.corrdinateY];
    }

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
        if(this.status.hp + 10 <= this.maxHp){
            this.status.hp += 10;
        }
        else{
            this.status.hp = this.maxHp;
        }
    }

    /**
     * 与えるダメージ計算関数
     * @returns {int} 実際に受けるダメージ
     */
    calcDamage(attackDamage){
        var damage = Math.floor(attackDamage - this.status.deffence * 0.6 + 1);
        if(damage < 1){
            damage = 1
        }
        return damage;
    }

    /**
     * レベルに対応してステータスを更新する関数
     */
    updateStatus(){
        if(this.status.level == 1){
            return;
        }

        // ステータスの更新はレベル-1分
        var coefficient = this.status.level - 1;
        this.status.hp = Math.floor(this.status.hp * (coefficient* 1.4) + 1); 
        this.maxHp = this.status.hp;
        this.status.attack = Math.floor(this.status.attack * (coefficient * 1.3) + 1); 
        this.status.deffence = Math.floor(this.status.deffence * (coefficient * 1.2) + 1); 
    }
}