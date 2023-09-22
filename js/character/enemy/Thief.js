class Thief extends Enemy {

    constructor(level) {
        super();
        this.status.character = ENEMY.THIEF;
        this.status.hp = 10;
        this.status.attack = 5;
        this.status.deffence = 1;
        this.status.level = level;

        this.escapeProbability = 40;

        this.corrdinateX = this.image.width / 4 * 2;
        this.corrdinateY = this.image.height;

        this.imageCorrdinate = [this.corrdinateX, this.corrdinateY];
        this.init();
    }
}