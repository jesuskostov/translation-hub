import { Languages } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center space-x-3">
          <Languages className="w-10 h-10 text-white" />
          <div>
            <h1 className="text-3xl font-bold text-white">Translation Hub</h1>
            <p className="text-blue-100 mt-1">In honor to not hate our lives</p>
          </div>
        </div>
      </div>
    </header>
  );
}
