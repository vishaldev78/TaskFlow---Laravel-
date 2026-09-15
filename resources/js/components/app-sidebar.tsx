import { Link, router, usePage } from '@inertiajs/react';
import {
  CheckSquare,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Megaphone,
  Settings,
  ShieldCheck,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ProfileAvatar } from '@/components/ui/avatar';

import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: LayoutDashboard,
  },
  {
    title: 'My Tasks',
    href: '/posts',
    icon: ListTodo,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const { auth } = usePage().props as {
    auth: {
      user: {
        name: string;
        email: string;
        is_admin: boolean;
        avatar_path?: string | null;
      };
    };
  };

  const logout = () => {
    router.post('/logout');
  };

  const firstName = auth.user.name.trim().split(' ')[0];

  const navItems = auth.user.is_admin
    ? [...mainNavItems, { title: 'Admin', href: '/admin', icon: ShieldCheck }]
    : mainNavItems;

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="bg-slate-100"
    >
      <div className="m-2 flex h-[calc(100vh-1rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-sm">

        <SidebarHeader className="px-3 pt-5 pb-2 group-data-[collapsible=icon]:px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild
                className="h-auto hover:bg-transparent"
              >
                <Link
                  href={dashboard()}
                  className="flex items-center justify-center gap-3"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                    <CheckSquare className="size-6" />
                  </div>

                  <span className="text-lg font-bold tracking-tight group-data-[collapsible=icon]:hidden">
                    TaskFlow
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <div className="px-3 pt-1.25 text-center group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:pt-1.25">
          <ProfileAvatar
            firstName={firstName}
            className="mx-auto size-32.5 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:text-[10px]"
          />

          <h2 className="mt-1.25 truncate text-base font-bold text-slate-900 group-data-[collapsible=icon]:hidden">
            {firstName}
          </h2>

          <p className="mt-0.5 truncate px-2 text-xs text-slate-400 group-data-[collapsible=icon]:hidden">
            {auth.user.email}
          </p>
        </div>

        <SidebarContent className="mt-8 px-3 group-data-[collapsible=icon]:mt-6 group-data-[collapsible=icon]:px-2">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              if (!Icon) {
                return null;
              }

              return (
                <SidebarMenuItem
                  key={item.title}
                  className="list-none"
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-11 rounded-xl px-4 text-slate-700 hover:bg-slate-100 hover:text-blue-700 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:p-0!"
                  >
                    <Link href={item.href} className="justify-start group-data-[collapsible=icon]:justify-center">
                      <Icon className="size-5.5! group-data-[collapsible=icon]:size-6!" strokeWidth={2.25} />

                      <span className="ml-2 text-sm font-medium group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </nav>
        </SidebarContent>

        <SidebarFooter className="mt-auto px-3 pb-5 group-data-[collapsible=icon]:px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={logout}
                tooltip="Sign out"
                className="h-11 rounded-xl px-4 text-slate-700 hover:bg-red-50 hover:text-red-600 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center"
              >
                <LogOut className="size-5.5! group-data-[collapsible=icon]:size-6!" strokeWidth={2.25} />

                <span className="ml-2 text-sm font-medium group-data-[collapsible=icon]:hidden">
                  Sign out
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}