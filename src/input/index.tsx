import React, { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { IconContext } from 'react-icons';
import { AiFillCloseCircle } from 'react-icons/ai';// https://react-icons.netlify.com/#/icons/ai
import { prefixCls } from '../consts';
import { Props } from './types';
import './index.less';

const Input = ({
  type,
  placeholder,
  maxLength,
  noOutline,
  clear = true,
  format,
  transform,
  defaultValue = '',
  value,
  onChange,
}: Props) => {
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
    value: stateValue,
  };

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setStateValue(value);
    onChange && onChange(value);
  }, []);

  const handleClear = useCallback(() => {
    setStateValue('');
    onChange && onChange('');
  }, []);

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