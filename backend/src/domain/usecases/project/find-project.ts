import { Project } from "../../entities/project";

export type FindProjectInput = {
  id: string;
};

export interface FindProject {
  find({ id }: FindProjectInput): Promise<Project | null>;
}
