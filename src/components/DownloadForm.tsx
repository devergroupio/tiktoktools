import styled from "@emotion/styled";
import { Col, Form, Input, Button, Row, Spin } from "antd";
import { css } from "@emotion/core";
import { useState, useMemo } from "react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
const Video = dynamic(() => import("~@/components/Video"), {
  ssr: false,
  loading: () => <Spin size="large" />,
});
import http from "~@/utils/http";
import { CS_CONFIG } from "~@/utils";
const Wrapper = styled(Col)`
  background: #202529;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 20px 20px;
  min-width: 75%;
  max-width: 80%;
  margin: 0 auto;
  @media (max-width: 576px) {
    max-width: 80%;
    margin: 0 auto;
  }
`;
const ActionButton = styled(Button)`
  background: #ff4143 !important;
  font-weight: bold;
  font-size: 17px;
  height: auto;
  color: white;
  width: 200px;
  &:hover {
    border-color: #ff4143 !important;
    color: white;
    background: #ff4143 !important;
    font-weight: bold;
  }
  &:focus {
    border-color: #ff4143 !important;
    color: white;
    background: #ff4143 !important;
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
      .post(`/video/link`, {
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

  const title = useMemo(() => {
    if (!video) return t("home:title");
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
            label={t("home:input-label-link")}
            name="videoLink"
            rules={[
              {
                required: true,
                message: t("home:input-error-required"),
              },
            ]}
          >
            <Input placeholder={t("home:input-placeholder")} />
          </Form.Item>
          <Form.Item>
            <Row justify="center">
              <ActionButton
                htmlType="submit"
                loading={isLoading}
                autoFocus={false}
              >
                {isLoading ? t("home:btn-processing") : t("home:btn-download")}
              </ActionButton>
            </Row>
          </Form.Item>
        </Form>
      )}
      {video && (
        <Row justify="center">
          <Video
            id={video.video.id}
            desc={video.desc}
            tags={video.video.tags}
            image={video.video.cover}
            videoLink={video.video.noWatermark}
            videoUrl={video.video.watermark}
            music={video.music}
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
            {t("home:btn-reset")}
          </Button>
        )}
      </Row>
      {/* {video && <Video />} */}
    </Wrapper>
  );
};
export default DownloadForm;
