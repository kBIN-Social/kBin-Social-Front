 export default function comment(author,body,created_at) {
    return (
        <blockquote class="section comment entry-comment subject comment-level--1" id="entry-comment-6764615" data-controller="comment subject mentions" data-subject-parent-value="" data-action="">
            <header>
                <a href='#' data-action="mouseover->mentions#user_popup mouseout->mentions#user_popup_out" data-mentions-username-param="Norgur" class="user-inline" title="@Norgur@kbin.social">
                    {author}
                </a>,
                <time class="timeago" title="2024-05-21T10:14:32+00:00" datetime={created_at} timeago-id="565">9 minutes ago</time>     
            </header>
            <figure>
                <a data-action="mouseover->mentions#user_popup mouseout->mentions#user_popup_out" data-mentions-username-param="Norgur" href="/Profile/{author}">
                <div class="no-avatar popover-control--active" aria-expanded="true"></div>
                    </a>
            </figure>
            <div class="content" style="">
                <p>{body}</p>
            </div>
            <footer>
                <menu>
                    </menu>
                    <div data-subject-target="container" class="js-container">
                    </div>
            </footer>
        </blockquote>
       
    
    
)

}