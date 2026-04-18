import api from "./api";

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export const projectService = {
  getProjects: async () => {
    const res = await api.get("/projects");
    return res.data;
  },

  getAllProjects: async () => {
    const res = await api.get("/admin/projects");
    return res.data;
  },

  addProject: async (data: any) => {
    const res = await api.post("/admin/projects", data);
    return res.data;
  },

  updateProject: async (id: string, data: any) => {
    const res = await api.put(`/admin/projects/${id}`, data);
    return res.data;
  },

  deleteProject: async (id: string) => {
    await api.delete(`/admin/projects/${id}`);
  },
};
