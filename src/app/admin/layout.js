import AdminSidebar from "@/component/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminSidebar />
      {children}
    </>
  );
}