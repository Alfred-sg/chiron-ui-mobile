import React, { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { prefixCls } from '../../consts';
import './index.less';

export default ({
  children
}: {
  children: React.ReactNode
}): React.ReactPortal => {
  const containerRef = useRef<HTMLDivElement>(document.createElement('div'));
  containerRef.current.className = `${prefixCls}-portal-wrap`;

  useLayoutEffect(() => {
    document.body.appendChild(containerRef.current);

    return () => {
      document.body.removeChild(containerRef.current);
    };
  });

  const portal = (
    <div className={`${prefixCls}-portal`}>
      {children}
    </div>
  );

  return createPortal(
    portal,
    containerRef.current
  );
};