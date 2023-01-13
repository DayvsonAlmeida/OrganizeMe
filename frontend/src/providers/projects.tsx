import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  AddTaskInput,
  Project,
  ProjectsContext,
  ProjectsContextProps,
  Task,
  ToggleTaskInput,
} from "../contexts/projects";
import { fetchProjects } from "../services/projects/list";

interface ProjectsProviderProps {
  children: ReactNode;
}

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = useCallback(async (name: string): Promise<Project> => {
    throw new Error("Not implemented method!");
  }, []);

  const removeProject = useCallback(async (id: string): Promise<void> => {
    throw new Error("Not implemented method!");
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
