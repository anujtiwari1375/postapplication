import { times } from "lodash";
import moment from 'moment-timezone';
import { Link } from "react-router-dom";
import Truncate from 'react-truncate';
import React from "react";
import $ from 'jquery';

class PostListing extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { post } = this.props;

        return (
            <div className="post single-post">
                <h1 className="post-title text-center"><Link to={`/single-post/${post._id}`}>
                    {post.title}
                    </Link></h1>
                <ul className="post-meta">
                    <li className="posted-by">Posted by <a href="https://www.dealsoftheday365.com/author/sourabh/" title="Posts by sourabh" rel="author">admin</a></li>
                    <li className="posted-by">&nbsp; - {moment(post.date).format('DD MMM YYYY')}</li>
                    <li className="post-comment">&nbsp;&nbsp;0 Comments</li>
                </ul>

                <div className="post-content">
                    <Truncate lines={3} ellipsis={<span> […] </span>}>
                        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    </Truncate>
                    {/* <p>{post.content}</p> */}
                </div>
                <Link className="read-more bright-blue small" to={`/single-post/${post._id}`}>Keep Reading</Link>
                <div className="clear" />
            </div>
        );
    }
}

export default PostListing;