export class Rare {
    static toLabel( isRare = 0 ) {
        if(isRare == null){
            return null;
        }
        switch(isRare){
        case 0:
            return "ノーマル";
        case 1:
            return "レア";
        case 2:
            return "スーパーレア";
        case 3:
            return "レジェンド";
        case 4:
            return "ゴッド";
        }
    }
}