import { useEffect, useState } from "react";
import { Typography, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { ProjectCard } from "./components/ProjectCard";
import { fetchProjects } from "./services/projects/list";

function App() {
  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "Meu Projeto",
      totalOfTasks: 10,
      completed: 0,
    },
    {
      id: "2",
      name: "Meu Projeto 2",
      totalOfTasks: 10,
      completed: 3,
    },
  ]);

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
