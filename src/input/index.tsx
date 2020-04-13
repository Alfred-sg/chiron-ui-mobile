import React, { useState, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { IconContext } from 'react-icons';
import * as Icons from 'react-icons/ai';// https://react-icons.netlify.com/#/icons/ai
import { prefixCls } from '../consts';
import { convert } from './utils';
import { Props } from './types';
import './index.less';

const { AiFillCloseCircle, AiOutlineInfoCircle } = Icons;

const Input = (props: Props) => {
  const finalProps = convert(props);
  const { type, placeholder, maxLength, noOutline, clear = false, 
    disabled, readonly, error, onErrorClick, prefixIcon, suffixIcon,
    filter, transformer, defaultValue = '', value = '', onChange, 
    onBlur, onFocus, 
  } = finalProps;
  const [stateValue, setStateValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    if ('value' in props) setStateValue(value);
  }, [value]);

  const wrapCls = classnames({
    [`${prefixCls}-input-wrap`]: true,
    [`${prefixCls}-input-prefix-icon-wrap`]: !!prefixIcon,
    [`${prefixCls}-input-clearable-wrap`]: !!clear,
    [`${prefixCls}-input-error-wrap`]: !!error,
    [`${prefixCls}-input-suffix-icon-wrap`]: !!suffixIcon,
    [`${prefixCls}-input-nooutline-wrap`]: !!noOutline,
  });

  const inputCls = classnames({
    [`${prefixCls}-input`]: true,
  });

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
  };

  const handleErrorClick = useCallback(() => {
    onErrorClick && onErrorClick(error as string);
  }, []);

  const handleBlur = useCallback(() => {
    const transformedValue = transformer ? transformer(stateValue) : stateValue;
    onBlur && onBlur(transformedValue);
  }, []);

  const handleFocus = useCallback(() => {
    const transformedValue = transformer ? transformer(stateValue) : stateValue;
    onFocus && onFocus(transformedValue);
  }, []);

  const inputProps = {
    type,
    disabled,
    readonly: readonly ? 'readonly' : false,// input 设置只读 https://blog.csdn.net/qq_37138818/article/details/89012073
    className: inputCls,
    placeholder,
    maxLength,
    value: filter ? filter(stateValue) : stateValue,
    onChange: handleChange,
    onBlur: handleBlur, 
    onFocus: handleFocus, 
  };

  // @ts-ignore
  const PrefixIcon = Icons[prefixIcon];
  // @ts-ignore
  const SuffixIcon = Icons[suffixIcon];

  return (
    <div className={`${prefixCls}-input-field`}>
      <div className={wrapCls}>
        {prefixIcon ? (
          <IconContext.Provider value={{ className: 'prefix-icon' }}>
            <PrefixIcon />
          </IconContext.Provider>
        ) : null}

        <input {...inputProps} />

        {clear ? (
          <span onClick={handleClear}>
            <IconContext.Provider value={{ className: 'clear-icon' }}>
              <AiFillCloseCircle />
            </IconContext.Provider>
          </span>
        ) : null}

        {error ? (
          <span onClick={handleErrorClick}>
            <IconContext.Provider value={{ className: 'error-icon' }}>
              <AiOutlineInfoCircle />
            </IconContext.Provider>
          </span>
        ) : null}

        {suffixIcon ? (
          <IconContext.Provider value={{ className: 'suffix-icon' }}>
            <SuffixIcon />
          </IconContext.Provider>
        ) : null}
      </div>

      {error ? (
        <div className={`${prefixCls}-input-error-message`} onClick={handleErrorClick}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

export default Input;