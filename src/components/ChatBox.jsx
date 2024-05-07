import React, { useEffect, useState } from "react";
import { databases, databaseId, collectionId } from "../appwrite/config";
import { client, Query, ID } from "../appwrite/config";
import useAuth from "../context/AuthContext";
import dateFormat, { masks } from "dateformat";
import toast from "react-hot-toast";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [formTxt, setFormTxt] = useState("");
  const [disabled, setDisabled] = useState(true);
  masks.hammerTime = "h:MM TT , mmm dd yyyy";
  const { user } = useAuth();

  const getDBMsgs = async () => {
    let response = await databases.listDocuments(databaseId, collectionId, [
      Query.orderAsc("$createdAt"),
      Query.limit(30),
    ]);
    setMessages(response.documents);
  };

  useEffect(() => {
    getDBMsgs();

    client.subscribe(
      `databases.${databaseId}.collections.${collectionId}.documents`,
      (response) => {
        response.events.includes("databases.*.collections.*.documents.*.create")
        &&
        setMessages((prevState) => [...prevState,response.payload]);

        response.events.includes("databases.*.collections.*.documents.*.delete")
        && 
        setMessages((prevState) => prevState.filter((i) => i.$id !== response.payload.$id));

      }
    );
  }, []);

  const handleDelete = async (messageId) => {
      await databases.deleteDocument(databaseId, collectionId, messageId);
      toast.success('Message has been deleted');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await databases.createDocument(databaseId, collectionId, ID.unique(),
      { message_body: formTxt, author_name: user.name, author_id: user.$id },
    );
    setFormTxt("");
  };

  useEffect(() => {
    setDisabled(formTxt.length > 0 ? false : true);
  }, [formTxt]);

  return (
    <>
      <div className="flex h-full w-full flex-col-reverse gap-2 overflow-auto px-2 pb-14 pt-3">
        {messages.length > 0 ? (
          messages.map((item) => {
            return (
              <div key={item.$id} id={item.$id}
                className={`message group/message ${item.author_id === user.$id && "ml-auto"}`} >
                <span className="message_author">{item.author_name}</span>
                <p>{item.message_body}</p>
                <span className="message-time">{dateFormat(item.$createdAt, "hammerTime")}</span>
                <button className="message-delete" onClick={() => {handleDelete(item.$id)}} >
                  <i className="fa-solid fa-trash text-xs text-inherit"></i>
                </button>
              </div>
            );
          })
        ) : (
          <div className="absolute-center text-xs">No messages to show here</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-0 flex w-full items-end gap-2 bg-gray-900 px-2 py-2">
        <input type="text" placeholder="Message..." value={formTxt} onChange={(e) => setFormTxt(e.target.value)}
          className="w-full resize-none rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 text-sm outline-0"/>
        <button type="sumit" disabled={disabled} className="rounded-lg bg-blue-600 fill-gray-50 p-2.5 disabled:opacity-30">
          <svg viewBox="0 0 24 24" className="size-4">
            <path d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path>
          </svg>
        </button>
      </form>
    </>
  );
};

export default ChatBox;
