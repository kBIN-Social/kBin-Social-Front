import React, { useState, useEffect } from "react";
import InputBox from "./InputBox";

export default function Comment(props) {
    const { comment_id, author_id, author, body, created_at, likes, dislikes, boosts, level, children: initialChildren } = props;
    const { handleLike, handleDislike, handleBoost, handleReply, handleMakeComment,handleDelete } = props;
    
    const [opened, setOpened] = useState(false);
    const [children, setChildren] = useState(initialChildren);

    useEffect(() => {
        setChildren(initialChildren);
    }, [initialChildren]);

    const hasChildren = children && children.length > 0;

    const listChildren = hasChildren && children.map((commentInfo) => {
        return (
            <li key={commentInfo.id}>
                <Comment
                    comment_id={commentInfo.id}
                    author_id={commentInfo.user_id}
                    username  = {commentInfo.username}
                    author={commentInfo.username}
                    body={commentInfo.body}
                    created_at={commentInfo.created_at}
                    avatar={commentInfo.avatar} // assuming userDetails has an avatar field
                    likes={commentInfo.likes.length}
                    dislikes={commentInfo.dislikes.length}
                    boosts={commentInfo.boosts.length}
                    level={level + 1}
                    children={commentInfo.children}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    handleBoost={handleBoost}
                    handleReply={handleMakeComment}
                    handleDelete  = {handleDelete}
                />
            </li>
        );
    });

    return (
        <div>
            <blockquote className={`section comment entry-comment subject comment-level--${level}`} id={`entry-comment-${comment_id}`} data-controller="comment subject mentions" data-subject-parent-value="" data-action="">
                <header>
                    <a href={`/Profile/${author_id}`} data-action="mouseover->mentions#user_popup mouseout->mentions#user_popup_out" data-mentions-username-param="Norgur" className="user-inline" title={`@${author}@kbin.social`}>
                        {author}
                    </a>,
                    <time className="timeago" title={created_at} dateTime={created_at}>9 minutes ago</time>
                </header>
                <figure>
                    <a data-action="mouseover->mentions#user_popup mouseout->mentions#user_popup_out" data-mentions-username-param="Norgur" href={`/Profile/${author_id}`}>
                        <img width="40" height="40" src={`${props.avatar}`} aria-expanded="true" className="popover-control--active"></img>
                    </a>
                </figure>
                <div className="content">
                    <p>{body}</p>
                </div>
                <aside className="vote">
                    <button className="vote_up" onClick={(e) => {e.stopPropagation();handleLike(comment_id)}} type="submit" title="Favorite" aria-label="Favorite" data-action="subject#vote">
                        <span data-subject-target="favCounter">{likes}</span> <span><i className="fa-solid fa-arrow-up"></i></span>
                    </button>
                    <button className="vote_down" onClick={(e) => {e.stopPropagation();handleDislike(comment_id)}} type="submit" title="Reduce" aria-label="Reduce" data-action="subject#vote">
                        <span data-subject-target="downvoteCounter">{dislikes}</span> <span><i className="fa-solid fa-arrow-down"></i></span>
                    </button>
                </aside>
                <footer>
                    <menu>
                        <li>
                            <a className="stretched-link" data-action="subject#getForm" onClick={(e) => {e.stopPropagation();setOpened(!opened)}}>reply</a>
                        </li>
                        <li>
                            <a className="stretched-link" type="submit" data-action="subject#favourite" onClick={(e) => {e.stopPropagation();handleBoost(comment_id)}}>
                                boost <span className="" data-subject-target="upvoteCounter">({boosts})</span>
                            </a>
                        </li>
                        <li>
                            <a className="stretched-link" type="submit" data-action="subject#favourite" onClick={(e) => {e.stopPropagation();handleDelete(this,comment_id)}}>
                                update 
                            </a>
                        </li>
                        <li>
                            <a className="stretched-link" type="submit" data-action="subject#favourite" onClick={(e) => {e.stopPropagation();handleDelete(comment_id)}}>
                                delete  
                            </a>
                        </li>
                        
                    </menu>
                    <div data-subject-target="container" className="js-container"></div>
                </footer>
            </blockquote>
            <div id="reply-box">
                {!opened ? null : <InputBox handleMakeComment={handleReply} father_id={comment_id} />}
            </div>
            {hasChildren ? <ul>{listChildren}</ul> : null}
        </div>
    );
}
