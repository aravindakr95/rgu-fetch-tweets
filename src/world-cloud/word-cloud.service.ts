import { Injectable } from '@nestjs/common';
import * as natural from 'natural';
import {OccurrenceCount, PrimaryRequest} from '../models';
import { NlpAdapterService } from '../nlp/nlp-adapter.service';

@Injectable()
export class WordCloudService {
  constructor(private nlpAdapterService: NlpAdapterService) {}

  /**
   * Pre process the text and find the no of occurrences based on the Watson provided keywords and generate word cloud
   * @param req
   */
  async generateWordCloud(req: PrimaryRequest): Promise<OccurrenceCount[]> {
    try {
      const { text } = req;
      const keywords = await this.nlpAdapterService.extractKeywords(req);
      const tokens = this.preprocessText(text);
      const count = this.countOccurrences(tokens, keywords);

      return count;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Pre process the text and extract keywords and remove stopwords
   * @param text
   * @private
   */
  private preprocessText(text: string): string[] {
    // Tokenize the text into individual words
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(text.toLowerCase());

    // Remove stopwords (common words with no significant meaning)
    const stopWords = new Set(natural.stopwords);
    const filteredTokens = tokens.filter((token) => !stopWords.has(token));

    return filteredTokens;
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
