import { useState, useEffect } from "react";
import "./PostEditor.css";
import TagInput from "../TagInput/TagInput";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import SubmitModal from "../SubmitModal/SubmitModal";

function initialFormData() {
  const savedFormData = localStorage.getItem("postEditorFormData");
  console.log(savedFormData);
  return savedFormData
    ? JSON.parse(savedFormData)
    : {
        title: "",
        content: "",
        tags: [],
        category: "general",
        isPublished: false,
        date: "",
      };
}

function PostEditor() {
  const [formData, setFormData] = useState(initialFormData());

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const stringFormData = JSON.stringify(formData);
    localStorage.setItem("postEditorFormData", stringFormData);
  }, [formData]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

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
      //log form data
      console.log("Form submitted:", formData);
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
      console.log("Form submitted:", formData);
    }
  };

  const handleClick = (e) => {
    console.log("in handle click");
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
          <label htmlFor="content">Content</label>
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
        <button type="submit" onClick={handleClick} className="submit-button">
          {formData.isPublished ? "Publish Post" : "Save Draft"}
        </button>
      </form>

      <div id="modalContainer">
        {/* <SubmitModal
          showModal={showModal}
          formData={formData}
          Close={handleCloseModal}
          Submit={handleSubmit}
        /> */}
        {showModal &&
          SubmitModal(
            showModal,
            formData,
            handleCloseModal,
            handleSubmitPreview
          )}
      </div>
    </>
  );
}

export default PostEditor;

{
  /* {showModal && Modal(showModal, setShowModal)} */
}
{
  /* SubmitModal(showModal, formData, handleCloseModal, handleClick)} */
}
