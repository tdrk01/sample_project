export class ColorUtil {
    static gradation(base={}, index, step){
        var str = "rgba("+ColorUtil.toRGB(base.red, (step-index)/step)+", "
            +ColorUtil.toRGB(base.green, (step-index)/step)+", "
            +ColorUtil.toRGB(base.blue, (step-index)/step)+", 1)";
        return str;
    }

    static toRGB(code, opacity){
        return Math.floor((1-opacity)*256 + opacity*code);
    }
}
