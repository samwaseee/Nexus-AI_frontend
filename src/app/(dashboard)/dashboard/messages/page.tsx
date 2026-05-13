import { Search, MoreVertical, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";

export default function MessagesPage() {
  return (
    <div className="h-[calc(100vh-10rem)] border rounded-xl overflow-hidden flex bg-card">
      
      {/* Left Sidebar: Contact List */}
      <div className="w-80 border-r flex flex-col bg-muted/10 hidden md:flex">
        <div className="p-4 border-b bg-background">
          <h2 className="font-semibold mb-4">Inbox</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-8 bg-background" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Active Contact */}
          <div className="p-4 border-b border-l-4 border-l-primary bg-muted/30 cursor-pointer">
            <div className="flex items-center gap-3">
              <UserAvatar user={{ name: "Michael Client" }} className="h-10 w-10" />
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold truncate">Michael Client</h4>
                  <span className="text-[10px] text-muted-foreground">10:42 AM</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">Can we add Stripe integration to the scope?</p>
              </div>
            </div>
          </div>
          
          {/* Inactive Contact */}
          <div className="p-4 border-b border-l-4 border-l-transparent hover:bg-muted/10 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <UserAvatar user={{ name: "Emma Design" }} className="h-10 w-10" />
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium truncate">Emma Design</h4>
                  <span className="text-[10px] text-muted-foreground">Yesterday</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">Here are the Figma files you requested.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Active Chat */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b flex items-center justify-between px-6 bg-background">
          <div className="flex items-center gap-3">
            <UserAvatar user={{ name: "Michael Client" }} className="h-8 w-8" />
            <div>
              <h3 className="font-semibold text-sm">Michael Client</h3>
              <p className="text-[10px] text-green-500">Online</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-muted/5">
          <div className="flex flex-col items-center mb-6">
            <span className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">Today</span>
          </div>
          
          <div className="flex gap-3 max-w-[80%]">
            <UserAvatar user={{ name: "Michael Client" }} className="h-8 w-8 mt-auto" />
            <div className="bg-card border p-3 rounded-2xl rounded-bl-none text-sm shadow-sm">
              Hey! The dashboard is looking great. Can we add Stripe integration to the scope before launch?
            </div>
          </div>

          <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
            <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-br-none text-sm shadow-sm">
              Thanks Michael! Yes, I can add Stripe. I'll send over a custom offer for that addition right now.
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-background border-t">
          <div className="flex gap-2">
            <Input placeholder="Type your message..." className="flex-1" />
            <Button>
              <Send className="h-4 w-4 mr-2" /> Send
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}