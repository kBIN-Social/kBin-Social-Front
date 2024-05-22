import Comment from "../Components/Comment"
import React from "react";
export default function threadDetail() {
    let comments  = [{author:"Alfonso",body:"Comment Alfonso",created_at:"2024-03-12T00:00:00"},
                {author:"Pedrico",body:"Comment Pedrico",created_at:"2024-03-12T00:00:00"}] ;
    const listComments = comments.map((commentInfo) => 
                    <li>
                        <Comment author = {commentInfo.author} body= {commentInfo.body} created_at={commentInfo.created_at}/> 
                    </li>  ) ;
    console.log(listComments)
    return (
    <ul>
        <li>
            <Comment author= "Pedro" body="Hola que tal" created_at="2024-03-12T00:00:00"/> 
        </li>
        {listComments}
    </ul>
     ); 
}

    