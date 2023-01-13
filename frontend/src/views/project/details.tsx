import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Typography, Divider, Button, List, Modal } from "antd";
import { CheckOutlined, DeleteOutlined, UndoOutlined } from "@ant-design/icons";

import { Project, Task } from "../../contexts/projects";
import { useProjects } from "../../hooks/projects";

export function DetailsProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { removeProject, toggleTask, removeTask, addTask, projects } =
    useProjects();

  const { id } = location.state as Project;

  const currentProject = projects.find((p) => p.id === id) as Project;

  const [taskId, setTaskId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState({
    project: false,
    task: false,
  });

  const totalOfTasks = currentProject?.tasks.length;
  const completedTasks = currentProject?.tasks.filter((t) => t.done).length;

  const handleOnCompleteTask = (task: Task) => {
    toggleTask({ id: task.id, done: task.done });
  };

  const showModal = (key: "project" | "task") => {
    setIsModalOpen((prev) => ({ ...prev, [key]: true }));
  };

  const handleDeleteProject = () => {
    removeProject(id)
      .then(() => navigate("/"))
      .finally(() => setIsModalOpen((prev) => ({ ...prev, project: false })));
  };

  const handleDeleteTask = () => {
    removeTask(taskId)
      .then(() => {})
      .finally(() => handleCancel("task"));
  };

  const handleCancel = (key: "project" | "task") => {
    setIsModalOpen((prev) => ({ ...prev, [key]: false }));
  };

  useEffect(() => {
    console.log("MUDOU");
  }, [projects]);

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
            <Typography.Title level={4}>
              {currentProject?.name}
            </Typography.Title>
            <DeleteOutlined onClick={() => showModal("project")} />
          </div>
          <Typography.Text
            style={{}}
          >{`${completedTasks} de ${totalOfTasks}`}</Typography.Text>
          <Divider style={{ margin: "12px 0" }} />
          <List
            size="small"
            bordered
            dataSource={currentProject?.tasks}
            renderItem={(item: Task) => (
              <TaskItem
                task={item}
                onComplete={handleOnCompleteTask}
                onDelete={() => {
                  showModal("task");
                  setTaskId(item.id);
                }}
              />
            )}
          />
          <Button
            type="primary"
            style={{ width: "fit-content", marginTop: 12 }}
            onClick={() =>
              addTask({
                projectId: id,
                deadLine: "15/01/2023",
                name: "My Task",
                responsible: "eu",
              })
            }
          >
            Criar Tarefa
          </Button>
        </div>
      </Card>

      <Modal
        title="Deseja excluir o projeto?"
        centered
        open={isModalOpen.project}
        onOk={handleDeleteProject}
        onCancel={() => handleCancel("project")}
        footer={[
          <Button key="back" onClick={() => handleCancel("project")}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleDeleteProject}>
            Sim
          </Button>,
        ]}
      />
      <Modal
        title="Deseja excluir a tarefa?"
        centered
        open={isModalOpen.task}
        onOk={handleDeleteTask}
        onCancel={() => handleCancel("task")}
        footer={[
          <Button key="back" onClick={() => handleCancel("task")}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleDeleteTask}>
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
  onDelete: (task: Task) => void;
}

function TaskItem({ task, onComplete, onDelete }: TaskProps) {
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
    <List.Item
      actions={[DoneIcon, <DeleteOutlined onClick={() => onDelete(task)} />]}
    >
      <Typography.Text delete={done}>
        {task.name} | {task.responsible} | {deadLine}
      </Typography.Text>
    </List.Item>
  );
}
