import HTTP from "./index";

export const saveAsMatches = (totalisatorId, matches) => HTTP.post(`/totalisator/${totalisatorId}/match`, matches);
export const fetchMatches = (totalisatorId) => HTTP.get(`totalisator/${totalisatorId}/match`);
export const fetchManagerPendingMatches = (totalisatorId) => HTTP.get(`/totalisator/${totalisatorId}/match/pending`);
export const fetchManagerFinishedMatches = (totalisatorId) => HTTP.get(`/totalisator/${totalisatorId}/match/finished`);
export const saveAsMatch = (totalisatorId, match) => HTTP.post(`/totalisator/${totalisatorId}/match`, match);
export const fetchUpdatedMatch = (totalisatorId, match) => HTTP.patch(`/totalisator/${totalisatorId}/match`, match);