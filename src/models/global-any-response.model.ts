import { GlobalResponseObject } from './global-response.model';

export class GlobalAnyResponse extends GlobalResponseObject {
  data: any | any[];

  /**
   *
   * @param status
   * @param statusCode
   * @param internalMessage
   * @param data
   */
  constructor(status:boolean, statusCode:number, internalMessage:string, data?: any | any[]) {
    super(status,statusCode,internalMessage);
    this.data = data;
  }
}
