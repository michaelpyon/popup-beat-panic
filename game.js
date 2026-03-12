(() => {
  const DIFFICULTY_PRESETS = {
    easy: {
      label: "Easy",
      bpm: 78,
      sessionBeats: 88,
      judgementWindow: 0.24,
      perfectWindow: 0.09,
      greatWindow: 0.165,
      maxActivePopups: 2,
      spawnEveryBeats: 2,
      spawnChance: 1,
      extraSpawnChance: 0,
      targetBeatsAhead: 3,
      scoreMultiplier: 0.82,
    },
    normal: {
      label: "Normal",
      bpm: 92,
      sessionBeats: 96,
      judgementWindow: 0.2,
      perfectWindow: 0.07,
      greatWindow: 0.125,
      maxActivePopups: 3,
      spawnEveryBeats: 2,
      spawnChance: 1,
      extraSpawnChance: 0,
      targetBeatsAhead: 2,
      scoreMultiplier: 0.9,
    },
    hard: {
      label: "Hard",
      bpm: 108,
      sessionBeats: 128,
      judgementWindow: 0.14,
      perfectWindow: 0.04,
      greatWindow: 0.085,
      maxActivePopups: 6,
      spawnEveryBeats: 1,
      spawnChance: 1,
      extraSpawnChance: 0,
      targetBeatsAhead: 1,
      scoreMultiplier: 1,
    },
  };
  const LEADERBOARD_STORAGE_KEY = "popupBeatPanicLeaderboardV1";
  const LEADERBOARD_LIMIT = 10;
  const LEADERBOARD_HISTORY_LIMIT = 250;
  const SONG_PROGRESS_STORAGE_KEY = "popupBeatPanicSongProgressV1";
  const DEFAULT_PLAYER_TAG = "YOU";

  const SONG_THEMES = {
    classic: {
      label: "Dial-Up Dreams",
      genreLabel: "Ambient Pop",
      unlockBestScore: 0,
      unlockXp: 0,
      bpmBonus: 0,
      rhythmMode: "ambient",
      chordProgression: [
        [57, 60, 64, 67],
        [53, 57, 60, 64],
        [55, 60, 64, 67],
        [55, 59, 62, 67],
      ],
      rootProgression: [45, 41, 36, 43],
      melodyPattern: [12, null, 15, 17, 19, null, 17, 15, 12, null, 15, 19, 20, null, 19, 17],
      melodyPatternB: [12, null, 14, 15, 17, null, 19, 17, 15, null, 14, 15, 17, null, 19, 20],
      bassPattern: [0, 0, 7, 3, 0, null, 7, 3],
      hatVolume: 0.06,
      halfHatVolume: 0.038,
      kickTop: 150,
      kickBottom: 45,
      bassWave: "sawtooth",
      bassStartCutoff: 380,
      bassEndCutoff: 230,
      padWaveA: "triangle",
      padWaveB: "sine",
      padStartCutoff: 1500,
      padEndCutoff: 1100,
      pluckWaveA: "triangle",
      pluckWaveB: "sine",
      pluckStartCutoff: 2200,
      pluckEndCutoff: 850,
      delayToneHz: 2900,
      delayFeedback: 0.34,
      fxMix: 0.34,
    },
    neon: {
      label: "Neon Cache",
      genreLabel: "Synthwave Breakbeat",
      unlockBestScore: 26000,
      unlockXp: 1500,
      bpmBonus: 4,
      rhythmMode: "synthwave",
      chordProgression: [
        [60, 64, 67, 71],
        [57, 60, 64, 69],
        [55, 59, 62, 67],
        [53, 57, 60, 65],
      ],
      rootProgression: [48, 45, 43, 41],
      melodyPattern: [12, 14, null, 17, 19, 21, null, 17, 14, null, 16, 19, 21, null, 19, 17],
      melodyPatternB: [12, null, 16, 17, 19, null, 21, 24, 19, null, 17, 16, 14, null, 16, 17],
      bassPattern: [0, 7, 5, 3, 0, 7, null, 10],
      hatVolume: 0.072,
      halfHatVolume: 0.045,
      kickTop: 162,
      kickBottom: 50,
      bassWave: "square",
      bassStartCutoff: 460,
      bassEndCutoff: 290,
      padWaveA: "sawtooth",
      padWaveB: "triangle",
      padStartCutoff: 1850,
      padEndCutoff: 1250,
      pluckWaveA: "square",
      pluckWaveB: "sine",
      pluckStartCutoff: 2800,
      pluckEndCutoff: 1050,
      delayToneHz: 3600,
      delayFeedback: 0.42,
      fxMix: 0.4,
    },
    nocturne: {
      label: "Nocturne Packet",
      genreLabel: "Drum and Bass",
      unlockBestScore: 42000,
      unlockXp: 3800,
      bpmBonus: 8,
      rhythmMode: "dnb",
      chordProgression: [
        [50, 53, 57, 60],
        [48, 52, 55, 59],
        [53, 57, 60, 64],
        [55, 58, 62, 65],
      ],
      rootProgression: [38, 36, 41, 43],
      melodyPattern: [12, null, 14, null, 17, 19, null, 17, 15, null, 14, 12, null, 10, 12, null],
      melodyPatternB: [12, 14, null, 17, null, 19, 21, null, 19, 17, null, 14, null, 12, 10, null],
      bassPattern: [0, 7, 10, 7, 0, 12, 10, 7],
      hatVolume: 0.048,
      halfHatVolume: 0.03,
      kickTop: 140,
      kickBottom: 40,
      bassWave: "triangle",
      bassStartCutoff: 320,
      bassEndCutoff: 190,
      padWaveA: "sine",
      padWaveB: "triangle",
      padStartCutoff: 1250,
      padEndCutoff: 900,
      pluckWaveA: "triangle",
      pluckWaveB: "sine",
      pluckStartCutoff: 2000,
      pluckEndCutoff: 700,
      delayToneHz: 2200,
      delayFeedback: 0.28,
      fxMix: 0.28,
    },
    archive: {
      label: "Archive Pulse",
      genreLabel: "Glitch Breaks",
      unlockBestScore: 62000,
      unlockXp: 7600,
      bpmBonus: 12,
      rhythmMode: "breaks",
      chordProgression: [
        [55, 59, 62, 67],
        [57, 60, 64, 69],
        [59, 62, 67, 71],
        [52, 55, 60, 64],
      ],
      rootProgression: [43, 45, 47, 40],
      melodyPattern: [12, 15, 19, null, 17, null, 15, 12, 19, null, 20, 22, null, 20, 17, 15],
      melodyPatternB: [12, null, 19, 20, 17, null, 15, null, 22, 20, null, 19, 17, null, 15, 12],
      bassPattern: [0, null, 7, 5, 3, 7, null, 10],
      hatVolume: 0.064,
      halfHatVolume: 0.041,
      kickTop: 158,
      kickBottom: 47,
      bassWave: "sawtooth",
      bassStartCutoff: 430,
      bassEndCutoff: 260,
      padWaveA: "triangle",
      padWaveB: "sine",
      padStartCutoff: 1700,
      padEndCutoff: 1200,
      pluckWaveA: "sine",
      pluckWaveB: "square",
      pluckStartCutoff: 2500,
      pluckEndCutoff: 900,
      delayToneHz: 3300,
      delayFeedback: 0.38,
      fxMix: 0.37,
    },
  };
  const SONG_PROGRESS_ORDER = Object.keys(SONG_THEMES);

  function midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  class SongEngine {
    constructor(bpm, onBeat) {
      this.bpm = bpm;
      this.beatDuration = 60 / bpm;
      this.onBeat = onBeat;
      this.lookAheadMs = 25;
      this.scheduleAheadSec = 0.2;
      this.currentStep = 0;
      this.nextBeatTime = 0;
      this.schedulerTimer = null;
      this.pendingBeatTimers = new Set();
      this.isPaused = false;
      this.useFallbackClock = false;
      this.fallbackStartTimer = null;
      this.fallbackBeatInterval = null;
      this.fallbackNowOriginMs = 0;
      this.fallbackPausedAccumMs = 0;
      this.fallbackPauseStartedMs = null;

      this.context = null;
      this.master = null;
      this.musicBus = null;
      this.fxBus = null;
      this.delayNode = null;
      this.delayFeedbackNode = null;
      this.delayToneNode = null;
      this.noiseBuffer = null;
      this.volume = 0.72;
      this.songThemeKey = "classic";
      this.songTheme = SONG_THEMES.classic;
      this.setSongTheme("classic");
    }

    createAudioGraph() {
      if (this.context) {
        return;
      }

      const ContextClass = window.AudioContext || window.webkitAudioContext;

      if (!ContextClass) {
        throw new Error("Web Audio API is not supported in this browser.");
      }

      this.context = new ContextClass();

      this.master = this.context.createGain();
      this.master.gain.value = this.volume;

      this.musicBus = this.context.createGain();
      this.musicBus.gain.value = 1;

      this.fxBus = this.context.createGain();
      this.fxBus.gain.value = this.songTheme.fxMix;

      const delay = this.context.createDelay(1.2);
      delay.delayTime.value = this.beatDuration * 0.75;
      this.delayNode = delay;

      const feedback = this.context.createGain();
      feedback.gain.value = this.songTheme.delayFeedback;
      this.delayFeedbackNode = feedback;

      const tone = this.context.createBiquadFilter();
      tone.type = "lowpass";
      tone.frequency.value = this.songTheme.delayToneHz;
      tone.Q.value = 0.6;
      this.delayToneNode = tone;

      this.fxBus.connect(delay);
      delay.connect(tone);
      tone.connect(feedback);
      feedback.connect(delay);

      this.musicBus.connect(this.master);
      tone.connect(this.master);
      this.master.connect(this.context.destination);

      this.noiseBuffer = this.createNoiseBuffer(0.5);
    }

    setTempo(nextBpm) {
      if (!Number.isFinite(nextBpm) || nextBpm <= 0) {
        return;
      }

      this.bpm = nextBpm;
      this.beatDuration = 60 / nextBpm;

      if (this.context && this.delayNode) {
        const now = this.context.currentTime;
        this.delayNode.delayTime.cancelScheduledValues(now);
        this.delayNode.delayTime.setValueAtTime(this.delayNode.delayTime.value, now);
        this.delayNode.delayTime.linearRampToValueAtTime(
          this.beatDuration * 0.75,
          now + 0.05,
        );
      }
    }

    clearFallbackTimers() {
      if (this.fallbackStartTimer) {
        window.clearTimeout(this.fallbackStartTimer);
        this.fallbackStartTimer = null;
      }

      if (this.fallbackBeatInterval) {
        window.clearInterval(this.fallbackBeatInterval);
        this.fallbackBeatInterval = null;
      }
    }

    fireFallbackBeat() {
      if (typeof this.onBeat !== "function") {
        return;
      }

      const step = this.currentStep;
      this.currentStep += 1;
      this.onBeat(this.now(), step);
    }

    scheduleFallbackBeats(initialDelayMs = 80) {
      const delay = Math.max(0, Math.round(initialDelayMs));
      const intervalMs = Math.max(80, Math.round(this.beatDuration * 1000));
      this.clearFallbackTimers();
      this.clearBeatTimers();

      this.fallbackStartTimer = window.setTimeout(() => {
        this.fallbackStartTimer = null;
        this.fireFallbackBeat();
        this.fallbackBeatInterval = window.setInterval(
          () => this.fireFallbackBeat(),
          intervalMs,
        );
      }, delay);
    }

    startFallbackClock() {
      const startDelayMs = 80;
      this.useFallbackClock = true;
      this.isPaused = false;
      this.currentStep = 0;
      this.nextBeatTime = 0;
      this.fallbackNowOriginMs = window.performance.now() + startDelayMs;
      this.fallbackPausedAccumMs = 0;
      this.fallbackPauseStartedMs = null;
      this.scheduleFallbackBeats(startDelayMs);
    }

    setSongTheme(themeKey) {
      const nextTheme =
        typeof themeKey === "string" && SONG_THEMES[themeKey]
          ? SONG_THEMES[themeKey]
          : SONG_THEMES.classic;

      this.songThemeKey =
        typeof themeKey === "string" && SONG_THEMES[themeKey] ? themeKey : "classic";
      this.songTheme = nextTheme;
      this.chordProgression = nextTheme.chordProgression;
      this.rootProgression = nextTheme.rootProgression;
      this.melodyPattern = nextTheme.melodyPattern;
      this.melodyPatternB = nextTheme.melodyPatternB || nextTheme.melodyPattern;
      this.bassPattern = nextTheme.bassPattern || [0, 0, 7, 3];
      this.rhythmMode = nextTheme.rhythmMode || "ambient";

      if (this.context) {
        const now = this.context.currentTime;

        if (this.fxBus) {
          this.fxBus.gain.cancelScheduledValues(now);
          this.fxBus.gain.linearRampToValueAtTime(nextTheme.fxMix, now + 0.08);
        }

        if (this.delayFeedbackNode) {
          this.delayFeedbackNode.gain.cancelScheduledValues(now);
          this.delayFeedbackNode.gain.linearRampToValueAtTime(
            nextTheme.delayFeedback,
            now + 0.08,
          );
        }

        if (this.delayToneNode) {
          this.delayToneNode.frequency.cancelScheduledValues(now);
          this.delayToneNode.frequency.linearRampToValueAtTime(
            nextTheme.delayToneHz,
            now + 0.08,
          );
        }
      }
    }

    createNoiseBuffer(durationSec) {
      const frameCount = Math.max(
        1,
        Math.floor(this.context.sampleRate * durationSec),
      );
      const buffer = this.context.createBuffer(
        1,
        frameCount,
        this.context.sampleRate,
      );
      const data = buffer.getChannelData(0);

      for (let i = 0; i < frameCount; i += 1) {
        data[i] = Math.random() * 2 - 1;
      }

      return buffer;
    }

    setVolume(value) {
      this.volume = Number.isFinite(value) ? value : this.volume;

      if (!this.context || !this.master) {
        return;
      }

      const now = this.context.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.linearRampToValueAtTime(this.volume, now + 0.06);
    }

    now() {
      if (this.useFallbackClock) {
        const nowMs =
          this.fallbackPauseStartedMs !== null
            ? this.fallbackPauseStartedMs
            : window.performance.now();
        return Math.max(
          0,
          (nowMs - this.fallbackNowOriginMs - this.fallbackPausedAccumMs) / 1000,
        );
      }

      return this.context ? this.context.currentTime : 0;
    }

    contextState() {
      if (this.useFallbackClock) {
        return "fallback";
      }

      return this.context ? this.context.state : "uninitialized";
    }

    async ensureRunning() {
      this.createAudioGraph();

      if (this.context.state !== "running") {
        await this.context.resume();
      }

      if (this.context.state !== "running") {
        throw new Error(`Audio context state is ${this.context.state}.`);
      }

      return this.context.state;
    }

    playUiChime() {
      if (!this.context || this.context.state !== "running") {
        return;
      }

      const start = this.context.currentTime + 0.01;
      const notes = [76, 81];

      for (let i = 0; i < notes.length; i += 1) {
        const time = start + i * 0.07;
        this.playPluck(notes[i], time, 0.16, 0.16);
      }
    }

    playHitAccent(tier) {
      if (!this.context || this.context.state !== "running") {
        return;
      }

      const start = this.context.currentTime + 0.006;

      if (tier === "PERFECT") {
        this.playPluck(82, start, 0.13, 0.14);
        this.playPluck(86, start + 0.035, 0.11, 0.12);
        this.playKick(start + 0.01, 0.22);
        this.playHat(start + 0.05, this.songTheme.hatVolume * 0.35);
        return;
      }

      if (tier === "GREAT") {
        this.playPluck(84, start, 0.12, 0.13);
        this.playPluck(88, start + 0.03, 0.08, 0.1);
        return;
      }

      this.playPluck(79, start, 0.08, 0.1);
    }

    async start() {
      if (this.schedulerTimer) {
        window.clearInterval(this.schedulerTimer);
        this.schedulerTimer = null;
      }

      this.clearBeatTimers();
      this.clearFallbackTimers();
      this.useFallbackClock = false;
      this.fallbackPauseStartedMs = null;
      this.fallbackPausedAccumMs = 0;
      this.fallbackNowOriginMs = 0;

      try {
        await this.ensureRunning();
      } catch (error) {
        this.startFallbackClock();
        return "fallback";
      }

      const now = this.context.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.volume, now);

      this.currentStep = 0;
      this.nextBeatTime = now + 0.08;
      this.isPaused = false;
      this.schedulerTimer = window.setInterval(
        () => this.scheduler(),
        this.lookAheadMs,
      );
      return "audio";
    }

    async pause() {
      if (this.useFallbackClock) {
        this.clearFallbackTimers();
        this.clearBeatTimers();
        if (this.fallbackPauseStartedMs === null) {
          this.fallbackPauseStartedMs = window.performance.now();
        }
        this.isPaused = true;
        return;
      }

      if (!this.context) {
        return;
      }

      if (this.schedulerTimer) {
        window.clearInterval(this.schedulerTimer);
        this.schedulerTimer = null;
      }

      this.clearBeatTimers();

      if (this.context.state === "running") {
        await this.context.suspend();
      }

      this.isPaused = true;
    }

    async resume() {
      if (this.useFallbackClock) {
        if (this.fallbackPauseStartedMs !== null) {
          this.fallbackPausedAccumMs +=
            window.performance.now() - this.fallbackPauseStartedMs;
          this.fallbackPauseStartedMs = null;
        }
        this.isPaused = false;
        this.scheduleFallbackBeats(80);
        return "fallback";
      }

      await this.ensureRunning();

      if (this.schedulerTimer) {
        window.clearInterval(this.schedulerTimer);
      }

      this.clearBeatTimers();
      this.nextBeatTime = this.context.currentTime + 0.08;
      this.schedulerTimer = window.setInterval(
        () => this.scheduler(),
        this.lookAheadMs,
      );
      this.isPaused = false;
      return "audio";
    }

    stop() {
      if (this.schedulerTimer) {
        window.clearInterval(this.schedulerTimer);
        this.schedulerTimer = null;
      }

      this.clearBeatTimers();
      this.clearFallbackTimers();
      this.fallbackPauseStartedMs = null;
      this.fallbackPausedAccumMs = 0;
      this.fallbackNowOriginMs = 0;

      if (this.useFallbackClock) {
        this.useFallbackClock = false;
        this.isPaused = false;
        return;
      }

      if (!this.context || !this.master) {
        return;
      }

      const now = this.context.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.exponentialRampToValueAtTime(
        Math.max(0.0001, this.volume * 0.0002),
        now + 0.35,
      );
      this.isPaused = false;
    }

    clearBeatTimers() {
      for (const timer of this.pendingBeatTimers) {
        window.clearTimeout(timer);
      }
      this.pendingBeatTimers.clear();
    }

    scheduler() {
      while (
        this.context &&
        this.nextBeatTime < this.context.currentTime + this.scheduleAheadSec
      ) {
        this.scheduleBeat(this.nextBeatTime, this.currentStep);
        this.nextBeatTime += this.beatDuration;
        this.currentStep += 1;
      }
    }

    scheduleBeat(time, step) {
      const beatInBar = step % 4;
      const barNumber = Math.floor(step / 4);
      const barIndex = barNumber % this.chordProgression.length;
      const root = this.rootProgression[barIndex];
      const section = barNumber % 8;
      const breakdown = section === 4;
      const build = section === 7;
      const lift = section === 6 || section === 7;
      const energy = breakdown ? 0.62 : build ? 1.2 : lift ? 1.06 : 1;

      this.scheduleDrums(time, step, beatInBar, {
        breakdown,
        build,
        energy,
      });

      if (beatInBar === 0 && !breakdown) {
        const padDuration = this.beatDuration * 4 * (build ? 0.86 : 1);
        this.playPad(this.chordProgression[barIndex], time, padDuration);
      }

      const bassOffset = this.bassPattern[step % this.bassPattern.length];
      if (bassOffset !== null && bassOffset !== undefined) {
        const bassDuration = this.beatDuration * (breakdown ? 0.62 : 0.92);
        this.playBass(root + bassOffset, time, bassDuration);

        if (this.rhythmMode === "dnb" && !breakdown && beatInBar % 2 === 0) {
          this.playBass(
            root + bassOffset + 12,
            time + this.beatDuration * 0.5,
            bassDuration * 0.52,
          );
        }
      }

      const activeMelody = section >= 4 ? this.melodyPatternB : this.melodyPattern;
      const melodyOffset = activeMelody[step % activeMelody.length];
      const melodyChance = breakdown ? 0.45 : build ? 0.95 : 0.8;

      if (melodyOffset !== null && Math.random() < melodyChance) {
        const leadAmount = build ? 0.19 : 0.15;
        const leadSend = breakdown ? 0.34 : 0.26;
        this.playPluck(root + melodyOffset, time + 0.02, leadAmount, leadSend);

        if (!breakdown && (step % 4 === 1 || step % 8 === 6 || build)) {
          this.playPluck(
            root + melodyOffset + 12,
            time + this.beatDuration * 0.5,
            build ? 0.12 : 0.09,
            0.2,
          );
        }

        if (build && beatInBar === 3) {
          this.playPluck(root + melodyOffset + 19, time + this.beatDuration * 0.25, 0.08, 0.26);
          this.playPluck(root + melodyOffset + 24, time + this.beatDuration * 0.75, 0.075, 0.22);
        }
      }

      if (typeof this.onBeat === "function") {
        const waitMs = Math.max(0, (time - this.context.currentTime) * 1000);
        const timer = window.setTimeout(() => {
          this.pendingBeatTimers.delete(timer);
          this.onBeat(time, step);
        }, waitMs);
        this.pendingBeatTimers.add(timer);
      }
    }

    scheduleDrums(time, step, beatInBar, phase) {
      const { breakdown, build, energy } = phase;
      const beatLength = this.beatDuration;

      if (this.rhythmMode === "dnb") {
        this.scheduleHatRun(time, [0, 0.25, 0.5, 0.75], this.songTheme.hatVolume * (breakdown ? 0.45 : 1));

        if (!breakdown && (beatInBar === 0 || beatInBar === 2)) {
          this.playKick(time, (beatInBar === 0 ? 0.95 : 0.72) * energy);
        }
        if (!breakdown && beatInBar === 2) {
          this.playKick(time + beatLength * 0.5, 0.52 * energy);
        }

        if (beatInBar === 1 || beatInBar === 3) {
          this.playSnare(time, 1.05 * energy);
        }
        if (beatInBar === 3) {
          this.playSnare(time + beatLength * 0.5, 0.42);
        }

        if (build && beatInBar === 3) {
          this.playSnare(time + beatLength * 0.25, 0.36);
          this.playSnare(time + beatLength * 0.75, 0.34);
        }

        return;
      }

      if (this.rhythmMode === "synthwave") {
        if (!breakdown && (beatInBar === 0 || beatInBar === 2)) {
          this.playKick(time, (beatInBar === 0 ? 0.95 : 0.76) * energy);
        }
        if (beatInBar === 2) {
          this.playSnare(time, 0.95 * energy);
        }

        this.scheduleHatRun(time, [0.5], this.songTheme.hatVolume * (breakdown ? 0.5 : 1));
        if (!breakdown) {
          this.scheduleHatRun(time, [0], this.songTheme.hatVolume * 0.45);
        }
        if (build && beatInBar === 3) {
          this.scheduleHatRun(time, [0.25, 0.75], this.songTheme.hatVolume * 0.7);
        }

        return;
      }

      if (this.rhythmMode === "breaks") {
        if (!breakdown && (beatInBar === 0 || beatInBar === 2)) {
          this.playKick(time, (beatInBar === 0 ? 0.9 : 0.7) * energy);
        }
        if (!breakdown && beatInBar === 1 && step % 8 === 5) {
          this.playKick(time + beatLength * 0.5, 0.55 * energy);
        }
        if (beatInBar === 2) {
          this.playSnare(time, 0.96);
        }
        if (!breakdown && beatInBar === 3) {
          this.playSnare(time + beatLength * 0.5, 0.4);
        }

        this.scheduleHatRun(time, [0.5], this.songTheme.hatVolume * (breakdown ? 0.56 : 1));
        if (!breakdown && beatInBar % 2 === 1) {
          this.scheduleHatRun(time, [0.75], this.songTheme.halfHatVolume * 0.95);
        }
        if (build) {
          this.scheduleHatRun(time, [0.25], this.songTheme.halfHatVolume * 0.92);
        }

        return;
      }

      if (!breakdown && (beatInBar === 0 || beatInBar === 2)) {
        this.playKick(time, (beatInBar === 0 ? 0.95 : 0.72) * energy);
      }

      if (beatInBar === 2) {
        this.playSnare(time, 1);
      }

      if (beatInBar === 1 || beatInBar === 3) {
        this.playHat(time, this.songTheme.hatVolume * (breakdown ? 0.6 : 1));
      }

      if (!breakdown && beatInBar === 3) {
        this.playHat(time + beatLength * 0.5, this.songTheme.halfHatVolume);
      }

      if (build && beatInBar === 3) {
        this.scheduleHatRun(time, [0.25, 0.75], this.songTheme.halfHatVolume * 0.95);
      }
    }

    scheduleHatRun(time, offsets, baseVolume) {
      for (const offset of offsets) {
        const volume = Math.max(0.0001, baseVolume * (offset === 0 ? 0.86 : 1));
        this.playHat(time + this.beatDuration * offset, volume);
      }
    }

    playKick(time, amount) {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      const kickTop = this.songTheme.kickTop;
      const kickBottom = this.songTheme.kickBottom;

      osc.type = "sine";
      osc.frequency.setValueAtTime(kickTop, time);
      osc.frequency.exponentialRampToValueAtTime(kickBottom, time + 0.15);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(amount, time + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

      osc.connect(gain);
      gain.connect(this.musicBus);
      osc.start(time);
      osc.stop(time + 0.2);
    }

    playSnare(time, intensity = 1) {
      const strength = Math.max(0.25, Math.min(1.4, intensity));
      const noise = this.context.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const highpass = this.context.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.setValueAtTime(1700 + 240 * (strength - 1), time);

      const bandpass = this.context.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(2300 + 160 * (strength - 1), time);
      bandpass.Q.value = 0.8 + (strength - 1) * 0.08;

      const gain = this.context.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.2 * strength, time + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.17);

      noise.connect(highpass);
      highpass.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.musicBus);
      gain.connect(this.fxBus);

      noise.start(time);
      noise.stop(time + 0.2);

      const body = this.context.createOscillator();
      const bodyGain = this.context.createGain();
      body.type = "triangle";
      body.frequency.setValueAtTime(200, time);
      body.frequency.exponentialRampToValueAtTime(120, time + 0.08);
      bodyGain.gain.setValueAtTime(0.0001, time);
      bodyGain.gain.exponentialRampToValueAtTime(0.12 * (0.68 + strength * 0.32), time + 0.003);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.1);
      body.connect(bodyGain);
      bodyGain.connect(this.musicBus);
      body.start(time);
      body.stop(time + 0.12);
    }

    playHat(time, volume) {
      const noise = this.context.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const highpass = this.context.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.setValueAtTime(7200, time);

      const gain = this.context.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(volume, time + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);

      noise.connect(highpass);
      highpass.connect(gain);
      gain.connect(this.musicBus);

      noise.start(time);
      noise.stop(time + 0.07);
    }

    playBass(noteMidi, time, duration) {
      const osc = this.context.createOscillator();
      const filter = this.context.createBiquadFilter();
      const gain = this.context.createGain();
      const send = this.context.createGain();

      osc.type = this.songTheme.bassWave;
      osc.frequency.setValueAtTime(midiToFreq(noteMidi), time);
      osc.detune.value = -4;

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(this.songTheme.bassStartCutoff, time);
      filter.frequency.linearRampToValueAtTime(this.songTheme.bassEndCutoff, time + duration);
      filter.Q.value = 1.8;

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.24, time + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      send.gain.value = 0.06;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicBus);
      gain.connect(send);
      send.connect(this.fxBus);

      osc.start(time);
      osc.stop(time + duration + 0.03);
    }

    playPad(chord, time, duration) {
      const layerGain = this.context.createGain();
      const filter = this.context.createBiquadFilter();
      const send = this.context.createGain();

      layerGain.gain.setValueAtTime(0.0001, time);
      layerGain.gain.linearRampToValueAtTime(0.065, time + 0.65);
      layerGain.gain.linearRampToValueAtTime(0.038, time + duration * 0.7);
      layerGain.gain.exponentialRampToValueAtTime(0.0001, time + duration + 0.25);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(this.songTheme.padStartCutoff, time);
      filter.frequency.linearRampToValueAtTime(this.songTheme.padEndCutoff, time + duration);
      filter.Q.value = 0.6;

      send.gain.value = 0.55;

      layerGain.connect(filter);
      filter.connect(this.musicBus);
      filter.connect(send);
      send.connect(this.fxBus);

      for (const midi of chord) {
        const oscA = this.context.createOscillator();
        const oscB = this.context.createOscillator();

        oscA.type = this.songTheme.padWaveA;
        oscB.type = this.songTheme.padWaveB;
        oscA.frequency.setValueAtTime(midiToFreq(midi), time);
        oscB.frequency.setValueAtTime(midiToFreq(midi + 12), time);
        oscA.detune.value = -3;
        oscB.detune.value = 5;

        oscA.connect(layerGain);
        oscB.connect(layerGain);

        oscA.start(time);
        oscB.start(time);
        oscA.stop(time + duration + 0.32);
        oscB.stop(time + duration + 0.32);
      }
    }

    playPluck(noteMidi, time, amount, sendAmount) {
      const oscA = this.context.createOscillator();
      const oscB = this.context.createOscillator();
      const gain = this.context.createGain();
      const filter = this.context.createBiquadFilter();
      const send = this.context.createGain();

      oscA.type = this.songTheme.pluckWaveA;
      oscB.type = this.songTheme.pluckWaveB;
      oscA.frequency.setValueAtTime(midiToFreq(noteMidi), time);
      oscB.frequency.setValueAtTime(midiToFreq(noteMidi + 12), time);
      oscA.detune.value = -4;
      oscB.detune.value = 7;

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(this.songTheme.pluckStartCutoff, time);
      filter.frequency.exponentialRampToValueAtTime(this.songTheme.pluckEndCutoff, time + 0.24);
      filter.Q.value = 1.2;

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(amount, time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.34);

      send.gain.value = sendAmount;

      oscA.connect(filter);
      oscB.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicBus);
      gain.connect(send);
      send.connect(this.fxBus);

      oscA.start(time);
      oscB.start(time);
      oscA.stop(time + 0.36);
      oscB.stop(time + 0.36);
    }
  }

  class PopupBeatGame {
    constructor() {
      this.playfield = document.getElementById("playfield");
      this.hudDifficultyEl = document.getElementById("hudDifficulty");
      this.hudSongEl = document.getElementById("hudSong");
      this.audioStateEl = document.getElementById("audioState");
      this.scoreEl = document.getElementById("score");
      this.comboEl = document.getElementById("combo");
      this.accuracyEl = document.getElementById("accuracy");
      this.beatEl = document.getElementById("beat");
      this.pauseButton = document.getElementById("pauseButton");
      this.startOverlay = document.getElementById("startOverlay");
      this.progressOverlay = document.getElementById("progressOverlay");
      this.menuOverlay = document.getElementById("menuOverlay");
      this.resultOverlay = document.getElementById("resultOverlay");
      this.resultStatsEl = document.getElementById("resultStats");
      this.resultRankEl = document.getElementById("resultRank");
      this.resultProgressEl = document.getElementById("resultProgress");
      this.resultRecapPanelEl = document.querySelector(".result-recap");
      this.resultTagEl = document.getElementById("resultTag");
      this.resultXpEarnedEl = document.getElementById("resultXpEarned");
      this.resultLevelNowEl = document.getElementById("resultLevelNow");
      this.resultLevelDeltaEl = document.getElementById("resultLevelDelta");
      this.resultLevelFillEl = document.getElementById("resultLevelFill");
      this.resultLevelMetaEl = document.getElementById("resultLevelMeta");
      this.resultSongDeltaEl = document.getElementById("resultSongDelta");
      this.resultSongFillEl = document.getElementById("resultSongFill");
      this.resultSongMetaEl = document.getElementById("resultSongMeta");
      this.resultUnlocksEl = document.getElementById("resultUnlocks");
      this.startButton = document.getElementById("startButton");
      this.restartButton = document.getElementById("restartButton");
      this.resultMenuButton = document.getElementById("resultMenuButton");
      this.openProgressionButton = document.getElementById("openProgressionButton");
      this.openProgressionResultButton = document.getElementById("openProgressionResultButton");
      this.closeProgressionButton = document.getElementById("closeProgressionButton");
      this.resumeButton = document.getElementById("resumeButton");
      this.menuRestartButton = document.getElementById("menuRestartButton");
      this.menuQuitButton = document.getElementById("menuQuitButton");
      this.songThemeSelect = document.getElementById("songThemeSelect");
      this.playerTagInput = document.getElementById("playerTag");
      this.bestScoreProgressEl = document.getElementById("bestScoreProgress");
      this.songProgressFillEl = document.getElementById("songProgressFill");
      this.songProgressMetaEl = document.getElementById("songProgressMeta");
      this.songUnlockHintEl = document.getElementById("songUnlockHint");
      this.songProgressListEl = document.getElementById("songProgressList");
      this.levelProgressFillEl = document.getElementById("levelProgressFill");
      this.levelProgressMetaEl = document.getElementById("levelProgressMeta");
      this.progressLevelEl = document.getElementById("progressLevel");
      this.progressXpEl = document.getElementById("progressXp");
      this.selectedSongProgressEl = document.getElementById("selectedSongProgress");
      this.startLeaderboardRowsEl = document.getElementById("startLeaderboardRows");
      this.resultLeaderboardRowsEl = document.getElementById("resultLeaderboardRows");
      this.lifetimeStatsEl = document.getElementById("lifetimeStats");
      this.resultLifetimeStatsEl = document.getElementById("resultLifetimeStats");
      this.clearLeaderboardButton = document.getElementById("clearLeaderboardButton");
      this.clearLeaderboardResultButton = document.getElementById(
        "clearLeaderboardResultButton",
      );
      this.testToneButton = document.getElementById("testToneButton");
      this.difficultySelect = document.getElementById("difficulty");
      this.volumeSlider = document.getElementById("volume");
      this.menuVolumeSlider = document.getElementById("menuVolume");
      this.toastEl = document.getElementById("toast");

      this.currentDifficultyKey = "normal";
      this.currentDifficulty = DIFFICULTY_PRESETS.normal;
      this.sessionBeats = this.currentDifficulty.sessionBeats;
      this.judgementWindow = this.currentDifficulty.judgementWindow;
      this.maxActivePopups = this.currentDifficulty.maxActivePopups;
      this.running = false;
      this.paused = false;
      this.popupCounter = 0;
      this.toastTimer = null;
      this.progressReturnTarget = null;
      this.runHistory = [];
      this.storageWritable = true;
      this.songProgress = this.createDefaultSongProgress();
      this.popupTitles = [
        "Windows Script Host",
        "Runtime Notice",
        "Connection Dialog",
        "System Message",
        "Explorer Prompt",
        "Playback Alert",
      ];
      this.popupMessages = [
        "Unexpected rhythm detected.",
        "Automatic update interrupted.",
        "Click to keep browsing.",
        "Ad blocker has failed safely.",
        "Buffering emotional damage...",
        "Cache miss in timeline.",
        "A plugin wants your attention.",
        "Track sync request pending.",
      ];

      this.song = new SongEngine(this.currentDifficulty.bpm, (audioTime, step) =>
        this.handleBeat(audioTime, step),
      );

      this.popups = new Map();
      this.resetState();
      this.applyDifficulty(this.difficultySelect ? this.difficultySelect.value : "normal");
      this.loadRunHistory();
      this.loadSongProgress();
      this.songProgress.playerTag = this.normalizePlayerTag(
        this.songProgress.playerTag,
        DEFAULT_PLAYER_TAG,
        true,
      );
      this.alignSelectedSong();
      this.syncPlayerTagUi();
      this.saveSongProgress();
      this.applySelectedSongTheme();
      this.attachEvents();
      this.syncVolumeUi(this.volumeSlider ? Number.parseFloat(this.volumeSlider.value) : 0.72);
      this.updatePauseButton();
      this.refreshAudioState();
      this.updateHud();
      this.renderLeaderboardAndStats();
      this.renderSongProgression();
      this.renderSongSelector();
    }

    resetState() {
      this.state = {
        score: 0,
        combo: 0,
        maxCombo: 0,
        hits: 0,
        misses: 0,
        judged: 0,
      };
    }

    normalizePlayerTag(rawTag, fallback = DEFAULT_PLAYER_TAG, forceLength = false, allowEmpty = false) {
      const cleaned = typeof rawTag === "string"
        ? rawTag.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3)
        : "";
      const safeFallback = typeof fallback === "string"
        ? fallback.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3) || DEFAULT_PLAYER_TAG
        : DEFAULT_PLAYER_TAG;

      if (!cleaned) {
        if (allowEmpty) {
          return "";
        }
        return safeFallback;
      }

      if (!forceLength || cleaned.length >= 3) {
        return cleaned;
      }

      return cleaned.padEnd(3, "X").slice(0, 3);
    }

    createDefaultSongProgress() {
      return {
        selectedSong: "classic",
        totalXp: 0,
        playerTag: DEFAULT_PLAYER_TAG,
      };
    }

    sanitizeSongProgress(raw) {
      const defaults = this.createDefaultSongProgress();
      if (!raw || typeof raw !== "object") {
        return defaults;
      }

      const xpValue = Number(raw.totalXp);

      return {
        selectedSong:
          typeof raw.selectedSong === "string" && SONG_THEMES[raw.selectedSong]
            ? raw.selectedSong
            : defaults.selectedSong,
        totalXp: Number.isFinite(xpValue) ? Math.max(0, Math.floor(xpValue)) : defaults.totalXp,
        playerTag: this.normalizePlayerTag(raw.playerTag, defaults.playerTag, true),
      };
    }

    getBestScore() {
      return this.runHistory.reduce((best, run) => Math.max(best, run.score), 0);
    }

    xpRequiredForLevel(level) {
      const safeLevel = Math.max(1, Math.floor(level));
      return 450 + (safeLevel - 1) * 110;
    }

    getLevelInfo(totalXp = this.songProgress.totalXp) {
      const safeTotalXp = Number.isFinite(totalXp) ? Math.max(0, Math.floor(totalXp)) : 0;
      let level = 1;
      let remainingXp = safeTotalXp;
      let neededLevelXp = this.xpRequiredForLevel(level);

      while (remainingXp >= neededLevelXp && level < 99) {
        remainingXp -= neededLevelXp;
        level += 1;
        neededLevelXp = this.xpRequiredForLevel(level);
      }

      return {
        level,
        totalXp: safeTotalXp,
        currentLevelXp: remainingXp,
        neededLevelXp,
        ratio: neededLevelXp > 0 ? remainingXp / neededLevelXp : 1,
      };
    }

    calculateRunXp(runSummary) {
      if (!runSummary || typeof runSummary !== "object") {
        return 0;
      }

      const scoreXp = Math.floor(Math.max(0, runSummary.score) * 0.019);
      const accuracyXp = Math.round(
        Math.max(0, Math.min(100, runSummary.accuracy || 0)) * 1.2,
      );
      const comboXp = Math.min(220, Math.round(Math.max(0, runSummary.maxCombo || 0) * 1.6));
      const difficultyBonus =
        runSummary.difficulty === "hard"
          ? 90
          : runSummary.difficulty === "normal"
            ? 45
            : 0;

      return Math.max(120, 110 + scoreXp + accuracyXp + comboXp + difficultyBonus);
    }

    isSongUnlocked(
      songId,
      bestScore = this.getBestScore(),
      totalXp = this.songProgress.totalXp,
    ) {
      const song = SONG_THEMES[songId];
      if (!song) {
        return false;
      }

      if (songId === "classic") {
        return true;
      }

      const scoreRequirement = Math.max(0, song.unlockBestScore || 0);
      const xpRequirement = Math.max(0, song.unlockXp || 0);
      return bestScore >= scoreRequirement || totalXp >= xpRequirement;
    }

    getUnlockedSongs(
      bestScore = this.getBestScore(),
      totalXp = this.songProgress.totalXp,
    ) {
      return SONG_PROGRESS_ORDER.filter((songId) =>
        this.isSongUnlocked(songId, bestScore, totalXp),
      );
    }

    getNextLockedSong(
      bestScore = this.getBestScore(),
      totalXp = this.songProgress.totalXp,
    ) {
      return (
        SONG_PROGRESS_ORDER.find(
          (songId) => !this.isSongUnlocked(songId, bestScore, totalXp),
        ) || null
      );
    }

    getUnlockProgress(
      songId,
      bestScore = this.getBestScore(),
      totalXp = this.songProgress.totalXp,
    ) {
      const song = SONG_THEMES[songId];
      if (!song) {
        return {
          scoreRequirement: 0,
          xpRequirement: 0,
          scoreRatio: 1,
          xpRatio: 1,
          ratio: 1,
        };
      }

      const scoreRequirement = Math.max(0, song.unlockBestScore || 0);
      const xpRequirement = Math.max(0, song.unlockXp || 0);
      const scoreRatio =
        scoreRequirement > 0 ? Math.max(0, Math.min(1, bestScore / scoreRequirement)) : 1;
      const xpRatio = xpRequirement > 0 ? Math.max(0, Math.min(1, totalXp / xpRequirement)) : 1;

      return {
        scoreRequirement,
        xpRequirement,
        scoreRatio,
        xpRatio,
        ratio: Math.max(scoreRatio, xpRatio),
      };
    }

    loadSongProgress() {
      const storage = this.getStorage();
      if (!storage) {
        this.songProgress = this.createDefaultSongProgress();
        return;
      }

      try {
        const raw = storage.getItem(SONG_PROGRESS_STORAGE_KEY);
        if (!raw) {
          this.songProgress = this.createDefaultSongProgress();
          return;
        }

        const parsed = JSON.parse(raw);
        this.songProgress = this.sanitizeSongProgress(parsed);
      } catch (error) {
        this.songProgress = this.createDefaultSongProgress();
        this.storageWritable = false;
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    saveSongProgress() {
      const storage = this.getStorage();
      if (!storage) {
        return;
      }

      try {
        storage.setItem(SONG_PROGRESS_STORAGE_KEY, JSON.stringify(this.songProgress));
      } catch (error) {
        this.storageWritable = false;
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    alignSelectedSong() {
      const unlockedSongs = this.getUnlockedSongs();
      if (!unlockedSongs.length) {
        this.songProgress.selectedSong = "classic";
        return;
      }

      if (!unlockedSongs.includes(this.songProgress.selectedSong)) {
        this.songProgress.selectedSong = unlockedSongs[unlockedSongs.length - 1];
      }
    }

    getEffectiveBpm() {
      const songTheme = SONG_THEMES[this.songProgress.selectedSong] || SONG_THEMES.classic;
      return this.currentDifficulty.bpm + songTheme.bpmBonus;
    }

    applySelectedSongTheme() {
      const selectedTheme = SONG_THEMES[this.songProgress.selectedSong] || SONG_THEMES.classic;
      this.song.setSongTheme(this.songProgress.selectedSong);
      this.song.setTempo(this.getEffectiveBpm());

      if (this.hudSongEl) {
        this.hudSongEl.textContent = selectedTheme.label;
      }
    }

    renderSongSelector() {
      if (!this.songThemeSelect) {
        return;
      }

      const bestScore = this.getBestScore();
      const totalXp = this.songProgress.totalXp;
      const unlockedSongs = this.getUnlockedSongs(bestScore, totalXp);
      this.songThemeSelect.textContent = "";

      for (const songId of SONG_PROGRESS_ORDER) {
        const song = SONG_THEMES[songId];
        const unlocked = unlockedSongs.includes(songId);
        const option = document.createElement("option");
        option.value = songId;
        option.disabled = !unlocked;
        option.textContent = unlocked
          ? `${song.label} · ${song.genreLabel} (+${song.bpmBonus} BPM)`
          : `${song.label} · ${song.genreLabel} (Need ${song.unlockBestScore} score or ${song.unlockXp} XP)`;
        if (songId === this.songProgress.selectedSong) {
          option.selected = true;
        }
        this.songThemeSelect.append(option);
      }

      this.songThemeSelect.value = this.songProgress.selectedSong;
    }

    renderSongProgression() {
      const bestScore = this.getBestScore();
      const totalXp = this.songProgress.totalXp;
      const nextSongId = this.getNextLockedSong(bestScore, totalXp);
      const unlockedSongs = this.getUnlockedSongs(bestScore, totalXp);
      const levelInfo = this.getLevelInfo(totalXp);

      if (this.bestScoreProgressEl) {
        this.bestScoreProgressEl.textContent = `${bestScore}`;
      }

      if (this.progressLevelEl) {
        this.progressLevelEl.textContent = `${levelInfo.level}`;
      }

      if (this.progressXpEl) {
        this.progressXpEl.textContent = `${levelInfo.totalXp}`;
      }

      if (this.levelProgressFillEl) {
        this.levelProgressFillEl.style.width = `${(Math.max(0, Math.min(1, levelInfo.ratio)) * 100).toFixed(1)}%`;
      }

      if (this.levelProgressMetaEl) {
        this.levelProgressMetaEl.textContent = `Level progress: ${levelInfo.currentLevelXp} / ${levelInfo.neededLevelXp} XP to Lv ${levelInfo.level + 1}`;
      }

      if (this.selectedSongProgressEl) {
        const selectedSong = SONG_THEMES[this.songProgress.selectedSong] || SONG_THEMES.classic;
        this.selectedSongProgressEl.textContent = `${selectedSong.label} · ${selectedSong.genreLabel}`;
      }

      if (this.songProgressMetaEl) {
        if (nextSongId) {
          const nextSong = SONG_THEMES[nextSongId];
          const progress = this.getUnlockProgress(nextSongId, bestScore, totalXp);
          this.songProgressMetaEl.textContent = `${nextSong.label} · Score ${bestScore} / ${progress.scoreRequirement} OR XP ${totalXp} / ${progress.xpRequirement}`;
        } else {
          this.songProgressMetaEl.textContent = "All songs unlocked.";
        }
      }

      if (this.songUnlockHintEl) {
        if (nextSongId) {
          const nextSong = SONG_THEMES[nextSongId];
          const progress = this.getUnlockProgress(nextSongId, bestScore, totalXp);
          const scoreRemaining = Math.max(0, progress.scoreRequirement - bestScore);
          const xpRemaining = Math.max(0, progress.xpRequirement - totalXp);
          this.songUnlockHintEl.textContent = `Unlock ${nextSong.label} with ${scoreRemaining} more score on best run or ${xpRemaining} more XP.`;
        } else {
          this.songUnlockHintEl.textContent = "You reached the final song ladder tier.";
        }
      }

      if (this.songProgressFillEl) {
        if (nextSongId) {
          const progress = this.getUnlockProgress(nextSongId, bestScore, totalXp);
          this.songProgressFillEl.style.width = `${(progress.ratio * 100).toFixed(1)}%`;
        } else {
          this.songProgressFillEl.style.width = "100%";
        }
      }

      if (!this.songProgressListEl) {
        return;
      }

      this.songProgressListEl.textContent = "";
      SONG_PROGRESS_ORDER.forEach((songId) => {
        const song = SONG_THEMES[songId];
        const unlocked = unlockedSongs.includes(songId);
        const progress = this.getUnlockProgress(songId, bestScore, totalXp);
        const item = document.createElement("div");
        item.className = `battle-tier ${unlocked ? "unlocked" : "locked"}`;
        if (songId === this.songProgress.selectedSong) {
          item.classList.add("active-tier");
        }

        const title = document.createElement("strong");
        title.textContent = song.label;
        const genre = document.createElement("div");
        genre.textContent = `Style: ${song.genreLabel}`;
        const requirement = document.createElement("div");
        requirement.textContent =
          songId === "classic"
            ? "Starter song"
            : `Unlock path: ${song.unlockBestScore} score OR ${song.unlockXp} XP`;
        const progressLine = document.createElement("div");
        progressLine.textContent =
          songId === "classic"
            ? "Progress: 100%"
            : `Progress: ${(progress.ratio * 100).toFixed(0)}%`;
        const speed = document.createElement("div");
        speed.textContent = `Speed bonus: +${song.bpmBonus} BPM`;
        const state = document.createElement("div");
        if (!unlocked) {
          state.textContent = "Status: Locked";
        } else if (songId === "classic") {
          state.textContent = "Status: Unlocked";
        } else if (bestScore >= song.unlockBestScore && totalXp >= song.unlockXp) {
          state.textContent = "Status: Unlocked (Score + XP)";
        } else if (bestScore >= song.unlockBestScore) {
          state.textContent = "Status: Unlocked (Score)";
        } else {
          state.textContent = "Status: Unlocked (XP)";
        }
        item.append(title, genre, requirement, progressLine, speed, state);
        this.songProgressListEl.append(item);
      });
    }

    sanitizeRunEntry(entry, index = 0) {
      if (!entry || typeof entry !== "object") {
        return null;
      }

      const scoreValue = Number(entry.score);
      if (!Number.isFinite(scoreValue)) {
        return null;
      }

      const hitsValue = Number(entry.hits);
      const missesValue = Number(entry.misses);
      const comboValue = Number(entry.maxCombo);
      const playedAtValue = Number(entry.playedAt);
      const safeHits = Number.isFinite(hitsValue) ? Math.max(0, Math.round(hitsValue)) : 0;
      const safeMisses = Number.isFinite(missesValue) ? Math.max(0, Math.round(missesValue)) : 0;
      const judged = safeHits + safeMisses;

      let safeAccuracy = Number(entry.accuracy);
      if (!Number.isFinite(safeAccuracy)) {
        safeAccuracy = judged ? (safeHits / judged) * 100 : 100;
      }
      safeAccuracy = Math.max(0, Math.min(100, safeAccuracy));

      const safeDifficulty =
        typeof entry.difficulty === "string" && DIFFICULTY_PRESETS[entry.difficulty]
          ? entry.difficulty
          : "normal";

      const safePlayedAt =
        Number.isFinite(playedAtValue) && playedAtValue > 0
          ? playedAtValue
          : Date.now() - index * 1000;

      const safeId =
        typeof entry.id === "string" && entry.id
          ? entry.id
          : `${safePlayedAt}-${Math.floor(Math.random() * 1e6)}`;
      const safeTag = this.normalizePlayerTag(
        typeof entry.tag === "string" ? entry.tag : entry.playerTag,
        this.songProgress.playerTag,
        true,
      );

      return {
        id: safeId,
        tag: safeTag,
        score: Math.max(0, Math.round(scoreValue)),
        hits: safeHits,
        misses: safeMisses,
        maxCombo: Number.isFinite(comboValue) ? Math.max(0, Math.round(comboValue)) : 0,
        accuracy: safeAccuracy,
        difficulty: safeDifficulty,
        playedAt: safePlayedAt,
      };
    }

    getStorage() {
      try {
        return window.localStorage;
      } catch (error) {
        this.storageWritable = false;
        return null;
      }
    }

    loadRunHistory() {
      this.runHistory = [];

      const storage = this.getStorage();
      if (!storage) {
        return;
      }

      try {
        const raw = storage.getItem(LEADERBOARD_STORAGE_KEY);
        if (!raw) {
          return;
        }

        const parsed = JSON.parse(raw);
        const history = Array.isArray(parsed)
          ? parsed
          : parsed && Array.isArray(parsed.history)
            ? parsed.history
            : [];

        const sanitized = history
          .map((entry, index) => this.sanitizeRunEntry(entry, index))
          .filter((entry) => entry !== null);

        sanitized.sort((a, b) => a.playedAt - b.playedAt);
        this.runHistory = sanitized.slice(-LEADERBOARD_HISTORY_LIMIT);
      } catch (error) {
        this.storageWritable = false;
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    saveRunHistory() {
      const storage = this.getStorage();
      if (!storage) {
        return;
      }

      try {
        storage.setItem(
          LEADERBOARD_STORAGE_KEY,
          JSON.stringify({
            version: 1,
            history: this.runHistory,
          }),
        );
        this.storageWritable = true;
      } catch (error) {
        this.storageWritable = false;
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    getSortedLeaderboardEntries(entries = this.runHistory) {
      return [...entries].sort(
        (a, b) =>
          b.score - a.score ||
          b.accuracy - a.accuracy ||
          b.maxCombo - a.maxCombo ||
          b.hits - a.hits ||
          a.misses - b.misses ||
          b.playedAt - a.playedAt,
      );
    }

    getLifetimeStats() {
      const stats = {
        runs: this.runHistory.length,
        bestScore: 0,
        avgAccuracy: 100,
        bestCombo: 0,
        totalHits: 0,
        totalMisses: 0,
        bestByDifficulty: {
          easy: 0,
          normal: 0,
          hard: 0,
        },
      };

      if (!this.runHistory.length) {
        return stats;
      }

      let accuracySum = 0;

      for (const run of this.runHistory) {
        stats.bestScore = Math.max(stats.bestScore, run.score);
        stats.bestCombo = Math.max(stats.bestCombo, run.maxCombo);
        stats.totalHits += run.hits;
        stats.totalMisses += run.misses;
        accuracySum += run.accuracy;
        stats.bestByDifficulty[run.difficulty] = Math.max(
          stats.bestByDifficulty[run.difficulty],
          run.score,
        );
      }

      stats.avgAccuracy = accuracySum / this.runHistory.length;
      return stats;
    }

    formatShortDate(timestamp) {
      const date = new Date(timestamp);
      if (Number.isNaN(date.getTime())) {
        return "--";
      }

      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    }

    renderLeaderboardRows(target, entries) {
      if (!target) {
        return;
      }

      target.textContent = "";

      if (!entries.length) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 6;
        cell.className = "empty-row";
        cell.textContent = "No runs recorded yet.";
        row.append(cell);
        target.append(row);
        return;
      }

      entries.forEach((entry, index) => {
        const row = document.createElement("tr");
        const rankCell = document.createElement("td");
        const tagCell = document.createElement("td");
        const scoreCell = document.createElement("td");
        const modeCell = document.createElement("td");
        const accuracyCell = document.createElement("td");
        const dateCell = document.createElement("td");

        rankCell.textContent = `#${index + 1}`;
        const displayTag = this.normalizePlayerTag(
          entry.tag,
          this.songProgress.playerTag,
          true,
        );
        tagCell.textContent = displayTag === "AAA" ? this.songProgress.playerTag : displayTag;
        scoreCell.textContent = `${entry.score}`;
        modeCell.textContent = DIFFICULTY_PRESETS[entry.difficulty].label;
        accuracyCell.textContent = `${entry.accuracy.toFixed(1)}%`;
        dateCell.textContent = this.formatShortDate(entry.playedAt);

        row.append(rankCell, tagCell, scoreCell, modeCell, accuracyCell, dateCell);
        target.append(row);
      });
    }

    renderStatsGrid(target, stats) {
      if (!target) {
        return;
      }

      target.textContent = "";

      const items = [
        { label: "Runs", value: `${stats.runs}` },
        { label: "Best Score", value: `${stats.bestScore}` },
        { label: "Avg Accuracy", value: `${stats.avgAccuracy.toFixed(1)}%` },
        { label: "Best Combo", value: `${stats.bestCombo}` },
        { label: "Total Hits", value: `${stats.totalHits}` },
        { label: "Total Misses", value: `${stats.totalMisses}` },
        { label: "Easy Best", value: `${stats.bestByDifficulty.easy}` },
        { label: "Normal Best", value: `${stats.bestByDifficulty.normal}` },
        { label: "Hard Best", value: `${stats.bestByDifficulty.hard}` },
      ];

      for (const item of items) {
        const card = document.createElement("div");
        card.className = "stat-card";

        const label = document.createElement("span");
        label.className = "stat-label";
        label.textContent = item.label;

        const value = document.createElement("span");
        value.className = "stat-value";
        value.textContent = item.value;

        card.append(label, value);
        target.append(card);
      }
    }

    renderLeaderboardAndStats() {
      const leaderboard = this.getSortedLeaderboardEntries().slice(0, LEADERBOARD_LIMIT);
      const stats = this.getLifetimeStats();

      this.renderLeaderboardRows(this.startLeaderboardRowsEl, leaderboard);
      this.renderLeaderboardRows(this.resultLeaderboardRowsEl, leaderboard);
      this.renderStatsGrid(this.lifetimeStatsEl, stats);
      this.renderStatsGrid(this.resultLifetimeStatsEl, stats);
    }

    addRunToHistory(runEntry) {
      const safeEntry = this.sanitizeRunEntry(runEntry);

      if (!safeEntry) {
        return null;
      }

      this.runHistory.push(safeEntry);
      this.runHistory.sort((a, b) => a.playedAt - b.playedAt);
      this.runHistory = this.runHistory.slice(-LEADERBOARD_HISTORY_LIMIT);

      const sorted = this.getSortedLeaderboardEntries();
      const rank = sorted.findIndex((entry) => entry.id === safeEntry.id) + 1;

      this.saveRunHistory();
      this.renderLeaderboardAndStats();

      return {
        entry: safeEntry,
        rank,
      };
    }

    clearLeaderboardData() {
      this.runHistory = [];
      this.saveRunHistory();
      this.renderLeaderboardAndStats();
      this.alignSelectedSong();
      this.saveSongProgress();
      this.applySelectedSongTheme();
      this.renderSongSelector();
      this.renderSongProgression();

      if (this.resultRankEl) {
        this.resultRankEl.textContent = "";
      }
      if (this.resultProgressEl) {
        this.resultProgressEl.textContent = "";
      }
    }

    applyDifficulty(modeKey) {
      const nextKey =
        typeof modeKey === "string" && DIFFICULTY_PRESETS[modeKey]
          ? modeKey
          : "normal";
      const preset = DIFFICULTY_PRESETS[nextKey];

      this.currentDifficultyKey = nextKey;
      this.currentDifficulty = preset;
      this.sessionBeats = preset.sessionBeats;
      this.judgementWindow = preset.judgementWindow;
      this.maxActivePopups = preset.maxActivePopups;

      if (this.difficultySelect) {
        this.difficultySelect.value = nextKey;
      }

      if (this.hudDifficultyEl) {
        this.hudDifficultyEl.textContent = preset.label;
      }

      if (this.song) {
        this.song.setTempo(this.getEffectiveBpm());
      }
    }

    syncVolumeUi(value) {
      const safeValue = Number.isFinite(value) ? value : 0.72;

      if (this.volumeSlider) {
        this.volumeSlider.value = safeValue.toFixed(2);
      }

      if (this.menuVolumeSlider) {
        this.menuVolumeSlider.value = safeValue.toFixed(2);
      }
    }

    syncPlayerTagUi() {
      const safeTag = this.normalizePlayerTag(
        this.songProgress.playerTag,
        DEFAULT_PLAYER_TAG,
        true,
      );
      this.songProgress.playerTag = safeTag;

      if (this.playerTagInput) {
        this.playerTagInput.value = safeTag;
      }
    }

    getPlayerTag(forceLength = false) {
      const inputTag = this.playerTagInput ? this.playerTagInput.value : this.songProgress.playerTag;
      return this.normalizePlayerTag(inputTag, this.songProgress.playerTag, forceLength);
    }

    animateMeterFill(targetEl, startRatio, endRatio, durationMs = 960) {
      if (!targetEl) {
        return;
      }

      const safeStart = Math.max(0, Math.min(1, Number.isFinite(startRatio) ? startRatio : 0));
      const safeEnd = Math.max(0, Math.min(1, Number.isFinite(endRatio) ? endRatio : 0));
      const duration = Math.max(180, Math.round(durationMs));

      targetEl.style.transition = "none";
      targetEl.style.width = `${(safeStart * 100).toFixed(1)}%`;
      targetEl.offsetWidth;
      targetEl.style.transition = `width ${duration}ms cubic-bezier(0.16, 0.84, 0.24, 1)`;

      window.requestAnimationFrame(() => {
        targetEl.style.width = `${(safeEnd * 100).toFixed(1)}%`;
      });
    }

    animateValue(start, end, durationMs, onUpdate) {
      if (typeof onUpdate !== "function") {
        return;
      }

      const safeStart = Number.isFinite(start) ? start : 0;
      const safeEnd = Number.isFinite(end) ? end : safeStart;
      const duration = Math.max(120, Math.round(durationMs));

      if (safeStart === safeEnd) {
        onUpdate(safeEnd);
        return;
      }

      const startTime = window.performance.now();
      const tick = (now) => {
        const t = Math.max(0, Math.min(1, (now - startTime) / duration));
        const eased = 1 - Math.pow(1 - t, 3);
        const value = safeStart + (safeEnd - safeStart) * eased;
        onUpdate(value);
        if (t < 1) {
          window.requestAnimationFrame(tick);
        }
      };

      window.requestAnimationFrame(tick);
    }

    renderResultRecap({
      playerTag,
      xpEarned,
      previousLevelInfo,
      nextLevelInfo,
      levelUps,
      unlockedSongs,
      previousBestScore,
      newBestScore,
      previousXp,
      nextXp,
      previousNextSongId,
      nextSongId,
    }) {
      if (this.resultTagEl) {
        this.resultTagEl.textContent = playerTag;
      }
      if (this.resultXpEarnedEl) {
        this.resultXpEarnedEl.textContent = "+0";
        this.animateValue(0, xpEarned, 720, (value) => {
          this.resultXpEarnedEl.textContent = `+${Math.round(value)}`;
        });
      }
      if (this.resultLevelNowEl) {
        this.resultLevelNowEl.textContent = `Lv ${nextLevelInfo.level}`;
      }
      const sameLevel = previousLevelInfo.level === nextLevelInfo.level;
      const levelStartValue = sameLevel ? previousLevelInfo.currentLevelXp : 0;
      if (this.resultLevelDeltaEl) {
        this.resultLevelDeltaEl.textContent = `${Math.round(levelStartValue)} / ${nextLevelInfo.neededLevelXp}`;
      }
      if (this.resultLevelMetaEl) {
        const remaining = Math.max(0, nextLevelInfo.neededLevelXp - nextLevelInfo.currentLevelXp);
        this.resultLevelMetaEl.textContent =
          levelUps > 0
            ? `Level up! +${levelUps}. ${remaining} XP to Lv ${nextLevelInfo.level + 1}.`
            : `${remaining} XP to Lv ${nextLevelInfo.level + 1}.`;
      }

      const levelStartRatio = sameLevel ? previousLevelInfo.ratio : 0;
      if (sameLevel) {
        this.animateMeterFill(this.resultLevelFillEl, levelStartRatio, nextLevelInfo.ratio, 980);
      } else {
        this.animateMeterFill(
          this.resultLevelFillEl,
          Math.max(0, Math.min(1, previousLevelInfo.ratio)),
          1,
          620,
        );
        window.setTimeout(() => {
          this.animateMeterFill(this.resultLevelFillEl, 0, nextLevelInfo.ratio, 760);
        }, 660);
      }
      this.animateValue(levelStartValue, nextLevelInfo.currentLevelXp, 980, (value) => {
        if (this.resultLevelDeltaEl) {
          this.resultLevelDeltaEl.textContent = `${Math.round(value)} / ${nextLevelInfo.neededLevelXp}`;
        }
      });

      if (nextSongId) {
        const nextSong = SONG_THEMES[nextSongId];
        const nextSongProgress = this.getUnlockProgress(nextSongId, newBestScore, nextXp);
        const previousSongProgress =
          previousNextSongId === nextSongId
            ? this.getUnlockProgress(nextSongId, previousBestScore, previousXp)
            : { ratio: 0 };
        const scoreRemaining = Math.max(0, nextSongProgress.scoreRequirement - newBestScore);
        const xpRemaining = Math.max(0, nextSongProgress.xpRequirement - nextXp);
        const startPct = Math.round(previousSongProgress.ratio * 100);
        const endPct = Math.round(nextSongProgress.ratio * 100);

        if (this.resultSongDeltaEl) {
          this.resultSongDeltaEl.textContent = `${startPct}%`;
        }
        if (this.resultSongMetaEl) {
          this.resultSongMetaEl.textContent = `${nextSong.label}: ${scoreRemaining} score or ${xpRemaining} XP remaining.`;
        }
        this.animateMeterFill(
          this.resultSongFillEl,
          previousSongProgress.ratio,
          nextSongProgress.ratio,
          1080,
        );
        this.animateValue(startPct, endPct, 1080, (value) => {
          if (this.resultSongDeltaEl) {
            this.resultSongDeltaEl.textContent = `${Math.round(value)}%`;
          }
        });
      } else {
        const completionStart = previousNextSongId
          ? this.getUnlockProgress(previousNextSongId, previousBestScore, previousXp).ratio
          : 1;
        if (this.resultSongDeltaEl) {
          this.resultSongDeltaEl.textContent = `${Math.round(completionStart * 100)}%`;
        }
        if (this.resultSongMetaEl) {
          this.resultSongMetaEl.textContent = "Song ladder complete. All songs unlocked.";
        }
        this.animateMeterFill(this.resultSongFillEl, completionStart, 1, 640);
        this.animateValue(completionStart * 100, 100, 640, (value) => {
          if (this.resultSongDeltaEl) {
            this.resultSongDeltaEl.textContent = `${Math.round(value)}%`;
          }
        });
      }

      if (this.resultUnlocksEl) {
        let bannerText = "";
        if (unlockedSongs.length) {
          bannerText = `New unlock: ${unlockedSongs
            .map((songId) => SONG_THEMES[songId].label)
            .join(", ")}`;
        } else if (levelUps > 0) {
          bannerText = `Battle pass level increased to Lv ${nextLevelInfo.level}`;
        }

        if (bannerText) {
          this.resultUnlocksEl.textContent = bannerText;
          this.resultUnlocksEl.classList.remove("hidden");
        } else {
          this.resultUnlocksEl.textContent = "";
          this.resultUnlocksEl.classList.add("hidden");
        }
      }

      if (this.resultRecapPanelEl) {
        this.resultRecapPanelEl.classList.remove("celebrate");
        const celebrationValue = xpEarned >= 450 || levelUps > 0 || unlockedSongs.length > 0;
        if (celebrationValue) {
          this.resultRecapPanelEl.classList.add("celebrate");
          window.setTimeout(() => {
            if (this.resultRecapPanelEl) {
              this.resultRecapPanelEl.classList.remove("celebrate");
            }
          }, 900);
        }
      }
    }

    updatePauseButton() {
      if (!this.pauseButton) {
        return;
      }

      this.pauseButton.disabled = !this.running;
      this.pauseButton.textContent = this.paused ? "Resume" : "Pause";
    }

    refreshAudioState() {
      if (!this.audioStateEl) {
        return;
      }

      const state = this.song.contextState();
      if (this.paused) {
        this.audioStateEl.textContent = "Paused";
        return;
      }

      if (state === "running") {
        this.audioStateEl.textContent = "Live";
        return;
      }

      if (state === "fallback") {
        this.audioStateEl.textContent = "Silent";
        return;
      }

      this.audioStateEl.textContent = "Locked";
    }

    async probeAudio(playChime) {
      const volumeValue = this.volumeSlider
        ? Number.parseFloat(this.volumeSlider.value)
        : 0.72;
      this.song.setVolume(volumeValue);

      try {
        const state = await this.song.ensureRunning();
        if (state !== "running") {
          throw new Error(`Audio context is ${state}.`);
        }
      } catch (error) {
        this.refreshAudioState();
        this.showToast("Safari blocked audio. Click Test Sound, then Start.");
        // eslint-disable-next-line no-console
        console.error(error);
        return false;
      }

      if (playChime) {
        this.song.playUiChime();
      }

      this.refreshAudioState();
      return true;
    }

    attachEvents() {
      this.startButton.addEventListener("click", () => this.start());
      this.restartButton.addEventListener("click", () => this.start());

      if (this.resultMenuButton) {
        this.resultMenuButton.addEventListener("click", () => this.quitToTitle());
      }

      if (this.openProgressionButton) {
        this.openProgressionButton.addEventListener("click", () => this.openProgressionHub("start"));
      }

      if (this.openProgressionResultButton) {
        this.openProgressionResultButton.addEventListener("click", () =>
          this.openProgressionHub("result"),
        );
      }

      if (this.closeProgressionButton) {
        this.closeProgressionButton.addEventListener("click", () => this.closeProgressionHub());
      }

      if (this.testToneButton) {
        this.testToneButton.addEventListener("click", async () => {
          const ok = await this.probeAudio(true);
          if (ok) {
            this.showToast("Audio is live. Start when ready.");
          }
        });
      }

      if (this.pauseButton) {
        this.pauseButton.addEventListener("click", async () => {
          await this.togglePause();
        });
      }

      if (this.resumeButton) {
        this.resumeButton.addEventListener("click", async () => {
          await this.resumeRun();
        });
      }

      if (this.menuRestartButton) {
        this.menuRestartButton.addEventListener("click", () => this.start());
      }

      if (this.menuQuitButton) {
        this.menuQuitButton.addEventListener("click", () => this.quitToTitle());
      }

      if (this.songThemeSelect) {
        this.songThemeSelect.addEventListener("change", () => {
          if (this.running) {
            this.songThemeSelect.value = this.songProgress.selectedSong;
            this.showToast("Finish this run, then change songs.");
            return;
          }

          if (!this.isSongUnlocked(this.songThemeSelect.value)) {
            this.songThemeSelect.value = this.songProgress.selectedSong;
            this.showToast("That song is still locked. Earn more XP or hit a higher score.");
            return;
          }

          this.songProgress.selectedSong = this.songThemeSelect.value;
          this.applySelectedSongTheme();
          this.saveSongProgress();
          this.renderSongSelector();
          this.renderSongProgression();
          const effectiveBpm = this.getEffectiveBpm();
          this.showToast(
            `Song selected: ${SONG_THEMES[this.songProgress.selectedSong].label} (${effectiveBpm} BPM).`,
          );
        });
      }

      if (this.playerTagInput) {
        this.playerTagInput.addEventListener("input", () => {
          const nextTag = this.normalizePlayerTag(
            this.playerTagInput.value,
            this.songProgress.playerTag,
            false,
            true,
          );
          this.playerTagInput.value = nextTag;
        });

        this.playerTagInput.addEventListener("blur", () => {
          this.songProgress.playerTag = this.getPlayerTag(true);
          this.syncPlayerTagUi();
          this.saveSongProgress();
        });
      }

      if (this.clearLeaderboardButton) {
        this.clearLeaderboardButton.addEventListener("click", () => {
          if (!window.confirm("Clear all stored runs and leaderboard stats?")) {
            return;
          }

          this.clearLeaderboardData();
          this.showToast("Leaderboard cleared.");
        });
      }

      if (this.clearLeaderboardResultButton) {
        this.clearLeaderboardResultButton.addEventListener("click", () => {
          if (!window.confirm("Clear all stored runs and leaderboard stats?")) {
            return;
          }

          this.clearLeaderboardData();
          this.showToast("Leaderboard cleared.");
        });
      }

      if (this.difficultySelect) {
        this.difficultySelect.addEventListener("change", () => {
          if (this.running) {
            this.difficultySelect.value = this.currentDifficultyKey;
            this.showToast("Finish this run, then restart to switch mode.");
            return;
          }

          this.applyDifficulty(this.difficultySelect.value);
          this.applySelectedSongTheme();
          this.showToast(
            `${this.currentDifficulty.label} mode ready (${this.getEffectiveBpm()} BPM).`,
          );
        });
      }

      if (this.volumeSlider) {
        this.volumeSlider.addEventListener("input", () => {
          const value = Number.parseFloat(this.volumeSlider.value);
          this.song.setVolume(value);
          this.syncVolumeUi(value);
        });
      }

      if (this.menuVolumeSlider) {
        this.menuVolumeSlider.addEventListener("input", () => {
          const value = Number.parseFloat(this.menuVolumeSlider.value);
          this.song.setVolume(value);
          this.syncVolumeUi(value);
        });
      }

      document.addEventListener("visibilitychange", () => {
        this.refreshAudioState();
      });

      window.addEventListener("pointerdown", () => {
        const state = this.song.contextState();
        if (!this.paused && state !== "running" && state !== "fallback") {
          this.probeAudio(false);
        }
      });

      window.addEventListener("keydown", async (event) => {
        if (event.repeat) {
          return;
        }

        const key = event.key.toLowerCase();
        if (key === "escape" || key === "p") {
          if (this.running) {
            event.preventDefault();
            await this.togglePause();
          }
          return;
        }

        if (!this.running || this.paused) {
          return;
        }
      });
    }

    async start() {
      if (this.running) {
        this.abortRun();
      }

      this.songProgress.playerTag = this.getPlayerTag(true);
      this.syncPlayerTagUi();
      this.saveSongProgress();
      this.applyDifficulty(this.difficultySelect ? this.difficultySelect.value : "normal");
      this.applySelectedSongTheme();
      this.resetState();
      this.popupCounter = 0;
      this.running = true;
      this.paused = false;
      this.clearPopups();
      this.updateHud();
      this.resultOverlay.classList.add("hidden");
      if (this.resultRankEl) {
        this.resultRankEl.textContent = "";
      }
      if (this.resultProgressEl) {
        this.resultProgressEl.textContent = "";
      }
      if (this.menuOverlay) {
        this.menuOverlay.classList.add("hidden");
      }
      this.closeProgressionHub();
      this.startOverlay.classList.add("hidden");
      this.updatePauseButton();
      this.syncVolumeUi(
        this.volumeSlider ? Number.parseFloat(this.volumeSlider.value) : 0.72,
      );

      const audioReady = await this.probeAudio(false);
      let playbackMode = "audio";

      try {
        playbackMode = await this.song.start();
      } catch (error) {
        this.running = false;
        this.paused = false;
        this.updatePauseButton();
        this.startOverlay.classList.remove("hidden");
        this.showToast("Game failed to initialize. Refresh and try again.");
        // eslint-disable-next-line no-console
        console.error(error);
        return;
      }

      this.refreshAudioState();
      const selectedSong = SONG_THEMES[this.songProgress.selectedSong] || SONG_THEMES.classic;
      const effectiveBpm = this.getEffectiveBpm();
      if (!audioReady || playbackMode === "fallback") {
        this.showToast(
          `Connection active in silent mode. ${selectedSong.label} on ${this.currentDifficulty.label} at ${effectiveBpm} BPM.`,
        );
      } else {
        this.showToast(
          `Connection active. ${selectedSong.label} on ${this.currentDifficulty.label} at ${effectiveBpm} BPM.`,
        );
      }
    }

    abortRun() {
      this.running = false;
      this.paused = false;
      this.song.stop();
      this.clearPopups();
      if (this.menuOverlay) {
        this.menuOverlay.classList.add("hidden");
      }
      this.updatePauseButton();
      this.refreshAudioState();
    }

    async pauseRun() {
      if (!this.running || this.paused) {
        return;
      }

      this.paused = true;
      this.updatePauseButton();
      if (this.menuOverlay) {
        this.menuOverlay.classList.remove("hidden");
      }

      try {
        await this.song.pause();
      } catch (error) {
        this.paused = false;
        if (this.menuOverlay) {
          this.menuOverlay.classList.add("hidden");
        }
        this.updatePauseButton();
        this.showToast("Pause failed. Continuing run.");
        // eslint-disable-next-line no-console
        console.error(error);
        return;
      }

      this.refreshAudioState();
      this.showToast("Paused.");
    }

    async resumeRun() {
      if (!this.running || !this.paused) {
        return;
      }

      try {
        await this.song.resume();
      } catch (error) {
        this.showToast("Resume failed. Try restarting the run.");
        // eslint-disable-next-line no-console
        console.error(error);
        return;
      }

      this.paused = false;
      if (this.menuOverlay) {
        this.menuOverlay.classList.add("hidden");
      }
      this.updatePauseButton();
      this.refreshAudioState();
      this.showToast("Resumed.");
    }

    async togglePause() {
      if (!this.running) {
        return;
      }

      if (this.paused) {
        await this.resumeRun();
        return;
      }

      await this.pauseRun();
    }

    openProgressionHub(returnTarget = null) {
      if (this.running && !this.paused) {
        this.showToast("Pause or finish this run to open progression.");
        return;
      }

      this.progressReturnTarget = returnTarget;
      if (returnTarget === "result" && this.resultOverlay) {
        this.resultOverlay.classList.add("hidden");
      }
      this.renderSongProgression();
      if (this.progressOverlay) {
        this.progressOverlay.classList.remove("hidden");
      }
    }

    closeProgressionHub() {
      if (this.progressOverlay) {
        this.progressOverlay.classList.add("hidden");
      }
      if (this.progressReturnTarget === "result" && !this.running && this.resultOverlay) {
        this.resultOverlay.classList.remove("hidden");
      }
      this.progressReturnTarget = null;
    }

    quitToTitle() {
      this.abortRun();
      this.resetState();
      this.updateHud();
      this.beatEl.textContent = "0.0";
      this.resultOverlay.classList.add("hidden");
      this.closeProgressionHub();
      if (this.resultProgressEl) {
        this.resultProgressEl.textContent = "";
      }
      this.startOverlay.classList.remove("hidden");
      this.showToast("Returned to title.");
    }

    getNewlyUnlockedSongs(previousBestScore, nextBestScore, previousXp, nextXp) {
      return SONG_PROGRESS_ORDER.filter((songId) => {
        return (
          !this.isSongUnlocked(songId, previousBestScore, previousXp) &&
          this.isSongUnlocked(songId, nextBestScore, nextXp)
        );
      });
    }

    shouldSpawnOnStep(step) {
      const preset = this.currentDifficulty;

      if (step % preset.spawnEveryBeats !== 0) {
        return false;
      }

      if (preset.spawnChance < 1 && Math.random() > preset.spawnChance) {
        return false;
      }

      return true;
    }

    handleBeat(audioTime, step) {
      if (!this.running || this.paused) {
        return;
      }

      this.resolveExpired(audioTime);
      this.updateBeatDisplay(step);

      if (step < this.sessionBeats && this.shouldSpawnOnStep(step)) {
        this.spawnPopup(audioTime, step, step);

        if (
          this.currentDifficulty.extraSpawnChance > 0 &&
          Math.random() < this.currentDifficulty.extraSpawnChance
        ) {
          this.spawnPopup(audioTime, step, step + 31);
        }
      }

      if (step >= this.sessionBeats + 1) {
        this.finishRun();
      }
    }

    updateBeatDisplay(step) {
      const bar = Math.floor(step / 4) + 1;
      const beat = (step % 4) + 1;
      this.beatEl.textContent = `${bar}.${beat}`;
    }

    spawnPopup(audioTime, step, seed = step) {
      if (this.popups.size >= this.maxActivePopups) {
        const oldest = Array.from(this.popups.values()).sort(
          (a, b) => a.targetTime - b.targetTime,
        )[0];
        if (oldest) {
          this.registerMiss(oldest);
        }
      }

      const popup = document.createElement("article");
      popup.className = "popup";
      popup.style.setProperty(
        "--beat-duration",
        `${Math.round(
          this.song.beatDuration * 1000 * this.currentDifficulty.targetBeatsAhead,
        )}ms`,
      );

      const width = 220 + Math.floor(Math.random() * 90);
      popup.style.width = `${width}px`;

      const titleBar = document.createElement("div");
      titleBar.className = "title-bar";

      const windowTitle = document.createElement("span");
      windowTitle.className = "window-title";
      windowTitle.textContent =
        this.popupTitles[seed % this.popupTitles.length] +
        ` ${100 + ((seed * 17) % 900)}`;

      const closeHitbox = document.createElement("button");
      closeHitbox.className = "close-hitbox";
      closeHitbox.type = "button";
      closeHitbox.setAttribute("aria-label", "Close popup on beat");

      const closeBtn = document.createElement("span");
      closeBtn.className = "close-btn";
      closeBtn.textContent = "X";
      closeBtn.setAttribute("aria-hidden", "true");

      closeHitbox.append(closeBtn);
      titleBar.append(windowTitle, closeHitbox);

      const body = document.createElement("div");
      body.className = "popup-body";

      const p = document.createElement("p");
      p.textContent = this.popupMessages[seed % this.popupMessages.length];

      const targetStep = step + this.currentDifficulty.targetBeatsAhead;
      const targetBar = Math.floor(targetStep / 4) + 1;
      const targetBeat = (targetStep % 4) + 1;
      const small = document.createElement("small");
      small.textContent = `Target: bar ${targetBar}, beat ${targetBeat}`;

      body.append(p, small);

      const ring = document.createElement("div");
      ring.className = "approach-ring";

      popup.append(titleBar, body, ring);

      const rect = this.playfield.getBoundingClientRect();
      const maxX = Math.max(18, rect.width - width - 18);
      const maxY = Math.max(18, rect.height - 178);
      const x = 18 + Math.random() * Math.max(0, maxX - 18);
      const y = 18 + Math.random() * Math.max(0, maxY - 18);
      popup.style.left = `${Math.round(x)}px`;
      popup.style.top = `${Math.round(y)}px`;

      const popupData = {
        id: this.popupCounter + 1,
        el: popup,
        targetTime:
          audioTime +
          this.song.beatDuration * this.currentDifficulty.targetBeatsAhead,
        resolved: false,
      };
      this.popupCounter += 1;

      closeHitbox.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.judgePopup(popupData);
      });

      this.popups.set(popupData.id, popupData);
      this.playfield.append(popup);

      window.requestAnimationFrame(() => {
        popup.classList.add("active");
      });
    }

    judgePopup(popupData) {
      if (!this.running || this.paused || !popupData || popupData.resolved) {
        return;
      }

      const delta = this.song.now() - popupData.targetTime;
      const absDelta = Math.abs(delta);

      if (absDelta <= this.judgementWindow) {
        let label = "GOOD";
        let base = 120;
        let comboStep = 9;
        let comboCap = 180;

        if (absDelta <= this.currentDifficulty.perfectWindow) {
          label = "PERFECT";
          base = 360;
          comboStep = 16;
          comboCap = 320;
        } else if (absDelta <= this.currentDifficulty.greatWindow) {
          label = "GREAT";
          base = 230;
          comboStep = 12;
          comboCap = 250;
        }

        this.state.combo += 1;
        this.state.maxCombo = Math.max(this.state.maxCombo, this.state.combo);
        this.state.hits += 1;
        this.state.judged += 1;
        this.state.score +=
          (base + Math.min((this.state.combo - 1) * comboStep, comboCap)) *
          this.currentDifficulty.scoreMultiplier;

        popupData.resolved = true;
        if (popupData.el) {
          popupData.el.classList.add("hit", `hit-${label.toLowerCase()}`);
        }
        this.showJudgement(label, popupData.el, label);
        this.song.playHitAccent(label);
        this.removePopup(popupData, 210);
        this.updateHud();
        return;
      }

      this.registerMiss(popupData);
    }

    resolveExpired(audioTime) {
      for (const popupData of this.popups.values()) {
        if (
          !popupData.resolved &&
          audioTime > popupData.targetTime + this.judgementWindow
        ) {
          this.registerMiss(popupData);
        }
      }
    }

    registerMiss(popupData) {
      if (!popupData || popupData.resolved) {
        return;
      }

      popupData.resolved = true;
      this.state.combo = 0;
      this.state.misses += 1;
      this.state.judged += 1;

      if (popupData.el) {
        popupData.el.classList.add("miss");
      }
      this.showJudgement("MISS", popupData.el, "miss");
      this.removePopup(popupData, 280);
      this.updateHud();
    }

    removePopup(popupData, delayMs) {
      if (!popupData) {
        return;
      }

      this.popups.delete(popupData.id);
      window.setTimeout(() => {
        if (popupData.el) {
          popupData.el.remove();
        }
      }, delayMs);
    }

    showJudgement(text, anchor, tier = "good") {
      const badge = document.createElement("div");
      const tierClass = typeof tier === "string" ? tier.toLowerCase() : "good";
      badge.className = `judgement ${tierClass}`;
      badge.textContent = text;

      if (anchor && typeof anchor.getBoundingClientRect === "function") {
        const bounds = anchor.getBoundingClientRect();
        badge.style.left = `${bounds.left + bounds.width / 2}px`;
        badge.style.top = `${Math.max(65, bounds.top - 10)}px`;
      } else if (
        anchor &&
        Number.isFinite(anchor.x) &&
        Number.isFinite(anchor.y)
      ) {
        badge.style.left = `${anchor.x}px`;
        badge.style.top = `${Math.max(65, anchor.y)}px`;
      } else {
        badge.style.left = `${window.innerWidth / 2}px`;
        badge.style.top = "72px";
      }

      document.body.append(badge);

      window.setTimeout(() => badge.remove(), 820);
    }

    updateHud() {
      this.scoreEl.textContent = `${Math.round(this.state.score)}`;
      this.comboEl.textContent = `${this.state.combo}`;

      const accuracy = this.state.judged
        ? (this.state.hits / this.state.judged) * 100
        : 100;

      this.accuracyEl.textContent = `${accuracy.toFixed(1)}%`;
    }

    finishRun() {
      if (!this.running) {
        return;
      }

      this.running = false;
      this.paused = false;
      if (this.menuOverlay) {
        this.menuOverlay.classList.add("hidden");
      }
      this.updatePauseButton();

      for (const popupData of Array.from(this.popups.values())) {
        if (!popupData.resolved) {
          this.registerMiss(popupData);
        }
      }

      this.song.stop();

      const accuracy = this.state.judged
        ? (this.state.hits / this.state.judged) * 100
        : 100;
      const runSummary = {
        score: Math.round(this.state.score),
        hits: this.state.hits,
        misses: this.state.misses,
        maxCombo: this.state.maxCombo,
        accuracy,
        difficulty: this.currentDifficultyKey,
      };
      const previousBestScore = this.getBestScore();
      const previousXp = this.songProgress.totalXp;
      const previousLevelInfo = this.getLevelInfo(previousXp);
      const previousLevel = previousLevelInfo.level;
      const previousNextSongId = this.getNextLockedSong(previousBestScore, previousXp);
      const playerTag = this.getPlayerTag(true);
      const xpEarned = this.calculateRunXp(runSummary);
      const nextXp = previousXp + xpEarned;
      this.songProgress.playerTag = playerTag;

      const runRecord = this.addRunToHistory({
        id: `${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
        tag: playerTag,
        score: runSummary.score,
        hits: runSummary.hits,
        misses: runSummary.misses,
        maxCombo: runSummary.maxCombo,
        accuracy: runSummary.accuracy,
        difficulty: runSummary.difficulty,
        playedAt: Date.now(),
      });
      const newBestScore = this.getBestScore();
      this.songProgress.totalXp = nextXp;
      const levelInfo = this.getLevelInfo(this.songProgress.totalXp);
      const levelUps = Math.max(0, levelInfo.level - previousLevel);
      const unlockedSongs = this.getNewlyUnlockedSongs(
        previousBestScore,
        newBestScore,
        previousXp,
        this.songProgress.totalXp,
      );

      if (unlockedSongs.length) {
        this.songProgress.selectedSong = unlockedSongs[unlockedSongs.length - 1];
      }
      this.alignSelectedSong();
      this.applySelectedSongTheme();
      this.syncPlayerTagUi();
      this.saveSongProgress();
      this.renderSongSelector();
      this.renderSongProgression();

      this.resultStatsEl.textContent = `${this.currentDifficulty.label} | Score ${Math.round(
        this.state.score,
      )} | Hits ${this.state.hits} | Misses ${this.state.misses} | Max Combo ${
        this.state.maxCombo
      } | Accuracy ${accuracy.toFixed(1)}% | XP +${xpEarned} | Lv ${levelInfo.level}`;
      if (this.resultRankEl) {
        if (runRecord && runRecord.rank > 0) {
          const rankLabel =
            runRecord.rank <= LEADERBOARD_LIMIT
              ? `Leaderboard Rank: #${runRecord.rank}`
              : `Global Rank: #${runRecord.rank} (top ${LEADERBOARD_LIMIT} shown)`;
          this.resultRankEl.textContent = rankLabel;
        } else {
          this.resultRankEl.textContent = "";
        }
      }
      if (this.resultProgressEl) {
        const nextSongId = this.getNextLockedSong(newBestScore, this.songProgress.totalXp);
        const levelText =
          levelUps > 0
            ? `Level up! +${levelUps} to Lv ${levelInfo.level}.`
            : `Progress gained: +${xpEarned} XP.`;
        const unlockedText = unlockedSongs.length
          ? `Unlocked: ${unlockedSongs.map((songId) => SONG_THEMES[songId].label).join(", ")}`
          : "No new song unlocked this run.";
        const nextText = nextSongId ? `Next unlock target: ${SONG_THEMES[nextSongId].label}.` : "All songs unlocked.";
        this.resultProgressEl.textContent = `${levelText} ${unlockedText} ${nextText}`;
      }

      const recapPayload = {
        playerTag,
        xpEarned,
        previousLevelInfo,
        nextLevelInfo: levelInfo,
        levelUps,
        unlockedSongs,
        previousBestScore,
        newBestScore,
        previousXp,
        nextXp: this.songProgress.totalXp,
        previousNextSongId,
        nextSongId: this.getNextLockedSong(newBestScore, this.songProgress.totalXp),
      };

      this.resultOverlay.classList.remove("hidden");
      this.refreshAudioState();
      window.requestAnimationFrame(() => {
        this.renderResultRecap(recapPayload);
      });
      if (unlockedSongs.length) {
        this.showToast(
          `Run saved. New song unlocked: ${unlockedSongs
            .map((songId) => SONG_THEMES[songId].label)
            .join(", ")}.`,
        );
      } else if (levelUps > 0) {
        this.showToast(`Run saved. Level up to Lv ${levelInfo.level}.`);
      } else if (runRecord && runRecord.rank > 0) {
        this.showToast(`Run saved. Current rank #${runRecord.rank}.`);
      } else {
        this.showToast("Run saved.");
      }
    }

    clearPopups() {
      for (const popupData of this.popups.values()) {
        if (popupData.el) {
          popupData.el.remove();
        }
      }
      this.popups.clear();
    }

    showToast(message) {
      if (this.toastTimer) {
        window.clearTimeout(this.toastTimer);
      }

      this.toastEl.textContent = message;
      this.toastEl.classList.add("show");

      this.toastTimer = window.setTimeout(() => {
        this.toastEl.classList.remove("show");
      }, 1800);
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    // Construct once; all state resets are handled by start().
    new PopupBeatGame();
  });
})();
