import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";
import {Button} from "./@/components/ui/button";

const App = () => (
    <div className="p-4">
        <h1 className="text-2xl font-bold">Hello, React with Tailwind and Shad UI!</h1>
        <Button variant="outline">Button</Button>
    </div>
);

const root: HTMLElement = document.getElementById("root") as HTMLElement;
const rootElement = createRoot(root);

rootElement.render(<App />);
