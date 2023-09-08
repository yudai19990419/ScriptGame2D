class CharacterStatus {
    constructor(){
        this.hp = 10;
        this.attack = 2;
        this.deffence = 1;
        this.level = 1;
    }

    get hp(){
        return this.hp;
    }

    get attack(){
        return this.attack;
    }

    get deffence(){
        return this.deffence;
    }

    get level(){
        return this.level;
    }

    set hp(hp){
        this.hp = hp;
    }

    set attack(attack){
        this.attack = attack;
    }

    set deffence(deffence){
        this.deffence = deffence;
    }

    set level(level){
        this.level = level;
    }
}