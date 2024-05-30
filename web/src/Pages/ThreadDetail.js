import React, { useEffect, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';
import Comment from "../Components/Comment";
import Header from '../Components/Header';
import { useToken, useUser } from '../Logic/UserContext';
import InputBox from '../Components/InputBox';
import ThreadTemplate from '../Components/ThreadTemplate';

export default function ThreadDetail() {
    const { id } = useParams();
    const user = useUser();
    const token = useToken();
    const [comments, setComments] = useState([]);
    const [threadInfo, setThreadInfo] = useState({});
    const [threadAuthor,setThreadAuthor] = useState({});
    const [forceUpdate, setForceUpdate] = useState(0);
    const localUrl = "http://127.0.0.1:8000";
    const deployUrl = "https://asw-kbin.azurewebsites.net";
    const isThread = false ;


    useEffect(() => {
        const fetchCommentData = async () => {
            try {
                console.log("token");
                console.log(token);
                console.log('Fetching thread data');
                // 1. Obtener datos del thread
                const thread = await getThreadData( id);
                console.log('Thread data:', thread);
                setThreadInfo(thread);
                console.log('Fetching thread author data');
                // 2. Obtener datos del autor del thread
                const authorInfo = await getUserDetails(thread.author, token);
                console.log('Author data:', authorInfo);
                setThreadAuthor(authorInfo);

                console.log('Fetching comments data');
                // 3. Obtener datos de los comentarios
                const commentsData = await getCommentsData(token, id);
                console.log('Comments data:', commentsData);

                // 4. Obtener detalles del autor para cada comentario
                const commentsWithUserDetails = await Promise.all(commentsData.map(async (comment) => {
                    const children = commentsData.filter(c => c.father === comment.id);
                    const userDetails = await getUserDetails(comment.author, token);
                    console.log(`User data for comment ${comment.id}:`, userDetails);
                    return {
                        ...comment,
                        children: children,
                        userId: userDetails.id,
                        username: userDetails.username,
                        avatar: userDetails.avatar,
                    };
                }));

                console.log('Comments with user details:', commentsWithUserDetails);
                // 5. Establecer los comentarios en el estado
                setComments(commentsWithUserDetails);
            } catch (error) {
                console.error('Error fetching comments or user data:', error);
            }
        };

        fetchCommentData();
    }, [token, id,forceUpdate]);
    
    async function getCommentsData(token, id) {
        const endPoint = `${deployUrl}/api/v1/threads/${id}/comments`;
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error fetching comments data');
        }
        return response.json();
    }

    async function getThreadData() {
        const endPoint = `${deployUrl}/api/v1/threads/${id}`;
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error fetching thread');
        }
        return response.json();
    }

    async function getUserDetails(userId, token) {
        const endPoint = `${deployUrl}/api/v1/profile/${userId}`;
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error fetching user data');
        }
        return response.json();
    }
    const updateThread = (threadInfo) => {
        setForceUpdate(prev => prev + 1);
      };
    async function remove(commentId) {
        await fetch(`${deployUrl}/api/v1/comments/${commentId}/vote/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
    }

    async function like(commentId) {
        await fetch(`${deployUrl}/api/v1/comments/${commentId}/vote/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
    }

    async function handleLike(commentId) {
        try {
            let state = -1;
            setComments(comments.map((comment) => {
                if (comment.id === commentId) {
                    let user_id = 2;
                    for (let i = 0; i < comment.dislikes.length; ++i) {
                        if (comment.dislikes[i] === user_id) {
                            comment.dislikes.splice(i, 1);
                            comment.likes.push(user_id);
                            state = 2;
                            return { ...comment };
                        }
                    }
                    if (comment.likes.length === 0) {
                        comment.likes.push(user_id);
                        state = 0;
                        return { ...comment };
                    } else {
                        for (let i = 0; i < comment.likes.length; ++i) {
                            if (comment.likes[i] === user_id) {
                                state = 1;
                                comment.likes.splice(i, 1);
                                return { ...comment };
                            }
                        }
                        comment.likes.push(user_id);
                        state = 0;
                        return { ...comment };
                    }
                }
                return { ...comment };
            }));
            if (state == 0) await like(commentId);
            else if (state == 1) await remove(commentId);
            else if (state == 2) {
                await remove(commentId);
                await like(commentId);
            }
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    }

    async function handleDislike(commentId) {
        console.log("dislike: " + commentId);
    }

    async function dislike(commentId) {
        await fetch(`${deployUrl}/api/v1/comments/${commentId}/vote/dislike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
    }

    async function handleDislike(commentId) {
        try {
            let state = -1;
            setComments(comments.map((comment) => {
                if (comment.id === commentId) {
                    let user_id = 2;
                    for (let i = 0; i < comment.likes.length; ++i) {
                        if (comment.likes[i] === user_id) {
                            state = 2;
                            comment.likes.splice(i, 1);
                            comment.dislikes.push(user_id);
                            return { ...comment };
                        }
                    }
                    if (comment.dislikes.length === 0) {
                        comment.dislikes.push(user_id);
                        state = 0;
                        return { ...comment };
                    } else {
                        for (let i = 0; i < comment.dislikes.length; ++i) {
                            if (comment.dislikes[i] === user_id) {
                                state = 1;
                                comment.dislikes.splice(i, 1);
                                return { ...comment };
                            }
                        }
                        comment.dislikes.push(user_id);
                        state = 0;
                        return { ...comment };
                    }
                }
                return { ...comment };
            }));
            if (state == 0) await dislike(commentId);
            else if (state == 1) await remove(commentId);
            else if (state == 2) {
                await remove(commentId);
                await dislike(commentId);
            }
        } catch (error) {
            console.error('Error disliking comment:', error);
        }
    }

    async function boost(commentId) {
        await fetch(`${deployUrl}/api/v1/comments/${commentId}/boost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
    }

    async function unboost(commentId) {
        await fetch(`${deployUrl}/api/v1/comments/${commentId}/unboost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
    }

    async function handleBoost(commentId) {
        let doBoost = true;
        const userId = 2;
        setComments(comments.map((comment) => {
            if (comment.id === commentId) {
                if (comment.boosts.length === 0) {
                    doBoost = true;
                    comment.boosts.push(userId);
                    return { ...comment };
                }
                for (let i = 0; i < comment.boosts.length; ++i) {
                    if (userId === comment.boosts[i]) {
                        doBoost = false;
                        comment.boosts.splice(i, 1);
                        return { ...comment };
                    }
                }
                doBoost = true;
                comment.boosts.push(userId);
                return { ...comment };
            }
            return comment;
        }));
        const response = doBoost ? await boost(commentId) : await unboost(commentId);
    }

    function addChildComment(parentId, newComment) {
            setComments(comments.map((comment) => {
                if(comment.id = parentId) {
                    comment.children.push(newComment);
                }
                return {...comment}
        })) ;

           
    }

    async function handleMakeComment(text, fatherId) {
        const url = !fatherId
            ? `${deployUrl}/api/v1/threads/${id}/comments`
            : `${deployUrl}/api/v1/comments/${fatherId}/reply`;
        const body = { body: text };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            const message = data.message;
            const idMatch = data.message.match(/comment with id (\d+) created succesfully/);
            if (idMatch) {
                const newCommentId = parseInt(idMatch[1], 10);
                const newComment = {
                    id: newCommentId,
                    userId: user.id,
                    username: user.username,
                    avatar: user.avatar,
                    thread: id,
                    father: fatherId,
                    body: text,
                    likes: [],
                    dislikes: [],
                    boosts: [],
                    children: []
                };
                if (fatherId) {
                    addChildComment(fatherId, newComment);
                } 
                setComments([newComment, ...comments]);
                }
            }
        }
   async  function handleDeleteComment(commentId) {
        const url = `${deployUrl}/api/v1/comments`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            credentials: 'include'
        });
        if(response.status == 401) {
            window.alert("You are not the author of this comment!");
        }
        else if(response.ok) {
            const deleteCommentAndChildren = (comments, commentId) => {
                return comments.reduce((result, comment) => {
                    if (comment.id !== commentId) {
                        if (comment.children) {
                            comment.children = deleteCommentAndChildren(comment.children, commentId);
                        }
                        result.push(comment);
                    }
                    return result;
                }, []);
            };
            setComments(comments => deleteCommentAndChildren(comments, commentId));
        }
   }

    function hasChildren(children = []) {
        return children.length > 0 ;
    }


    const renderComments = (commentList) => {
        return commentList.map((commentInfo) => (
            hasChildren(commentInfo.children) ? 
                <li key={commentInfo.id}>
                    <Comment
                        comment_id={commentInfo.id}
                        author_id={commentInfo.userId}
                        author={commentInfo.username}
                        body={commentInfo.body}
                        created_at={commentInfo.created_at}
                        avatar={commentInfo.avatar}
                        likes={commentInfo.likes.length}
                        dislikes={commentInfo.dislikes.length}
                        boosts={commentInfo.boosts.length}
                        level={1}
                        children={commentInfo.children}
                        handleLike={handleLike}
                        handleDislike={handleDislike}
                        handleBoost={handleBoost}
                        handleReply={handleMakeComment}
                        handleDelete = {handleDeleteComment}
                    />
                </li>
                :
                null 
            ));
        };

    if (threadInfo == null) return redirect("NotFound404");
    return (
        <div id="thread_detail">
            <Header />
            <ThreadTemplate thread={threadInfo} user={threadAuthor} updateThread={updateThread}/>
            <InputBox handleMakeComment={handleMakeComment} />
            {comments.length ?
                <section id="comments" className="comments entry-comments comments-tree show-comment-avatar" data-controller="subject-list comments-wrap" data-action="notifications:EntryCommentCreatedNotification@window->subject-list#increaseCounter">
                    <ul>
                        {renderComments(comments)}
                    </ul>
                </section> :
                <div>Loading...</div>}
        </div>
    );
}
