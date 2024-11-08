import { DownloadIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

interface DownloadProps {
  title?: string;
  link: string;
}

export default function DownloadButton({ title, link }: DownloadProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant: "outline" }))}
      to={link}
      title={title}
      target="_blank"
    >
      <DownloadIcon />
      <span className="ml-2">Template</span>
    </Link>
  );
}
