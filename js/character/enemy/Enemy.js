class Enemy extends Character {

    constructor() {
        super();
        // 逃げれる確率
        this.escapeProbability = 100;
        
        this.image = new Image();
        this.image.src = "img/monster.png"; // 敵キャラ画像のパス
        this.imagePath = "img/monster.png"
        this.imageCorrdinate = [0,0];
    }

    /**
     * 初期化関数
     */
    init(){
        // レベルに合わせてステータスを更新する
        this.updateStatus();
    }

    // Characterのオーバーライド
    escape(){
        var probability = [];
        // 逃げれる確率分をpushする
        for(let i = 0; i < this.escapeProbability; i++){
            probability.push(true);
        }

        // 逃げれない確率をpushする
        for(let i = 0; probability.length < 100; i++){
            probability.push(false);
        }

        return probability[Math.floor(Math.random(probability.length))];
    }

    // Characterのオーバーライド
    getImage(){
        return this.imagePath;
    }

    // Characterのオーバーライド
    getImageCorrdinate(){
        return this.imageCorrdinate;
    }
}