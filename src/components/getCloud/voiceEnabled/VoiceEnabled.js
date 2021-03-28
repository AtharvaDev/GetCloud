import React from 'react'
import { Button } from 'react-bootstrap'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const VoiceEnabled = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
      <Button onClick={SpeechRecognition.startListening}>Start</Button>
      <Button onClick={SpeechRecognition.stopListening}>Stop</Button>
      <Button onClick={resetTranscript}>Reset</Button>
      <p>{transcript}</p>
    </div>
  )
}
export default VoiceEnabled