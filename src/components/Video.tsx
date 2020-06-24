import { Row, Col, Button, Table, Tag } from "antd";
import { css } from "@emotion/core";
import ReactPlayer from "react-player";
import useTranslation from "next-translate/useTranslation";
import { saveAs } from "file-saver";
const Video = ({ id, image, videoLink, music, videoUrl, desc, tags }) => {
  const { t } = useTranslation();
  const download = (link, name) => {
    return saveAs(link, name);
  };
  const dataSource = [
    // {
    //   key: "hd",
    //   type: "mp4",
    //   format: (
    //     <>
    //       <Tag color="green">{t("home:format-hd")}</Tag>
    //       <Tag color="blue">{t("home:format-without-watermark")}</Tag>
    //     </>
    //   ),
    //   link: videoLink + "&improve_bitrate=1&ratio=1080p",
    //   filename: `tiktok-${id}.mp4`,
    // },
    {
      key: "nowatermark",
      type: "mp4",
      format: <Tag color="blue">{t("home:format-without-watermark")}</Tag>,
      link: videoLink,
      filename: `tiktok-${id}.mp4`,
    },
  ];
  if (music) {
    dataSource.push(
      {
        key: "mp3",
        format: <Tag color="gold">{t("home:format-mp3")}</Tag>,
        link: music.playUrl,
        type: "mp3",
        filename: music.title + ".mp3",
      },
      {
        key: "normal",
        format: <Tag color="error">{t("home:format-with-watermark")}</Tag>,
        link: videoUrl,
        type: "mp4",
        filename: `tiktok-${id}.mp4`,
      }
    );
  } else {
    dataSource.push({
      key: "normal",
      format: <Tag color="error">{t("home:format-with-watermark")}</Tag>,
      link: videoUrl,
      type: "mp4",
      filename: `tiktok-${id}.mp4`,
    });
  }
  return (
    <Col>
      <Row align="top">
        <Col
          css={css`
            width: 300px;
            height: auto;
            max-height: 400px;
            margin: 0 auto;
            .react-player__preview {
              width: 300px !important;
              height: 400px !important;
            }
            video {
              height: 400px !important;
              max-height: 400px;
            }
          `}
        >
          <ReactPlayer
            playing
            controls={true}
            light={image}
            url={videoLink}
            width="100%"
            height="100%"
          />
        </Col>
        <Col
          css={css`
            margin-left: 20px;
            @media (max-width: 767px) {
              margin-left: 0px;
              margin-top: 20px;
            }
          `}
        >
          <Table
            columns={[
              {
                responsive: ["xs", "sm"],
                title: "",
                key: "link",
                render: (record) => (
                  <Button
                    type="primary"
                    color={"#ff4143"}
                    onClick={() => download(record.link, record.filename)}
                  >
                    {t("home:btn-download")}
                  </Button>
                  // <a target="_blank" href={record.link} download>

                  // </a>
                ),
              },
              {
                title: t("home:table-format"),
                key: "format",
                responsive: ["xs", "sm"],

                dataIndex: "format",
              },
            ]}
            pagination={false}
            dataSource={dataSource}
          ></Table>
        </Col>
      </Row>
      <Col
        css={css`
          margin-top: 10px;
          max-width: 400px;
        `}
      >
        <Row>
          <span
            css={css`
              margin-right: 5px;
            `}
          >
            Music:
          </span>
          {music.title} - {music.author}
        </Row>
        <Row
          css={css`
            margin-top: 10px;
          `}
        >
          <span
            css={css`
              margin-right: 5px;
            `}
          >
            Tags:
          </span>
          {tags && tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
        </Row>
      </Col>
    </Col>
  );
};

export default Video;
