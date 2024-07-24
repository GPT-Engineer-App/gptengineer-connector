import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ChatBox = ({ className }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const scrollAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user" };
      if (systemPrompt) {
        newMessage.systemPrompt = systemPrompt;
      }
      setMessages([...messages, newMessage]);
      setInput("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "This is a simulated response.", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  const handleFileUpload = (destination) => {
    fileInputRef.current.click();
    fileInputRef.current.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (destination === "chatbot") {
          // TODO: Implement file upload to chatbot
          console.log("Uploading file to chatbot:", file.name);
        } else if (destination === "github") {
          // TODO: Implement file upload to GitHub project
          console.log("Uploading file to GitHub project:", file.name);
        }
      }
    };
  };

  return (
    <div className={cn("flex flex-col bg-gray-900 text-white h-full", className)}>
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>
      <ScrollArea ref={scrollAreaRef} className="flex-grow p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            {message.systemPrompt && (
              <div className="text-xs text-gray-500 mb-1">{message.systemPrompt}</div>
            )}
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2 items-center">
          <Select onValueChange={setSystemPrompt}>
            <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700">
              <SelectValue placeholder="Select prompt" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prompt1">Prompt 1</SelectItem>
              <SelectItem value="prompt2">Prompt 2</SelectItem>
              <SelectItem value="prompt3">Prompt 3</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-grow bg-gray-800 text-white border-gray-700"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700">
                <Paperclip className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleFileUpload("chatbot")}>
                Upload to Chatbot
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileUpload("github")}>
                Upload to GitHub
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleSend} size="icon" className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => console.log(e.target.files[0])}
      />
    </div>
  );
};

export default ChatBox;