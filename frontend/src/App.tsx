import { useState } from "react";
import { Typography, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ProjectCard } from "./components/ProjectCard";

function App() {
  const [projects] = useState([
    {
      id: 1,
      name: "Meu Projeto",
      totalOfTasks: 10,
      completed: 0,
    },
    {
      id: 2,
      name: "Meu Projeto 2",
      totalOfTasks: 10,
      completed: 3,
    },
  ]);

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
