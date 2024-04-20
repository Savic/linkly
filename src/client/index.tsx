import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";

const App = () => (
    <div className="p-4">
        <h1 className="text-2xl font-bold">Hello, React with Tailwind and Shad UI!</h1>
    </div>
);

const root: HTMLElement = document.getElementById("root") as HTMLElement;
const rootElement = createRoot(root);
rootElement.render(<App />);
