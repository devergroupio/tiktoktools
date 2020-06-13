import { Row, Col, Button, Table, Tag } from "antd";
import { css } from "@emotion/core";
import ReactPlayer from "react-player";

const Video = ({ image, videoLink, musicLink, videoUrl }) => {
  return (
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
              title: "Video",
              key: "link",
              render: (record) => (
                <a target="_blank" href={record.link} download>
                  <Button type="primary" color={"#ff4143"}>
                    Download
                  </Button>
                </a>
              ),
            },
            {
              title: "Format",
              key: "format",
              responsive: ["xs", "sm"],

              dataIndex: "format",
            },
          ]}
          pagination={false}
          dataSource={[
            {
              key: "hd",
              format: (
                <>
                  <Tag color="green">HD Quality</Tag>
                  <Tag color="blue"> Without Watermark</Tag>
                </>
              ),
              link: videoLink + "/&improve_bitrate=1&ratio=1080p",
            },
            {
              key: "nowatermark",
              format: <Tag color="blue"> Without Watermark</Tag>,
              link: videoLink,
            },
            {
              key: "mp3",
              format: <Tag color="gold"> Mp3</Tag>,
              link: musicLink,
            },
            {
              key: "normal",
              format: <Tag color="error">Normal</Tag>,
              link: videoUrl,
            },
          ]}
        ></Table>
      </Col>
    </Row>
  );
};

export default Video;
