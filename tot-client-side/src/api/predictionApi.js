import HTTP from "./index";

export const savePrediction = (prediction) => HTTP.post(`/totalisator/prediction`, prediction);
// export const getPayout = (matchId, userId) => HTTP.get(`/totalisator/prediction/payout?matchId=${matchId}&?userId=${userId}`)
export const getMatchPlayerPayout = (matchId) => HTTP.get(`/totalisator/prediction/payout/${matchId}/player`)
export const getMatchPayouts = (matchId) => HTTP.get(`/totalisator/prediction/payout/${matchId}`)
export const getTotalisatorPayouts = (totalisatorId) => HTTP.get(`/totalisator/prediction/payout/all/${totalisatorId}`)

