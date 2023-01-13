import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Divider,
  Button,
  List,
  Modal,
  Form,
  Input,
  DatePicker,
  DatePickerProps,
} from "antd";
import { CheckOutlined, DeleteOutlined, UndoOutlined } from "@ant-design/icons";

import { AddTaskInput, Project, Task } from "../../contexts/projects";
import { useProjects } from "../../hooks/projects";

export function DetailsProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { removeProject, toggleTask, removeTask, addTask, projects } =
    useProjects();

  const { id } = location.state as Project;

  const currentProject = useMemo(
    () => projects.find((p) => p.id === id) as Project,
    [projects, id]
  );

  const [taskIdToDelete, setTaskId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState({
    project: false,
    task: false,
    create: true,
  });

  const totalOfTasks = currentProject?.tasks.length;
  const completedTasks = currentProject?.tasks.filter((t) => t.done).length;

  const handleOnCompleteTask = (task: Task) => {
    toggleTask({ id: task.id, done: task.done });
  };

  const showModal = (key: "project" | "task" | "create") => {
    setIsModalOpen((prev) => ({ ...prev, [key]: true }));
  };

  const handleDeleteProject = () => {
    removeProject(id)
      .then(() => navigate("/"))
      .finally(() => setIsModalOpen((prev) => ({ ...prev, project: false })));
  };

  const handleDeleteTask = () => {
    removeTask(taskIdToDelete).finally(() => handleCancel("task"));
  };

  const handleCancel = (key: "project" | "task" | "create") => {
    setIsModalOpen((prev) => ({ ...prev, [key]: false }));
  };

  const handleSubmitTask = (task: Omit<AddTaskInput, "projectId">) => {
    addTask({ ...task, projectId: id }).finally(() => handleCancel("create"));
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
                key={item.id}
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
            onClick={() => showModal("create")}
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

      <Modal
        title="Adicionar Tarefa"
        open={isModalOpen.create}
        onCancel={() => handleCancel("create")}
        footer={null}
        centered
      >
        <CreateTask onSubmit={handleSubmitTask} />
      </Modal>
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

interface CreateTaskProps {
  onSubmit: (task: Omit<AddTaskInput, "projectId">) => void;
}

function CreateTask({ onSubmit }: CreateTaskProps) {
  const [date, setDate] = useState("");

  const onFinish = (values: any) => {
    onSubmit({ ...values, deadLine: new Date(date).toLocaleDateString() });
  };

  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Título"
        name="name"
        rules={[
          {
            required: true,
            message: "Por favor, insira um nome para a tarefa!",
          },
        ]}
      >
        <Input placeholder="Título da tarefa" />
      </Form.Item>
      <Form.Item
        label="Responsável"
        name="responsible"
        rules={[
          {
            required: true,
            message: "Por favor, insira um responsável!",
          },
        ]}
      >
        <Input placeholder="Título da tarefa" />
      </Form.Item>

      <Form.Item
        label="Prazo"
        name="deadLine"
        rules={[
          {
            required: true,
            message: "Por favor, insira um um prazo para conclusão da tarefa!",
          },
        ]}
      >
        <DatePicker onChange={onChange} />
      </Form.Item>

      <Form.Item style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" htmlType="submit">
          Criar
        </Button>
      </Form.Item>
    </Form>
  );
}
