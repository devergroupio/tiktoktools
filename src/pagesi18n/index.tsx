import { Global, css } from "@emotion/core";
import Header from "~@/components/Header";
import Head from "next/head";
import DownloadForm from "~@/components/DownloadForm";
export default () => {
  return (
    <>
      <Global
        styles={css`
          body {
            background: #3c434a;
            padding: 0;
            margin: 0;
            font-family: "Roboto Mono", monospace;
          }
        `}
      />
      <Head>
        <title>Download TikTok Video</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta
          name="description"
          content="Download tiktok video without logo, watermark"
        ></meta>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&display=swap"
          rel="stylesheet"
        ></link> */}
      </Head>
      <Header />
      <main
        css={css`
          min-height: calc(100vh - 62px);
          display: flex;
          padding: 20px;
          margin-top: 62px;
          justify-content: center;
          align-items: center;
        `}
      >
        <DownloadForm />
        {/* <video
          controls={true}
          src={`http://v16m.tiktokcdn.com/e4656751774d84c56bf7f82d1cd502ab/5ee46c00/video/tos/alisg/tos-alisg-pve-0037/5e34d675edea45c0954920336bcbb11e/?a=1233&br=2450&bt=1225&cr=0&cs=0&dr=0&ds=6&er=&l=20200613000229010189073132389AF26F&lr=musically&mime_type=video_mp4&qs=0&rc=M2V1Ozhlb3FodTMzPDgzM0ApNmQ1Z2RnNmVlN2c3aWk0aGczNW0vaWFicGVfLS00LzRzczM0MzI0Ll8zMjQuMi0uXy06Yw%3D%3D&vl=&vr=`}
        ></video> */}
      </main>
    </>
  );
};
