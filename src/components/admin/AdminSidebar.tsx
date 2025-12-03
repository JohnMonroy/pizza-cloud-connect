import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Pizza, 
  ClipboardList, 
  LogOut, 
  LayoutDashboard,
  ChefHat
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminSidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/orders', icon: ClipboardList, label: 'Pedidos' },
  ];

  return (
    <aside className="w-64 bg-pizza-black min-h-screen flex flex-col border-r border-primary-foreground/10">
      {/* Logo */}
      <div className="p-6 border-b border-primary-foreground/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Pizza className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-black text-primary-foreground text-lg uppercase tracking-tight">Pizza Hut</h1>
            <p className="text-primary-foreground/50 text-xs uppercase tracking-wide">Panel Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-display font-semibold uppercase text-sm tracking-wide ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-primary-foreground/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-primary-foreground/70" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-primary-foreground font-semibold text-sm truncate">{user?.name}</p>
            <p className="text-primary-foreground/50 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
