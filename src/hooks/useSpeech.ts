import { useState, useEffect, useRef } from 'react';

// Polyfill for browsers that use webkit prefix
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const useSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const isSupported = !!SpeechRecognition && !!window.speechSynthesis;

  useEffect(() => {
    if (!isSupported) {
      console.warn('Speech recognition or synthesis is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN'; // Optimized for Indian English

    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
        if (isListening) {
            setIsListening(false);
        }
    };

    recognitionRef.current = recognition;
  }, [isSupported, isListening]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const speak = (text: string) => {
    if (!isSupported) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    speak,
    isSupported,
    setTranscript, // To allow clearing transcript from component
  };
};
