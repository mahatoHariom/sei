export interface Subject {
  id: string;
  name: string;
  description?: string;
  difficulty?: string;
  duration?: string;
  imageUrl?: string;
  courseType?: string;
  tags?: string[];
  badge?: string;
  students?: number;
  createdAt: string;
  users?: [
    {
      userId: string;
    }
  ];
}

export interface Course {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface GetUserCoursesResponse {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
