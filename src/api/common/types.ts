export type ApiSuccessResponse<TData, TMeta extends Record<string, unknown> = Record<string, never>> = {
  success: true;
  data: TData;
} & TMeta;

export type ApiErrorResponse = {
  success: false;
  error: string;
};

export type ApiResponse<TData, TMeta extends Record<string, unknown> = Record<string, never>> =
  | ApiSuccessResponse<TData, TMeta>
  | ApiErrorResponse;
