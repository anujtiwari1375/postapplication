import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import map from 'lodash/map';
import moment from 'moment-timezone';
import ReplyForm from "./ReplyForm";
import isExists from '../functions/isExists';
import { singlePost, newComment, listComment } from '../actions/PostAction';
import Header from "./Header";

const _ = {
    map: map
};

class SinglePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.replyFormToggle = this.replyFormToggle.bind(this);
    }

    componentDidMount() {
        var values = {};
        var post_id = this.props.match.params.id
        values.post_id = post_id;
        this.props.singlePost(values);
        this.props.listComment(values);
        this.handleInitialize(post_id);
    }

    handleInitialize(post_id) {
        const initData = {
            "comment_post_id": post_id,
        };
        this.props.initialize(initData);
    }

    renderField(field) {
        const { label, id, type, requirefield, className } = field;
        return (
            <div className={className}>
                <label htmlFor={id} >
                    {label} {requirefield === true ? <span className="text-danger">*</span> : ''}
                </label>
                <input type={type} id={id} className="form-control" placeholder={field.placeholder} {...field.input} />
                <small className="form-text text-muted">{field.help}</small>
                <small className="help-block text-danger">
                    {field.meta.touched
                        ? field.meta.error
                        : ''}
                </small>
            </div>
        );
    }

    renderTextAreaField(field) {
        return (
            <div>
                <textarea {...field.input} placeholder={field.placeholder} rows={field.rows} cols="" className={field.className} />
                <small class="form-text text-muted">{field.helptext}</small>
                <small className="help-block text-danger">
                    {field.meta.touched ? field.meta.error : ''}
                </small>
            </div>
        );
    }

    onSubmit(values) {
        const { dispatch } = this.props
        var post_id = this.props.match.params.id
        values.comment_post_id = post_id;
        values.comment_author = values.comment_author_post;
        values.comment_content = values.comment_content_post;
        this.props.newComment(values, (response) => {
            if (response.status = "success") {
                if (dispatch) {
                    dispatch(reset('commentform'));
                }
            }
            var comment_values = {};
            comment_values.post_id = post_id;
            this.props.listComment(comment_values);
        })
    }

    renderCommentBody(list_comment, comment) {
        var post_id = this.props.match.params.id;
        return (
            <div className="comment-box" key={comment._id}>
                <div className="comment-author position-relative">
                    <div className="user-icon d-inline-block">
                        <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div className="user-info d-inline-block">
                        <span className="author-name font-semi-bold">{comment.comment_author}</span>
                        <div className="comment-date font-semi-bold">{moment(comment.date).format('DD MMM YYYY HH:MM A')}</div>
                    </div>
                </div>
                <div className="comment-content">
                    {comment.comment_content}
                </div>
                <div className="comment-reply">
                    <span className="reply-button cursor-pointer font-semi-bold" onClick={() => {
                        this.replyFormToggle(list_comment, comment._id);
                    }}>Reply</span>
                    {this.state['comment' + comment._id] === true ?
                        <ReplyForm replyCallback={() => { this.replyCallback() }} comment_post_id={post_id} comment_id={comment._id} />
                        : ''}
                </div>
                {this.childCommentExists(comment._id) === true ?
                    this.renderChildComment(list_comment, comment._id)
                    : ''}
            </div>
        );
    }

    renderComment(list_comment) {
        var post_id = this.props.match.params.id
        if (typeof list_comment !== 'undefined') {
            return _.map(list_comment, comment => {
                if (comment.comment_parent_id === '') {
                    return this.renderCommentBody(list_comment, comment);
                }
            });
        }
    }

    renderChildComment(list_comment, comment_id) {
        if (typeof list_comment !== 'undefined') {
            return _.map(list_comment, comment => {
                if (comment.comment_parent_id === comment_id) {
                    return this.renderCommentBody(list_comment, comment);
                }
            });
        }
    }

    childCommentExists(comment_id) {
        var list_comment = this.props.list_comment;
        return list_comment.some(function (el) {
            return el.comment_parent_id === comment_id;
        });
    }

    replyCallback() {
        var list_comment = this.props.list_comment;
        // Hide all comment form
        _.map(list_comment, comment => {
            this.setState({
                ['comment' + comment._id]: false
            });
        });
        var values = {};
        var post_id = this.props.match.params.id
        values.post_id = post_id;
        this.props.listComment(values);
    }

    replyFormToggle(list_comment, comment_id) {

        // hide all comment for accept whose reply button clicked
        _.map(list_comment, comment => {
            if (comment._id !== comment_id) {
                this.setState({
                    ['comment' + comment._id]: false
                });
            }
        });
        this.setState(prevState => ({
            ['comment' + comment_id]: !prevState['comment' + comment_id]
        }));

    }

    render() {
        var { single_post, handleSubmit, list_comment } = this.props;
        if (!isExists(single_post) || !isExists(single_post.data)) {
            return <div></div>
        }
        if (!isExists(list_comment)) {
            return <div></div>
        }
        single_post = single_post.data;


        return (
            <>
                <Header section='single' />
                <div id="content_wrapper" className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                <div className="content_bar">
                                    <div className="blog-content">
                                        <div className="post single-post">
                                            <div>
                                                <h1 className="post-title text-center">{single_post.title}</h1>
                                                <ul className="post-meta">
                                                    <li className="posted-by">- Posted by Admin</li>
                                                    <li className="posted-by"> - {moment(single_post.date).format('DD MMM YYYY')}</li>
                                                </ul>
                                                <div className="post-content" dangerouslySetInnerHTML={{ __html: single_post.content }}></div>
                                            </div>

                                            {/* Comment Form Start */}
                                            <div id="comment-form-wrapper">
                                                {/*<h3 id="comments"></h3>*/}
                                                <div id="comment-form">
                                                    <div id="respond" className="rounded">
                                                        <h2 className="comments-heading"><span>Comments and Responses</span></h2>

                                                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                                            <div className="form-row">
                                                                <Field className="form-group col-md-9" placeholder="Name" id="comment_author" name="comment_author_post" type="text" component={this.renderField} />
                                                            </div>
                                                            <div className="form-row">
                                                                <div className="form-group col-md-9">
                                                                    {/* <label> Comment*</label> */}
                                                                    <Field
                                                                        name="comment_content_post"
                                                                        placeholder="Comment"
                                                                        className="form-control"
                                                                        rows={3}
                                                                        component={this.renderTextAreaField}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <input className="btn btn-dark p-l-15 p-r-15" name="submit" type="submit" id="commentSubmit" tabIndex={5} defaultValue="Submit Comment" />
                                                            {/* <Field name="comment_post_id" component="input" type="hidden" />
                                                            <Field name="comment_parent_id" component="input" type="hidden" /> */}
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Comment Form Ends */}

                                            {/* Comment List Start */}
                                            <div className="comments-wrapper">
                                                <div className="row">
                                                    <div className="col-md-9">
                                                        {this.renderComment(list_comment)}
                                                    </div>
                                                    <div className="col-md-3">
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Comment List End */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    const { post } = state;
    return {
        post_list: post.post_list,
        single_post: post.single_post,
        list_comment: post.list_comment,
    }
}

function validate(values) {
    const errors = {};
    if (!values.comment_author_post) {
        errors.comment_author_post = "Enter your name";
    }
    if (!values.comment_content_post) {
        errors.comment_content_post = "Enter your comment";
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'commentform'
}, function (dispatch) {
    return {
        dispatch: dispatch
    }
})(connect(mapStateToProps, { singlePost, newComment, listComment })(SinglePost));
