import Document, { Head, Html, Main, NextScript } from "next/document";
import clientSideLang from "next-translate/clientSideLang";
class MyDocument extends Document {
  render() {
    return (
      <Html lang={clientSideLang()}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
