import React from 'react'
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        var section = this.props.section;
        return (
            <div className="top-header sticky p-t-10 p-b-10">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <h1 className="single-blog-title"><Link to={`/`}>POSTAPP</Link></h1>
                        </div>
                        <div className="col-md-7 text-right">
                            {section === 'single' ?
                                <Link to={`/`} className="add-new-post cursor-pointer" style={{ 'cursor': 'pointer' }} >Go Back</Link>
                                :
                                <p className="add-new-post cursor-pointer" style={{ 'cursor': 'pointer' }} data-toggle="modal" data-target=".bd-example-modal-lg">Add New Post</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;