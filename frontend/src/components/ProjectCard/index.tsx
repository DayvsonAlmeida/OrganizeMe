import { Avatar, Card, Typography } from "antd";
import { stringToHexColor } from "../../utils/color";

export type ProjectCardType = {
  name: string;
  totalOfTasks: number;
  completed: number;
};

interface Props {
  project: ProjectCardType;
}

export function ProjectCard(props: Props) {
  const { project } = props;
  const backgroundColor = stringToHexColor(project.name);
  const description = `${project.completed} de ${project.totalOfTasks}`;

  return (
    <Card
      bodyStyle={{ display: "flex", alignItems: "center" }}
      style={{ marginBottom: "0.5rem" }}
    >
      <Avatar size="large" style={{ marginRight: "1rem", backgroundColor }} />
      <div>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {project.name}
        </Typography.Title>
        <Typography.Text>{description}</Typography.Text>
      </div>
    </Card>
  );
}
