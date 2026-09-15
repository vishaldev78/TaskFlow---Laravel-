import { CheckSquare } from 'lucide-react';

export default function AppLogo() {
  return (
    <>
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
        <CheckSquare className="size-5" />
      </div>

      <div className="ml-2 grid flex-1 text-left text-sm">
        <span className="truncate leading-tight font-bold tracking-tight">
          TaskFlow
        </span>
        <span className="truncate text-xs leading-tight text-muted-foreground">
          Task Manager
        </span>
      </div>
    </>
  );
}