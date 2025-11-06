import type { ApiErrorResponse } from "./types";

const DEFAULT_API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");

export type QueryParams = Record<string, string | number | boolean | undefined>;

export type FetchWrapperOptions = Omit<RequestInit, "body"> & {
  query?: QueryParams;
  body?: unknown;
};

function buildUrl(path: string, query?: QueryParams) {
  const url = new URL(`${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

export async function fetchWrapper<TResponse>(path: string, options: FetchWrapperOptions = {}): Promise<TResponse> {
  const { body, headers, query, method = body ? "POST" : "GET", ...rest } = options;
  const url = buildUrl(path, query);

  const finalHeaders = new Headers(headers);
  finalHeaders.set("Accept", "application/json");

  let serializedBody;
  if (body !== undefined) {
    finalHeaders.set("Content-Type", "application/json");
    serializedBody = JSON.stringify(body);
  }

  const response = await fetch(url, {
    method,
    headers: finalHeaders,
    body: serializedBody,
    ...rest,
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = (data as ApiErrorResponse).error || response.statusText || "Unknown error";
    throw new Error(errorMessage);
  }

  return data as TResponse;
}
