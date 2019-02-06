import { SET_CREDITDATA, PURCHASE, GET_PURCHASE, GET_PURCHASE_DETAIL, DO_DRAW, USE_TICKET, GET_CARD_TOKEN, EDIT_PURCHASE } from "../constants/type";
import Api from "../utils/api";
import { EndPoints } from "../constants/endpoints";

declare var Payjp;

export const setCreditData = (data) => {
    return {
        type: SET_CREDITDATA,
        data: data
    };
}

export const getCardToken = (data) => {
    return (dispatch) => {
        return {
            type: GET_CARD_TOKEN,
            payload: () => {
                Payjp.setPublicKey(process.env.REACT_APP_PAYJP_KEY);
                return new Promise( (resolve, reject) => {
                    Payjp.createToken(data, (status, response) => {
                      if (status == 200) {
                        resolve(response); 
                      } else {
                        reject(response);
                      };
                    });
                });
            }
        };
    };
}

export const purchase = (data) => {
    return (dispatch) => {
        return {
            type: PURCHASE,
            payload: () => {
                return Api.post( EndPoints.purchases(), data );
            }
        };
    };
};

export const getPurchase = (hash) => {
    return (dispatch) => {
        return {
            type: GET_PURCHASE,
            payload: () => {
                return Api.get( EndPoints.purchase(hash));
            }
        };
    };
}

export const getPurchaseDetail = (hash) => {
    return (dispatch) => {
        return {
            type: GET_PURCHASE_DETAIL,
            payload: () => {
                return Api.get( EndPoints.purchase(hash, "detail"));
            }
        };
    };
}

export const draw = (hash) => {
    return (dispatch) => {
        return {
            type: DO_DRAW,
            payload: () => {
                return Api.put( EndPoints.purchase(hash, "draw") );
            }
        };
    };
};

export const useTicket = (hash) => {
    return (dispatch) => {
        return {
            type: USE_TICKET,
            payload: () => {
                return Api.post( EndPoints.purchase(hash, "use") );
            }
        };
    };
};

export const editPurchase = (hash, data) => {
    return (dispatch) => {
        return {
            type: EDIT_PURCHASE,
            payload: () => {
                return Api.put( EndPoints.purchase(hash), data );
            }
        };
    };
};