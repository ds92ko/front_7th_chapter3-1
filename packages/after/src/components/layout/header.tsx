export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">
            L
          </div>
          <div>
            <h1 className="m-0 text-lg leading-none font-bold text-gray-900">Hanghae Company</h1>
            <p className="m-0 mt-0.5 text-[11px] leading-none text-gray-500">
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900">Demo User</div>
            <div className="text-xs text-gray-500">demo@example.com</div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-base font-semibold text-blue-600">
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
