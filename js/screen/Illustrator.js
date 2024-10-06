class Illustrator {

    static illustrator = new Illustrator();
    #TILESIZE = 64

    constructor() {
        console.log("Game image is loaded")
        this.imgGara = new Image();
        this.imgGara.src = "img/garashi.png";

        this.imgGaraDt = new Image();
        this.imgGaraDt.src = "img/garashi_dt.png";
        
        this.imgDevil  = new Image();
        this.imgDevil.src  = "img/Devil.png";

        this.imgMonster = new Image();
        this.imgMonster.src = "img/monster.png"

        // this.imgMap    = new Image();
        // this.imgPlayer = new Image();
        // this.imgMap.src    = "img/map.png"; // マップ画像のパス
        // this.imgPlayer.src = "img/player.png";    //プレイヤー画像のパス
    }

    /**
     * シングルトンで生成されたインスタンスを取得する関数
     * @returns インスタンス
     */
    static getInstance() {
        return this.illustrator;
    }
}