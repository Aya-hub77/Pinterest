import React, {useState} from 'react'
import './CreationToolMain.css'
import { GrUploadOption } from "react-icons/gr";
import { useAxios } from '../api/axiosInstance';

const CreationToolMain = () => {

  const axiosInstance = useAxios();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image.");
    if (!tags.trim()) return alert("Please add at least one tag.");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("tags", JSON.stringify(tags.split(",").map(t => t.trim().toLowerCase())));

    try {
      setLoading(true);
      const res = await axiosInstance.post("/pin", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("Pin created:", res.data);
      alert("Pin created successfully!");
      setCaption("");
      setImage(null);
      setTags("");
    } catch (err) {
      console.error(err);
      alert("Error creating pin.");
    } finally {
      setLoading(false);
    }
  };

   return (
      <div className='creation-tool'>
        <h3>Create Pin</h3>
        <form onSubmit={handleSubmit}>
            <input type="file" id='img' name="img" hidden onChange={(e) => setImage(e.target.files[0])} />
            <label htmlFor="img" className="file-btn"><GrUploadOption className='icon' />Choose image or drag and drop here</label>
            <input type="text" name="caption" placeholder='Add a caption' value={caption} onChange={(e) => setCaption(e.target.value)}/>
            <input type="text" name="tags" placeholder="Add tags, separated by commas" value={tags} onChange={(e) => setTags(e.target.value)} />
            <button type="submit" disabled={loading}>{loading ? "Posting..." : "Post"}</button>
        </form>
      </div>
   )
}
export default CreationToolMain