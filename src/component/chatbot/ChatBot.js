import React from "react";
import send from "./send_button.svg";
import "./style.css";
import { useState, useEffect, useRef } from "react";

export default function ChatBot({ sidebarState, query, setQuery }) {
  const [message, setMessage] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("");
  const [responseText, setResponseText] = useState([]);
  const textArea = useRef(null);

  const getResponse = (message) => {
    return {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer d6a921d91b8b7d802a005b3d7293b22e0a53c907e6d929af725030f5a9abebf7",
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        prompt: `<s>[INST]${message}[/INST]`,
        max_tokens: 512,
        stop: ["</s>", "[/INST]"],
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        n: 1,
      }),
    };
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    // handleMessageChange
    e.preventDefault();
    if (message.trim() !== "") {
      console.log(message);

      // Assgning the value to the query
      setQuery([...query, message]);

      // Fetching the responce from the llm
      fetch("https://api.together.xyz/v1/completions", getResponse(message))
        .then((response) => response.json())
        .then((response) => {
          // Handle response data...
          console.log(response);
          const response_text = response.choices[0].text;
          setResponseText([...responseText, response_text]);
          console.log(response_text);
        })
        .catch((err) => console.error(err));
      // clear the message after the submition from the screen
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    textArea.current.style.height = "auto";
    textArea.current.style.height = textArea.current.scrollHeight + "px";
    setTextAreaHeight(textArea.current.scrollHeight);
  }, [message]);

  // useEffect hook to listen for changes in the condition
  useEffect(() => {
    if (
      query.length > 0 &&
      document.body.scrollHeight > window.innerHeight - 10
    ) {
      // Scroll to a specific position using window.scrollTo
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [query, responseText]);
  // Conditionally apply classes to change button color when textarea is not empty
  const buttonClasses = message.trim()
    ? "flex justify-center items-center self-end ml-2 bg-white text-white font-bold w-7 h-7 border-none rounded-md"
    : "flex justify-center items-center self-end ml-2 bg-gray-600 text-white font-bold cursor-default w-7 h-7 border-none rounded-md";

  const scrollClass =
    textAreaHeight > window.innerHeight - 200
      ? "relative flex justify-center items-center bottom-0"
      : "fixed flex justify-center items-center bottom-0";

  return (
    <>
      <div
        className="chat_container relative p-14 bottom-12"
        style={{
          transform: sidebarState ? "translateX(112px)" : "translateX(0px)",
          transition: "transform 300ms",
        }}
      >
        {query.map((queryItem, index) => (
          <div key={index} className="chat py-2 text-white">
            <p className="query pt-16 pb-2">
              <b>You</b>
              <br />
              {queryItem}
            </p>
            {responseText[index] && (
              <p className="response pb-2">
                <b>Varta</b> <br />
                {responseText[index]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div
        className={scrollClass}
        style={{
          transform: sidebarState ? "translateX(109.5px)" : "translateX(0px)",
          transition: "transform 300ms",
        }}
        id="scroll"
      >
        <div
          className="flex justify-center px-2 py-2 mb-8 bg-inherit border border-zinc-700 rounded-lg focus-within:border-zinc-500"
          id="message"
        >
          <textarea
            className="overflow-hidden resize-none bg-inherit border border-none placeholder-slate-600 focus:outline-none text-white"
            placeholder="Message Varta......."
            style={{ width: "95%" }}
            rows="1"
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyPress}
            ref={textArea}
          />
          <button onClick={handleSubmit} className={buttonClasses}>
            <img src={send} alt="Send" className="send_button" />
          </button>
        </div>
      </div>
    </>
  );
}
