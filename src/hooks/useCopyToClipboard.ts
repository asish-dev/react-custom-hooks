import * as React from 'react';

function oldSchoolCopy(text) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
}

export default function useCopyToClipboard() {
  const [copiedText, setCopiedText] = React.useState(null);

  const copyToClipboard = React.useCallback((text) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          setCopiedText(text);
        } else {
          throw new Error('writeText not supported');
        }
      } catch (error) {
        oldSchoolCopy(text);
        setCopiedText(text);
      }
    };

    handleCopy();
  }, []);

  return [copiedText, copyToClipboard];
}
