class Thief extends Enemy {

    sx = 3;
    
    constructor(level) {
        super();
        this.status.character = ENEMY.THIEF;
        this.name     = "ドラゴン";
        this.maxHp    = 10;
        this.hp       = this.maxHp;
        this.attack   = 5;
        this.deffence = 1;
        this.level    = level;

        this.escapeProbability = 40;
        this.init();
    }
}