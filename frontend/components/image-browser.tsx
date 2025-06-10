import { Globe, SquareArrowOutUpRight } from "lucide-react";

interface BrowserProps {
  className?: string;
  url?: string;
  image?: string;
}

const ImageBrowser = ({ className, url, image }: BrowserProps) => {
  if (!url) return;

  return (
    <div
      className={`h-[calc(100vh-178px)] border border-purple-300 bg-white rounded-xl overflow-hidden shadow-md ${className}`}
    >
      <div className="flex items-center gap-3 px-3 py-2.5 bg-purple-100 border-b border-purple-200 backdrop-blur-xl">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
        </div>
        <div className="flex-1 flex items-center overflow-hidden">
          <div className="bg-purple-100 px-3 py-1.5 rounded-lg w-full flex items-center gap-2 group transition-colors">
            <Globe className="h-3.5 w-3.5 text-purple-800 flex-shrink-0" />
            <span className="text-sm text-purple-800 truncate flex-1 font-medium">
              {url}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded-md hover:bg-purple-100 transition-colors"
            onClick={() => window.open(url, "_blank")}
          >
            <SquareArrowOutUpRight className="h-4 w-4 text-purple-800" />
          </button>
        </div>
      </div>
      <div className="bg-white h-full">
        {image && (
          <img
            src={image}
            alt="Browser"
            className="w-full h-full object-contain object-center"
          />
        )}
      </div>
    </div>
  );
};

export default ImageBrowser;
