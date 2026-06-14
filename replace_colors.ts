import fs from "fs";
import path from "path";

const dirPath = path.join(process.cwd(), "src");

// Modern Dark Mode Palette
const colorMap: Record<string, string> = {
  // Backgrounds
  "bg-\\[#0A0A0A\\]": "bg-zinc-950",
  "bg-\\[#0D0D0D\\]": "bg-zinc-950",
  "bg-\\[#0F0F0F\\]": "bg-zinc-950",
  "bg-\\[#121212\\]": "bg-zinc-900",
  "bg-\\[#1A1A1A\\]": "bg-zinc-800",
  "bg-\\[#1a1110\\]": "bg-zinc-900",
  
  // Borders
  "border-\\[#222\\]": "border-zinc-800",
  "border-\\[#333\\]": "border-zinc-700",
  
  // Text
  "text-\\[#E5E5E5\\]": "text-zinc-200",
  "text-\\[#888\\]": "text-zinc-400",
  "text-\\[#666\\]": "text-zinc-500",
  "text-\\[#555\\]": "text-zinc-500",
  
  // Accent colors (The neon blue/orange to something softer)
  "bg-\\[#3D5AFE\\]": "bg-indigo-600",
  "text-\\[#3D5AFE\\]": "text-indigo-400",
  "border-\\[#3D5AFE\\]": "border-indigo-600",
  "bg-\\[#3D5AFE\\]/5": "bg-indigo-500/10",
  "bg-\\[#3D5AFE\\]/10": "bg-indigo-500/10",
  "bg-\\[#3D5AFE\\]/30": "bg-indigo-500/20",
  "border-\\[#3D5AFE\\]/30": "border-indigo-500/20",
  "border-\\[#3D5AFE\\]/50": "border-indigo-500/40",
  "hover:bg-\\[#3D5AFE\\]/10": "hover:bg-indigo-500/10",
  "hover:bg-\\[#3D5AFE\\]/90": "hover:bg-indigo-500",
  "hover:border-\\[#3D5AFE\\]/50": "hover:border-indigo-500/50",
  "hover:border-\\[#3D5AFE\\]/60": "hover:border-indigo-500/50",
  "group-hover:bg-\\[#3D5AFE\\]": "group-hover:bg-indigo-600",
  "group-hover:border-\\[#3D5AFE\\]": "group-hover:border-indigo-600",
  
  "shadow-\\[0_0_15px_rgba\\(249,115,22,0.03\\)\\]": "shadow-none",
};

function processDir(directory: string) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      let content = fs.readFileSync(fullPath, "utf-8");
      
      let newContent = content;
      for (const [key, val] of Object.entries(colorMap)) {
        newContent = newContent.replace(new RegExp(key, "g"), val);
      }

      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent, "utf-8");
        console.log("Updated", fullPath);
      }
    }
  }
}

processDir(dirPath);
