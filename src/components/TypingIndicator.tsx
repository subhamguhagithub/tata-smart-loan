const TypingIndicator = () => {
  return (
    <div className="flex w-full mb-4 justify-start">
      <div className="bg-chat-bot rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-border">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: "200ms" }}></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: "400ms" }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
