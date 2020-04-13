export interface Props {
  type?: Type;
  pattern?: string;
  placeholder?: string;
  maxLength?: number;
  noOutline?: boolean;// 无边框模式
  clear?: boolean;// 是否带清除按钮
  disabled?: boolean;
  error?: string;// 错误信息
  prefixIcon?: string;// 前缀图标
  suffixIcon?: string;// 后缀图标
  onErrorClick?: (err: string) => void;// 错误按钮点击
  filter?: (val?: string) => string | undefined;// 展示值
  transformer?: (val?: string) => string | undefined;// 提交值
  defaultValue?: string;
  value?: string;
  onChange?: (val?: string) => void;
  onBlur?: (val?: string) => void;
  onFocus?: (val?: string) => void;
};

// https://www.w3school.com.cn/tags/att_input_type.asp
export type Type = 'text' | 'password' |'phone' |  'number' | 'digit' | 'money' | 
  'bankCard' | 'hidden';