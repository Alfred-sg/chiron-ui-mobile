export interface Props {
  type?: Type;
  placeholder?: string;
  maxLength?: number;
  noOutline?: boolean;// 无边框模式
  clear?: boolean;// 是否带清除按钮
  format?: (val?: string) => void;
  transform?: (val?: string) => void;
  defaultValue?: string;
  value?: string;
  onChange?: (val?: string) => void;
};

// https://www.w3school.com.cn/tags/att_input_type.asp
export type Type = 'password' |'phone' |  'number' | 'digit' | 'money' | 
  'bankCard' | 'hidden';