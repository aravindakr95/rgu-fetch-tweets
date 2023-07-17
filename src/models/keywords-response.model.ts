import {GlobalResponseObject} from './global-response.model';

export class KeywordsResponse extends GlobalResponseObject {
  data: string[];

  /**
   *
   * @param status
   * @param statusCode
   * @param internalMessage
   * @param data
   */
  constructor(status:boolean, statusCode:number, internalMessage:string, data?: string[]) {
    super(status,statusCode,internalMessage);
    this.data = data;
  }
}
