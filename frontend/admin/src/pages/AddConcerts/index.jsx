import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "./style.css";
import axiosInstance from "../../axiosInstance";

const AddConcerts = () => {
  const [artists, setArtists] = useState([]);
  const [formData, setFormData] = useState({
    artist: "",
    eventName: "",
    location: "",
    date: "",
    eventDescription: "",
    image: null,
  });

  // Fetch artist data
  const fetchArtists = async () => {
    try {
      const response = await axiosInstance.get("/artist");
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // Handle form input changes
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle file input for image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare FormData for file upload
    const data = new FormData();
    data.append("artist", formData.artist);
    data.append("eventName", formData.eventName);
    data.append("location", formData.location);
    data.append("date", formData.date);
    data.append("eventDescription", formData.eventDescription);
    if (formData.image) {
      data.append("concertImage", formData.image);
    }

    try {
      const response = await axiosInstance.post("/event", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Concert or Event successfully added!");
        // Reset form
        setFormData({
          artist: "",
          eventName: "",
          location: "",
          date: "",
          eventDescription: "",
          image: null,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add concert or event.");
    }
  };

  return (
    <Layout>
      <div className="main-content">
        <h2>Concert & Event Image</h2>
        <div className="concert-image">
          {formData.image ? (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Concert Preview"
              className="uploaded-image"
            />
          ) : (
            <label htmlFor="concertImage" className="upload-label">
              +
            </label>
          )}
          <input
            id="concertImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden-input"
          />
        </div>

        <h3>Add Concert or Event Details</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="artist">Artist Name</label>
                <select
                  id="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Artist</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="eventName">Concert or Event Name</label>
                <input
                  type="text"
                  id="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="Concert or Event Name"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group-full">
              <label htmlFor="eventDescription">
                Concert & Event Descriptions
              </label>
              <textarea
                id="eventDescription"
                value={formData.eventDescription}
                onChange={handleChange}
                placeholder="Concert & Event Descriptions"
                className="form-textarea"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="submit-btn">
              Add Concert or Event
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddConcerts;
