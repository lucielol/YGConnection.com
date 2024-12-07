import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

import axiosInstance from "../../axiosInstance";
import "./style.css";

function AdminArtist() {
  const navigate = useNavigate();

  const [artists, setArtists] = React.useState([]);

  const fetchArtists = async () => {
    try {
      const response = await axiosInstance.get("/artist");
      setArtists(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  React.useEffect(() => {
    fetchArtists();
  }, []);

  const handleArtistClick = (artistName) => {
    navigate(`/artist/${artistName}`);
  };

  return (
    <Layout>
      <div className="admin-artist-container">
        {/* Header */}
        <div className="header-section">
          <h1 className="title">Artists</h1>
          <button
            className="add-artist-btn"
            onClick={() => navigate("/addartist")}
          >
            Add Artist
          </button>
        </div>

        {/* Artist Grid */}
        <div className="artist-grid-container">
          {artists.map((artist, index) => (
            <div
              className="artist-card"
              key={index}
              onClick={() => handleArtistClick(artist.name)}
            >
              <img
                src={`http://localhost:3000/${artist.image}`}
                alt={artist.name}
                className="artist-img"
              />
              <p className="artist-name">{artist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default AdminArtist;
