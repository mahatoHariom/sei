export interface PDF {
  filename: ReactNode;
  title: ReactNode;
  description: ReactNode;
  id: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface PdfResponse {
  data: PDF[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface UploadPdfDto {
  file: File;
}
