import AdminSidebar from "@/component/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminSidebar />
      {children}
    </>
  );
}