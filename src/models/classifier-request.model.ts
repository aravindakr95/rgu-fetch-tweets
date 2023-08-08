import {ClassifierType} from '../enums';

export class ClassifierRequest {
  predictData: Classifier[];
  classification?: ClassifierType
  path?: string;
  isPos?: boolean;
}

export class Classifier {
  text: string;
  label?: string;
  len?: number;
}