import HTTP from "./index";

export const savePrediction = (prediction) => HTTP.post(`/totalisator/prediction`, prediction);
// export const getPayout = (matchId, userId) => HTTP.get(`/totalisator/prediction/payout?matchId=${matchId}&?userId=${userId}`)
export const getPayouts = (matchId) => HTTP.get(`/totalisator/prediction/payout/${matchId}`)

