import React from "react";
import Prism from "prismjs";
import "./prism.css";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/plugins/custom-class/prism-custom-class";
import styles from "./CodeBlock.module.scss";

const CodeContent = ({ lang, data }) => {
  const useIsMounted = () => {
    const is_mounted = React.useRef(false);

    React.useEffect(() => {
      is_mounted.current = true;

      return () => {
        is_mounted.current = false;
      };
    }, []);
    return () => is_mounted.current;
  };

  const [showdata, setshowdata] = React.useState(false);
  const isMounted = useIsMounted();
  React.useEffect(() => {
    if (isMounted()) {
      setshowdata(true);
      Prism.highlightAll();
    }
  }, [lang, data, isMounted]);

  Prism.plugins.customClass.add(({ content, language }) => {
    if (content === "function") {
      return "storage-function";
    }
    if (content === "&lt;?php") {
      return "operator-php";
    }
    if (language === "json") {
      return "json";
    }
  });

  return (
    <>
      {showdata && (
        <pre className={styles.pre}>
          <code className={`language-${lang}`}>{data}</code>
        </pre>
      )}
    </>
  );
};

export default CodeContent;
