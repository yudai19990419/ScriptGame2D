class Player extends Character {

    constructor() {
        super();
        this.status.hp = 10;
        this.status.attack = 3;
        this.status.deffence = 2;
        this.status.level = 1;
        this.status.experiencePoint = 0;
        this.status.maxExperiencePoint = 10;
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