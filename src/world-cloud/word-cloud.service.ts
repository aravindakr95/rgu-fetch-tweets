import { Injectable } from '@nestjs/common';
import {
  OccurrenceCount,
  PrimaryRequest,
} from '../models';
import { NlpAdapterService } from '../nlp/nlp-adapter.service';
import { ClassificationService } from '../classification/classification.service';

@Injectable()
export class WordCloudService {
  constructor(private nlpAdapterService: NlpAdapterService, private classificationService: ClassificationService) {}

  /**
   * Pre process the text and find the no of occurrences based on the Watson provided keywords and generate word cloud
   * @param req
   */
  async generateWordCloud(req: PrimaryRequest): Promise<OccurrenceCount[]> {
    try {
      const { text } = req;
      const keywords = await this.nlpAdapterService.extractKeywords(req);

      const tokens = this.classificationService.preprocessText(text);
      const count = this.countOccurrences(tokens, keywords);

      return count;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Count no of tokens identified as keywords
   * @param tokens
   * @param keywords
   * @private
   */
  private countOccurrences(tokens: string[], keywords: string[]): OccurrenceCount[] {
    const wordFrequencyList: any[] = [];
    // Count the occurrences of a specific word in the list of tokens
    const wordFrequency = tokens.reduce((acc, token) => {
      acc[token] = (acc[token] || 0) + 1;
      return acc;
    }, {});

    const separatedArray = Object.entries(wordFrequency).map(([word, count]) => ({ word, count }));

    for (const keyword of keywords) {
      for (const token of separatedArray) {
        if (token.word === keyword) {
          wordFrequencyList.push(token);
        }
      }
    }

    return wordFrequencyList;
  }
}
