import React, { useState } from 'react';
import Input from '../input';
import Portal from '../_common/portal';

export default () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleTrigger = () => {
    setVisible(true);
  }

  return (
    <div>
      <div onClick={handleTrigger}>
        <Input readonly placeholder="请选择" suffixIcon="AiOutlineDown" />
      </div>

      <Portal>
        <div>我是一个 portal</div>
      </Portal>
    </div>
  )
}