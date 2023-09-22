class Rabbit extends Enemy {

    constructor(level) {
        super();
        this.status.character = ENEMY.RABBIT;
        this.status.hp = 8;
        this.status.attack = 2;
        this.status.deffence = 2;
        this.status.level = level;

        this.escapeProbability = 30;

        this.corrdinateX = this.image.width / 4 * 1;
        this.corrdinateY = this.image.height;

        this.imageCorrdinate = [this.corrdinateX, this.corrdinateY];
        this.init();
    }

}