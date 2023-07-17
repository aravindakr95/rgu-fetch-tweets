export class GlobalResponseObject {
  status: boolean;
  statusCode: number;
  internalMessage: string;
  /**
   *
   * @param status
   * @param statusCode
   * @param internalMessage
   */
  constructor(status: boolean, statusCode: number, internalMessage: string){
    this.status = status;
    this.statusCode = statusCode;
    this.internalMessage = internalMessage;
  }
}

export class ErrorResponse extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}