import React, { useEffect, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';
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
    const [threadInfo, setThreadInfo] = useState(null);
    const [counter, setCounter] = useState(0);
    const deployUrl = "https://asw-kbin.azurewebsites.net";

    useEffect(() => {
        const fetchCommentData = async () => {
            try {
                console.log("fetching threads...");
                const thread = await getThreadData(id);
                setThreadInfo(thread);
                const commentsData = await getCommentsData(token, id);
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments or user data:', error);
            }
        };

        fetchCommentData();
    }, [token, id, counter]);

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

    async function getThreadData(id) {
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

    async function handleMakeComment(text, fatherId) {
        const url = !fatherId
            ? `${deployUrl}/api/v1/threads/${id}/comments`
            : `${deployUrl}/api/v1/comments/${fatherId}/reply`;
        const body = { body: text,
                      author: user.id,
                      father: fatherId
                    };
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
            const idMatch = data.message.match(/comment with id (\d+) created successfully/);
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
                } else {
                    setComments(prevComments => [newComment, ...prevComments]);
                }
            }
        }
    }

    function addChildComment(parentId, newComment) {
        setComments(prevComments => 
            prevComments.map(comment => 
                comment.id === parentId 
                    ? { ...comment, children: [...comment.children, newComment] }
                    : comment
            )
        );
    }

    if (threadInfo === null) return <div>Loading...</div>;
    if (!threadInfo) return redirect("NotFound404");

    return (
        <div id="thread_detail">
            <Header />
            <ThreadTemplate thread={threadInfo} updateThread={counter}/> 
            <InputBox actionName={'add comment'} action={handleMakeComment}/>
            {comments.length ? <ListComments commentsData={comments} /> : <div>Loading...</div>}
        </div>
    );
}
