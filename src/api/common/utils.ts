import type { ApiResponse, ApiSuccessResponse } from "./types";

export function isSuccessResponse<TData, TMeta extends Record<string, unknown>>(
  response: ApiResponse<TData, TMeta> | undefined
): response is ApiSuccessResponse<TData, TMeta> {
  return Boolean(response && response.success);
}

export function getApiErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Something went wrong while loading data.";
}

