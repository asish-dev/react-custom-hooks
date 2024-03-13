import * as React from "react";

export default function useFavicon(url: string) {
  React.useEffect(() => {
    let link = document.querySelector(`link[rel="icon"]`);

    if (!link) {
      link = document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "icon";
      link.href = url;
      document.head.appendChild(link);
    } else {
      link.href = url;
    }
  }, [url]);
}
