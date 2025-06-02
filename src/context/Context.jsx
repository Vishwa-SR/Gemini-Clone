import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
const [input,setinput]=useState("")
const [recentPrompt, setRecentPrompt] = useState('');
const [prevPrompt, setPrevPrompt] = useState([]);
const [showResult, setShowResult] = useState(false);
const [loading, setLoading] = useState(false);
const [resultData, setResultData] = useState(null); 
function delaypara(index,nextword) {
setTimeout(() => {
  setResultData(prev=>prev+nextword)
}, 75*index);


  
}

const newChat= () => {
  setLoading(false)
  setShowResult(false)
  
}
  const onSent = async (prompt) => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let  response;
    if(prompt!=undefined){
response=await run(prompt)
setRecentPrompt(prompt)
    }
    else{
      setPrevPrompt(prev=>[...prev,input])
      setRecentPrompt(input)
      response=await run(input)

    }
    
    let responsearray=response.split("**")
    
    let newresponse="";
    for(let i=0;i<responsearray.length;i++ ){
      if(i==0||i%2 !=1){
          newresponse+=responsearray[i]



      }
      else{
        newresponse+="<b>"+responsearray[i]+"</b>"
      }
    }
    console.log(newresponse)
    let newresponse2=newresponse.split("*").join("</br>")
   let newresponsearray=newresponse2.split(" ");
   
   for(let i=0;i<newresponsearray.length;i++){
            const nextword=newresponsearray[i];
            delaypara(i,nextword+" ");
   }
    setLoading(false)
    setinput("")

    
  };
  const contextValue = {
    prevPrompt,
    setLoading,
    setPrevPrompt,
    onSent,
    setRecentPrompt,recentPrompt,showResult,loading,
    resultData,setResultData,input,setinput,newChat

    
    
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
