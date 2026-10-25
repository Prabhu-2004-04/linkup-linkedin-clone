const toast = document.querySelector("#toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

// Search by job title, company, or skills.
const globalSearch = document.querySelector("#globalSearch");
const clearSearch = document.querySelector("#clearSearch");
function filterJobs() {
  const query = globalSearch.value.trim().toLowerCase();
  clearSearch.classList.toggle("visible", query.length > 0);
  document.querySelectorAll(".job-card").forEach((card) => {
    card.hidden = !card.dataset.search.includes(query) && !card.textContent.toLowerCase().includes(query);
  });
  document.querySelectorAll(".filter").forEach((button) => button.classList.remove("active"));
  document.querySelector('[data-filter="all"]').classList.add("active");
}
globalSearch.addEventListener("input", filterJobs);
clearSearch.addEventListener("click", () => {
  globalSearch.value = "";
  filterJobs();
  globalSearch.focus();
});

// Category filters.
document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    globalSearch.value = "";
    clearSearch.classList.remove("visible");
    const category = button.dataset.filter;
    document.querySelectorAll(".job-card").forEach((card) => {
      card.hidden = category !== "all" && !card.dataset.category.split(" ").includes(category);
    });
  });
});

// Save jobs locally for this page session.
let savedCount = 0;
document.querySelectorAll(".save-job").forEach((button) => {
  button.addEventListener("click", () => {
    const saved = button.classList.toggle("saved");
    button.setAttribute("aria-pressed", String(saved));
    button.textContent = saved ? "▣" : "♧";
    savedCount += saved ? 1 : -1;
    document.querySelector("#savedCountSide").textContent = savedCount;
    showToast(saved ? "Job saved in this demo" : "Job removed from saved");
  });
});

// Post interaction buttons.
document.querySelectorAll(".post-like").forEach((button) => {
  button.addEventListener("click", () => {
    const liked = button.classList.toggle("liked");
    button.innerHTML = `${liked ? "♥" : "♡"} <span>${liked ? "Liked" : "Like"}</span>`;
  });
});
document.querySelectorAll(".comment-action").forEach((button) => {
  button.addEventListener("click", () => {
    const box = button.closest(".feed-post").querySelector(".comment-box");
    box.classList.toggle("open");
    if (box.classList.contains("open")) box.querySelector("input").focus();
  });
});
document.querySelectorAll(".comment-box").forEach((box) => {
  box.querySelector("button").addEventListener("click", () => {
    const input = box.querySelector("input");
    if (!input.value.trim()) return;
    showToast("Comment added in demo mode");
    input.value = "";
    box.classList.remove("open");
  });
});
document.querySelectorAll(".share-action").forEach((button) => {
  button.addEventListener("click", () => showToast("Share action is a UI demo"));
});

// Local create-post dialog.
const postDialog = document.querySelector("#postDialog");
const postText = document.querySelector("#postText");
const charCount = document.querySelector("#charCount");
function openPostDialog() {
  if (postDialog.showModal) postDialog.showModal();
  else showToast("Your browser does not support the post dialog.");
}
document.querySelector("#openPost").addEventListener("click", openPostDialog);
document.querySelector("#writePost").addEventListener("click", openPostDialog);
document.querySelector("#closeDialog").addEventListener("click", () => postDialog.close());
postText.addEventListener("input", () => charCount.textContent = `${postText.value.length} / 280`);
document.querySelector("#postForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const content = postText.value.trim();
  if (!content) return;
  const post = document.createElement("article");
  post.className = "feed-post";
  const header = document.createElement("header");
  header.innerHTML = '<div class="company-logo logo-blue">P</div><div><b>Prabanjan U V</b><small>Just now · Your post</small></div>';
  const paragraph = document.createElement("p");
  paragraph.textContent = content;
  const tagline = document.createElement("div");
  tagline.className = "post-tags";
  tagline.innerHTML = "<span>#MyUpdate</span>";
  const actions = document.createElement("div");
  actions.className = "post-actions";
  actions.innerHTML = '<button class="post-like">♡ <span>Like</span></button><button class="share-action">➤ Share</button>';
  actions.querySelector(".post-like").addEventListener("click", (e) => {
    const liked = e.currentTarget.classList.toggle("liked");
    e.currentTarget.innerHTML = `${liked ? "♥" : "♡"} <span>${liked ? "Liked" : "Like"}</span>`;
  });
  actions.querySelector(".share-action").addEventListener("click", () => showToast("Share action is a UI demo"));
  post.append(header, paragraph, tagline, actions);
  document.querySelector(".feed-tools").after(post);
  postDialog.close();
  postText.value = "";
  charCount.textContent = "0 / 280";
  showToast("Your post was added to the demo feed");
  post.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelector("#photoBtn").addEventListener("click", () => showToast("Photo upload needs a backend; demo only"));
document.querySelector("#eventBtn").addEventListener("click", () => showToast("Event creation is a UI demo"));
document.querySelector("#sortFeed").addEventListener("click", () => showToast("Feed sorted by relevance (demo)"));
document.querySelector("#meBtn").addEventListener("click", () => showToast("Profile menu is a UI demo"));
