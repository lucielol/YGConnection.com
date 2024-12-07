import React from "react";
import Layout from "../../components/Layout";
import axiosInstance from "../../axiosInstance";
import "./style.css";

const AddArtist = () => {
  const [artistName, setArtistName] = React.useState("");
  const [artistDob, setArtistDob] = React.useState("");
  const [artistDescription, setArtistDescription] = React.useState("");
  const [artistImage, setArtistImage] = React.useState(null);
  const [members, setMembers] = React.useState([
    { name: "", birthDate: "", description: "", image: null },
  ]);

  const handleImageChange = (event, setImageCallback) => {
    const file = event.target.files[0];
    if (file) {
      setImageCallback(file);
    }
  };

  const addMember = () => {
    setMembers([
      ...members,
      { name: "", birthDate: "", description: "", image: null },
    ]);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", artistName);
      formData.append("debutDate", artistDob);
      formData.append("description", artistDescription);
      if (artistImage) {
        formData.append("artistImage", artistImage);
      }

      members.forEach((member, index) => {
        formData.append(`members[${index}][name]`, member.name);
        formData.append(`members[${index}][birthDate]`, member.birthDate);
        formData.append(`members[${index}][description]`, member.description);
        if (member.image) {
          formData.append(`members[${index}][memberImage]`, member.image);
        }
      });

      await axiosInstance.post("/artist", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Artist added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add artist.");
    }
  };

  return (
    <Layout>
      <div className="main-content">
        <h2>Add Artist</h2>
        <div className="artist-section">
          {/* Artist Image */}
          <div className="artist-image">
            {artistImage ? (
              <img
                src={URL.createObjectURL(artistImage)}
                alt="Artist"
                className="uploaded-image"
              />
            ) : (
              <label htmlFor="artistImage" className="upload-label">
                +
              </label>
            )}
            <input
              id="artistImage"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setArtistImage)}
              className="hidden-input"
            />
          </div>
          {/* Artist Details */}
          <div className="artist-details">
            <input
              type="text"
              placeholder="Artist Name"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="form-input"
            />
            <input
              type="date"
              placeholder="Date of Birth Artist"
              value={artistDob}
              onChange={(e) => setArtistDob(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        {/* Artist Description */}
        <textarea
          placeholder="Artist Description"
          value={artistDescription}
          onChange={(e) => setArtistDescription(e.target.value)}
          className="artist-description"
          rows="4"
        ></textarea>

        <h2>Add Members</h2>
        {members.map((member, index) => (
          <div className="member-section" key={index}>
            {/* Member Image */}
            <div className="member-image">
              {member.image ? (
                <img
                  src={URL.createObjectURL(member.image)}
                  alt="Member"
                  className="uploaded-image"
                />
              ) : (
                <label htmlFor={`memberImage${index}`} className="upload-label">
                  +
                </label>
              )}
              <input
                id={`memberImage${index}`}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(e, (img) => {
                    const updatedMembers = [...members];
                    updatedMembers[index].image = img;
                    setMembers(updatedMembers);
                  })
                }
                className="hidden-input"
              />
            </div>
            {/* Member Details */}
            <div className="member-details">
              <input
                type="text"
                placeholder="Member Name"
                value={member.name}
                onChange={(e) =>
                  handleMemberChange(index, "name", e.target.value)
                }
                className="member-input"
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={member.birthDate}
                onChange={(e) =>
                  handleMemberChange(index, "birthDate", e.target.value)
                }
                className="member-input"
              />
              <textarea
                placeholder="Member Description"
                value={member.description}
                onChange={(e) =>
                  handleMemberChange(index, "description", e.target.value)
                }
                className="member-description"
                rows="3"
              ></textarea>
            </div>
          </div>
        ))}
        {/* Button Section */}
        <div className="button-container">
          <button className="add-member-btn" onClick={addMember}>
            Add More Member
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Add Artist
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddArtist;
