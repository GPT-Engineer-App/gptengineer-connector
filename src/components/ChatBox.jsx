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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const ChatBox = ({ className }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [prompts, setPrompts] = useState({
    prompt1: "This is prompt 1",
    prompt2: "This is prompt 2",
    prompt3: "This is prompt 3",
  });
  const [editingPrompt, setEditingPrompt] = useState("");
  const [editedPromptContent, setEditedPromptContent] = useState("");
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

  const handlePromptEdit = (promptKey) => {
    setEditingPrompt(promptKey);
    setEditedPromptContent(prompts[promptKey]);
  };

  const handlePromptSave = () => {
    if (editingPrompt) {
      setPrompts((prevPrompts) => ({
        ...prevPrompts,
        [editingPrompt]: editedPromptContent,
      }));
      setEditingPrompt("");
      setEditedPromptContent("");
    }
  };

  return (
    <div className={cn("flex flex-col bg-secondary rustic-border", className)}>
      <div className="p-4 border-b border-primary">
        <h2 className="text-lg font-semibold text-primary">Chat</h2>
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
              <div className="text-xs text-muted-foreground mb-1">{message.systemPrompt}</div>
            )}
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-primary">
        <div className="flex gap-2 items-center mb-2">
          <Select onValueChange={setSystemPrompt} value={systemPrompt}>
            <SelectTrigger className="w-[180px] bg-muted text-muted-foreground border-primary">
              <SelectValue placeholder="Select prompt" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {Object.entries(prompts).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {value.substring(0, 20)}...
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePromptEdit(key);
                        }}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Prompt</DialogTitle>
                      </DialogHeader>
                      <Textarea
                        value={editedPromptContent}
                        onChange={(e) => setEditedPromptContent(e.target.value)}
                        className="min-h-[200px]"
                      />
                      <Button onClick={handlePromptSave}>Save</Button>
                    </DialogContent>
                  </Dialog>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-grow bg-muted text-muted-foreground border-primary"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-muted border-primary">
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
          <Button onClick={handleSend} size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
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