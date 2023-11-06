class GeneralError extends Error {
  constructor(message:any) {
    super();
    this.message = message;
  }

  getCode() {
    return 400;
  }
}

class BadRequest extends GeneralError {
  constructor(message:any) {
    super(message);
    this.name = "BadRequest";
  }

  getCode() {
    return 400;
  }
}

class NotFound extends GeneralError {
  constructor(message:any) {
    super(message);
    this.name = "NotFound";
  }

  getCode() {
    return 404;
  }
}

class MongoError extends GeneralError {
  constructor(message:any) {
    super(message);
    this.name = "MongoError";
  }

  getCode() {
    return 400;
  }
}

export { GeneralError, BadRequest, NotFound, MongoError };
