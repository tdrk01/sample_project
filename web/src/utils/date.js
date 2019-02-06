export class DateUtil {

    static age(birthdayStr){
        return DateUtil.ageOn(birthdayStr, (new Date()).toISOString() );
    }

    static ageOn(birthdayStr, dateStr){
        let date = DateUtil.toDate(birthdayStr);
        let todayDate = DateUtil.toDate(dateStr);

        var  age = todayDate.getFullYear() - date.getFullYear();
        if( todayDate.getMonth() < date.getMonth() ){
            return age - 1;
        }

        if( todayDate.getMonth() === date.getMonth() && todayDate.getDate() <= date.getDate() ){
            return age - 1;
        }
        return age; 
    }

    static intervalToNow(dateStr){
        let date = DateUtil.toDate(dateStr);
        let now = new Date();
        let interval = Math.floor( ( now.getTime() - date.getTime( ) )/ 1000 ) ;

        if(interval < 60){
            return interval + "秒前";
        }
        if(interval < 60 * 60){
            return Math.floor(interval/60) + "分前";
        }
        if(interval < 60 * 60 * 24){
            return Math.floor(interval/(60 * 60)) + "時間前";
        }
        return DateUtil.toJaDateString(date);
    }

    static toDate(dateStr) {
        if(dateStr == null){
            return null;
        }
        
        if(dateStr.indexOf(":") !== -1 ){
            return new Date( dateStr.replace(/\s/g, "T").trim() + "+09:00" );
        }else{
            return new Date( dateStr.replace(/\s/g, "T").trim() + "00:00:00+09:00");
        }
    }

    static toJaDateString(date) {
        if(date == null){
            return null;
        }
        return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
    }

    static startOfMonth(d){
        var date = new Date(d);
        return date.getFullYear() + "-" + ("00"+date.getMonth()).slice(-2) + "-01 00:00:00";
    }

}