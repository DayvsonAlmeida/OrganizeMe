import { useMemo } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Layout, Menu, MenuProps, Typography, Anchor } from "antd";

import { useProjects } from "../hooks/projects";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key): MenuItem {
  return {
    key,
    label,
  } as MenuItem;
}

export function AppLayout() {
  const { projects } = useProjects();
  const items: MenuItem[] = useMemo(
    () => projects.map((project) => getItem(project.name, project.id)),
    [projects]
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <NavLink to="/">
          <Typography.Title level={3} style={{ margin: 16, color: "#fff" }}>
            OrgaizeMe
          </Typography.Title>
        </NavLink>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />

        <div style={{ padding: 16 }}>
          <NavLink to="project/new">+ Criar Projeto</NavLink>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "16px 16px 0" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
