class CharacterStatus {
    constructor(){
        this._character = ENEMY.THIEF;
        this._hp = 10;
        this._attack = 2;
        this._deffence = 1;
        this._level = 1;
        this.experiencePoint = 0;
        this.maxExperiencePoint = 30;
    }

    get character(){
        return this._character;
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

    get experiencePoint(){
        return this._experiencePoint;
    }

    get maxExperiencePoint(){
        return this._maxExperiencePoint;
    }

    set character(character){
        this._character = character;
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

    set experiencePoint(experiencePoint){
        this._experiencePoint = experiencePoint;
    }

    set maxExperiencePoint(maxExperiencePoint){
        this._maxExperiencePoint = maxExperiencePoint;
    }
}