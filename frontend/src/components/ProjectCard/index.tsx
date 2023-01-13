import { Avatar, Card, Typography } from "antd";

type ProjectCard = {
  name: string;
  totalOfTasks: number;
  completed: number;
};

interface Props {
  project: ProjectCard;
}

export function ProjectCard(props: Props) {
  const { project } = props;
  const description = `${project.completed} de ${project.totalOfTasks}`;

  return (
    <Card
      bodyStyle={{ display: "flex", alignItems: "center" }}
      style={{ marginBottom: "0.5rem" }}
    >
      <Avatar size="large" style={{ marginRight: "1rem" }} />
      <div>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {project.name}
        </Typography.Title>
        <Typography.Text>{description}</Typography.Text>
      </div>
    </Card>
  );
}
