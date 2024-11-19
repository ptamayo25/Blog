import BlogPost from "../BlogPost/BlogPost";
import "./SubmitModal.css";
import { marked } from "marked";
import DOMPurify from "dompurify";

function SubmitModal(showModal, formData, Close, Submit, SaveDraft) {
  const handleOutsideClick = (event) => {
    if (event.target.className === "modal") {
      Close();
    }
  };
  function handleSubmitClick() {
    Submit();
    Close();
  }

  function handleSaveClick() {
    SaveDraft();
    Close();
  }

  //Clean form data content and convert markdown content to html
  const sanitizedHTML = DOMPurify.sanitize(marked(formData.content || ""));

  // Create a temporary DOM elementconst
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = sanitizedHTML; // Select the first <p> tag
  const pTag = tempDiv.querySelector("p"); // Extract text content from the <p> tag
  const textContent = pTag ? pTag.textContent || pTag.innerText : "";

  //   const textContent = pTag ? pTag.textContent.replace(/\<b>|\<\/b\>/g, "") : "";

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
              title={formData.title}
              content={textContent}
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
              title={formData.title}
              content={textContent}
              author="You"
              date={formData.date}
            />
            <button onClick={handleSaveClick}>Save Draft</button>
            <button onClick={handleSubmitClick}>Publish Post</button>
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
