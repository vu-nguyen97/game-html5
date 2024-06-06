import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
// https://github.com/nygardk/react-share

export default function ShareModal(props) {
  const { open, onClose } = props;

  const [isCopy, setIsCopy] = useState(false);

  const onCopy = () => {
    !isCopy && setIsCopy(true);
    navigator.clipboard.writeText(sharedUrl);
  };

  const sharedUrl = window.location.href;
  const iconSize = 38;
  const hashtag = "#funkigame";

  return (
    <Modal
      style={{ borderRadius: "10px", overflow: "hidden" }}
      title={null}
      width={420}
      centered
      open={open}
      onCancel={onClose}
      footer={null}
      maskClosable={false}
    >
      <div className="text-center">
        <div className="mt-4 mb-2 flex flex-col space-y-6">
          <div className="text-2xl font-bold">Share</div>
          <div className="flex justify-center space-x-2">
            <FacebookShareButton url={sharedUrl} hashtag={hashtag}>
              <FacebookIcon round size={iconSize} />
            </FacebookShareButton>
            <TwitterShareButton url={sharedUrl} hashtags={[hashtag]}>
              <TwitterIcon round size={iconSize} />
            </TwitterShareButton>
            <WhatsappShareButton url={sharedUrl}>
              <WhatsappIcon round size={iconSize} />
            </WhatsappShareButton>
            <LinkedinShareButton url={sharedUrl}>
              <LinkedinIcon round size={iconSize} />
            </LinkedinShareButton>
            <RedditShareButton url={sharedUrl}>
              <RedditIcon round size={iconSize} />
            </RedditShareButton>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-white">
            {sharedUrl}
          </div>
          <div
            className="bg-sky-500 hover:bg-sky-600 rounded-full text-white py-[7px] cursor-pointer"
            onClick={onCopy}
          >
            {isCopy ? "Copied!" : "Copy"}
          </div>
        </div>
      </div>
    </Modal>
  );
}
