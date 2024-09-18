import React from 'react';
import { Checkbox } from './Checkbox';

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  onCheckedChange?: (checked: boolean) => void;
}

export const CustomCheckbox: React.FC<CheckboxProps> = (props) => {
  return (
    <Checkbox
      {...props}
      className={`checkbox-custom ${props.className || ''}`}
    />
  );
};