import { useState, useEffect } from "react";
import "./PostEditor.css";
import TagInput from "../TagInput/TagInput";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import SubmitModal from "../SubmitModal/SubmitModal";
import PostDraft from "../PostDraft/PostDraft";

function initialFormData() {
  const savedFormData = localStorage.getItem("postEditorFormData");
  return savedFormData
    ? JSON.parse(savedFormData)
    : {
        title: "",
        content: "",
        tags: [],
        category: "general",
        isPublished: false,
        isPreview: false,
        image: null,
        date: "",
      };
}

function initialSavedDrafts() {
  const savedDrafts = localStorage.getItem("draftSaves");
  return savedDrafts ? JSON.parse(savedDrafts) : [];
}

function PostEditor() {
  const [formData, setFormData] = useState(initialFormData());

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [savedDrafts, setSavedDrafts] = useState(initialSavedDrafts());
  const [previewImage, setPreviewImage] = useState(null); // For image preview

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("postEditorFormData", JSON.stringify(formData));
  }, [formData]);

  // Save drafts to local storage whenever form submitted
  useEffect(() => {
    localStorage.setItem("draftSaves", JSON.stringify(savedDrafts));
  }, [savedDrafts]);

  const validateField = (name, value) => {
    switch (name) {
      case "title":
        return value.trim().length < 5
          ? "Title must be at least 5 characters"
          : "";
      case "content":
        return value.trim().length < 100
          ? "Content must be at least 100 characters"
          : "";
      case "tags":
        return value.length === 0 ? "At least one tag is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    setIsDirty((prev) => ({ ...prev, [name]: true }));

    if (isDirty[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleRichTextChange = (newValue) => {
    setFormData((prev) => ({ ...prev, content: newValue }));

    setIsDirty((prev) => ({ ...prev, ["content"]: true }));

    if (isDirty["content"]) {
      setErrors((prev) => ({
        ...prev,
        content: validateField("content", newValue),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSaveDraft = () => {
    //save a draft
    const draftFormData = formData;
    setSavedDrafts((prev) => [...prev, draftFormData]);
  };

  function handleDeleteDraftPost(index) {
    setSavedDrafts((prev) => prev.splice(index, 1));
  }

  function handlePublishPost(formData) {
    //log form data
    console.log("Form submitted:", formData);
    setFormData({
      title: "",
      content: "",
      tags: [],
      category: "general",
      isPublished: false,
      isPreview: false,
      date: "",
    });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update formData and generate a preview URL
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error; //if condition in line statement
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, handle submission
      //set date of post to current date at submittal time
      const today = new Date();
      formData.date = `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`;

      if (!formData.isPublished && !formData.isPreview) {
        handleSaveDraft();
      }

      if (formData.isPublished && !formData.isPreview) {
        handlePublishPost();
      }
    }
  };

  const handleSubmitPreview = (e) => {
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error; //if condition in line statement
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, handle submission

      const today = new Date();
      formData.date = `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`;
      handlePublishPost();
    }
  };

  const handleClick = (e) => {
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="post-editor">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.title ? "error" : ""}
          />
          {errors.title && (
            <span className="error-message">{errors.title}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="imageUpload">Upload an Image</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div>
              <p>Image Preview:</p>
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="content">Content *</label>
          {/* <textarea
          name="content"
          id="content"
          value={formData.content}
          onChange={handleChange}
          onBlur={handleBlur}
          rows="10"
          className={errors.content ? "error" : ""}
        /> */}
          <RichTextEditor
            name="content"
            value={formData.content}
            error={errors.content}
            onChange={handleRichTextChange}
          />
          {/* {errors.content && (
          <span className="error-message">{errors.content}</span>
        )} */}
        </div>
        <TagInput
          tags={formData.tags}
          onChange={(tags) =>
            handleChange({ target: { name: "tags", value: tags } })
          }
          onBlur={() =>
            handleBlur({ target: { name: "tags", value: formData.tags } })
          }
          error={errors.tags}
        />

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleRichTextChange}
          >
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
          </select>
        </div>
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            Publish immediately
          </label>
        </div>
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="isPreview"
              checked={formData.isPreview}
              onChange={handleChange}
            />
            Preview Post
          </label>
        </div>
        <button type="submit" className="submit-button">
          {formData.isPublished ? "Publish Post" : "Save Draft"}
        </button>
        <div id="modalContainer">
          {showModal &&
            SubmitModal(
              showModal,
              formData,
              handleCloseModal,
              handleSubmitPreview,
              handleSaveDraft
            )}
        </div>
      </form>

      <div className="draftPosts">
        <h2>Draft Posts</h2>
        {savedDrafts.length !== 0 ? (
          savedDrafts.map((draft, index) => (
            <PostDraft
              formData={draft}
              index={index}
              Delete={handleDeleteDraftPost}
              Publish={handlePublishPost}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default PostEditor;
