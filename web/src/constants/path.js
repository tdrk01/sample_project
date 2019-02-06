const API_ENDPOINT = process.env.REACT_APP_SERVER_URL+"/api/rest/v1";

export const Path = {
    root: {
        title: "トップページ",
        url: "/"
    },
    auth:{
        url: "/auth",
        login: {
            title: "ログイン",
            url: "/auth/login"
        },
        logout: {
            title: "ログイン",
            url: "/auth/logout"
        },
        register: {
            title: "新規登録",
            url: "/auth/register"
        },
        detail: {
            title: "追加情報の登録",
            url: "/auth/detail"
        },
        forget: {
            title: "パスワードのリセット",
            url: "/auth/forget"  
        },
        reset: {
            title: "パスワードのリセット",
            url: "/auth/reset/:token"  
        },
        social: {
            title: "追加情報の登録",
            url: "/auth/social/:userId/:token"  
        }
    },
    others:{
        url: "/others",
        privacy: {
            title: "プライバシーポリシー",
            url: "/others/privacy"
        },
        term: {
            title: "利用規約",
            url: "/others/term"
        },
        law: {
            title: "特定商取引法に関する記載事項",
            url: "/others/law"
        },
        contact: {
            title: "お問い合わせ",
            url: "/others/contact"
        },
        help: {
            title: "ヘルプ",
            url: "/others/help"
        },
    },
    items:{
        url: "/items",
        complete: {
            title: "購入完了",
            url: "/items/:hash/complete"
        },
        detail: {
            title: "ガチャ結果詳細",
            url: "/items/:hash/detail"
        },
        draw: {
            title: "ガチャを引く",
            url: "/items/:hash/draw"
        },
        ticket: {
            title: "チケット詳細",
            url: "/items/:hash/ticket"
        },
    },
    purchase:{
        url: "/purchase",
        credit: {
            title: "購入情報の入力",
            url: "/purchase/:boxId/credit"
        },
        confirm: {
            title: "購入内容の確認",
            url: "/purchase/:boxId/confirm"
        },
    },
    user:{
        title: "ガチャ結果詳細",
        url: "/user"
    },
    contents:{
        url: "/contents",
        view: {
            title: "プレビュー",
            url: "/contents/:hash"
        },
    },
    samples:{
        url: "/samples",
        complete: {
            title: "購入完了",
            url: "/samples/complete"
        },
        draw: {
            title: "ガチャを引く",
            url: "/samples/draw"
        },
        detail: {
            title: "ガチャ結果詳細",
            url: "/samples/:id/detail"
        },
    },
};

export class PathGenerator {
    static purchase(mode, boxId){
        return Path.purchase[mode].url.replace(/:boxId/g, boxId);
    }
    
    static item(mode, hash){
        return Path.items[mode].url.replace(/:hash/g, hash);
    }

    static gacha(hash){
        return process.env.REACT_APP_URL + PathGenerator.item("draw", hash);
    }

    static sample(id){
        return Path.samples.detail.url.replace(/:id/g, id);
    }

    static sampleDraw(){
        return process.env.REACT_APP_URL + Path.samples.draw.url;
    }
}

export const ExternalPath = {
    company: "https://tdrk-inc.co.jp",
    facebook: process.env.REACT_APP_SERVER_URL + "/users/login/facebook" 
}