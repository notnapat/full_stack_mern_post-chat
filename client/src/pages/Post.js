import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
    let { id } = useParams();
    const [postObject, setPostObJect] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObJect(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addComment = () => {
        axios
            .post(
                "http://localhost:3001/comments",
                {
                    commentBody: newComment,
                    PostId: id,
                },
                {
                    headers: {
                        // accessToken: sessionStorage.getItem("accessToken"),
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    const commentToAdd = {
                        commentBody: newComment,
                        username: response.data.username,
                    };
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            });
    };

    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:3001/comments/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                setComments(
                    comments.filter((val) => {
                        return val.id !== id;
                    })
                );
            });
    };

    const deletePost = (id) => {
        axios
            .delete(`http://localhost:3001/posts/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                navigate("/");
            });
    };

    const editPost = (potion) => {
        if (potion === "title") {
            // prompt ("")  == น่าจะ พิมพ์อะไรลงไปใน prom นี้ จะเก็บค่า แล้ว ค่า เท่ากับตัวแปล
            let newTitle = prompt("Enter New Title:");
            axios.put(
                "http://localhost:3001/posts/title",
                {
                    newTitle: newTitle,
                    id: id,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            );
            // ใส่เพื่อ จะได้ไม่ต้อง รีเฟส เมื่อ อัพข้อมูลใหม่แล้ว , ให้ข้อมูลในอื่นๆโพสเหมือนเดิม เปลี่ยนแค่ในส่วน title
            setPostObJect({ ...postObject, title: newTitle });
        } else {
            let newPostText = prompt("Enter New Text");
            axios.put(
                "http://localhost:3001/posts/postText",
                {
                    newText: newPostText,
                    id: id,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            );
            setPostObJect({ ...postObject, postText: newPostText });
        }
    };

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div
                        className="title"
                        onClick={() => {
                            if (authState.username === postObject.username) {
                                editPost("title");
                            }
                        }}
                    >
                        {postObject.title}
                    </div>
                    <div
                        className="body"
                        onClick={() => {
                            if (authState.username === postObject.username) {
                                editPost("body");
                            }
                        }}
                    >
                        {postObject.postText}
                    </div>
                    <div className="footer">
                        {postObject.username}
                        {authState.username === postObject.username && (
                            <button
                                onClick={() => {
                                    deletePost(postObject.id);
                                }}
                            >
                                Delete Post
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input
                        type="text"
                        placeholder="Comment..."
                        autoComplete="off"
                        value={newComment}
                        onChange={(event) => {
                            setNewComment(event.target.value);
                        }}
                    />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className="comment">
                                {comment.commentBody}
                                <label>Username: {comment.username}</label>
                                {authState.username === comment.username && (
                                    <button
                                        onClick={() => {
                                            deleteComment(comment.id);
                                        }}
                                    >
                                        x
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post;
