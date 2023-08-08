import {Injectable} from '@nestjs/common';
import * as fs from 'fs-extra';
import {
  BayesClassifier,
  LogisticRegressionClassifier,
  PorterStemmer,
  stopwords,
  TfIdf,
  WordTokenizer
} from 'natural';
import {Classifier, ClassifierRequest, OccurrenceCount} from '../models';
import {ClassifierType} from '../enums';
import {TextToConvertService} from '../text-to-convert/text-to-convert.service';

@Injectable()
export class ClassificationService {
  private classifier: BayesClassifier;

  constructor(
      private readonly textToConvertService: TextToConvertService) {
    this.classifier = new BayesClassifier();
  }

  public calculateIDF(req: Classifier[]): any {
    try {
      // Calculate IDF (Inverse Document Frequency)
      const idf = {};

      const normalizedDocuments = [];

      for (const data of req) {
        const tokens = this.preprocessText(data.text);
        normalizedDocuments.push(tokens);
      }

      const totalDocuments = normalizedDocuments.length;

      normalizedDocuments.forEach(tokens => {
        const uniqueTokens = new Set(tokens);
        uniqueTokens.forEach((token: string) => {
          idf[token] = (idf[token] || 0) + 1;
        });
      });

      Object.keys(idf).forEach(token => {
        idf[token] = Math.log(totalDocuments / idf[token]);
      });

      // Save IDF to a file
      fs.outputFile(`outputs/idf.json`, JSON.stringify(idf, null, 2));

      return idf;
    } catch (error) {
      throw error;
    }
  }

  public async trainClassifierAndPredict(req: ClassifierRequest): Promise<any> {
    try {
      let texts = null;
      if (req.isPos) {
        const positivePath = `${req.path}/pos`;
        const negativePath = `${req.path}/neg`;
        const positiveTexts: Classifier[] = await this.textToConvertService.textToArray(
            positivePath, true);
        const negativeTexts: Classifier[] = await this.textToConvertService.textToArray(
            negativePath, false);

        texts = [...positiveTexts, ...negativeTexts];

      } else {
        texts = await this.textToConvertService.textToArray(
            req.path, true);
      }

      this.calculateIDF(texts);
      const idf = JSON.parse(fs.readFileSync('outputs/idf.json', 'utf-8'));
      const posTermsPerClass = new Set<string>();
      const negTermsPerClass = new Set<string>();
      const allTokensWithDuplicates = [];

      let wordCount = 0;

      const processedDocuments = texts.map((doc) => {
        const tokens = this.preprocessText(doc.text);

        for (const token of tokens) {
          if (doc.label === 'pos') {
            posTermsPerClass.add(token);
          } else {
            negTermsPerClass.add(token);
          }

          allTokensWithDuplicates.push(token);
        }

        wordCount += doc.len;

        return {tokens, label: doc.label};
      });

      const tfidf = new TfIdf();

      processedDocuments.forEach(doc => {
        const docText = doc.tokens;
        tfidf.addDocument(docText);
      });

      // Create training data for the classifier
      const trainingData = processedDocuments.map(doc => {
        return {text: doc.tokens, label: doc.label};
      });

      // Create and train a Naive Bayes classifier
      let classifier = null;

      switch (req.classification) {
        case ClassifierType.BAYES:
          classifier = new BayesClassifier();
          break;
        case ClassifierType.LOGISTIC_REGRESSION:
          classifier = new LogisticRegressionClassifier();
          break;
        default:
          console.log('Classification not supported');
          break;
      }

      trainingData.forEach(data => {
        classifier.addDocument(data.text, data.label);
      });

      classifier.train();

      console.log(texts)

      const prediction = this.predictText(req.predictData, tfidf, classifier);
      return {
        prediction,
        idf,
        termsFreq: this.countOccurrences(allTokensWithDuplicates),
        totalWordCount: wordCount,
        class: [
          {class: 'pos', terms: Array.from(posTermsPerClass).length},
          {class: 'neg', terms: Array.from(negTermsPerClass).length}]
      }
    } catch (error) {
      throw error;
    }
  }

  public predictText(req: Classifier[], tfidf: any, classifier: any): any {
    try {
      let TP = 0, TN = 0, FP = 0, FN = 0;

      req.forEach(doc => {
        const predictedLabel = classifier.classify(
            this.preprocessText(doc.text));

        console.log(predictedLabel)

        if (predictedLabel === doc.label) {
          if (predictedLabel === 'pos') TP++;
          else TN++;
        } else {
          if (predictedLabel === 'pos') FP++;
          else FN++;
        }
      });

      const precision = TP / (TP + FP);
      const recall = TP / (TP + FN);
      const f1Score = 2 * (precision * recall) / (precision + recall);

      return {
        precision,
        recall,
        f1Score,
        confusionMatrix: {
          truePositive: TP,
          trueNegative: TN,
          falsePositive: FP,
          falseNegative: FN
        }
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Pre process the text and extract keywords and remove stop words
   * @param text
   * @private
   */
  public preprocessText(text: string): string[] {
    // Tokenize the text into individual words
    const tokenizer = new WordTokenizer();
    const stemmer = PorterStemmer;

    // normalize and tokenize
    const tokens = tokenizer.tokenize(text.toLowerCase());
    const stemmedTokens = tokens.map(token => stemmer.stem(token));

    // Remove stop words (common words with no significant meaning)
    const stopWords = new Set(stopwords);

    const filteredTokens = stemmedTokens.filter(
        (token) => !stopWords.has(token));

    return filteredTokens;
  }

  /**
   * Count no of tokens identified as keywords
   * @param tokens
   * @param keywords
   * @private
   */
  private countOccurrences(tokens: string[]): OccurrenceCount[] {
    const wordFrequencyList: any[] = [];
    // Count the occurrences of a specific word in the list of tokens
    const wordFrequency = tokens.reduce((acc, token) => {
      acc[token] = (acc[token] || 0) + 1;
      return acc;
    }, {});

    const separatedArray = Object.entries(wordFrequency).
        map(([word, count]) => ({word, count}));

    for (const token of separatedArray) {
      wordFrequencyList.push(token);
    }

    return wordFrequencyList;
  }
}
