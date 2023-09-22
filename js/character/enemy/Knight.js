class Knight extends Enemy {

    constructor(level) {
        super();
        this.status.hp = 15;
        this.status.attack = 7;
        this.status.deffence = 4;
        this.status.level = level;
        this.character = ENEMY.KNIGHT;

        this.escapeProbability = 20;

        this.corrdinateX = this.image.width / 4 * 3;
        this.corrdinateY = this.image.height;

        this.imageCorrdinate = [this.corrdinateX, this.corrdinateY];
        this.init();
    }
}