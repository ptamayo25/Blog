import BlogPost from "../BlogPost/BlogPost";
import { posts } from "../../data/posts";
import "./SubmitModal.css";

function SubmitModal(showModal, formData) {
  console.log("show modal:", showModal);
  console.log("form data:", formData);
  if (showModal) {
    console.log("in showModal check", showModal);
    console.log("preview", formData.isPreview);
    console.log("published", formData.isPublished);
    if (formData.isPreview) {
      console.log("inside is preview");
      return (
        <div className="submitModal">
          <BlogPost
            key={posts.length + 1}
            title={formData.title}
            content={formData.content}
            author="You"
            date={formData.date}
          />
        </div>
      );
    } else if (formData.isPublished) {
      console.log("in is published");
      return (
        <div className="submitModal">
          Submission Successful! <span>X</span>
        </div>
      );
    } else {
      return (
        <div className="submitModal">
          Draft Save Successful! <span>X</span>
        </div>
      );
    }
  }
}

export default SubmitModal;
