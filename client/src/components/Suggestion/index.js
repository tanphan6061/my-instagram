import React from "react";

import SuggestionItem from "../SuggestionItem";

const pointer = {
  cusor: "pointer",
};

export default function () {
  return (
    <div className="sidebar-homepage">
      <div className="info d-flex align-items-center" style={pointer}>
        <div className="avatar" style={{ width: "20%" }}>
          <img
            alt="avatar"
            src="https://instagram.fadb2-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fadb2-1.fna.fbcdn.net&_nc_ohc=fTIyv_ZY0jwAX8cU6Yd&oh=06aab4528829f4aece14ee52bf5416a8&oe=5F3B398F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2"
          />
        </div>
        <div className="name" style={{ marginLeft: "15px" }}>
          <p style={{ fontSize: "14px", fontWeight: 500 }}>qnguyenhuy1999</p>
          <p style={{ fontSize: "12px", color: "#8e8e8e" }}>Nguyễn Quang Huy</p>
        </div>
      </div>
      <div className="suggestions mt-4">
        <div className="d-flex justify-content-between">
          <p style={{ color: "#8e8e8e" }}>Suggestions For You</p>
          <p style={{ fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
            See all
          </p>
        </div>

        <SuggestionItem />
        <SuggestionItem />
        <SuggestionItem />
      </div>
    </div>
  );
}
