class Enemy extends Character {

    name;
    // TODO: 敵キャラ個別に設定
    dropExperiencePoint = 5;
    image;

    constructor() {
        super();
        // TODO: 各キャラで個別に設定
        this.escapeProbability = 100;        
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
}