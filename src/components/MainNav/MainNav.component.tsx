// src/components/MainNav/MainNav.component.tsx
import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import {
  Menu as MenuIcon,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  LogOut as LogoutIcon,
  Sun,
  Moon,
  Coffee,
  Monitor
} from 'lucide-react';
import type { IAllowedRoutes } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';


interface IProps {
  onLogout: () => void;
  onNav: (link: IAllowedRoutes) => void;
  allowedRoutes: IAllowedRoutes[];
  userData?: any;
}

const MainNav = ({ onLogout, onNav, allowedRoutes, userData }: IProps) => {
  const { setTheme } = useTheme();

  const getGreetingMessage = useCallback(() => {
    const hour = new Date().getHours();
    const firstName =
      userData?.pilot?.firstName ||
      userData?.firstName ||
      '';

    if (!firstName) return null;

    let greeting = '';
    let Icon = Coffee;

    if (hour >= 6 && hour < 12) {
      greeting = 'Bom dia';
      Icon = Sun;
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Boa tarde';
      Icon = Sun;
    } else {
      greeting = 'Boa noite';
      Icon = Moon;
    }

    return { text: `${greeting}, ${firstName}!`, Icon };
  }, [userData]);

  const greeting = getGreetingMessage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500">
      <div className="mx-auto px-4 py-3">
        <div className="bg-background/80 dark:bg-card/80 backdrop-blur-xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-[24px] px-6 h-16 flex items-center justify-between transition-all duration-500">

          {/* Logo & Navigation */}
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-black text-foreground tracking-widest font-['Flamenco'] select-none">
              CPVL
            </h1>

            <div className="hidden md:flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-muted-foreground btn-hover-effect gap-2 rounded-xl h-10 font-bold">
                    <LayoutDashboard className="w-4 h-4" />
                    Menu do Piloto
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-2xl border-border bg-popover text-popover-foreground shadow-2xl animate-in zoom-in-95">
                  <DropdownMenuLabel className="text-xs uppercase font-black text-muted-foreground tracking-widest px-4 py-3">Navegação</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  {allowedRoutes.map((route, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      onClick={() => onNav(route)}
                      className="px-4 py-3 cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-xl transition-colors mx-1 font-bold"
                    >
                      {route.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Central Greeting */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            {greeting && (
              <div className="bg-primary/5 px-6 py-2 rounded-full border border-primary/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-700">
                <greeting.Icon className="w-4 h-4 text-primary" />
                <span className="text-foreground font-['Flamenco'] text-lg font-medium tracking-wide">
                  {greeting.text}
                </span>
              </div>
            )}
          </div>

          {/* User & Logout */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground btn-hover-effect rounded-xl w-10 h-10 transition-all">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Alternar tema</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl border-border bg-popover text-popover-foreground shadow-2xl">
                <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer hover:bg-accent rounded-xl mx-1 gap-2 font-bold">
                  <Sun className="h-4 w-4" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer hover:bg-accent rounded-xl mx-1 gap-2 font-bold">
                  <Moon className="h-4 w-4" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer hover:bg-accent rounded-xl mx-1 gap-2 font-bold">
                  <Monitor className="h-4 w-4" /> Sistema
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent rounded-xl">
                    <MenuIcon className="w-6 h-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mr-4 rounded-2xl border-border bg-popover text-popover-foreground shadow-2xl">
                  {allowedRoutes.map((route, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      onClick={() => onNav(route)}
                      className="px-4 py-3 font-bold"
                    >
                      {route.label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem onClick={onLogout} className="px-4 py-3 text-destructive focus:text-destructive font-bold">
                    <LogoutIcon className="w-4 h-4 mr-2" /> Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button
              variant="outline"
              onClick={onLogout}
              className="hidden md:flex bg-transparent border-border text-foreground hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive rounded-xl h-10 px-6 font-black transition-all group"
            >
              <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
