"""Render the lesson with a local Kokoro neural voice and exact sentence cues.

Run with .local/voice-env/Scripts/python.exe after installing requirements-voice.txt.
Model files live under ignored .local/voice-model; lesson text never leaves this PC.
"""

import json
import re
from pathlib import Path

import numpy as np
import onnxruntime as ort
import soundfile as sf
from kokoro_onnx import Kokoro


ROOT = Path(__file__).resolve().parents[2]
WORK = ROOT / ".local/ict-video"
MODEL = ROOT / ".local/voice-model"
STORY = json.loads((ROOT / "src/lib/ict-introduction.json").read_text(encoding="utf-8"))
VOICE = "af_heart"


def render(kokoro, speed):
    scenes = []
    for scene in STORY["scenes"]:
        chunks = []
        cues = []
        cursor = 0
        sentences = re.findall(r"[^.!?]+[.!?]+|[^.!?]+$", scene["narration"])
        for sentence in sentences:
            text = sentence.strip()
            samples, rate = kokoro.create(text, voice=VOICE, speed=speed, lang="en-us")
            # Remove excess generator silence, preserving a little breath space.
            audible = np.flatnonzero(np.abs(samples) > 0.002)
            if len(audible):
                start = max(0, int(audible[0]) - int(rate * 0.035))
                end = min(len(samples), int(audible[-1]) + int(rate * 0.12))
                samples = samples[start:end]
            cues.append({"start": cursor / rate, "end": (cursor + len(samples)) / rate, "text": text})
            pause = np.zeros(int(rate * 0.18), dtype=np.float32)
            chunks.extend([samples, pause])
            cursor += len(samples) + len(pause)
        audio = np.concatenate(chunks)
        peak = np.max(np.abs(audio))
        if peak > 0:
            audio = audio * (0.85 / peak)
        sf.write(WORK / "audio" / f"{scene['id']}.wav", audio, rate, subtype="PCM_16")
        scenes.append({"id": scene["id"], "duration": len(audio) / rate, "cues": cues})
        print(f"Neural narration: {scene['id']} ({len(audio) / rate:.2f}s)", flush=True)
    return scenes


def main():
    (WORK / "audio").mkdir(parents=True, exist_ok=True)
    options = ort.SessionOptions()
    options.intra_op_num_threads = 4
    session = ort.InferenceSession(
        str(MODEL / "kokoro-v1.0.onnx"),
        sess_options=options,
        providers=["CPUExecutionProvider"],
    )
    kokoro = Kokoro.from_session(session, str(MODEL / "voices-v1.0.bin"))
    speed = 1.0
    scenes = render(kokoro, speed)
    estimate = sum(max(8, s["duration"] + 1) for s in scenes)
    if estimate > 89:
        speed = round(estimate / 86, 3)
        print(f"Adjusting natural reading pace to {speed} to stay under 90 seconds.", flush=True)
        scenes = render(kokoro, speed)
    manifest = {"engine": "Kokoro-ONNX", "voice": VOICE, "speed": speed, "scenes": scenes}
    (WORK / "narration.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print("Saved local neural narration and sentence timings.", flush=True)


if __name__ == "__main__":
    main()
