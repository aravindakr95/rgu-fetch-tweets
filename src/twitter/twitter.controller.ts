import { Controller, Get, Query } from '@nestjs/common';
import { TwitterAdapterService } from './twitter-adapter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private twitterAdapterService: TwitterAdapterService) {}
  @Get('/getTweets')
  async getTweetsFromAPIV2(@Query('keyword') keyword: string): Promise<any> {
    try {
      if (!keyword) {
        return { message: 'Please provide a keyword parameter in the query string.' };
      }

      const tweets = await this.twitterAdapterService.searchTweetsByKeyword(keyword);
      return { data: tweets };
    } catch (error) {
      console.log(error);
    }
  }
}
