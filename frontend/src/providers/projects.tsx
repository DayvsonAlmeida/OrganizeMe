import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  AddTaskInput,
  Project,
  ProjectsContext,
  ProjectsContextProps,
  Task,
  ToggleTaskInput,
} from "../contexts/projects";
import { createProject } from "../services/projects/create";
import { deleteProject } from "../services/projects/delete";
import { fetchProjects } from "../services/projects/list";
import { deleteTask } from "../services/tasks/delete";
import { toggleTask as toggle } from "../services/tasks/toggle";

interface ProjectsProviderProps {
  children: ReactNode;
}

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = useCallback(async (name: string): Promise<Project> => {
    const project = await createProject({ name });
    setProjects((prev) => [...prev, project]);
    return project;
  }, []);

  const removeProject = useCallback(async (id: string): Promise<void> => {
    await deleteProject({ id });
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }, []);

  const addTask = useCallback(async (data: AddTaskInput): Promise<Task> => {
    throw new Error("Not implemented method!");
  }, []);

  const removeTask = useCallback(async (id: string): Promise<void> => {
    await deleteTask({ id });
    const [projectId] = id.split("-");
    const project = projects.find((p) => p.id === projectId);

    if (!project) return;

    project.tasks = project.tasks.filter((t) => t.id !== id);
    setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)));
  }, []);

  const toggleTask = useCallback(
    async (data: ToggleTaskInput): Promise<Task> => {
      const toggledTask = await toggle(data);
      const [projectId] = toggledTask.id.split("-");
      const project = projects.find((p) => p.id === projectId);

      if (project) {
        project.tasks = project.tasks.map((t) =>
          t.id === toggledTask.id ? toggledTask : t
        );

        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? project : p))
        );
      }

      return toggledTask;
    },
    []
  );

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  const value: ProjectsContextProps = useMemo(
    () => ({
      projects,
      addProject,
      removeProject,
      addTask,
      removeTask,
      toggleTask,
    }),
    [projects, addProject, removeProject, addTask, removeTask, toggleTask]
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}
