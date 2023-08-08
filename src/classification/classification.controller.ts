import {Body, Controller, Post } from '@nestjs/common';
import {
  ClassifierRequest,
  GlobalAnyResponse
} from '../models';
import {ClassificationService} from './classification.service';

@Controller('classification')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  /**
   * Calculate document inverse frequency for multiple paragraphs
   * @param req
   */
  @Post('/calculateIDF')
  async calculateIDF(@Body() req: ClassifierRequest): Promise<GlobalAnyResponse> {
    try {
      const response = await this.classificationService.calculateIDF(req.predictData);
      return new GlobalAnyResponse(true, 200, 'Inverse document frequency generation successful', response);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Train classifiers and predict text labels
   * @param req
   */
  @Post('/trainClassifierAndPredict')
  async trainClassifierAndPredict(@Body() req: ClassifierRequest): Promise<GlobalAnyResponse> {
    try {
      const response = await this.classificationService.trainClassifierAndPredict(req);
      return new GlobalAnyResponse(true, 200, 'Prediction details retrieval successful', response);
    } catch (error) {
      console.log(error);
    }
  }
}
