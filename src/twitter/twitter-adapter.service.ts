import { Injectable } from '@nestjs/common';
import axios from 'axios';

import projectConfig from '../../config';

@Injectable()
export class TwitterAdapterService {
  constructor() {}
  private readonly baseUrl = 'https://api.twitter.com/2/tweets';

  async searchTweetsByKeyword(keyword: string): Promise<any> {
    const query = encodeURIComponent(keyword);
    const endpoint = `${this.baseUrl}/search/recent?query=${query}&max_results=2`;

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${projectConfig.twitterBT}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching tweets:', error.response?.data?.errors || error.message);
      throw error;
    }
  }
}
