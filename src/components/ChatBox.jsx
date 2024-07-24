import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // TODO: Implement actual chat logic and API integration
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Message received. Processing...", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              message.sender === "user"
                ? "bg-primary text-primary-foreground ml-auto"
                : "bg-secondary"
            } max-w-[80%]`}
          >
            {message.text}
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;