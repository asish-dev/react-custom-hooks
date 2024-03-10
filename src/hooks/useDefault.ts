import * as React from 'react';

export default function useDefault(initialValue: any, defaultValue: any) {
  const [value, setValue] = React.useState(initialValue);

  const returnValue = value == null ? defaultValue : value;
  return [returnValue, setValue];
}
