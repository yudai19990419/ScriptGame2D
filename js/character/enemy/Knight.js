class Knight extends Enemy {
    sx = 2;

    constructor(level) {
        super();
        this.character = ENEMY.KNIGHT;
        this.name     = "ナイト";
        this.maxHP    = 15;
        this.hp       = this.maxHP;
        this.attack   = 7;
        this.deffence = 4;
        this.level    = level;
        this.image = Illustrator.getInstance().imgMonster;
        this.escapeProbability = 20;
        this.init();
    }
}