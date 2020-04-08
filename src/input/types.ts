export interface Props {
  type?: Type;
  placeholder?: string;
  maxLength?: number;
  noOutline?: boolean;// 无边框模式
  clear?: boolean;// 是否带清除按钮
  filter?: (val?: string) => string | undefined;// 展示值
  transformer?: (val?: string) => string | undefined;// 提交值
  defaultValue?: string;
  value?: string;
  onChange?: (val?: string) => void;
};

// https://www.w3school.com.cn/tags/att_input_type.asp
export type Type = 'password' |'phone' |  'number' | 'digit' | 'money' | 
  'bankCard' | 'hidden';