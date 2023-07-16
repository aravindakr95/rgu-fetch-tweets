import { Body, Controller, Post } from '@nestjs/common';
import { NlpAdapterService } from './nlp-adapter.service';

@Controller('natural-lang-process')
export class NaturalLangProcessController {
  constructor(private nlpAdaterService: NlpAdapterService) {}
  @Post('/analyzeSentiment')
  async analyzeSentiment(@Body() { text }: { text: string }): Promise<any> {
    const result = await this.nlpAdaterService.analyzeSentiment(text);
    return result;
  }
}
