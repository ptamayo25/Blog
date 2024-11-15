import BlogPost from "../BlogPost/BlogPost";
import { posts } from "../../data/posts";
import "./SubmitModal.css";

function SubmitModal(showModal, formData, Close, Submit) {
  const handleOutsideClick = (event) => {
    if (event.target.className === "modal") {
      Close();
    }
  };
  function handleClick() {
    Submit();
    Close();
  }

  if (showModal) {
    if (formData.isPreview && formData.isPublished) {
      return (
        <div
          className="modal"
          style={{ display: showModal ? "block" : "none" }}
          onClick={handleOutsideClick}
        >
          <div className="modal-content">
            <span className="close" onClick={Close}>
              &times;
            </span>
            <h3>Post Preview View</h3>
            <BlogPost
              key={posts.length + 1}
              title={formData.title}
              content={formData.content}
              author="You"
              date={formData.date}
            />
            <button onClick={handleClick}>Publish Post</button>
          </div>
        </div>
      );
    } else if (formData.isPublished) {
      return (
        <div
          className="modal"
          style={{ display: showModal ? "block" : "none" }}
          onClick={handleOutsideClick}
        >
          <div className="modal-content">
            <span className="close" onClick={Close}>
              &times;
            </span>
            <p>Submission Successful!</p>
          </div>
        </div>
      );
    } else if (formData.isPreview) {
      return (
        <div
          className="modal"
          style={{ display: showModal ? "block" : "none" }}
          onClick={handleOutsideClick}
        >
          <div className="modal-content">
            <span className="close" onClick={Close}>
              &times;
            </span>
            <h3>Post Preview View</h3>
            <BlogPost
              key={posts.length + 1}
              title={formData.title}
              content={formData.content}
              author="You"
              date={formData.date}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="modal"
          style={{ display: showModal ? "block" : "none" }}
          onClick={handleOutsideClick}
        >
          <div className="modal-content">
            <span className="close" onClick={Close}>
              &times;
            </span>
            <p>Draft Save Successful!</p>
          </div>
        </div>
      );
    }
  }
}

export default SubmitModal;