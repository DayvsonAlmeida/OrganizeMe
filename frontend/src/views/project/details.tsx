import { useLocation } from "react-router-dom";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Typography, Divider, Button, List } from "antd";

import { Project } from "../../contexts/projects";

export function DetailsProjectPage() {
  const location = useLocation();
  const { id, name, tasks } = location.state as Project;
  const totalOfTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;

  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", minWidth: 600 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography.Title level={4}>{name}</Typography.Title>
          <DeleteOutlined />
        </div>
        <Typography.Text
          style={{}}
        >{`${completedTasks} de ${totalOfTasks}`}</Typography.Text>
        <Divider style={{ margin: "12px 0" }} />
        <List
          size="small"
          bordered
          dataSource={tasks}
          renderItem={(item) => {
            const deadLine = new Date(item.deadLine).toLocaleDateString();
            return (
              <List.Item actions={[<CheckOutlined />, <DeleteOutlined />]}>
                {item.name} | {item.responsible} | {deadLine}
              </List.Item>
            );
          }}
        />
        <Button type="primary" style={{ width: "fit-content", marginTop: 12 }}>
          Criar Tarefa
        </Button>
      </div>
    </Card>
  );
}
