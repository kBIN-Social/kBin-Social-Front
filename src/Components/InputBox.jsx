import React,{useEffect, useState} from "react";
export default function InputBox({actionName="action",action,father_id,previousText }) {
    console.log("Pare: "+ father_id)
    const[text,setText] = useState(previousText) ;
    console.log(text) ;
    return (
        <div id = "comment-add"class="section">
        <textarea id="entry_comment_665439133bbb14.06536950_body" 
        name="entry_comment[body]" data-controller="input-length rich-textarea autogrow" data-action="input-length#updateDisplay" 
        data-input-length-max-value="5000" onChange={(e) => {console.log(text) ;setText(e.target.value);} }
        value = {text} >
        </textarea>
        <br/> 
        <button type="submit" id="entry_comment_665439133bbb14.06536950_submit" name="entry_comment[submit]" 
        class="btn btn__primary" data-action="subject#sendForm"
        onClick={(e) =>{e.stopPropagation();action(text,father_id)}}
        >{actionName}</button>
        </div> 
    )
    
}