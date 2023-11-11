class Boss extends Enemy{
    constructor() {
        this.name     = "魔王";
        this.maxHP    = 999;
        this.hp       = this.maxHP;
        this.attack   = 999;
        this.deffence = 999;
        this.level    = level;

        this.escapeProbability = 0;
        this.init();
    }
}