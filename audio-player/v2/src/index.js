window._snw_side_loader_v2 = function (w, d, l, h) {
    function init() {
        scanLinks(null);
    }

    function scanLinks(parent) {
        var baseUrl = l.protocol + "//" + l.host;
        var doc = d;
        if (parent !== undefined && parent !== null) {
            var doc = d.querySelector(parent);
        }

        var links = doc.querySelectorAll('a[href^="' + baseUrl + '"]');
        for (var i = 0; i < links.length; i++) {
            if (links[i].getAttribute("data-href") !== null) {
                continue;
            }
            links[i].addEventListener("click", handleInternalLink);
            links[i].setAttribute("data-href", links[i].href);
        }
    }

    function handleInternalLink(e) {
        e.preventDefault();
        e.stopPropagation();
        var url = this.getAttribute("data-href");

        const headers = new Headers();
        headers.append(
            "Accept",
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
        );
        headers.append("Accept-Encoding", "gzip, deflate, br");
        headers.append("User-Agent", w.navigator.userAgent);

        const req = new Request(url);
        d.body.style.cursor = "wait";

        fetch(req, {
            method: "GET",
            headers: headers,
        })
            .then(function (resp) {
                return resp.text();
            })
            .then(function (str) {
                try {
                    replace(
                        str,
                        url
                            .replace(l.protocol + "//" + l.host, "")
                            .replace(/^\/{2,}/, "/")
                    );
                } catch (e) {
                    throw new Error(e);
                }
            })
            .catch(function (err) {
                // failed to load, so just navigate to the page
                w.location.href = url;
                d.body.style.cursor = "inherit";
            });
    }

    function replace(str, url) {
        var p = new DOMParser();
        var doc = p.parseFromString(str, "text/html");
        var nodes = doc.querySelectorAll("[data-replaceable-content='true']");
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var id = node.getAttribute("id");

            var nodeToReplace = d.getElementById(id);
            while (nodeToReplace.firstChild) {
                nodeToReplace.removeChild(nodeToReplace.firstChild);
            }

            for (var j = 0; j < node.childNodes.length; j++) {
                nodeToReplace.appendChild(node.childNodes[j].cloneNode(true));
            }
        }

        h.pushState({}, null, url);
        w.scrollTo(0, 0);
        d.body.style.cursor = "inherit";
        scanLinks("#" + id);
    }

    d.addEventListener("DOMContentLoaded", function () {
        init();
    });
};
