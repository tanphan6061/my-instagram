import React from "react";

export default function () {
  return (
    <div className="suggest-item d-flex justify-content-between align-items-center mt-3">
      <div className="info d-flex align-items-center">
        <div className="avatar">
          <img
            alt="avatar"
            src="https://instagram.fhan5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/16465429_553607288175748_347144476910682112_a.jpg?_nc_ht=instagram.fhan5-1.fna.fbcdn.net&_nc_ohc=5S0DWX3BsqAAX_YRJ9l&oh=d8e4f892a830ba25fed14f0c07709984&oe=5F3D3586"
          />
        </div>
        <p style={{ fontSize: "14px", fontWeight: 500, marginLeft: "10px" }}>
          phanviettan1606
        </p>
      </div>
      <div
        style={{
          color: "#0095f6",
          fontSize: "14px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Follow
      </div>
    </div>
  );
}
