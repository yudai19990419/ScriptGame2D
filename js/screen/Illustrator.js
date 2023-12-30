// 画像読み込み用のクラス
class Illustrator {

    static illustrator = new Illustrator();

    constructor() {
        console.log("Game image is loaded")
        this.imgGara = new Image();
        this.imgGara.src = "img/garashi.png";

        this.imgGaraDt = new Image();
        this.imgGaraDt.src = "img/garashi_dt.png";
        
        this.imgDevil  = new Image();
        this.imgDevil.src  = "img/Devil.png";

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

    // TEST用
    // drawGarashi(context) {
    //     context.drawImage(this.imgGara, 0, 0, this.imgGara.width, this.imgGara.height,
    //          0, 0, window.innerWidth, window.innerHeight);
    // }

    // drawDevil(context) {
    //     console.log("drawDevil")
    //     context.drawImage(this.imgDevil, 0, 0, 500, 500, 
    //         Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2), this.#TILESIZE, this.#TILESIZE);
    // }
}