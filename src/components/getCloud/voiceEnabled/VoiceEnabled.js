import { faEraser, faMagic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Draggable from "react-draggable";
import { useHistory, useLocation, useParams } from "react-router";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useFolder } from "../../../hooks/useFolder";
import AddFolderBtn from "../AddFolderBtn";
import "./voiceEnabled.css";

const VoiceEnabled = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
  const [addFolder, setAddFolder] = useState(false);
  const history = useHistory();

  function addAfolder() {
    setAddFolder(true);
  }

  function addAfile() {}

  const commands = [
    {
      command: [
        "openstaad",
        "open star",
        "open favorites",
        "go to star",
        "go to start",
        "go to favorites",
        "star",
        "start",
        "started",
        "go to favourite 30",
        "go to favourite is",
      ],
      callback: () => history.push("/stared"),
    },
    {
      command: ["open recent", "go to recent", "view recent", "recent"],
      callback: () => history.push("/recent"),
    },
    {
      command: ["open home", "go to home", "view home", "home"],
      callback: () => history.push("/home"),
    },
    {
      command: ["open profile", "go to profile", "view profile", "profile"],
      callback: () => history.push("/user"),
    },
    {
      command: ["open trash", "go to trash", "view trash", "trash"],
      callback: () => history.push("/trash"),
    },
    {
      command: [
        "open update profile",
        "go to update profile",
        "view update profile",
        "update profile",
        "update my profile",
      ],
      callback: () => history.push("/update-profile"),
    },
    {
      command: "Make a * circle please", //We use * as an argument
      callback: () => addAfolder(), //and pass that argument to our function
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {transcript}
    </Tooltip>
  );

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <>
      <div className="voiceEnabled">
        {transcript == "" ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 50, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button
              className="voice__button"
              onClick={SpeechRecognition.startListening}
              bsPrefix
            >
              <FontAwesomeIcon
                style={{ color: "white" }}
                icon={faMagic}
              ></FontAwesomeIcon>
            </Button>
          </OverlayTrigger>
        ) : (
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button
              className="voice__button"
              onClick={resetTranscript}
              bsPrefix
            >
              <FontAwesomeIcon icon={faEraser}></FontAwesomeIcon>
            </Button>
          </OverlayTrigger>
        )}

        {/* <Button onClick={SpeechRecognition.stopListening}>Stop</Button> */}
        {/* <p>{transcript}</p> */}
      </div>
    </>
  );
};
export default VoiceEnabled;
