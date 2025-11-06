import { fetchWrapper } from "../common/fetchWrapper";
import type { UsersListResponse } from "./types";

const USERS_ENDPOINT = "/api/users";

export async function getUsers() {
  return fetchWrapper<UsersListResponse>(USERS_ENDPOINT);
}
