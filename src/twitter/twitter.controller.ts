import { Controller, Get, Query } from '@nestjs/common';
import { TwitterAdapterService } from './twitter-adapter.service';
import { GlobalAnyResponse, PrimaryRequest } from '../models';

@Controller('twitter')
export class TwitterController {
  constructor(private twitterAdapterService: TwitterAdapterService) {}

  /**
   * Retrieves latest tweets by provided keyword
   * @param keyword
   */
  @Get('/getTweets')
  async getTweetsFromAPIV2(@Query('keyword') keyword: PrimaryRequest): Promise<GlobalAnyResponse> {
    try {
      if (keyword) {
        const response = await this.twitterAdapterService.searchTweetsByKeyword(keyword);
        return new GlobalAnyResponse(true, 200, 'Tweets fetch successful', response);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
