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
    throw new Error("Not implemented method!");
  }, []);

  const toggleTask = useCallback(
    async (data: ToggleTaskInput): Promise<Task> => {
      throw new Error("Not implemented method!");
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
