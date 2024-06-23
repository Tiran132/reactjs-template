import axios from "axios"

const API_URL = "https://hack.hooli.click"

export interface IUserInfo {
    name: string,
    age: number,
    sex: string,
    region: string,
    wallet_id: string,
    telegram_id: string,
    price: number,
    balance: number,
    income: number,
    slave_master: number,
    referral_link: string,
    user_type: string,
  }

export type ISlavesRes = IUserInfo[]

export const getUserInfo = async (tgId: string) => {
    return axios.get(API_URL + "/users/" + tgId)
        .then((r): IUserInfo => r.data)
        .catch((e) => alert(e))
}

export const getUserSlaves = async (tgId: string) => {
    return axios.get(API_URL + "/get_my_slaves/" + tgId)
    .then((r): ISlavesRes => r.data)
    .catch((e) => alert(e))
}

export const getAvailableSlaves = async (tgId: string) => {
    return axios.get(API_URL + "/get_available_slaves/" + tgId)
    .then((r): ISlavesRes => r.data)
    .catch((e) => alert(e))
}



export const buySlave = async (masterId: number, slaveId: number) => {
    return axios.post(API_URL + `/buy_slave/?owner_id=${masterId}&slave_id=${slaveId}` , "")
    .then((r) => true)
    .catch((e) => alert(e))
}