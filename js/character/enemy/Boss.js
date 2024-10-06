class Boss extends Enemy{
    constructor(level) {
        super();
        this.name     = "魔王";
        this.maxHP    = 1;
        this.hp       = this.maxHP;
        this.attack   = 1;
        this.deffence = 1;
        this.level    = level;
        this.image = Illustrator.getInstance().imgDevil;
        this.escapeProbability = 0;
    }
}