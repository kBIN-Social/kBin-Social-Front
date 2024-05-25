 import React from "react"
 export default function comment(props) {
    const {comment_id,author_id,author,body,created_at,likes,dislikes,handleLike,handleDislike} = props ;
    return (
        <blockquote class="section comment entry-comment subject comment-level--1" id="entry-comment-6764615" data-controller="comment subject mentions" data-subject-parent-value="" data-action="">
            <header>
                <a href= {`/Profile/${author_id}`} data-action="mouseover->mentions#user_popup mouseout->mentions#user_popup_out" data-mentions-username-param="Norgur" class="user-inline" title="@Norgur@kbin.social">
                    {author}
                </a>,
                <time class="timeago" title="2024-05-21T10:14:32+00:00" datetime={created_at} timeago-id="565">9 minutes ago</time>     
            </header>
            <figure>
                <a data-action="mouseover->mentions#user_popup mouseout->mentions#user_popup_out" data-mentions-username-param="Norgur" href="/Profile/{author_id}">
                <div class="no-avatar popover-control--active" aria-expanded="true"></div>
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
                    </menu>
                    <div data-subject-target="container" class="js-container">
                    </div>
            </footer>
        </blockquote>
       
    
    
)

}