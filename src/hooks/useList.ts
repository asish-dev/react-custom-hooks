import * as React from 'react';

const placeholder = () => {};

export default function useList(defaultList = []) {
  const [list, setList] = React.useState(defaultList);

  const set = (newList) => {
    setList([...newList]);
  };

  const push = (element) => {
    setList((l) => [...l, element]);
  };

  const removeAt = (removeIndex) => {
    setList((l) => l.filter((_, index) => index !== removeIndex));
  };

  const insertAt = (insertIndex, element) => {
    setList((l) => [
      ...l.slice(0, insertIndex),
      element,
      ...l.slice(insertIndex),
    ]);
  };

  const updateAt = (updateIndex, element) => {
    setList((l) =>
      l.map((item, index) => (index === updateIndex ? element : item))
    );
  };

  const clear = () => {
    setList([]);
  };

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}
