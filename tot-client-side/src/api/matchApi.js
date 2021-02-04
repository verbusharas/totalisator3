import HTTP from "./index";

export const saveAsMatches = (totalisatorId, matches) => HTTP.post(`/totalisator/${totalisatorId}/match`, matches);
export const fetchMatches = (totalisatorId) => HTTP.get(`totalisator/${totalisatorId}/match`);
export const fetchRegisteredMatches = (totalisatorId) => HTTP.get(`/totalisator/${totalisatorId}/match/pending`);
export const fetchFinishedMatches = (totalisatorId) => HTTP.get(`/totalisator/${totalisatorId}/match/finished`);
export const saveAsMatch = (totalisatorId, match) => HTTP.post(`/totalisator/${totalisatorId}/match`, match);
export const fetchUpdatedMatch = (totalisatorId, match) => HTTP.patch(`/totalisator/${totalisatorId}/match`, match);


// decoupling
export const fetchPlayerNotPredictedMatches = (totalisatorId) => HTTP.get(`/totalisator/${totalisatorId}/match/player/not-predicted/`);
export const fetchPlayerPendingMatches = (totalisatorId) => HTTP.get(`/totalisator/${totalisatorId}/match/player/pending/`);
// /api/totalisator/3/match/player/not-predicted/