"use client";
export default function ToggleCheckbox() {
  return (
    <>
      <div
        className="overlay fixed inset-0 bg-slate-900/50 z-40 hidden lg:hidden"
        onClick={() => {
          const element = document.getElementById(
            "sidebar-toggle",
          ) as HTMLInputElement;
          if (element) element.checked = false;
        }}
      ></div>
      <input className="hidden" id="sidebar-toggle" type="checkbox" />
    </>
  );
}
