import { Injectable } from '@nestjs/common';
import axios from 'axios';

import projectConfig from '../../config';
import {PrimaryRequest} from '../models';

@Injectable()
export class TwitterAdapterService {
  constructor() {}
  private readonly baseUrl = 'https://api.twitter.com/2/tweets';

  /**
   * Retrieves latest tweets by provided keyword
   * @param keyword
   */
  async searchTweetsByKeyword(req: PrimaryRequest): Promise<any> {
    const query = encodeURIComponent(req.text);
    const endpoint = `${this.baseUrl}/search/recent?query=${query}&max_results=2`;

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${projectConfig.tw.twitterBT}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
