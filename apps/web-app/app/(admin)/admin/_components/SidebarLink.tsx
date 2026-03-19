export default function SidebarLink({
  href,
  icon,
  label,
  active = false,
}: any) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        active
          ? "text-white bg-indigo-600"
          : "text-slate-400 hover:text-white hover:bg-slate-800"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}
