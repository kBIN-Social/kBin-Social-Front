 import React, { useState } from "react"
import InputBox from "./InputBox";
 export default function Comment(props) {
    const {comment_id,author_id,author,body,created_at,likes,dislikes,boosts} = props ;
    const {handleLike,handleDislike,handleBoost,handleReply,handleMakeComment} = props ;
    const {level} = props ;
    const [opened,setOpened] = useState(false); 
    const [children,setChildren] = useState( [...props.children]);
    console.log("level "+level) ;
    const listChildren = children.map((commentInfo) => {
        return (
            <li key={commentInfo.id}>
                <Comment
                    comment_id = {commentInfo.id}
                    author_id={commentInfo.user_id}
                    author={commentInfo.username}
                    body={commentInfo.body}
                    created_at={commentInfo.created_at}
                    avatar={commentInfo.avatar} // assuming userDetails has an avatar field
                    likes ={commentInfo.likes.length}
                    dislikes={commentInfo.dislikes.length}
                    boosts = {commentInfo.boosts.length}
                    level = {level+1}
                    children = {children}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    handleBoost = {handleBoost}
                    handleReply = {handleMakeComment}
                />
            </li> ) ;
    });
    return (
        <div>
            <blockquote class={`section comment entry-comment subject comment-level--${level}`} id="entry-comment-6764615" data-controller="comment subject mentions" data-subject-parent-value="" data-action="">
                <header>
                    <a href= {`/Profile/${author_id}`} data-action="mouseover->mentions#user_popup mouseout->mentions#user_popup_out" data-mentions-username-param="Norgur" class="user-inline" title="@Norgur@kbin.social">
                        {author}
                    </a>,
                    <time class="timeago" title="2024-05-21T10:14:32+00:00" Datetime={created_at} timeago-id="565">9 minutes ago</time>     
                </header>
                <figure>
                    <a data-action="mouseover->mentions#user_popup mouseout->mentions#user_popup_out" data-mentions-username-param="Norgur" href= {`/Profile/${author_id}`}>
                    <img width="40" height="40"  src={`${props.avatar}`} aria-expanded="true" class="popover-control--active"></img>
                    </a>
                </figure>
                <div class="content">
                    <p>{body}</p>
                </div>
                <aside class="vote">
                                    <button class = "vote_up" onClick={handleLike.bind(this,comment_id)} type="submit" title="Favorite" aria-label="Favorite" data-action="subject#vote">
                                        <span data-subject-target="favCounter">{likes}</span> <span><i
                                                class="fa-solid fa-arrow-up"></i></span>
                                    </button>
                                    <button class ="vote_down" onClick={handleDislike.bind(this,comment_id)} type="submit" title="Reduce" aria-label="Reduce" data-action="subject#vote">
                                        <span data-subject-target="downvoteCounter">{dislikes}</span> <span><i
                                                class="fa-solid fa-arrow-down"></i></span>
                                    </button>   
                            </aside> 

                <footer>
                    <menu>
                    <li>
                     <a class="stretched-link" data-action="subject#getForm" onClick={(e)=>{setOpened(!opened)}}>reply </a>
                     </li>
                     <li>
                    <a class=" stretched-link" type="submit" data-action="subject#favourite" onClick={handleBoost.bind(this,comment_id)}>
                    boost  <span class="" data-subject-target="upvoteCounter">({boosts})</span></a>
                    </li>

                        </menu>
                        <div data-subject-target="container" class="js-container">
                        </div>
                </footer>
            </blockquote> 
            <div id ="reply-box">
            {!opened ? null : <InputBox handleMakeComment={handleReply}
            father_id={comment_id}/> }
            </div>
            <ul> {children ? listChildren: null }</ul>
        </div>
    );
}