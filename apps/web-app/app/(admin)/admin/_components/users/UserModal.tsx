import {
  Briefcase,
  Calendar,
  ChevronDown,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User as UserIcon,
  UserCog,
  UserPlus,
  X,
} from "lucide-react";
import { User, UserInput } from "@app/_types/users/user-types";
import FormInput from "./FormInput";
interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  currentUser: User | null;
  onSubmit: (data: UserInput) => Promise<void>;
}
export default function UserModal({
  isOpen,
  isLoading,
  onClose,
  onSubmit,
  currentUser,
}: UserModalProps) {
  //  Trạng thái render hay không
  if (!isOpen) return null;

  //  Xác định Create hay Update
  const isEditMode = !!currentUser;

  // Xú lý nút submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      status: formData.get("status") === "on" ? "active" : "inactive",
    } as UserInput;
    await onSubmit(payload);
  };

  // Định dạng lại dob từ BE
  const formatDateForInput = (dateStr?: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative flex flex-col overflow-hidden max-h-[90vh] border border-slate-200/50">
        {/* Header: Đổi tiêu đề dựa trên chế độ */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">
              {isEditMode ? `Edit User: ${currentUser.user_name}` : "New User"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-8 pb-8 space-y-5 overflow-y-auto custom-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="User Name"
              name="user_name"
              icon={UserCog}
              defaultValue={currentUser?.user_name}
              placeholder="user123"
              disabled={isEditMode}
            />
            <FormInput
              label="Email"
              name="email"
              icon={Mail}
              type="email"
              defaultValue={currentUser?.email}
              placeholder="user123@gmail.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="First Name"
              name="first_name"
              icon={UserIcon}
              defaultValue={currentUser?.first_name}
              placeholder="Nguyen"
            />
            <FormInput
              label="Last Name"
              name="last_name"
              icon={UserIcon}
              defaultValue={currentUser?.last_name}
              placeholder="Van A"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Password"
              name="password"
              icon={KeyRound}
              type="password"
              placeholder={
                isEditMode ? "Leave blank to keep current" : "••••••••"
              }
              required={!isEditMode}
            />
            <FormInput
              label="Date of Birth"
              name="date_of_birth"
              icon={Calendar}
              type="date"
              defaultValue={formatDateForInput(currentUser?.date_of_birth)}
            />
          </div>

          <FormInput
            label="Phone Number"
            name="phone"
            icon={Phone}
            type="tel"
            defaultValue={currentUser?.phone}
            placeholder="+84 123456789"
          />

          <FormInput
            label="Address"
            name="address"
            icon={MapPin}
            isTextArea
            defaultValue={currentUser?.address}
            placeholder="1a, District 1, HCM City"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl group">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <span className="text-[0.9rem] font-bold text-on-surface">
                  Active Status
                </span>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="status"
                  defaultChecked={
                    isEditMode ? currentUser.status === "active" : true
                  }
                  className="sr-only peer"
                />
                <div className="relative w-10 h-5 bg-slate-400 peer-checked:bg-emerald-600 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            <div className="relative flex items-center bg-surface-container-low rounded-xl border-b-2 border-outline-variant focus-within:border-primary px-3.5">
              <Briefcase className="w-4 h-4 text-outline mr-3" />
              <select
                name="role"
                defaultValue={currentUser?.role || "customer"}
                className="w-full bg-transparent border-none focus:ring-0 py-3 text-center text-on-surface font-medium text-sm appearance-none cursor-pointer"
              >
                <option value="customer">Customer</option>
                <option value="admin">System Admin</option>
              </select>
              <ChevronDown className="w-4 h-4 text-outline ml-2" />
            </div>
          </div>

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
                  {/* Loader SVG giữ nguyên */}
                  {isEditMode ? "Updating..." : "Creating..."}
                </div>
              ) : (
                <>
                  {isEditMode ? (
                    <UserCog className="w-4 h-4 me-1" />
                  ) : (
                    <UserPlus className="w-4 h-4 me-1" />
                  )}
                  {isEditMode ? "Update Changes" : "Create User"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
