import { GlobalResponseObject } from './global-response.model';
import { Language } from './language.model';

export class LangResponse extends GlobalResponseObject {
  data: Language;

  /**
   *
   * @param status
   * @param statusCode
   * @param internalMessage
   * @param data
   */
  constructor(status:boolean, statusCode:number, internalMessage:string, data?: Language) {
    super(status,statusCode,internalMessage);
    this.data = data;
  }
}
