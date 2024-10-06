class Illustrator {

    static illustrator = new Illustrator();

    constructor() {
        console.log("Game image is loaded")
        this.imgGara = new Image();
        this.imgGara.src = "js/resources/img/garashi.png";

        this.imgGaraDt = new Image();
        this.imgGaraDt.src = "js/resources/img/garashi_dt.png";
        
        this.imgDevil  = new Image();
        this.imgDevil.src  = "js/resources/img/Devil.png";

        this.imgMonster = new Image();
        this.imgMonster.src = "js/resources/img/monster.png"

        this.imgMap    = new Image();
        this.imgPlayer = new Image();
        this.imgMap.src    = "js/resources/img/map.png"; // マップ画像のパス
        this.imgPlayer.src = "js/resources/img/player.png";    //プレイヤー画像のパス
    }

    /**
     * シングルトンで生成されたインスタンスを取得する関数
     * @returns インスタンス
     */
    static getInstance() {
        return this.illustrator;
    }
}