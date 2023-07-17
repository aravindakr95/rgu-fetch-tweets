import { GlobalResponseObject } from './global-response.model';
import { OccurrenceCount } from './occurrence-count.model';

export class WordCloudResponse extends GlobalResponseObject {
  data: OccurrenceCount[];

  /**
   *
   * @param status
   * @param statusCode
   * @param internalMessage
   * @param data
   */
  constructor(status:boolean, statusCode:number, internalMessage:string, data?: OccurrenceCount[]) {
    super(status,statusCode,internalMessage);
    this.data = data;
  }
}
