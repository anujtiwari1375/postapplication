import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { newComment } from '../actions/CommentAction';

class ReplyForm extends React.Component {

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
        this.props.newComment(values, (response) => {
            if (response.status = "success") {
                if (dispatch) {
                    dispatch(reset('commentreplyform'));
                    this.props.replyCallback();
                }
            }
        })
    }

    componentDidMount() {
        var comment_id = this.props.comment_id;
        var comment_post_id = this.props.comment_post_id;
        const initData = {
            "comment_parent_id": comment_id,
            "comment_post_id": comment_post_id,
        };
        this.handleInitialize(initData);

    }

    handleInitialize(initData) {
        this.props.initialize(initData);
    }

    render() {
        var { handleSubmit } = this.props;
        return (
            <>
                {/* Comment Form Start */}
                < div id="comment-form-wrapper" >
                    {/*<h3 id="comments"></h3>*/}
                    < div id="comment-form" >
                        <div id="respond" className="rounded">
                            <h2 className="comments-heading"><span>Comments and Responses</span></h2>

                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <div className="form-row">
                                    <Field className="form-group col-md-9" placeholder="Name" id={`commentauthor`} name={`comment_author`} type="text" component={this.renderField} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-9">
                                        {/* <label> Comment*</label> */}
                                        <Field
                                            // name="comment_content"
                                            name={`comment_content`}
                                            placeholder="Comment"
                                            className="form-control"
                                            rows={3}
                                            component={this.renderTextAreaField}
                                        />
                                    </div>
                                </div>
                                <input className="btn btn-dark p-l-15 p-r-15" name="submit" type="submit" id="commentSubmit" tabIndex={5} defaultValue="Submit Comment" />
                                <Field name="comment_post_id" component="input" type="hidden" />
                                <Field name="comment_parent_id" component="input" type="hidden" />
                            </form>
                        </div>
                    </div >
                </div >
                {/* Comment Form Ends */}
            </>
        );
    }
}

function validate(values) {
    const errors = {};
    if (!values.comment_author) {
        errors.comment_author = "Enter your name";
    }
    if (!values.comment_content) {
        errors.comment_content = "Enter your comment";
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'commentreplyform'
}, function (dispatch) {
    return {
        dispatch: dispatch
    }
})(connect(null, { newComment })(ReplyForm))
