import {ClassifierType} from '../enums';

export class ClassifierRequest {
  predictData: Classifier[];
  classification?: ClassifierType
  path?: string;
}

export class Classifier {
  text: string;
  label?: string;
  len?: number;
}