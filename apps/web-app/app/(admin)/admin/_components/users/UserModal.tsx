import {
  Briefcase,
  Calendar,
  ChevronDown,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  UserCog,
  UserPlus,
  X,
} from "lucide-react";
import { FormInput } from "./FormInput"; // Giả sử bạn để cùng thư mục
import { UserInput } from "@app/_types/users/user-types";
interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onCreate: (input: UserInput) => Promise<void>;
}
export default function UserModal({
  isOpen,
  onClose,
  onCreate,
  isLoading,
}: UserModalProps) {
  //  Bật/tắt modal
  if (!isOpen) return null;
  // xử lý nút Create
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Chuyển đổi FormData thành Object UserInput
    const data = Object.fromEntries(formData.entries()) as any;

    // Xử lý riêng cho checkbox
    data.status = formData.get("status") ? "active" : "inactive";

    await onCreate(data);
    onClose(); // Đóng modal sau khi tạo
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div
        className="bg-white 
    dark:bg-slate-900 
    w-full max-w-2xl 
    rounded-2xl 
    shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
    relative 
    flex flex-col 
    overflow-hidden 
    max-h-[90vh] 
    border border-slate-200/50"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">
              New user
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="px-8 pb-8 space-y-5 overflow-y-auto custom-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="User Name"
              name="user_name"
              icon={UserCog}
              placeholder="user123"
            />
            <FormInput
              label="Email"
              name="email"
              icon={Mail}
              type="email"
              placeholder="user123@gmail.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="First Name"
              name="first_name"
              icon={User}
              placeholder="Nguyen"
            />
            <FormInput
              label="Last Name"
              name="last_name"
              icon={User}
              placeholder="Van A"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Password"
              name="password"
              icon={KeyRound}
              type="password"
              placeholder="••••••••"
            />
            <FormInput
              label="Date of Birth"
              name="date_of_birth"
              icon={Calendar}
              type="date"
            />
          </div>

          <FormInput
            label="Phone Number"
            name="phone"
            icon={Phone}
            type="tel"
            placeholder="+84 123456789"
          />
          <FormInput
            label="Address"
            name="address"
            icon={MapPin}
            isTextArea
            placeholder="1a, District 1, HCM City"
          />

          {/* Status & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl group">
              {/* Phần bên trái: Icon và Chữ */}
              <div className="flex items-center gap-1 outline-1 rounded-3xl p-1 transition-colors group-has-checked:bg-emerald-600">
                <ShieldCheck className="w-6 h-6 text-primary transition-colors group-has-checked:text-white" />
                <span className="text-[0.9rem] font-bold text-on-surface transition-colors group-has-checked:text-white">
                  Active Status
                </span>
              </div>

              {/* Bên phải của (Toggle Track) */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="status"
                  defaultChecked={true}
                  className="sr-only peer"
                />

                {/* (Toggle Track) */}
                <div
                  className="
      relative w-10 h-5 
     bg-slate-400 dark:bg-slate-600 rounded-full 
      peer-checked:bg-emerald-600 
      transition-colors duration-200
      after:content-[''] 
      after:absolute 
      after:top-0.5 
      after:left-0.5 
      after:bg-white 
      after:rounded-full 
      after:h-4 
      after:w-4 
      after:transition-all 
      peer-checked:after:translate-x-5
    "
                ></div>
              </label>
            </div>

            <div className="relative flex items-center bg-surface-container-low rounded-xl border-b-2 border-outline-variant focus-within:border-primary px-3.5">
              <Briefcase className="w-4 h-4 text-outline mr-3" />
              <select
                name="role"
                className="w-full bg-transparent border-none focus:ring-0 py-3 text-center text-on-surface font-medium text-sm appearance-none cursor-pointer"
              >
                <option value="customer">Customer</option>
                <option value="admin">System Admin</option>
              </select>
              <ChevronDown className="w-4 h-4 text-outline ml-2" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse md:flex-row gap-3 pt-4 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="btn-primary flex-[1.5]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </div>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 me-1" />
                  Create
                </>
              )}
            </button>
          </div>
        </form>

        {/* Accent Bar */}
        <div className="accent-gradient" />
      </div>
    </div>
  );
}
