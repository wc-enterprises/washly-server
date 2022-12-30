export function frameResponse<T>(
  status: 'SUCCESS' | 'ERROR',
  message: string,
  data?: T,
) {
  return {
    status,
    message,
    data,
  };
}
