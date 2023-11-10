class Slime extends Enemy {

    sx = 0;

    constructor(level) {
        super();
        this.status.character = ENEMY.SLIME;
        this.name     = "スライム";
        this.maxHp    = 5;
        this.hp       = this.maxHp;
        this.attack   = 1;
        this.deffence = 1;
        this.level    = level;

        this.escapeProbability = 60;
        this.init();
    }
}