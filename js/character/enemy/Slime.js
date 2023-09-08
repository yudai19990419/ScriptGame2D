class Slime extends Enemy {

    constructor(level) {
        super();
        this.status.hp = 5;
        this.status.attack = 1;
        this.status.deffence = 1;
        this.status.level = level;

        this.escapeProbability = 60;

        this.corrdinateX = image.width / 4 * 0;
        this.corrdinateY = image.height;

        this.init();
    }
}