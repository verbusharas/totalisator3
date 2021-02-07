import HTTP from "./index";

export const savePrediction = (prediction) => HTTP.post(`/totalisator/prediction`, prediction);
export const getMatchPlayerPayout = (matchId) => HTTP.get(`/totalisator/prediction/payout/${matchId}/player`)
export const getMatchPayouts = (matchId) => HTTP.get(`/totalisator/prediction/payout/${matchId}`)
export const getTotalisatorPayouts = (totalisatorId) => HTTP.get(`/totalisator/prediction/payout/all/${totalisatorId}`)

export const getSamplePayouts = (sampleScore) => {
    console.log("Kreipiamasi i /totalisator/prediction/payout/sample")
    console.log("Su payload:", sampleScore)
    return HTTP.post(`/totalisator/prediction/payout/sample`, sampleScore);
}

