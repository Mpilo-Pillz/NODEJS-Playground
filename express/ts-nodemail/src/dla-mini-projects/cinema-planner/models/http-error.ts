class HttpError extends Error {
  message: string;
  errorCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
  }
}

module.exports = HttpError;
