class Rabbit extends Enemy {

    constructor(level) {
        super();
        this.status.hp = 8;
        this.status.attack = 2;
        this.status.deffence = 2;
        this.status.level = level;

        this.escapeProbability = 30;

        this.corrdinateX = image.width / 4 * 1;
        this.corrdinateY = image.height;

        this.init();
    }

}