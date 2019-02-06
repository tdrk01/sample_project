export class PriceUtil {
    static withUnit(price){
        if(price){
            if(price >= 1e8){
                let result = Math.floor(price/1e8) + "億";
                let change = Number.parseInt(String(price).slice(-8))
                if ( change >= 1e4){
                    result += Math.floor(change/1e4) + "万";
                }
                return result += "円"
            } else if (price >= 1e5){
                return Math.floor(price/1e4) + "万円";
            } else {
                return Math.floor(price)+"円";
            }
        }
    }
    static withSpan(price){
      if(price){
        if(price >= 1e8){
          let result = Math.floor(price/1e8) + "億";
          let change = Number.parseInt(String(price).slice(-8))/10000;
          change = change !== 0 ? change : "";
          return result + change;
        } else {
          return Math.floor(price/1e4);
        }
      }
    }
    static putComma(price){
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}