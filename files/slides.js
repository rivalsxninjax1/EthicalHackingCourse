(function () {
  const S = [...document.querySelectorAll(".slide")];
  let i = 0;
  const bar = document.createElement("div");
  bar.id = "bar";
  const ctr = document.createElement("div");
  ctr.id = "ctr";
  const home = document.createElement("a");
  home.id = "home";
  home.href = "index.html";
  home.textContent = "☰ Index";
  document.body.append(bar, ctr, home);
  function show(n, all) {
    i = Math.max(0, Math.min(S.length - 1, n));
    S.forEach((s, k) => s.classList.toggle("on", k === i));
    S[i]
      .querySelectorAll(".reveal")
      .forEach((e) => e.classList.toggle("show", !!all));
    bar.style.width = ((i + 1) / S.length) * 100 + "%";
    ctr.textContent =
      i + 1 + " / " + S.length + "   ← → Space · F fullscreen · N notes";
    history.replaceState(null, "", "#" + (i + 1));
  }
  function next() {
    const h = S[i].querySelector(".reveal:not(.show)");
    if (h) h.classList.add("show");
    else if (i < S.length - 1) show(i + 1);
  }
  function prev() {
    const sh = [...S[i].querySelectorAll(".reveal.show")];
    if (sh.length) sh.pop().classList.remove("show");
    else if (i > 0) show(i - 1, true);
  }
  addEventListener("keydown", (e) => {
    const k = e.key;
    if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(k)) {
      e.preventDefault();
      next();
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(k)) {
      e.preventDefault();
      prev();
    } else if (k === "f")
      document.fullscreenElement
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen();
    else if (k === "n") document.body.classList.toggle("shownotes");
    else if (k === "Home") show(0);
    else if (k === "End") show(S.length - 1, true);
  });
  addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    e.clientX < innerWidth * 0.2 ? prev() : next();
  });
  show((parseInt(location.hash.slice(1)) || 1) - 1);
})();
