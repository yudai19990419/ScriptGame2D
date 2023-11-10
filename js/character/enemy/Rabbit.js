class Rabbit extends Enemy {

    sx = 1;

    constructor(level) {
        super();
        this.status.character = ENEMY.RABBIT;
        this.name     = "ラビット";
        this.maxHp    = 8;
        this.hp       = this.maxHp;
        this.attack   = 2;
        this.deffence = 2;
        this.level    = level;

        this.escapeProbability = 30;
        this.init();
    }

}