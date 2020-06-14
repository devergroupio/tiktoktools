import Document, { Head, Html, Main, NextScript } from "next/document";
import clientSideLang from "next-translate/clientSideLang";
class MyDocument extends Document {
  render() {
    return (
      <Html lang={clientSideLang()}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
          <meta name="language" content={clientSideLang()}></meta>
          <meta name="author" content="devergroup.io"></meta>
          <meta name="robots" content="index,follow"></meta>
        </Head>

        <body>
          <Main />
          <NextScript />
          {process.env.NODE_ENV === "production" &&
            process.env.GA_TRACKING_ID !== null &&
            process.env.GA_TRACKING_ID !== "null" && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_TRACKING_ID}');
          `,
                  }}
                />
              </>
            )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
