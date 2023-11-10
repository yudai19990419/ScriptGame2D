class MapEvent {
    
    static hasEncount(mapElem) {
        const prob = [0, 0, 0, 0.2, 0, 0, 0.4, 0.6, 0, 0, 0, 0, 0, 0, 0, 0];   //敵の出現確率
            console.log(`エンカウント率: ${prob[mapElem]}`);
        
        if (Math.random() < prob[mapElem]) {
            console.log("\"敵が現れた！！\"");
            return true;
        } else {
            console.log("\"今日は良い天気ですね。\"");
            return false;
        }
    }

    static hasObstacle(mapElem, obstacle) {
        for (let obs of obstacle) {
            if (mapElem == obs) {
                return true;
            }
        } 
        return false;
    }
}