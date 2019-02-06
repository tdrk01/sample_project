export class StringUtil {
    static linedHtml( string ){
        return string.replace(/\n/g,"<br />");
    }
    static hiraganaToKatakana(src) {
      return src.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
      });
    }

    static messageFormErrors (errors) {
        return Object.keys(errors).map( (key) => {
            var error = errors[key];
            return error.map( (message) => {
                return message + "\n";
            });
        });
    }
}