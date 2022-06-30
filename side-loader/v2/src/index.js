window._snw_audio_player_v2 = function (d, w, i) {
    d.addEventListener("DOMContentLoaded", function () {
        var container = d.getElementById(i);
        var player = d.querySelector("audio");
        player.addEventListener("playing", function () {
            console.log("playing...");
            if (container.querySelector("small .fa-circle-notch")) {
                b = container.querySelector("small .fa-circle-notch");
                b.classList.remove("fa-circle-notch", "fa-spin");
                b.classList.add("fa-pause");
            } else if (container.querySelector("small .fa-play")) {
                b = container.querySelector("small .fa-play");
                b.classList.remove("fa-play");
                b.classList.add("fa-pause");
            }
        });

        player.addEventListener("waiting", function () {
            console.log("waiting...");
            if (container.querySelector("small .fa-play")) {
                b = container.querySelector("small .fa-play");
                b.classList.remove("fa-play");
                b.classList.add("fa-circle-notch", "fa-spin");
            } else if (container.querySelector("small .fa-pause")) {
                b = container.querySelector("small .fa-pause");
                b.classList.remove("fa-pause");
                b.classList.add("fa-circle-notch", "fa-spin");
            }
        });

        player.addEventListener("pause", function () {
            console.log("paused...");
            if (container.querySelector("small .fa-pause")) {
                b = container.querySelector("small .fa-pause");
                b.classList.remove("fa-pause");
                b.classList.add("fa-play");
            } else if (container.querySelector("small .fa-circle-notch")) {
                b = container.querySelector("small .fa-circle-notch");
                b.classList.remove("fa-circle-notch", "fa-spin");
                b.classList.add("fa-pause");
            }
        });

        container
            .querySelector("[data-player-action='play-pause']")
            .addEventListener("click", function (e) {
                e.preventDefault();
                var b;
                if (player.paused) {
                    player.play();
                } else {
                    player.pause();
                }
            });
        container
            .querySelector("[data-player-action='vol-down']")
            .addEventListener("click", function (e) {
                e.preventDefault();
                if (parseFloat(player.volume) === 0) {
                    return;
                }
                player.volume = parseFloat(player.volume) - 0.1;
                container.querySelector(
                    "[data-player-action='vol-range']"
                ).value = player.volume;
            });
        container
            .querySelector("[data-player-action='vol-up']")
            .addEventListener("click", function (e) {
                e.preventDefault();
                if (parseFloat(player.volume) === 1) {
                    return;
                }
                player.volume = parseFloat(player.volume) + 0.1;
                container.querySelector(
                    "[data-player-action='vol-range']"
                ).value = player.volume;
            });
        container
            .querySelector("[data-player-action='vol-range']")
            .addEventListener("change", function (e) {
                e.preventDefault();
                var v = parseFloat(this.value);
                if (v > 1 || v < 0) {
                    return;
                }
                player.volume = v;
            });
    });
};
