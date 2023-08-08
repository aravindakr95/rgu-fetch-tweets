import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';

import projectConfig from '../../config';
import {Classifier, PrimaryRequest} from '../models';
import * as path from 'path';

@Injectable()
export class TextToConvertService {
  constructor() {}
  private readonly baseUrl = 'https://api.twitter.com/2/tweets';

  /**
   * Retrieves latest tweets by provided keyword
   * @param req
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

  public async readFileContent(filePath): Promise<any> {
    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      return fileContent;
    } catch (error) {
      console.error(`Error reading file: ${filePath}`, error);
      return null;
    }
  }

  public async textToArray(folderPath: string, isPositive?: boolean): Promise<Classifier[]> {
    try {
      const fileNames = fs.readdirSync(folderPath);
      const dataArray = [];

      for (const fileName of fileNames) {
        if (fileName.endsWith('.txt')) {
          const filePath = path.join(folderPath, fileName);
          const fileContent = await this.readFileContent(filePath);
          if (fileContent !== null) {
            dataArray.push({ text: fileContent, label: isPositive ? 'pos' : 'neg', len: fileContent.length });
          }
        }
      }
      return dataArray;
    } catch (error) {
      throw error;
    }
  }
}
