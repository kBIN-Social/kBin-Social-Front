import React, { useEffect, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';
import Comment from "../Components/Comment";
import Header from '../Components/Header';
import { useToken, useUser } from '../Logic/UserContext';
import InputBox from '../Components/InputBox';
import ListComments from '../Components/ListComments';
import ThreadTemplate from '../Components/ThreadTemplate';

export default function ThreadDetail() {
    const { id } = useParams();
    const user = useUser();
    const token = useToken();
    const [comments, setComments] = useState([]);
    const [threadInfo, setThreadInfo] = useState({});
    const [threadAuthor,setThreadAuthor] = useState({});
    const [counter, setCounter] = useState(0) ;
    //const [forceUpdate, setForceUpdate] = useState(0);
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
                        avatar: userDetails.avatar
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
    }, [token, id,counter]);
    
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
        function addChildComment(parentId, newComment) {
            setComments(comments.map((comment) => {
                if(comment.id == parentId) {
                    comment.children.push(newComment);
                }
                return {...comment}
        })) ;

           
    }
    if (threadInfo == null) return redirect("NotFound404");
    console.log(threadInfo);
    return (
        <div id="thread_detail">
            <Header />
            <InputBox handleMakeComment={handleMakeComment} />
            {comments.length ?
           <ListComments comments={comments}/>  : null }
        </div>
    );
}
