import { useLocation } from "react-router-dom";
import { CheckOutlined, DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import { Card, Typography, Divider, Button, List } from "antd";

import { Project, Task } from "../../contexts/projects";
import { useState } from "react";

export function DetailsProjectPage() {
  const location = useLocation();
  const { id, name, tasks } = location.state as Project;
  const totalOfTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;

  const handleOnCompleteTask = (task: Task) => {
    console.log({ task });
  };

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
          renderItem={(item: Task) => (
            <TaskItem task={item} onComplete={handleOnCompleteTask} />
          )}
        />
        <Button type="primary" style={{ width: "fit-content", marginTop: 12 }}>
          Criar Tarefa
        </Button>
      </div>
    </Card>
  );
}

interface TaskProps {
  task: Task;
  onComplete: (task: Task) => void;
}

function TaskItem({ task, onComplete }: TaskProps) {
  const [done, setDone] = useState(task.done);
  const deadLine = new Date(task.deadLine).toLocaleDateString();

  const handleClickComplete = () => {
    const newDoneValue = !done;

    onComplete({ ...task, done: newDoneValue });
    setDone(newDoneValue);
  };

  const DoneIcon = done ? (
    <UndoOutlined onClick={handleClickComplete} />
  ) : (
    <CheckOutlined onClick={handleClickComplete} />
  );

  return (
    <List.Item actions={[DoneIcon, <DeleteOutlined />]}>
      <Typography.Text delete={done}>
        {task.name} | {task.responsible} | {deadLine}
      </Typography.Text>
    </List.Item>
  );
}
