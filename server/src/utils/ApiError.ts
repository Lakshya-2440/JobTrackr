export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Record<string, string[] | undefined>;

  constructor(statusCode: number, message: string, errors?: Record<string, string[] | undefined>) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

