import React, { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { IconContext } from 'react-icons';
import { AiFillCloseCircle } from 'react-icons/ai';// https://react-icons.netlify.com/#/icons/ai
import { prefixCls } from '../consts';
import { Props } from './types';
import './index.less';

const convert = (props: Props): Props => {
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
  }

  return converted;
};

const Input = (props: Props) => {
  const finalProps = convert(props);
  const { type, placeholder, maxLength, noOutline, clear = true,
    filter, transformer, defaultValue = '', value = '', onChange, } = finalProps;
  const [stateValue, setStateValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    setStateValue(value);
  }, [value]);

  const wrapCls = classnames({
    [`${prefixCls}-input-wrap`]: true,
    [`${prefixCls}-input-clearable-wrap`]: !!clear,
    [`${prefixCls}-input-nooutline-wrap`]: !!noOutline,
  });

  const inputCls = classnames({
    [`${prefixCls}-input`]: true,
  });

  const inputProps = {
    type,
    className: inputCls,
    placeholder,
    maxLength,
    value: filter ? filter(stateValue) : stateValue,
  };

  console.log(stateValue)

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    triggerChange(value);
  }, []);

  const handleClear = useCallback(() => {
    triggerChange('');
  }, []);

  const triggerChange = (value: string) => {
    const transformedValue = transformer ? transformer(value) : value;
    setStateValue(transformedValue || '');
    onChange && onChange(transformedValue || '');
  }

  return (
    <div className={wrapCls}>
      <input {...inputProps} onChange={handleChange} />

      {clear ? (
        <span onClick={handleClear}>
        <IconContext.Provider value={{ className: 'clear-icon' }}>
          <AiFillCloseCircle />
        </IconContext.Provider>
        </span>
      ) : null}
    </div>
  );
}

export default Input;