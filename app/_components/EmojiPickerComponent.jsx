"use client";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import React, { useState } from "react";

const EmojiPickerComponent = ({ children, setEmojiIcon }) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  return (
    <div>
      <div onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{children}</div>
      {openEmojiPicker && (
        <div className="absolute z-10">
          <EmojiPicker
            emojiStyle="facebook"
            className=""
            width={400}
            height={300}
            onEmojiClick={(e) => {
              setEmojiIcon(e.emoji);
              setOpenEmojiPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerComponent;
