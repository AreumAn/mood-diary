import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">감정 일기장</h1>
        <ThemeToggle />
      </div>
    </nav>
  );
} 
