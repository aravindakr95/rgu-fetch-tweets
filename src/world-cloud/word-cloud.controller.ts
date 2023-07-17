import { Body, Controller, Post } from '@nestjs/common';
import { NlpAdapterService } from '../nlp/nlp-adapter.service';
import { PrimaryRequest, WordCloudResponse } from '../models';
import { WordCloudService } from './word-cloud.service';

@Controller('pre-process')
export class WordCloudController {
  constructor(
      private nlpAdaterService: NlpAdapterService,
      private wordCloudService: WordCloudService) {}

  /**
   * Pre process the text and find the no of occurrences based on the Watson provided keywords and generate word cloud
   * @param req
   */
  @Post('/generateWordCloud')
  async generateWordCloud(@Body() req: PrimaryRequest): Promise<WordCloudResponse> {
    try {
      const response = await this.wordCloudService.generateWordCloud(req);
      return new WordCloudResponse(true, 200, 'Word cloud generation successful', response);
    } catch (error) {
      console.log(error);
    }
  }
}
