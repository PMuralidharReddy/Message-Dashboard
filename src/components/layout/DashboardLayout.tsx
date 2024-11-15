import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutGrid, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  UserCircle 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutGrid, href: '/dashboard' },
  { name: 'Messages', icon: MessageSquare, href: '/messages' },
  { name: 'Notifications', icon: Bell, href: '/notifications' },
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'Profile', icon: UserCircle, href: '/profile' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex w-20 flex-col">
            <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center justify-center">
                  <img
                    className="h-8 w-auto rounded-full"
                    src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=74"
                    alt="Your Company"
                  />
                </div>
                <nav className="mt-5 flex-1 space-y-1 px-2">
                  {navigation.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.href)}
                        className={`group flex w-full flex-col items-center rounded-lg p-3 text-sm ${
                          active
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className={`h-6 w-6 ${
                          active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                        }`} />
                        <span className={`mt-2 text-xs ${
                          active ? 'font-medium text-indigo-600' : 'text-gray-500 group-hover:text-gray-900'
                        }`}>
                          {item.name}
                        </span>
                        {active && (
                          <div className="absolute left-0 w-1 h-8 bg-indigo-600 rounded-r-full" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
              <div className="flex flex-shrink-0 justify-center pb-5">
                <button
                  onClick={handleLogout}
                  className="group flex w-full flex-col items-center rounded-lg p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                >
                  <LogOut className="h-6 w-6" />
                  <span className="mt-2 text-xs">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}