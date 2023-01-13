import { useMemo } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Layout, Menu, MenuProps, Typography } from "antd";

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
  const navigate = useNavigate();
  const { projects } = useProjects();
  const items: MenuItem[] = useMemo(
    () => projects.map((project) => getItem(project.name, project.id)),
    [projects]
  );

  const handleClick = (id: string) => {
    const project = projects.find((p) => p.id === id);

    if (!project) return;

    navigate(`/project/${project.id}`, { state: project });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <NavLink to="/">
          <Typography.Title level={3} style={{ margin: 16, color: "#fff" }}>
            OrganizeMe
          </Typography.Title>
        </NavLink>

        <Menu
          theme="dark"
          defaultSelectedKeys={[]}
          mode="inline"
          items={items}
          onClick={(e) => handleClick(e.key)}
        />

        <div style={{ padding: 16 }}>
          <NavLink to="project/new">+ Criar Projeto</NavLink>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            display: "flex",
            margin: "16px 16px 0",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
