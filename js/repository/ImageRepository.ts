class ImageRepository {
    static imageRepository = new ImageRepository();

    imgGara: HTMLImageElement = new Image();
    imgGaraDt: HTMLImageElement = new Image();
    imgDevil: HTMLImageElement = new Image();
    imgMonster: HTMLImageElement = new Image();
    imgMap: HTMLImageElement = new Image();
    imgPlayer: HTMLImageElement = new Image();

    constructor() {
        console.log("Game image is loaded")
        this.imgGara.src = "js/resources/img/garashi.png";
        this.imgGaraDt.src = "js/resources/img/garashi_dt.png";
        this.imgDevil.src  = "js/resources/img/Devil.png";
        this.imgMonster.src = "js/resources/img/monster.png"
        this.imgMap.src    = "js/resources/img/map.png"; // マップ画像のパス
        this.imgPlayer.src = "js/resources/img/player.png";    //プレイヤー画像のパス
    }

    /**
     * シングルトンで生成されたインスタンスを取得する関数
     * @returns インスタンス
     */
    static getInstance() {
        return this.imageRepository;
    }
}