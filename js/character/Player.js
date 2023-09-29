class Player extends Character {

    hp;
    level;
    attack;
    deffence;
    experiencePoint;
    maxExperiencePoint;

    constructor() {
        super();
        this.hp                 = this.status.hp;
        // FIXME: 既に上位クラスで初期値が設定されている
        // FIXME: 上位クラスの設定値と代入値が異なる
        this.attack             = this.status.attack = 3;
        this.deffence           = this.status.deffence = 2;
        this.level              = this.status.level;
        this.experiencePoint    = this.status.experiencePoint;
        this.maxExperiencePoint = this.status.maxExperiencePoint = 10;
    }

    /**
     * 経験値のadd関数
     * @param {int} experiencePoint 経験値
     */
    addExperiencePoint(experiencePoint) {
        this.status.experiencePoint += experiencePoint;

        // 経験値が経験値Max値よりも大きい時
        while(this.status.experiencePoint >= this.status.maxExperiencePoint){
            this.status.level += 1;
            this.status.experiencePoint -= this.status.maxExperiencePoint;
            this.updateStatus();
        }
    }
}