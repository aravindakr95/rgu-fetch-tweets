import { Body, Controller, Post } from '@nestjs/common';
import { NlpAdapterService } from './nlp-adapter.service';
import {
  GlobalAnyResponse,
  KeywordsResponse,
  LangResponse,
  PrimaryRequest
} from '../models';

@Controller('natural-lang-process')
export class NaturalLangProcessController {
  constructor(private nlpAdaterService: NlpAdapterService) {}

  /**
   * Analyze the provided text paragraph and decide whether it was a negative, positive or neutral sentiment
   * @param req
   */
  @Post('/analyzeSentiment')
  async analyzeSentiment(@Body() req: PrimaryRequest): Promise<GlobalAnyResponse> {
    try {
      const response = await this.nlpAdaterService.analyzeSentiment(req);
      return new GlobalAnyResponse(true, 200, 'Sentiment analysis is successful', response);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Extract keywords of the provided text paragraph
   * @param req
   */
  @Post('/extractKeywords')
  async extractKeywords(@Body() req: PrimaryRequest): Promise<KeywordsResponse> {
    try {
      const response = await this.nlpAdaterService.extractKeywords(req);
      return new KeywordsResponse(true, 200, 'Keywords identification successful', response);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Detect language of the text and returns highest confidence language
   * @param req
   */
  @Post('/detectLanguage')
  async detectLanguage(@Body() req: PrimaryRequest): Promise<LangResponse> {
    try {
      const response = await this.nlpAdaterService.detectLanguage(req);
      return new LangResponse(true, 200, 'Language detection successful', response);
    } catch (error) {
      console.log(error);
    }

  }

  /**
   * Identify the text language and translate into a source language
   * @param req
   */
  @Post('/translate')
  async translateToEn(@Body() req: PrimaryRequest): Promise<LangResponse> {
    try {
      const response = await this.nlpAdaterService.translate(req);
      return new LangResponse(true, 200, 'Language translation successful', response);
    } catch (error) {
      console.log(error);
    }
  }
}
