
import { Badge } from "@/components/ui/badge";
import { Camera, Video, Instagram, CheckCircle2, Heart } from "lucide-react";

export const getAudienceBadge = (audience: string) => {
  switch (audience) {
    case "premium":
      return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>;
    case "growth":
      return <Badge className="bg-blue-100 text-blue-800">Growth</Badge>;
    case "value":
      return <Badge className="bg-green-100 text-green-800">Value</Badge>;
    default:
      return null;
  }
};

export const getFormatBadge = (format: string) => {
  switch (format) {
    case "photo":
      return <Badge className="bg-slate-100 text-slate-800 flex items-center gap-1">
        <Camera className="h-3 w-3" />
        Photo
      </Badge>;
    case "reel":
      return <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
        <Video className="h-3 w-3" />
        Reel
      </Badge>;
    case "story":
      return <Badge className="bg-orange-100 text-orange-800 flex items-center gap-1">
        <Instagram className="h-3 w-3" />
        Story
      </Badge>;
    default:
      return null;
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "in-progress":
      return <div className="h-4 w-4 bg-amber-400 rounded-full animate-pulse" />;
    case "not-started":
      return <div className="h-4 w-4 bg-slate-300 rounded-full" />;
    default:
      return null;
  }
};
