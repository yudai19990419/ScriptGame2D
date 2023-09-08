class Thief extends Enemy {

    constructor(level) {
        super();
        this.status.hp = 10;
        this.status.attack = 5;
        this.status.deffence = 1;
        this.status.level = level;

        this.escapeProbability = 40;

        this.corrdinateX = image.width / 4 * 2;
        this.corrdinateY = image.height;

        this.init();
    }
}