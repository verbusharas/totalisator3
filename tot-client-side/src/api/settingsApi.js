import HTTP from "./index";

export const fetchSettings = (totalisatorId) => HTTP.get(`/totalisator/${totalisatorId}/settings`)
export const saveSettings = (totalisatorId, settings) => HTTP.put(`/totalisator/${totalisatorId}/settings`, settings)