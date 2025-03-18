import { apiKeys } from "@/constants/apiKeys";
import queryClient from "@/lib/query-client";
import {
  bulkDownloadPdfs,
  deletePdf,
  downloadPdf,
  getPdfs,
  uploadPdfs,
} from "@/services/pdf";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePdfs = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: [apiKeys.pdfs.getAll, page, limit],
    queryFn: () => getPdfs(page, limit),
  });
};

export const useUploadPdfs = () => {
  return useMutation({
    mutationFn: uploadPdfs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.pdfs.getAll],
      });
    },
  });
};

export const useDownloadPdf = () => {
  return useMutation({
    mutationFn: downloadPdf,
    onSuccess: (data, id) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `pdf-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });
};

export const useBulkDownloadPdfs = () => {
  return useMutation({
    mutationFn: bulkDownloadPdfs,
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "pdfs.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });
};

export const useDeletePdf = () => {
  return useMutation({
    mutationFn: deletePdf,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.pdfs.getAll],
      });
    },
  });
};
