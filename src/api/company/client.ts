import { fetchWrapper } from "../common/fetchWrapper";
import type { CompaniesListResponse } from "./types";

const COMPANIES_ENDPOINT = "/api/companies";

export async function getCompanies() {
  return fetchWrapper<CompaniesListResponse>(COMPANIES_ENDPOINT);
}
