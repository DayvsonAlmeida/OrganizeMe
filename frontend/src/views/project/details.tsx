import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Typography, Divider, Button, List, Modal } from "antd";
import { CheckOutlined, DeleteOutlined, UndoOutlined } from "@ant-design/icons";

import { Project, Task } from "../../contexts/projects";
import { useProjects } from "../../hooks/projects";

export function DetailsProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { removeProject, toggleTask } = useProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id, name, tasks } = location.state as Project;
  const totalOfTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;

  const handleOnCompleteTask = (task: Task) => {
    toggleTask({ id: task.id, done: task.done });
    console.log({ task });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    removeProject(id)
      .then(() => navigate("/"))
      .finally(() => setIsModalOpen(false));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card>
        <div
          style={{ display: "flex", flexDirection: "column", minWidth: 600 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography.Title level={4}>{name}</Typography.Title>
            <DeleteOutlined onClick={showModal} />
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
          <Button
            type="primary"
            style={{ width: "fit-content", marginTop: 12 }}
          >
            Criar Tarefa
          </Button>
        </div>
      </Card>

      <Modal
        title="Deseja excluir o projeto?"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Sim
          </Button>,
        ]}
      />
    </>
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
