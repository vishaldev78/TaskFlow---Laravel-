import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { AppSidebar } from '@/components/app-sidebar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { home } from '@/routes';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
       <div className="div"></div>
    );
}
