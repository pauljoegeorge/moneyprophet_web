import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Camera as CameraIcon, Upload } from "lucide-react";
import { PrimaryButton } from "./Button";

export default function Camera({ onCapture, disabled }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const uploadRef = useRef(null);
  const streamRef = useRef(null);
  const mounted = useRef(true);
  const requestVersion = useRef(0);
  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [photo, setPhoto] = useState(null);
  const stopCamera = () => {
    requestVersion.current += 1;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOn(false);
    setReady(false);
  };
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      requestVersion.current += 1;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);
  const startCamera = async () => {
    setError("");
    setPhoto(null);
    setReady(false);
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera unavailable. You can upload a receipt instead.");
      return;
    }
    setCameraOn(true);
    requestVersion.current += 1;
    const version = requestVersion.current;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      });
      if (
        !mounted.current ||
        version !== requestVersion.current ||
        !videoRef.current
      ) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
    } catch {
      if (mounted.current && version === requestVersion.current) {
        setError(
          "Camera unavailable. Allow camera access or upload a receipt instead.",
        );
        setCameraOn(false);
      }
    }
  };
  const capturePhoto = () => {
    const video = videoRef.current;
    canvasRef.current.width = video.videoWidth;
    canvasRef.current.height = video.videoHeight;
    canvasRef.current
      .getContext("2d")
      .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    setPhoto(canvasRef.current.toDataURL("image/jpeg"));
    stopCamera();
  };
  const uploadPhoto = (event) => {
    const file = event.target.files[0];
    uploadRef.current.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Choose a JPG, PNG, or WebP receipt image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Choose an image smaller than 10 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (mounted.current) {
        stopCamera();
        setError("");
        setPhoto(reader.result);
      }
    };
    reader.onerror = () =>
      setError("Couldn’t read the image. Try another file.");
    reader.readAsDataURL(file);
  };
  return (
    <div className="workspace-receipt-capture">
      {error && (
        <p className="workspace-field-error" role="alert">
          {error}
        </p>
      )}
      {photo ? (
        <>
          <img
            className="workspace-receipt-preview"
            src={photo}
            alt="Receipt preview"
          />
          <p className="workspace-note">
            Check that the store name and total are readable before saving.
          </p>
          <div className="workspace-page-actions">
            <PrimaryButton
              type="button"
              disabled={disabled}
              onClick={() => onCapture(photo)}
            >
              {disabled ? "Reading receipt…" : "Use this receipt"}
            </PrimaryButton>
            <button
              className="workspace-button"
              type="button"
              disabled={disabled}
              onClick={() => setPhoto(null)}
            >
              Choose another
            </button>
          </div>
        </>
      ) : (
        <>
          {!cameraOn && (
            <div className="workspace-receipt-options">
              <button
                type="button"
                className="workspace-receipt-option"
                disabled={disabled}
                onClick={startCamera}
              >
                <CameraIcon size={28} />
                <strong>Take a photo</strong>
                <span>Use your camera</span>
              </button>
              <button
                type="button"
                className="workspace-receipt-option"
                disabled={disabled}
                onClick={() => uploadRef.current.click()}
              >
                <Upload size={28} />
                <strong>Upload receipt</strong>
                <span>JPG, PNG, or WebP · up to 10 MB</span>
              </button>
            </div>
          )}
          {cameraOn && (
            <>
              <video
                ref={videoRef}
                onLoadedData={() => setReady(true)}
                autoPlay
                playsInline
                muted
              >
                <track kind="captions" />
              </video>
              <div className="workspace-page-actions">
                <PrimaryButton
                  type="button"
                  disabled={!ready || disabled}
                  onClick={capturePhoto}
                >
                  Take photo
                </PrimaryButton>
                <button
                  type="button"
                  className="workspace-button"
                  onClick={stopCamera}
                >
                  Cancel camera
                </button>
              </div>
            </>
          )}
        </>
      )}
      <input
        ref={uploadRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-label="Upload receipt image"
        onChange={uploadPhoto}
        hidden
      />
      <canvas ref={canvasRef} hidden />
    </div>
  );
}
Camera.propTypes = {
  onCapture: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
Camera.defaultProps = { disabled: false };
