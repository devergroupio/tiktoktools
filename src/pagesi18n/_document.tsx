import Document, { Head, Html, Main, NextScript } from "next/document";
import clientSideLang from "next-translate/clientSideLang";
class MyDocument extends Document {
  render() {
    return (
      <Html lang={clientSideLang()}>
        <Head>
          <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
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
