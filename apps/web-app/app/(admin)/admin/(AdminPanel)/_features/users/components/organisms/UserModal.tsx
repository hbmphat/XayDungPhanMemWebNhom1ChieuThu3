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
import {
  User,
  UserInput,
} from "@app/(admin)/admin/(AdminPanel)/_features/users/types/user-types";
import FormInput from "../atoms/FormInput";
interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  currentUser: User | null;
  onSubmit: (data: UserInput) => Promise<void>;
  getFieldError: (field: string) => string | undefined;
}
export default function UserModal({
  isOpen,
  isLoading,
  currentUser,
  onSubmit,
  onClose,
  getFieldError,
}: UserModalProps) {
  //  Trạng thái render hay không
  if (!isOpen) return null;

  //  Xác định Create hay Update
  const isEditMode = !!currentUser;

  // Xú lý nút submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      date_of_birth: data.date_of_birth?.toString().trim() || null,
      status: data.status,
    } as UserInput;
    console.log("Check DOB value:", payload.date_of_birth);
    await onSubmit(payload);
  };

  // Định dạng lại dob từ BE
  const formatDateForInput = (dateStr?: string) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);

    // Kiểm tra nếu date không hợp lệ
    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    // Month chạy từ 0-11 nên phải +1, padStart để đảm bảo có số 0 (vd: 05)
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // Trả về đúng YYYY-MM-DD
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
              readOnly={isEditMode}
              error={getFieldError("user_name")}
            />
            <FormInput
              label="Email"
              name="email"
              icon={Mail}
              type="email"
              defaultValue={currentUser?.email}
              placeholder="user123@gmail.com"
              error={getFieldError("email")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="First Name"
              name="first_name"
              icon={UserIcon}
              defaultValue={currentUser?.first_name}
              placeholder="Nguyen"
              error={getFieldError("first_name")}
            />
            <FormInput
              label="Last Name"
              name="last_name"
              icon={UserIcon}
              defaultValue={currentUser?.last_name}
              placeholder="Van A"
              error={getFieldError("last_name")}
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
              error={getFieldError("password")}
            />
            <FormInput
              label="Date of Birth"
              name="date_of_birth"
              icon={Calendar}
              type="date"
              defaultValue={formatDateForInput(currentUser?.date_of_birth)}
              error={getFieldError("date_of_birth")}
            />
          </div>

          <FormInput
            label="Phone Number"
            name="phone"
            icon={Phone}
            type="tel"
            defaultValue={currentUser?.phone}
            placeholder="+84 123456789"
            error={getFieldError("phone")}
          />

          <FormInput
            label="Address"
            name="address"
            icon={MapPin}
            isTextArea
            defaultValue={currentUser?.address}
            placeholder="1a, District 1, HCM City"
            error={getFieldError("address")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <div
                className={`relative flex items-center bg-surface-container-low rounded-xl border-b-2 transition-all px-3.5 
      ${getFieldError("status") ? "border-red-500 bg-red-50" : "border-outline-variant focus-within:border-primary"}`}
              >
                <ShieldCheck
                  className={`w-5 h-5 mr-3 ${getFieldError("status") ? "text-red-500" : "text-green-500"}`}
                />
                <select
                  name="status"
                  defaultValue={currentUser?.status || "active"}
                  className="w-full bg-transparent border-none focus:ring-0 py-3 text-on-surface font-medium text-sm appearance-none cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending (Email)</option>
                  <option value="pending_kyc">Pending KYC</option>
                  <option value="blocked">Blocked</option>
                  <option value="banned">Banned</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="w-4 h-4 ml-2 text-slate-400" />
              </div>
              {getFieldError("status") && (
                <span className="text-[11px] font-semibold text-red-500 px-1 animate-in fade-in slide-in-from-top-1">
                  {getFieldError("status")}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div
                className={`relative flex items-center bg-surface-container-low rounded-xl border-b-2 transition-all px-3.5 
      ${getFieldError("role") ? "border-red-500 bg-red-50" : "border-outline-variant focus-within:border-primary"}`}
              >
                <Briefcase
                  className={`w-5 h-5 mr-3 ${getFieldError("role") ? "text-red-500" : "text-amber-500"}`}
                />
                <select
                  name="role"
                  defaultValue={currentUser?.role || "customer"}
                  className="w-full bg-transparent border-none focus:ring-0 py-3 text-on-surface font-medium text-sm appearance-none cursor-pointer"
                >
                  <option value="admin">Admin</option>
                  <option value="inventory_manager">Inventory Manager</option>
                  <option value="moderator">Moderator</option>
                  <option value="collaborator">Collaborator</option>
                  <option value="customer">Customer</option>
                </select>
                <ChevronDown className="w-4 h-4 ml-2 text-slate-400" />
              </div>
              {getFieldError("role") && (
                <span className="text-[11px] font-semibold text-red-500 px-1 animate-in fade-in slide-in-from-top-1">
                  {getFieldError("role")}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-3 pt-4 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className={`btn-primary flex-[1.5] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className={`btn-primary flex-[1.5] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                  >
                    ...
                  </svg>
                  {isEditMode ? "Updating..." : "Creating..."}
                </span>
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
