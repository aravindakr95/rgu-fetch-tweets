import { Injectable } from '@nestjs/common';
import { NaturalLanguageUnderstandingV1 } from 'ibm-watson/sdk';
import { IamAuthenticator } from 'ibm-watson/auth';

import projectConfig from '../../config';

@Injectable()
export class NlpAdapterService {
  private nlu: NaturalLanguageUnderstandingV1;

  constructor() {
    this.nlu = new NaturalLanguageUnderstandingV1({
      version: '2022-04-07',
      authenticator: new IamAuthenticator({
        apikey: projectConfig.watsonBT,
      }),
      serviceUrl: projectConfig.watsonAPIURL,
    });
  }

  async analyzeSentiment(
    text: string,
  ): Promise<any> {
    const response = await this.nlu.analyze({
      text: text,
      features: {
        sentiment: {
          document: true,
        },
      },
    });

    return response.result;
  }
}
