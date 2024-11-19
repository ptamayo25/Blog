import "./PostDraft.css";
import BlogPost from "../BlogPost/BlogPost";
import { marked } from "marked";
import DOMPurify from "dompurify";

function PostDraft(formData, index, Delete, Publish) {
  const sanitizedHTML = DOMPurify.sanitize(
    marked(formData.formData.content || "")
  );

  // Create a temporary DOM elementconst
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = sanitizedHTML; // Select the first <p> tag
  const pTag = tempDiv.querySelector("p"); // Extract text content from the <p> tag
  const textContent = pTag ? pTag.textContent || pTag.innerText : "";

  //   const textContent = pTag ? pTag.textContent.replace(/\<b>|\<\/b\>/g, "") : "";

  const handleHideDraft = (e) => {
    const post = document.getElementById(`draft${index}`);
    console.log(post);
    post.style.display = none;
  };
  function handleDeleteDraft() {
    Delete;
  }
  function handlePublishDraft() {
    // console.log("Form submitted:", formData.formData);
    Publish;
  }

  return (
    <div className="draftPost">
      <BlogPost
        key={`draft${index}`}
        title={formData.formData.title}
        content={textContent}
        author="You"
        date={formData.formData.date}
      />
      <button
        className="publish"
        key={`publishButton${index}`}
        onClick={handlePublishDraft}
      >
        Publish
      </button>
      <button
        className="delete"
        key={`deleteButton${index}`}
        onClick={handleDeleteDraft}
      >
        Delete
      </button>
      <button
        className="hide"
        key={`hideButton${index}`}
        onClick={handleHideDraft}
      >
        Hide
      </button>
    </div>
  );
}

export default PostDraft;
