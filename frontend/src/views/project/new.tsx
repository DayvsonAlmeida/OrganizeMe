import { Button, Card, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useProjects } from "../../hooks/projects";

export function NewProjectPage() {
  const [loading, setLoading] = useState(false);
  const { addProject } = useProjects();

  const stopLoading = () => setLoading(false);
  const startLoading = () => setLoading(true);

  const onFinish = (values: any) => {
    startLoading();
    addProject(values.name)
      .then(() => console.log("Projeto Criado"))
      .finally(() => stopLoading());
  };

  return (
    <Card>
      <Typography.Title level={3} style={{ marginBottom: 16 }}>
        Criar Novo Projeto
      </Typography.Title>
      <Form initialValues={{}} onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Por favor, insira um nome para o projeto!",
            },
          ]}
        >
          <Input placeholder="Nome do Projeto" />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Criar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
