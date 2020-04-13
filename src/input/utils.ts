
import { Props } from './types';

export const convert = (props: Props): Props => {
  const converted = { ...props };
  const { type } = converted;
  switch(type){
    case 'phone':
      converted.filter = (val?: string) => {
        if (!val) return val;
        return [val.slice(0, 3), val.slice(3, 7), val.slice(7, 11)]
          .filter(item => !!item).join(' ');
      };
      converted.transformer = (val?: string) => {
        return val ? val.split(' ').join('') : val;
      };
      converted.maxLength = 13;
      break;
    case 'bankCard':
      converted.filter = (val?: string) => {
        if (!val) return val;
        return [val.slice(0, 4), val.slice(4, 8), val.slice(8, 12), val.slice(12, 16)]
          .filter(item => !!item).join(' ');
      };
      converted.transformer = (val?: string) => {
        return val ? val.split(' ').join('') : val;
      };
      converted.maxLength = 16;
      break;
    case 'number':
      converted.type = 'text';
      converted.pattern = '[0-9]*';
      break;
  }

  return converted;
};