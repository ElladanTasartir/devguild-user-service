interface Technology {
  technology_id: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  user_id: string;
  technologies?: Technology[];
  repository: string;
  created_at: string;
  updated_at: string;
}
