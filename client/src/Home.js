import React from "react";
import { connect } from 'react-redux';
import map from 'lodash/map';
import { postList, newPost } from './actions/PostAction';
import { Editor } from '@tinymce/tinymce-react';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import ReactPaginate from 'react-paginate';
import PostListing from "./components/PostListing";
import ASSETS_URL from './functions/assetsUrl';
import Header from "./components/Header";
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';

const _ = {
    map: map
};


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            showerrmsg: '',
            limit: 10,
            pageNum: 1
        };
        $(".modal-backdrop").remove();
    }

    componentDidMount() {
        var values = {};
        values.page = 1;
        this.props.postList(values);
    }

    componentWillUnmount() {
        $(".modal-backdrop").remove();
    }

    renderPost(post_list) {
        if (typeof post_list.data !== 'undefined') {
            return _.map(post_list.data.list, post => {
                return <PostListing post={post} />
            });
        }
    }

    handleEditorChange = (e) => {
        this.setState({ text: e.target.getContent() });
    }

    renderEditor(editor_type = '', init_data) {
        var self = this;

        return (
            <div>
                <Editor
                    apiKey='0ue6cfloqz35uaigbuxyqf1bwwhrmc5mih7cx001ua0ocarr'
                    initialValue={init_data}
                    init={{
                        plugins: 'link',
                        height: 400,
                        visual: false,
                        valid_elements: '*[*]',
                        branding: false,
                        object_resizing: false,
                        image_dimensions: false,
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | mybutton | mybutton2 | mybutton3 | mybutton4 | customfield',
                        forced_root_block: false,//It will remove p tags that are auto added by tinymce
                        setup: function (editor) {
                            self.setState({ activeEditor: editor })
                        }
                    }}
                    onChange={(e) => { this.handleEditorChange(e) }}
                />
            </div>
        );
    }

    renderField(field) {
        const { label, id, type, meta: { touched, error } } = field;
        var formclass = "form-group";
        if (field.className) {
            formclass = "form-group " + field.className;
        }
        return (
            <div className={formclass}>
                <label>{field.label}</label>
                <input type={type} id={id} className="form-control" {...field.input} />
                <div className="help-block text-danger">
                    {touched
                        ? error
                        : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        const { dispatch } = this.props

        if (this.state.text === '') {
            var errorthrough = {}, errorupload = {};
            errorupload['postcontent'] = 'Enter the content of post.';
            errorthrough._error = errorupload;
            throw new SubmissionError(errorthrough);
        }

        values.content = this.state.text;
        this.props.newPost(values, (response) => {
            if (response.status === 'success') {
                var values = {};
                values.page = 1;
                this.props.postList(values);
                if (dispatch) {
                    dispatch(reset('newpostform'));
                }

                this.setState({
                    showerrmsg: '',
                    showLoader: false,
                    text: ''
                });
                this.state.activeEditor.setContent('');
                $(".bd-example-modal-lg .close").trigger("click");
            } else {
                this.setState({
                    showerrmsg: response.message,
                    showLoader: false
                });
            }
        });
    }

    handlePageClick(page) {
        var pageNum = (page.selected + 1), limit = this.state.limit;
        this.setState({
            pageNum: pageNum
        });
        var values = {};
        values.page = pageNum;
        this.props.postList(values);
    }

    render() {
        const { handleSubmit, post_list, error } = this.props;
        if (typeof post_list === 'undefined' || typeof post_list.data === 'undefined') {
            return <div></div>
        }

        var limit = this.state.state_limit, all_customer_count = Math.ceil(post_list.data.size / this.state.limit);

        var pagination = '', pageNum = 1;

        if (all_customer_count > 1) {
            pagination = <ReactPaginate previousLabel={'«'}
                nextLabel={'»'}
                breakLabel={<small></small>}
                breakClassName={"footable-page"}
                pageCount={all_customer_count}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                initialPage={pageNum - 1}
                disableInitialCallback={true}
                onPageChange={(page) => { this.handlePageClick(page) }}
                containerClassName={"pagination overflow-auto"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                activeLinkClassName={"page-link rounded text-bodycolor p-l-20 p-r-20 p-t-5 p-b-5"}
                pageClassName={"page-item m-r-10"}
                pageLinkClassName={"page-link rounded p-l-20 p-r-20 p-t-5 p-b-5"}
                previousClassName={"page-item m-r-10"}
                previousLinkClassName={"page-link rounded p-l-20 p-r-20 p-t-5 p-b-5"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link rounded p-l-20 p-r-20 p-t-5 p-b-5"}
            />
        }

        console.log("post_list post_listpost_list", (post_list.data.list).length);
        return (
            <>
                <Header section='home' />
                <div id="content_wrapper" className="content">
                    <div className="container">
                        <div className="row flex_container">
                            { (post_list.data.list).length > 0 ?
                                <>
                                    <div className="col-md-8 sec_show_mobile">
                                        <div className="content_bar">
                                            <div className="blog-content">
                                                {this.renderPost(post_list)}
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6"></div>
                                                <div className="col-md-6 col-sm-12 d-flex justify-content-md-end justify-content-center">
                                                    {pagination}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 sec_hide_mobile">
                                    </div>
                                </>
                                :
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header p-t-15 p-b-15 bg-white">
                                            <div className="row align-items-center">
                                                <div className="col-md-6">
                                                    <h3 className="text-dark m-b-0 m-t-0">Posts</h3>
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="bg-primary2 rounded p-30 p-l-40 p-r-40">
                                                        <img className="mx-auto d-block border-0 img-fluid" src={ASSETS_URL + "no-post-found.png"} />
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <h2 className="text-bodycolor m-t-0 m-b-0">No Post Found</h2>
                                                    <p className="font-14 text-secondary m-t-0">To create new post click on the button below and enter title and content.</p>
                                                    <ul className="font-14 text-secondary p-l-15">
                                                        <li className="m-b-5">Pagination will work after 10 post each page will display maximum of 10 post.</li>
                                                        <li className="m-b-5">Click on add new post button, enter titla and content for the post to enter new post</li>
                                                    </ul>
                                                    <span className="btn btn-primary font-15" style={{ 'cursor': 'pointer' }} data-toggle="modal" data-target=".bd-example-modal-lg">
                                                        <i className="fas fa-plus-circle rounded m-r-5" />
                                                        Add New Post</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            }
                        </div>
                        <div className="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">

                                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title m-t-0 text-dark" id="exampleModalLabel">Add New Post</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <Field label="Title" id="title" name="title" type="text" component={this.renderField} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Post Content</label>
                                                    <div className="text-editor">
                                                        {this.renderEditor()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            {this.state.showerrmsg !== '' ? <p className="text-danger m-l-5 w-100 text-right">{this.state.showerrmsg}</p> : ''}
                                            {typeof error !== 'undefined' && error.postcontent !== 'undefined' && error.postcontent !== '' ?
                                                <p className="text-danger m-l-5 w-100 text-right">{error.postcontent}</p>
                                                : ''}
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                            <button type="submit" className="btn btn-primary">Save Post</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
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
    }
}

function validate(values) {
    const errors = {};
    if (!values.title) {
        errors.title = "Enter a title for post";
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'newpostform'
}, function (dispatch) {
    return {
        dispatch: dispatch
    }
})(connect(mapStateToProps, { postList, newPost })(Home));
