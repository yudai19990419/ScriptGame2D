// FIXME: Uncaught ReferenceError
class MapArithmetic {
    
    constructor(){
        mapCreater    = new MapCreater();
        mapController = new MapController();
    }

    fetchMapElem(){
        return this.mapCreater.getMap(this.mapController.getValueX(), this.mapController.getValueY());
    }

    // 障害物判定
    static hasObstacle() {
        const obs = this.mapCreater.obstacle; 
        for (let i = 0; i < obs.length; i++) {
            if (this.fetchMapElem() == obs[i]) {
                return true;
            }
        } 
        return false;
    }
}