
import { Props } from './types';

export const convertPropsByType = (props: Props) => {
  const { type } = props;
  if (!type) return props;

  switch(type){
    case 'phone':
      // props.format = format ? 
  }
}