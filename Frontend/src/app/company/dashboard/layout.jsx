import AdminNavigation from "@/components/AdminNavigation";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-72 bg-white border-r">
        <AdminNavigation />
      </aside>
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}
