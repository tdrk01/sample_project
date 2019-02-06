import Api from "../../utils/api";
import { EndPoints } from "../../constants/endpoints";

export const validate = () => {
  let errors = {}
  return errors
}

const ErrorMessages = {
  required: "必須項目です。",
  email: "メールアドレスの形式が正しくありません。",
  num: "半角数字(小数不可)で入力して下さい。",
  password: "英字、数字を組み合わせた8文字以上、16文字以内で入力してください。",
  date: "2000-01-30の形式で入力してください。",
  minNumber: "数値が少なすぎます。",
  maxNumber: "数値が多すぎます。",
  decimal: "半角数字で入力して下さい。",
  tel: "電話番号は半角数字（-）で入力してください。",
  zip: "郵便番号は半角数字（-）で入力してください。",
  url: "URLの形式が間違っています。",
  zero: '発送しない場合は0を入力してください。'
}

const Regex = {
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  num: /^[0-9]+$/,
  password: /^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/,
  date: /(\d{4}).?(\d{2}).?(\d{2}).*/,
  decimal: /^[0-9]+(\.[0-9]*)?$/,
  tel: /^\d{1,4}-\d{4}$|^\d{2,5}-\d{1,4}-\d{4}$/,
  zip: /^\d{3}[-]\d{4}$/,
  url: /^(https?)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/
}


export const required = value => {
  if(value === null || value === undefined ){
    return ErrorMessages.required;
  }
  if( typeof value === "string" && value.length == 0 ){
    return ErrorMessages.required;
  }
  return undefined;
}

export const zero = text => value => value !== '' ? undefined : `${text}しない場合は0を入力してください。`

export const email = value =>
  value && !Regex.email.test(value) ? ErrorMessages.email : undefined

export const password = value =>
  value && !Regex.password.test(value) ? ErrorMessages.password : undefined

export const url = value =>
  value && !Regex.url.test(value) ? ErrorMessages.url : undefined

export const zip = value =>
  value && !Regex.zip.test(value) ? ErrorMessages.zip : undefined

export const tel = value =>
  value && !Regex.tel.test(value) ? ErrorMessages.tel : undefined

export const decimal = value =>
  value && !Regex.decimal.test(value) ? ErrorMessages.decimal : undefined

export const date = value =>
  value && !Regex.date.test(value) ? ErrorMessages.date : undefined

export const num = value =>
  value && !Regex.num.test(value) ? ErrorMessages.num : undefined

export const minNumber = min => value =>
  value && value < min ? `${min}以上で入力してください。` : undefined

export const maxNumber = max => value =>
  value && value > max ? `${max}以下で入力してください。` : undefined

export const minLength = min => value =>
  value && value.length < min ? `${min}文字以上で入力してください。` : undefined

export const maxLength = max => value =>
  value && value.length > max ? `${max}文字以内で入力してください。` : undefined

export const isConfirmed = name => (value, allValues) => {
  return value != allValues[name] ? '確認用のパスワードと一致しません': undefined;
}


export const emailExists = (values, dispatch) => {
  return Api.post( EndPoints.users("email"), {email: values.email} ).then( (result) => {
    if( result.status != 200 || result.data.found ){
      throw { email: 'このメールアドレスは使用されています' };  
    }
  });
}