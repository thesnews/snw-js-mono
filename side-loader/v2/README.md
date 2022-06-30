```
    <div id="my-live-player" class="d-inline-block">
        <audio class="sr-only" controls="controls" src="https://path/to/stream">
            Your browser does not support the audio element.
        </audio>
        <div class="d-flex align-items-center justify-content-center">
            <button data-player-action="play-pause" class="snw-player-unstyled pr-2"><small><i class="fas fa-play"></i></small></button>
            <button data-player-action="vol-down" class="snw-player-unstyled pr-1"><small><i class="fas fa-minus"></i></small></button>
            <button data-player-action="vol-up" class="snw-player-unstyled pr-1"><small><i class="fas fa-plus"></i></small></button>
            <input type="range" data-player-action="vol-range" min="0" max="1" value="1" step="0.1" />
        </div>
    </div>
```

```
    window._snw_audio_player_v2(document, window, "my-live-player");
```
