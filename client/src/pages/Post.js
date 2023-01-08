import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
    let { id } = useParams();
    const [postObject, setPostObJect] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObJect(response.data);
        });
    }, []);

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title"> {postObject.title}</div>
                    <div className="body"> {postObject.postText}</div>
                    <div className="footer"> {postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">Comment Sectio</div>
        </div>
    );
}

export default Post;
