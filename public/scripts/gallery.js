const dataEl = document.getElementById("gallery-data");
const grid = document.getElementById("project-grid");
const trigger = document.getElementById("load-more-trigger");

if (!dataEl || !grid || !trigger) {
  console.warn("Gallery script: elementos no encontrados");
} else {
  const data = JSON.parse(dataEl.textContent);

  let currentIndex = 12;
  const STEP = 8;
  let isLoading = false;

  function createItem(g, i) {
    const div = document.createElement("div");
    div.className = `project-grid__item ${g.layout}`;

    const img = document.createElement("img");
    img.src = g.src;
    img.alt = `vista ${i + 1}`;
    img.loading = "lazy";

    div.appendChild(img);
    return div;
  }

  function loadMore() {
    if (isLoading) return;
    isLoading = true;

    const nextItems = data.slice(currentIndex, currentIndex + STEP);

    nextItems.forEach((g, i) => {
      const el = createItem(g, currentIndex + i);
      grid.appendChild(el);
    });

    currentIndex += STEP;
    isLoading = false;

    if (currentIndex >= data.length) {
      observer.disconnect();
    }
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  }, {
    rootMargin: "200px"
  });

  observer.observe(trigger);
}