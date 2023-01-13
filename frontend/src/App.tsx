import { useEffect, useState } from "react";
import { Typography, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { ProjectCard, ProjectCardType } from "./components/ProjectCard";
import { fetchProjects } from "./services/projects/list";

type ProjectCardData = ProjectCardType & { id: string };

function App() {
  const [projects, setProjects] = useState<ProjectCardData[]>([]);

  useEffect(() => {
    function fetch() {
      fetchProjects().then((data) => setProjects(data));
    }

    fetch();
  }, []);

  return (
    <div style={{ padding: "32px 16px 0" }}>
      <Typography.Title level={2}>OrganizeMe</Typography.Title>
      {projects.map(({ id, ...project }) => (
        <ProjectCard key={id} project={project} />
      ))}
      <FloatButton
        type="primary"
        icon={<PlusOutlined />}
        tooltip="Novo Projeto"
      />
    </div>
  );
}

export default App;
