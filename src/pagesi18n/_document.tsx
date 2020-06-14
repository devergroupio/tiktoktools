import Document, { Head, Html, Main, NextScript } from "next/document";
import clientSideLang from "next-translate/clientSideLang";
import { CS_CONFIG } from "~@/utils";
import NoSSR from "react-no-ssr";
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
          {CS_CONFIG.NODE_ENV === "production" && (
            <NoSSR>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${CS_CONFIG.GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${CS_CONFIG.GA_TRACKING_ID}');
          `,
                }}
              />
            </NoSSR>
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
