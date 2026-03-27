import { Mail, ShieldCheck, Lock, User } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-md" data-purpose="login-wrapper">
        {/* LogoSection */}
        <div className="mb-8 text-center" data-purpose="brand-identity">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-600 text-white mb-4 shadow-lg shadow-primary-200">
            <ShieldCheck
              className="lucide lucide-shield-check"
              size={24}
              strokeWidth={2}
            ></ShieldCheck>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Admin Portal
          </h1>
        </div>
        {/* LoginForm */}
        <div
          className="glass-card border border-slate-200 rounded-2xl p-8"
          data-purpose="login-card"
        >
          <form action="#" className="space-y-6" method="POST">
            {/* <!-- UserName Field --> */}
            <div data-purpose="form-group">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} strokeWidth={2} />
                </div>
                <input
                  autoComplete="username"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all bg-white"
                  id="userName"
                  name="userName"
                  required
                  type="text"
                />
              </div>
            </div>
            {/* <!-- Password Field --> */}
            <div data-purpose="form-group">
              <label
                className="block text-sm font-medium text-slate-700 mb-1.5"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  {/* <!-- Lucide: Lock --> */}
                  <Lock size={18} strokeWidth={2} />
                </div>
                <input
                  autoComplete="current-password"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all bg-white"
                  id="password"
                  name="password"
                  required
                  type="password"
                />
              </div>
            </div>
            {/* <!-- Options: Remember Me & Forgot Password --> */}
            <div
              className="flex items-center justify-between"
              data-purpose="form-options"
            >
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded cursor-pointer"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label
                  className="ml-2 block text-sm text-slate-600 cursor-pointer"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            {/* <!-- Submit Button --> */}
            <button
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all active:scale-[0.98]"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
