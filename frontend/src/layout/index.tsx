import { Outlet } from "react-router-dom";
import { Layout, Menu, MenuProps, Typography } from "antd";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key): MenuItem {
  return {
    key,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [getItem("Option 1", "1")];

export function AppLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Typography.Title level={3} style={{ margin: 16, color: "#fff" }}>
          OrgaizeMe
        </Typography.Title>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "16px 16px 0" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
