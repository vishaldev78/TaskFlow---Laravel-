import type { AuthLayoutProps } from '@/types';
import { AppSidebar } from '@/components/app-sidebar';

export default function AuthSimpleLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}