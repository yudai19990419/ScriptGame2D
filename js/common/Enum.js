/**
 * Enumの実装クラス
 */
 Enum = function() {
    this._enums = [];
    this._lookups = {};
};

/**
 * enumを取得する
 * @return {array} enumオブジェクト
 */
Enum.prototype.getEnums = function() {
    return _enums;
};

/**
 * 繰り返し処理する
 * @param {array} callback コールバック
 */
Enum.prototype.forEach = function(callback){
    var length = this._enums.length;
    for (var i = 0; i < length; ++i){
        callback(this._enums[i]);
    }
};

/**
 * enumを追加する
 * @param {object} e enumの追加情報
 */
Enum.prototype.addEnum = function(e) {
    this._enums.push(e);
};

/**
 * 名前を取得する
 * @param {string} name 名前
 * @return {string} 名前文字列
 */
Enum.prototype.getByName = function(name) {
    return this[name];
};

/**
 * 値を取得する
 * @param  {string} field フィールド
 * @param  {object} value 値
 * @return {object} 設定した値
 */
Enum.prototype.getByValue = function(field, value) {
    var lookup = this._lookups[field];
    if(lookup) {
        return lookup[value];
    } else {
        this._lookups[field] = ( lookup = {});
        var k = this._enums.length - 1;
        for(; k >= 0; --k) {
            var m = this._enums[k];
            var j = m[field];
            lookup[j] = m;
            if(j == value) {
                return m;
            }
        }
    }
    return null;
};

/**
 * Enumを定義する
 * @param  {object} definition 定義内容
 * @return {object} enum
 */
function defineEnum(definition) {
    var k;
    var e = new Enum();
    for(k in definition) {
        var j = definition[k];
        e[k] = j;
        e.addEnum(j);
    }
    return e;
}


/**
 * キー入力のEnum
 */
const DIRECTION = defineEnum({
    UP : {
        key : 'w',
        code : 0
    },
    DOWN : {
        key : 'z',
        code : 1
    },
    RIGHT : {
        key : 's',
        code : 2
    },
    LEFT : {
        key : 'a',
        code : 3  
    },
    ENTER : {
        key : 'Enter',
        code : 4
    },
    ARROW_UP : {
        key : 'ArrowUp',
        code : 0
    },
    ARROW_DOWN : {
        key : 'ArrowDown',
        code : 1
    },
    ARROW_RIGHT : {
        key : 'ArrowRight',
        code : 2
    },
    ARROW_LEFT : {
        key : 'ArrowLeft',
        code : 3
    }
});

/**
 * 通知のEnum
 */
const REQUEST_CODE = {
    CONTINUE : 0,
    HEAL : 1,
    BUTTLE : 2,
    BOSS :  3,
    GET_KEY : 4,
    GAME_START : 5,
    GAME_END:6,
    RETURN_MAP:7,
    ATTACK_PLAYER:8,
    ATTACK_ENEMY:9,
    ESCAPE:10,
    ESCAPE_SUCCESS:11,
    ENEMY_DOWN:12,
    GAME_OVER:13,
};

const MAP_ELEM = {
    SEA : 0,
    RIVER : 1,
    ROCKY_MOUNTAIN : 2,
    PLAIN : 3,
    CASTLE_1 : 4,
    CASTLE_2 : 5,
    CASTLE_3 : 8,
    CASTLE_4 : 9,
    FOREST : 6,
    MOUNTAIN : 7,
    VILLAGE_1 : 10,
    VILLAGE_2 : 11,
    HOUSE : 12,
    CAVE : 13,
    BOSS : 15,
    DOOR : 14,
};

const ENEMY = {
    SLIME : 0,
    RABBIT : 1,
    KNIGHT : 2,
    THIEF : 3,
    BOSS : 4,
}