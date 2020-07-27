import React from "react";
import { CopyRight, Text } from "./styles";

export default function () {
  return (
    <footer>
      <div id="main-footer">
        <div>
          <ul>
            <li>
              <span>ABOUT</span>
            </li>
            <li>
              <span>HELP</span>
            </li>
            <li>
              <span>PRESS</span>
            </li>
            <li>
              <span>API</span>
            </li>
            <li>
              <span>JOBS</span>
            </li>
            <li>
              <span>PRIVACY</span>
            </li>
            <li>
              <span>LOCATIONS</span>
            </li>
            <li>
              <span>TOP ACCOUNTS</span>
            </li>
            <li>
              <span>HASHTAGS</span>
            </li>
            <li>
              <span>LANGUAGE</span>
            </li>
          </ul>
        </div>
        <CopyRight>
          <Text>© 2020 INSTAGRAM FROM [Nguyễn Quang Huy, Phan Việt Tân]</Text>
        </CopyRight>
      </div>
    </footer>
  );
}
