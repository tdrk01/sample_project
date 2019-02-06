const API_ENDPOINT = process.env.REACT_APP_SERVER_URL+"/api/rest/v1";

export class EndPoints {

    static users(mode = null){
        var base = API_ENDPOINT + "/users";
        if(mode != null){
            base += "/" + mode;
        }
        return base;
    }

    static user(userId, mode = null){
        var base = EndPoints.users() + "/" + userId;
        if(mode != null){
            base += "/" + mode;
        }
        return base;
    }

    static purchases(mode = null){
        var base = API_ENDPOINT + "/purchases";
        if(mode != null){
            base += "/" + mode;
        }
        return base;
    }

    static purchase(purchaseHash, mode = null){
        var base = EndPoints.purchases() + "/" + purchaseHash;
        if(mode != null){
            base += "/" + mode;
        }
        return base;
    }


    static boxes(mode = null){
        var base = API_ENDPOINT + "/boxes";
        if(mode != null){
            base += "/" + mode;
        }
        return base;
    }

    static contents(mode = null){
        var base = API_ENDPOINT + "/contents";
        if(mode != null){
            base += "/" + mode;
        }
        return base;
    }

    static contacts(){
        var base = API_ENDPOINT + "/contacts";
        return base;
    }  

    static codes(mode = null){
        var base = API_ENDPOINT + "/codes";
        if(mode != null){
            base += "/" + mode;
        }
        return base;
    }

    static samples(mode = null){
        var base = API_ENDPOINT + "/samples";
        if(mode != null){
            base += "/" + mode;
        }
        return base;
    }
}
