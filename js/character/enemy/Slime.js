class Slime extends Enemy {

    constructor(level) {
        super();
        this.status.character = ENEMY.SLIME;
        this.status.hp = 5;
        this.status.attack = 1;
        this.status.deffence = 1;
        this.status.level = level;

        this.escapeProbability = 60;

        this.corrdinateX = this.image.width / 4 * 0;
        this.corrdinateY = this.image.height;

        this.imageCorrdinate = [this.corrdinateX, this.corrdinateY];
        this.init();
    }
}