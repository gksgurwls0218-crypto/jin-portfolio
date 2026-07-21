"use client";

import { useEffect, useRef, useState } from "react";

const SPEEDS = [0.5, 1, 1.5, 2] as const;
type CaptionLang = "off" | "en";
type SizeMode = "normal" | "large";
type SettingsView = "main" | "captions" | "speed" | "size";

function applyRate(video: HTMLVideoElement, rate: number) {
  video.playbackRate = rate;
  type VideoWithPitch = HTMLVideoElement & {
    preservesPitch?: boolean;
    mozPreservesPitch?: boolean;
    webkitPreservesPitch?: boolean;
  };
  const v = video as VideoWithPitch;
  v.preservesPitch = false;
  v.mozPreservesPitch = false;
  v.webkitPreservesPitch = false;
}

function fmtTime(t: number) {
  if (!isFinite(t) || t < 0) return "0:00";
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
  return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${s}` : `${m}:${s}`;
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14 12.94a7.14 7.14 0 0 0 .06-.94 7.14 7.14 0 0 0-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.03 7.03 0 0 0-1.62-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.84a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.62-.06.94s.02.63.06.94L2.83 14.5a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.42.32.6.22l2.39-.96c.49.38 1.03.7 1.62.94l.36 2.54c.05.24.26.42.5.42h3.84c.24 0 .45-.18.5-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.24.1.47.02.6-.22l1.92-3.32a.5.5 0 0 0-.12-.64zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7" />
    </svg>
  );
}
function FullscreenIcon({ active }: { active?: boolean }) {
  return active ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 9h-3v2h5v-5h-2zM14 5v2h3v3h2V5z" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
function Skip5Icon({ direction }: { direction: "back" | "forward" }) {
  const flip = direction === "back";
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path d="M4 9a8 8 0 1 1-1.5 6" strokeLinecap="round" />
      <path d="M2.5 4.5v4.5H7" strokeLinecap="round" strokeLinejoin="round" />
      <text
        x="13"
        y="16.5"
        fontSize="8.5"
        fill="currentColor"
        stroke="none"
        fontFamily="var(--font-mono, monospace)"
        textAnchor="middle"
        style={{ transform: flip ? "scaleX(-1)" : undefined, transformOrigin: "13px 13px" }}
      >
        5
      </text>
    </svg>
  );
}

function SettingsRow({ label, value, onClick, disabled }: { label: string; value: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-between px-4 py-3"
      style={{
        color: disabled ? "rgba(255,255,255,0.3)" : "#fff",
        cursor: disabled ? "default" : "pointer",
        background: "transparent",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
      }}
    >
      <span>{label}</span>
      <span className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
        {value}
        {!disabled && <ChevronRight />}
      </span>
    </button>
  );
}
function SettingsBack({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-4 py-3"
      style={{ color: "#fff", background: "transparent", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}
    >
      <ChevronLeft />
      <span style={{ fontWeight: 500 }}>{label}</span>
    </button>
  );
}
function SettingsOption({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-2.5"
      style={{ color: active ? "#ffffff" : "#fff", background: "transparent" }}
    >
      <span>{label}</span>
      {active && <CheckIcon />}
    </button>
  );
}

// Custom click/drag progress bar. Native <input type="range"> does not support
// click-anywhere-to-seek in Safari (only thumb dragging), which is why the seek
// bar looked "broken" — this replaces it with a pointer-event-based bar that
// works the same way in every browser.
function ProgressBar({ current, duration, onSeek }: { current: number; duration: number; onSeek: (t: number) => void }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  function timeFromEvent(clientX: number) {
    const el = barRef.current;
    if (!el || !duration) return 0;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return ratio * duration;
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    onSeek(timeFromEvent(e.clientX));
  }
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (dragging) onSeek(timeFromEvent(e.clientX));
  }
  function handlePointerUp() {
    setDragging(false);
  }

  const pct = duration ? Math.min(100, Math.max(0, (current / duration) * 100)) : 0;

  return (
    <div
      ref={barRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="flex-1 relative shrink-0"
      style={{ height: 20, display: "flex", alignItems: "center", cursor: "pointer", touchAction: "none" }}
    >
      <div style={{ position: "absolute", left: 0, right: 0, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.28)" }} />
      <div style={{ position: "absolute", left: 0, width: `${pct}%`, height: 4, borderRadius: 2, background: "#ffffff" }} />
      <div
        style={{
          position: "absolute",
          left: `calc(${pct}% - 6px)`,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#ffffff",
          boxShadow: "0 0 0 3px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}

export default function MatchVideo({
  src,
  poster,
  captionsEn,
}: {
  src: string;
  poster?: string;
  captionsEn?: string;
  captionsKo?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [captionLang, setCaptionLang] = useState<CaptionLang>(captionsEn ? "en" : "off");
  const [sizeMode, setSizeMode] = useState<SizeMode>("normal");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsView, setSettingsView] = useState<SettingsView>("main");

  const hasCaptions = Boolean(captionsEn);

  function setRate(rate: number) {
    setSpeed(rate);
    if (videoRef.current) applyRate(videoRef.current, rate);
  }

  useEffect(() => {
    if (videoRef.current) applyRate(videoRef.current, speed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the browser's native text track in sync with the chosen caption state.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    for (let i = 0; i < video.textTracks.length; i++) {
      const t = video.textTracks[i];
      t.mode = captionLang === "en" ? "showing" : "disabled";
    }
  }, [captionLang, captionsEn]);

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }

  function seekTo(t: number) {
    const v = videoRef.current;
    if (!v) return;
    const clamped = Math.min(Math.max(0, t), duration || v.duration || t);
    v.currentTime = clamped;
    setCurrent(clamped);
  }

  function skip(delta: number) {
    const v = videoRef.current;
    if (!v) return;
    seekTo((v.currentTime || 0) + delta);
  }

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  }

  return (
    <div className="px-6 md:px-10 pt-24 pb-6" style={{ background: "var(--stage)" }}>
      <div className="mx-auto" style={{ maxWidth: sizeMode === "large" ? 1280 : 1000, transition: "max-width .3s var(--ease-out)" }}>
        <div
          ref={containerRef}
          className={`relative overflow-hidden ${isFullscreen ? "" : "rounded-2xl"}`}
          style={{
            border: isFullscreen ? "none" : "0.5px solid var(--edge)",
            background: "#000",
            ...(isFullscreen
              ? { width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }
              : {}),
          }}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => {
              applyRate(e.currentTarget, speed);
              setDuration(e.currentTarget.duration);
            }}
            onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onClick={togglePlay}
            className={isFullscreen ? "block" : "w-full block"}
            style={
              isFullscreen
                ? { width: "100%", height: "100%", objectFit: "contain", background: "#000", cursor: "pointer" }
                : { maxHeight: sizeMode === "large" ? "85vh" : "70vh", width: "100%", background: "#000", cursor: "pointer" }
            }
          >
            {captionsEn ? <track kind="subtitles" src={captionsEn} srcLang="en" label="English" default /> : null}
          </video>

          {settingsOpen && (
            <div
              className="absolute rounded-xl overflow-hidden mono"
              style={{
                right: 12,
                bottom: 56,
                width: 300,
                background: "rgba(15,18,16,0.97)",
                border: "0.5px solid rgba(255,255,255,0.12)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                fontSize: 13,
                zIndex: 20,
              }}
            >
              {settingsView === "main" && (
                <>
                  <SettingsRow
                    label="Subtitles"
                    value={!hasCaptions ? "None" : captionLang === "off" ? "Off" : "English"}
                    onClick={() => setSettingsView("captions")}
                    disabled={!hasCaptions}
                  />
                  <SettingsRow label="Playback speed" value={`${speed}x${speed === 1 ? " (Normal)" : ""}`} onClick={() => setSettingsView("speed")} />
                  <SettingsRow
                    label="Screen size"
                    value={isFullscreen ? "Fullscreen" : sizeMode === "large" ? "Large" : "Normal"}
                    onClick={() => setSettingsView("size")}
                  />
                </>
              )}
              {settingsView === "captions" && (
                <>
                  <SettingsBack label="Subtitles" onClick={() => setSettingsView("main")} />
                  <SettingsOption
                    label="Off"
                    active={captionLang === "off"}
                    onClick={() => {
                      setCaptionLang("off");
                      setSettingsView("main");
                    }}
                  />
                  {captionsEn && (
                    <SettingsOption
                      label="English"
                      active={captionLang === "en"}
                      onClick={() => {
                        setCaptionLang("en");
                        setSettingsView("main");
                      }}
                    />
                  )}
                </>
              )}
              {settingsView === "speed" && (
                <>
                  <SettingsBack label="Playback speed" onClick={() => setSettingsView("main")} />
                  {SPEEDS.map((s) => (
                    <SettingsOption
                      key={s}
                      label={`${s}x${s === 1 ? " (Normal)" : ""}`}
                      active={speed === s}
                      onClick={() => {
                        setRate(s);
                        setSettingsView("main");
                      }}
                    />
                  ))}
                </>
              )}
              {settingsView === "size" && (
                <>
                  <SettingsBack label="Screen size" onClick={() => setSettingsView("main")} />
                  <SettingsOption
                    label="Normal"
                    active={sizeMode === "normal" && !isFullscreen}
                    onClick={() => {
                      setSizeMode("normal");
                      setSettingsView("main");
                    }}
                  />
                  <SettingsOption
                    label="Large"
                    active={sizeMode === "large" && !isFullscreen}
                    onClick={() => {
                      setSizeMode("large");
                      setSettingsView("main");
                    }}
                  />
                  <SettingsOption
                    label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    active={isFullscreen}
                    onClick={() => {
                      toggleFullscreen();
                      setSettingsOpen(false);
                    }}
                  />
                </>
              )}
            </div>
          )}

          <div
            className="absolute left-0 right-0 bottom-0 flex items-center gap-2.5 px-4 py-2.5"
            style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)", zIndex: 10 }}
          >
            <button onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="flex items-center justify-center shrink-0" style={{ width: 26, height: 26, color: "#fff" }}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={() => skip(-5)} aria-label="Back 5 seconds" className="flex items-center justify-center shrink-0" style={{ width: 24, height: 24, color: "#fff" }}>
              <Skip5Icon direction="back" />
            </button>
            <button onClick={() => skip(5)} aria-label="Forward 5 seconds" className="flex items-center justify-center shrink-0" style={{ width: 24, height: 24, color: "#fff" }}>
              <Skip5Icon direction="forward" />
            </button>
            <span className="mono shrink-0" style={{ fontSize: 11.5, color: "#fff" }}>
              {fmtTime(current)} / {fmtTime(duration)}
            </span>
            <ProgressBar current={current} duration={duration} onSeek={seekTo} />
            <button
              onClick={() => {
                setSettingsOpen((v) => !v);
                setSettingsView("main");
              }}
              aria-label="Settings"
              className="flex items-center justify-center shrink-0"
              style={{ width: 28, height: 28, color: settingsOpen ? "#ffffff" : "#fff" }}
            >
              <GearIcon />
            </button>
            <button onClick={toggleFullscreen} aria-label="Fullscreen" className="flex items-center justify-center shrink-0" style={{ width: 28, height: 28, color: "#fff" }}>
              <FullscreenIcon active={isFullscreen} />
            </button>
          </div>
        </div>

        {hasCaptions ? (
          <p className="mono mt-2" style={{ fontSize: 11, color: "var(--ink-4)" }}>
            Subtitles (CC) available — use the settings (gear) icon to toggle captions, playback speed, and screen size.
          </p>
        ) : null}
      </div>
    </div>
  );
}
