class CharacterStatus {
    constructor(){
        this.hp = 10;
        this.attack = 2;
        this.deffence = 1;
        this.level = 1;
    }

    get hp(){
        return this._hp;
    }

    get attack(){
        return this._attack;
    }

    get deffence(){
        return this._deffence;
    }

    get level(){
        return this._level;
    }

    set hp(hp){
        this._hp = hp;
    }

    set attack(attack){
        this._attack = attack;
    }

    set deffence(deffence){
        this._deffence = deffence;
    }

    set level(level){
        this._level = level;
    }
}