"use client";

import { PdfList } from "@/components/admin/pdf-lists";
// import { UploadPdf } from "@/components/admin/uploadPdf";

const AdminPdfPage = () => {
  return (
    <div className="space-y-6">
      {/* <UploadPdf /> */}
      <PdfList />
    </div>
  );
};

export default AdminPdfPage;
