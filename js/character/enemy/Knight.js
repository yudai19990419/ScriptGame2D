class Knight extends Enemy {

    constructor(level) {
        super();
        this.status.hp = 15;
        this.status.attack = 7;
        this.status.deffence = 4;
        this.status.level = level;

        this.escapeProbability = 20;

        this.corrdinateX = image.width / 4 * 3;
        this.corrdinateY = image.height;

        this.init();
    }
}