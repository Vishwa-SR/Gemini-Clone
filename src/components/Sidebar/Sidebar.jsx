import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extended, setextended] = useState(false);
  const {onSent,prevPrompt,setRecentPrompt,newChat}=useContext(Context)
 const loadPrompt =async (prompt) => {
   setRecentPrompt(prompt)
   await onSent(prompt)
  }
  function handleclick(){
    setextended(!extended)
  }
  return (
    <div className="sidebar">
      <div className="top">
        <img  onClick={()=>handleclick()} className="menu" src={assets.menu_icon} alt="" />
        <div onClick={()=>newChat()}className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>newchat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item,index)=>{
              return(
                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0,18)}</p>
              </div>
              )

            })}
           
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Historyt</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settingst</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
