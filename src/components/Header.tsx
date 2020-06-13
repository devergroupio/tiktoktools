import { css } from "@emotion/core";
import { flex } from "~@/styles/grid";
import { Tag, Menu, Dropdown, Button, Col } from "antd";
import styled from "@emotion/styled";
import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";
import useTranslation from "next-translate/useTranslation";
import TranslationLink from "next-translate/Link";

const menu = [
  {
    name: "Home",
    href: "/",
    tags: [],
  },
];

const MenuWrapper = styled.ul`
  display: flex;
  margin: 0;
`;
const MenuItem = styled.li`
  list-style: none;
  a {
    color: white;
    &:hover {
      color: #ff4143;
    }
  }
  margin-right: 20px;
`;
const TranslationLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  li.active {
    a {
      background: #ff4143;
      display: block;
      color: white;
    }
  }
  li {
    a {
      margin-bottom: 5px;
      padding: 5px;
    }
  }
`;
const NextTranslateLink = styled(TranslationLink)``;
const Header = () => {
  const { t, lang: currentLang } = useTranslation();
  const langs = [
    {
      key: "en",
      name: "English",
    },
    {
      key: "vi",
      name: "Vietnamese",
    },
  ];
  const lang = (
    <Menu>
      <TranslationLinkWrapper>
        {langs.map((lang) => (
          <li
            key={lang.key}
            className={currentLang === lang.key ? "active" : "inactive"}
          >
            <NextTranslateLink href={"/"} lang={lang.key} key={lang.key}>
              {lang.name}
            </NextTranslateLink>
          </li>
        ))}
      </TranslationLinkWrapper>
    </Menu>
  );
  return (
    <header
      css={css`
        background: #202529;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding: 15px 0;
      `}
    >
      <nav
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <MenuWrapper
          css={css`
            ${flex}
          `}
        >
          {menu.map((item, key) => (
            <MenuItem key={key}>
              <Link href={item.href}>
                <a>{item.name}</a>
              </Link>
              {item.tags &&
                item.tags.map((tag, key) => (
                  <Tag color="#FFBC42" key={key}>
                    {tag}
                  </Tag>
                ))}
            </MenuItem>
          ))}
        </MenuWrapper>
        <MenuWrapper>
          <MenuItem>
            <Dropdown overlay={lang}>
              <Button>
                {t("home:lang")} <DownOutlined />
              </Button>
            </Dropdown>
          </MenuItem>
        </MenuWrapper>
      </nav>
    </header>
  );
};

export default Header;
