import styled from "@emotion/styled";
import { Col, Form, Input, Button, Row } from "antd";
import { css } from "@emotion/core";
import { useState, useMemo } from "react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
const Video = dynamic(() => import("~@/components/Video"), {
  ssr: false,
});
import http from "~@/utils/http";
const Wrapper = styled(Col)`
  background: #202529;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 10px 20px;
  max-width: 80%;
  margin: 0 auto;
  @media (max-width: 576px) {
    max-width: 80%;
    margin: 0 auto;
  }
`;
const ActionButton = styled(Button)`
  background: #ff4143;
  font-weight: bold;
  font-size: 20px;
  height: auto;
  color: white;
  width: 200px;
  &:hover {
    border-color: #ff4143;
    color: white;
    background: #ff4143;
    font-weight: bold;
  }
  &:focus {
    border-color: #ff4143;
    color: white;
    background: #ff4143;
    font-weight: bold;
  }
`;

const DownloadForm = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm();
  const [video, setVideo] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const onFormSubmit = (values) => {
    setVideo(null);
    setisLoading(true);
    http
      .post("https://tiktok.devergroup.io/video/link", {
        link: values.videoLink,
      })
      .then((res) => {
        const { data } = res;
        setVideo(data.payload);
        setisLoading(false);
      })
      .catch(() => {
        setisLoading(false);
      });
  };
  const DownloadButton = useMemo(() => {
    return (
      <ActionButton htmlType="submit" loading={isLoading} autoFocus={false}>
        {isLoading ? t("home:btn-processing") : t("home:btn-download")}
      </ActionButton>
    );
  }, [isLoading]);

  const title = useMemo(() => {
    if (!video) return "Download TikTok Video Without Watermark";
    return "Congratulation! successful";
  }, [video]);
  return (
    <Wrapper>
      {!video && (
        <h1
          css={css`
            text-align: center;
            margin-bottom: 20px;
          `}
        >
          {title}
        </h1>
      )}
      {!video && (
        <Form form={form} onFinish={onFormSubmit}>
          <Form.Item
            name="videoLink"
            rules={[
              {
                required: true,
                message: t("home:input-error-required"),
              },
              {
                required: true,
                message: t("home:input-error-pattern"),
                pattern: /^(https|http)/,
              },
            ]}
          >
            <Input placeholder={t("home:input-placeholder")} />
          </Form.Item>
          <Form.Item>
            <Row justify="center">{DownloadButton}</Row>
          </Form.Item>
        </Form>
      )}
      {video && (
        <Row justify="center">
          <Video
            image={video.imageUrl}
            videoLink={video.videoUrlNoWaterMark}
            videoUrl={video.videoUrl}
            musicLink={video.musicMeta.playUrl}
          />
        </Row>
      )}
      <Row
        justify="center"
        css={css`
          margin-top: 20px;
        `}
      >
        {video && (
          <Button
            onClick={() => {
              setVideo(null);
              form.resetFields();
            }}
          >
            Reset
          </Button>
        )}
      </Row>
      {/* {video && <Video />} */}
    </Wrapper>
  );
};
export default DownloadForm;
