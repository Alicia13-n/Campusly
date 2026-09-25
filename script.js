// ===============================
// AUTHENTICATION
// ===============================

const authScreen = document.getElementById("authScreen");
const loginCard = document.getElementById("loginCard");
const registerCard = document.getElementById("registerCard");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

if (showRegister) {
  showRegister.addEventListener("click", function () {
    loginCard.classList.add("hidden");
    registerCard.classList.remove("hidden");
  });
}

if (showLogin) {
  showLogin.addEventListener("click", function () {
    registerCard.classList.add("hidden");
    loginCard.classList.remove("hidden");
  });
}


// ===============================
// DEMO ACCOUNT
// ===============================

const demoBtn = document.getElementById("demoBtn");

if (demoBtn) {
  demoBtn.addEventListener("click", function () {

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    if (email) {
      email.value = "demo@campusly.com";
    }

    if (password) {
      password.value = "campusly123";
    }

    if (authScreen) {
      authScreen.style.display = "none";
    }

  });
}


// ===============================
// LOGIN VALIDATION
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");
    const error = document.getElementById("loginError");

    if (
      !email ||
      !password ||
      !email.value.trim() ||
      !password.value.trim()
    ) {

      if (error) {
        error.textContent = "Fill details first!";
      }

      return;
    }

    if (error) {
      error.textContent = "";
    }

    if (authScreen) {
      authScreen.style.display = "none";
    }

  });
}


// ===============================
// REGISTER VALIDATION
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("regName");
    const course = document.getElementById("regCourse");
    const email = document.getElementById("regEmail");
    const password = document.getElementById("regPassword");
    const confirm = document.getElementById("regConfirm");
    const terms = document.getElementById("terms");
    const error = document.getElementById("registerError");

    if (
      !name ||
      !course ||
      !email ||
      !password ||
      !confirm
    ) {
      return;
    }

    if (
      !name.value.trim() ||
      !course.value.trim() ||
      !email.value.trim() ||
      !password.value.trim() ||
      !confirm.value.trim()
    ) {

      if (error) {
        error.textContent = "Please fill in all details.";
      }

      return;
    }

    if (password.value.length < 6) {

      if (error) {
        error.textContent = "Password must be at least 6 characters.";
      }

      return;
    }

    if (password.value !== confirm.value) {

      if (error) {
        error.textContent = "Passwords do not match.";
      }

      return;
    }

    if (terms && !terms.checked) {

      if (error) {
        error.textContent = "Please accept the community guidelines.";
      }

      return;
    }

    if (error) {
      error.textContent = "Account created successfully!";
    }

  });
}


// ===============================
// FORGOT PASSWORD
// ===============================

const forgotBtn = document.getElementById("forgotBtn");

if (forgotBtn) {

  forgotBtn.addEventListener("click", function () {

    alert("Password reset link would be sent to your email.");

  });

}


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

const passwordButtons = document.querySelectorAll(".show-pass");

passwordButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const targetId = button.dataset.target;
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    if (target.type === "password") {

      target.type = "text";
      button.textContent = "Hide";

    } else {

      target.type = "password";
      button.textContent = "Show";

    }

  });

});


// ===============================
// LOGOUT
// ===============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", function () {

    if (authScreen) {
      authScreen.style.display = "flex";
    }

    if (loginCard) {
      loginCard.classList.remove("hidden");
    }

    if (registerCard) {
      registerCard.classList.add("hidden");
    }

  });

}


// ===============================
// POST COMPOSER
// ===============================

const postInput = document.getElementById("postInput");
const postBtn = document.getElementById("postBtn");
const postsContainer = document.getElementById("posts");

if (postBtn && postInput && postsContainer) {

  postBtn.addEventListener("click", function () {

    const text = postInput.value.trim();

    if (!text) {

      alert("Write something first!");

      return;
    }

    const post = document.createElement("article");

    post.className = "post";
    post.dataset.cat = "Academic";

    post.innerHTML =
      '<div class="head">' +
        '<span class="avatar me">B</span>' +

        '<div>' +
          '<b>Bandile</b>' +
          '<small>Just now · Computer Science</small>' +
        '</div>' +

        '<button class="more">' +
          '<i class="fa-solid fa-ellipsis"></i>' +
        '</button>' +

      '</div>' +

      '<p>' + escapeHTML(text) + '</p>' +

      '<div class="post-actions">' +

        '<button class="like">' +
          '<i class="fa-solid fa-heart"></i>' +
          '<span>0</span>' +
        '</button>' +

        '<button class="comment">' +
          '<i class="fa-regular fa-comment"></i>' +
          '<span>0</span>' +
        '</button>' +

        '<button class="share">' +
          '<i class="fa-solid fa-share"></i>' +
          '<span>Share</span>' +
        '</button>' +

        '<button class="save">' +
          '<i class="fa-regular fa-bookmark"></i>' +
        '</button>' +

      '</div>';

    postsContainer.prepend(post);

    postInput.value = "";

    setupPostButtons(post);

  });

}


// ===============================
// ESCAPE POST TEXT
// ===============================

function escapeHTML(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


// ===============================
// PHOTO
// ===============================

const photoBtn = document.getElementById("photoBtn");
const photoInput = document.getElementById("photoInput");

if (photoBtn && photoInput) {

  photoBtn.addEventListener("click", function () {

    photoInput.click();

  });

  photoInput.addEventListener("change", function () {

    if (photoInput.files.length > 0 && postInput) {

      postInput.value =
        "📷 " + photoInput.files[0].name;

    }

  });

}


// ===============================
// POLL
// ===============================

const pollBtn = document.getElementById("pollBtn");

if (pollBtn) {

  pollBtn.addEventListener("click", function () {

    const question = prompt("What do you want to ask?");

    if (!question) {
      return;
    }

    if (postInput) {

      postInput.value =
        "📊 Poll: " + question;

      postInput.focus();

    }

  });

}


// ===============================
// EVENT COMPOSER
// ===============================

const eventBtn = document.getElementById("eventBtn");

if (eventBtn) {

  eventBtn.addEventListener("click", function () {

    const eventName = prompt("What is the event name?");

    if (!eventName) {
      return;
    }

    if (postInput) {

      postInput.value =
        "📅 Event: " + eventName;

      postInput.focus();

    }

  });

}


// ===============================
// FEELING
// ===============================

const feelingBtn = document.getElementById("feelingBtn");

if (feelingBtn) {

  feelingBtn.addEventListener("click", function () {

    const feeling = prompt("How are you feeling?");

    if (!feeling) {
      return;
    }

    if (postInput) {

      postInput.value =
        "😊 Feeling " + feeling;

      postInput.focus();

    }

  });

}


// ===============================
// FOCUS POST
// ===============================

const focusPost = document.getElementById("focusPost");

if (focusPost) {

  focusPost.addEventListener("click", function () {

    if (postInput) {

      postInput.focus();

      postInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }

  });

}


// ===============================
// POST BUTTONS
// ===============================

function setupPostButtons(container) {

  if (!container) {
    container = document;
  }

  const likes = container.querySelectorAll(".like");

  likes.forEach(function (button) {

    if (button.dataset.ready) {
      return;
    }

    button.dataset.ready = "true";

    button.addEventListener("click", function () {

      const count = button.querySelector("span");

      if (!count) {
        return;
      }

      let number =
        parseInt(count.textContent, 10) || 0;

      if (button.classList.contains("liked")) {

        number--;
        button.classList.remove("liked");

      } else {

        number++;
        button.classList.add("liked");

      }

      count.textContent = number;

    });

  });


  const comments = container.querySelectorAll(".comment");

  comments.forEach(function (button) {

    if (button.dataset.ready) {
      return;
    }

    button.dataset.ready = "true";

    button.addEventListener("click", function () {

      const comment = prompt("Write a comment:");

      if (!comment) {
        return;
      }

      const count = button.querySelector("span");

      if (count) {

        let number =
          parseInt(count.textContent, 10) || 0;

        count.textContent = number + 1;

      }

      alert("Comment added!");

    });

  });


  const shareButtons =
    container.querySelectorAll(".share");

  shareButtons.forEach(function (button) {

    if (button.dataset.ready) {
      return;
    }

    button.dataset.ready = "true";

    button.addEventListener("click", function () {

      alert("Post shared!");

    });

  });


  const saves =
    container.querySelectorAll(".save");

  saves.forEach(function (button) {

    if (button.dataset.ready) {
      return;
    }

    button.dataset.ready = "true";

    button.addEventListener("click", function () {

      button.classList.toggle("saved");

      const icon = button.querySelector("i");

      if (icon) {

        if (button.classList.contains("saved")) {

          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");

        } else {

          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");

        }

      }

    });

  });

}

setupPostButtons(document);


// ===============================
// SIDEBAR NAVIGATION
// ===============================

const navButtons =
  document.querySelectorAll(".nav");

navButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    navButtons.forEach(function (btn) {

      btn.classList.remove("active");

    });

    button.classList.add("active");

    const span =
      button.querySelector("span");

    const section =
      span ? span.textContent.trim() : "";

    if (section === "Home") {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

    if (section === "Explore") {

      alert("Explore section selected!");

    }

    if (section === "Messages") {
      openMessages();
    }

    if (section === "Profile") {
      openProfile("Bandile Dlamini");
    }

    if (section === "Saved") {

      alert("Saved posts are shown here!");

    }

  });

});


// ===============================
// EVENTS POPUP
// ===============================

const eventsNav =
  Array.from(navButtons).find(function (button) {

    const span = button.querySelector("span");

    return span &&
      span.textContent.trim() === "Events";

  });

const eventsModal =
  document.getElementById("eventsModal");

const closeEvents =
  document.getElementById("closeEvents");

if (eventsNav && eventsModal) {

  eventsNav.addEventListener("click", function () {

    eventsModal.style.display = "flex";

  });

}

if (closeEvents && eventsModal) {

  closeEvents.addEventListener("click", function () {

    eventsModal.style.display = "none";

  });

}

if (eventsModal) {

  eventsModal.addEventListener("click", function (e) {

    if (e.target === eventsModal) {

      eventsModal.style.display = "none";

    }

  });

}


// ===============================
// CLUBS POPUP
// ===============================

const clubsNav =
  Array.from(navButtons).find(function (button) {

    const span = button.querySelector("span");

    return span &&
      span.textContent.trim() === "Clubs";

  });

const clubsModal =
  document.getElementById("clubsModal");

const closeClubs =
  document.getElementById("closeClubs");

if (clubsNav && clubsModal) {

  clubsNav.addEventListener("click", function () {

    clubsModal.style.display = "flex";

  });

}

if (closeClubs && clubsModal) {

  closeClubs.addEventListener("click", function () {

    clubsModal.style.display = "none";

  });

}

if (clubsModal) {

  clubsModal.addEventListener("click", function (e) {

    if (e.target === clubsModal) {

      clubsModal.style.display = "none";

    }

  });

}


// ===============================
// JOIN CLUBS
// ===============================

const joinButtons =
  document.querySelectorAll(".join");

joinButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    if (button.textContent.trim() === "Join") {

      button.textContent = "Joined";
      button.classList.add("joined");

    } else {

      button.textContent = "Join";
      button.classList.remove("joined");

    }

  });

});


// ===============================
// ADD FRIENDS
// ===============================

const addButtons =
  document.querySelectorAll(".add");

addButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    if (button.textContent.trim() === "Add") {

      button.textContent = "Added";
      button.classList.add("added");

    } else {

      button.textContent = "Add";
      button.classList.remove("added");

    }

  });

});


// ===============================
// SEARCH
// ===============================

const search =
  document.getElementById("search");

if (search) {

  search.addEventListener("input", function () {

    const query =
      search.value.toLowerCase().trim();

    const posts =
      document.querySelectorAll(".post");

    posts.forEach(function (post) {

      const text =
        post.textContent.toLowerCase();

      if (!query || text.includes(query)) {

        post.style.display = "";

      } else {

        post.style.display = "none";

      }

    });

  });

}


// ===============================
// POST TABS
// ===============================

const tabs =
  document.querySelectorAll(".tab");

tabs.forEach(function (tab) {

  tab.addEventListener("click", function () {

    tabs.forEach(function (t) {

      t.classList.remove("active");

    });

    tab.classList.add("active");

  });

});


// ===============================
// POST CATEGORY FILTER
// ===============================

const filter =
  document.getElementById("filter");

if (filter) {

  filter.addEventListener("change", function () {

    const selected =
      filter.value;

    const posts =
      document.querySelectorAll(".post");

    posts.forEach(function (post) {

      if (
        selected === "All Posts" ||
        post.dataset.cat === selected
      ) {

        post.style.display = "";

      } else {

        post.style.display = "none";

      }

    });

  });

}

// =========================================================
// CAMPUSLY STEP 35 — MESSAGES / 36 NOTIFICATIONS / 37 PROFILE
// =========================================================

const messagesModal = document.getElementById("messagesModal");
const messagesWindow = messagesModal ? messagesModal.querySelector(".messages-window") : null;
const closeMessages = document.getElementById("closeMessages");
const conversationList = document.getElementById("conversationList");
const messageSearch = document.getElementById("messageSearch");
const chatEmpty = document.getElementById("chatEmpty");
const chatContent = document.getElementById("chatContent");
const chatMessages = document.getElementById("chatMessages");
const chatName = document.getElementById("chatName");
const chatAvatar = document.getElementById("chatAvatar");
const chatStatus = document.getElementById("chatStatus");
const chatInput = document.getElementById("chatInput");
const chatForm = document.getElementById("chatForm");
const chatBack = document.getElementById("chatBack");
const chatProfileBtn = document.getElementById("chatProfileBtn");
const messageBadge = document.getElementById("messageBadge");
const unreadFilterCount = document.getElementById("unreadFilterCount");

const conversations = [
  {
    name: "Alicia Nair",
    avatar: "images/alicia.png",
    initials: "A",
    time: "2m",
    preview: "Are you going to the club meeting today?",
    unread: 2,
    status: "Online now",
    messages: [
      { from: "them", text: "Hey! Are you going to the club meeting today?", time: "2:41 PM" },
      { from: "me", text: "Yeah, probably. You?", time: "2:43 PM" },
      { from: "them", text: "Definitely 😂 I heard they are showing some new projects.", time: "2:44 PM" }
    ]
  },
  {
    name: "Rahul Mehta",
    avatar: "images/rahul.png",
    initials: "R",
    time: "18m",
    preview: "Bro, did you check the results portal?",
    unread: 1,
    status: "Active 8m ago",
    messages: [
      { from: "them", text: "Bro, did you check the results portal?", time: "2:25 PM" },
      { from: "me", text: "Not yet 😭 still processing on my side.", time: "2:28 PM" }
    ]
  },
  {
    name: "Priya Menon",
    initials: "P",
    time: "1h",
    preview: "Can you send me the notes from class?",
    unread: 0,
    status: "Active 32m ago",
    messages: [
      { from: "them", text: "Can you send me the notes from class?", time: "1:39 PM" },
      { from: "me", text: "Sure, I'll send them after I organise the pages.", time: "1:42 PM" }
    ]
  },
  {
    name: "Arjun Iyer",
    initials: "A",
    time: "Yesterday",
    preview: "Good luck with the project!",
    unread: 0,
    status: "Active yesterday",
    messages: [
      { from: "them", text: "Good luck with the project!", time: "Yesterday" },
      { from: "me", text: "Thanks bro 🙌", time: "Yesterday" }
    ]
  },
  {
    name: "Sneha Kapoor",
    initials: "S",
    time: "Yesterday",
    preview: "Are you joining the photography event?",
    unread: 0,
    status: "Active yesterday",
    messages: [
      { from: "them", text: "Are you joining the photography event?", time: "Yesterday" }
    ]
  }
];

let selectedConversation = null;
let messageFilter = "all";
let conversationData = JSON.parse(localStorage.getItem("campuslyMessages") || "null") || conversations;

function getConversation(name) {
  return conversationData.find(function (item) { return item.name === name; });
}

function totalUnread() {
  return conversationData.reduce(function (sum, item) { return sum + (item.unread || 0); }, 0);
}

function updateMessageBadges() {
  const count = totalUnread();
  if (messageBadge) {
    messageBadge.textContent = count;
    messageBadge.style.display = count ? "grid" : "none";
  }
  if (unreadFilterCount) {
    unreadFilterCount.textContent = count;
    unreadFilterCount.style.display = count ? "inline" : "none";
  }
}

function saveMessages() {
  localStorage.setItem("campuslyMessages", JSON.stringify(conversationData));
  updateMessageBadges();
}

function renderConversations() {
  if (!conversationList) return;
  const query = (messageSearch ? messageSearch.value : "").toLowerCase().trim();
  const filtered = conversationData.filter(function (item) {
    const matchesText = !query || (item.name + " " + item.preview).toLowerCase().includes(query);
    const matchesFilter = messageFilter === "all" || (item.unread || 0) > 0;
    return matchesText && matchesFilter;
  });

  conversationList.innerHTML = "";

  if (!filtered.length) {
    conversationList.innerHTML = '<div class="empty-conversations">No conversations found.</div>';
    return;
  }

  filtered.forEach(function (item) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "conversation" + (item.unread ? " unread" : "") + (selectedConversation === item.name ? " active" : "");
    button.dataset.name = item.name;

    const avatar = item.avatar
      ? '<span class="conversation-avatar"><img src="' + item.avatar + '" alt="' + escapeHTML(item.name) + '"></span>'
      : '<span class="conversation-avatar">' + escapeHTML(item.initials) + '</span>';

    button.innerHTML = avatar +
      '<span class="conversation-copy">' +
        '<span class="conversation-top"><b class="conversation-name">' + escapeHTML(item.name) + '</b><small class="conversation-time">' + escapeHTML(item.time) + '</small></span>' +
        '<span class="conversation-preview">' + escapeHTML(item.preview) + '</span>' +
      '</span>' +
      (item.unread ? '<span class="conversation-dot"></span>' : '');

    button.addEventListener("click", function () {
      openConversation(item.name);
    });

    conversationList.appendChild(button);
  });
}

function openMessages(personName) {
  if (!messagesModal) return;
  messagesModal.classList.add("open");
  messagesModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  renderConversations();
  if (personName) openConversation(personName);
}

function closeMessagesModal() {
  if (!messagesModal) return;
  messagesModal.classList.remove("open");
  messagesModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (messagesWindow) messagesWindow.classList.remove("show-chat");
}

function renderChat(conversation) {
  if (!chatMessages) return;
  chatMessages.innerHTML = '<div class="message-day">Today</div>';
  conversation.messages.forEach(function (message) {
    const row = document.createElement("div");
    row.className = "chat-bubble-row" + (message.from === "me" ? " mine" : "");
    row.innerHTML = '<div><div class="chat-bubble">' + escapeHTML(message.text) + '</div><div class="chat-meta">' + escapeHTML(message.time) + '</div></div>';
    chatMessages.appendChild(row);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function openConversation(name) {
  const conversation = getConversation(name);
  if (!conversation) return;
  selectedConversation = name;
  conversation.unread = 0;
  conversation.time = "now";
  saveMessages();
  renderConversations();
  if (chatEmpty) chatEmpty.classList.add("hidden");
  if (chatContent) chatContent.classList.remove("hidden");
  if (messagesWindow) messagesWindow.classList.add("show-chat");
  if (chatName) chatName.textContent = conversation.name;
  if (chatStatus) chatStatus.textContent = conversation.status;
  if (chatAvatar) {
    chatAvatar.innerHTML = conversation.avatar
      ? '<img src="' + conversation.avatar + '" alt="' + escapeHTML(conversation.name) + '">'
      : escapeHTML(conversation.initials);
  }
  renderChat(conversation);
  if (chatInput) setTimeout(function () { chatInput.focus(); }, 80);
}

if (closeMessages) closeMessages.addEventListener("click", closeMessagesModal);
if (messagesModal) messagesModal.addEventListener("click", function (event) {
  if (event.target === messagesModal) closeMessagesModal();
});
if (messageSearch) messageSearch.addEventListener("input", renderConversations);

document.querySelectorAll(".message-filter").forEach(function (button) {
  button.addEventListener("click", function () {
    document.querySelectorAll(".message-filter").forEach(function (item) { item.classList.remove("active"); });
    button.classList.add("active");
    messageFilter = button.dataset.filter || "all";
    renderConversations();
  });
});

if (chatBack) chatBack.addEventListener("click", function () {
  if (messagesWindow) messagesWindow.classList.remove("show-chat");
});

if (chatForm) chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!selectedConversation || !chatInput) return;
  const text = chatInput.value.trim();
  if (!text) return;
  const conversation = getConversation(selectedConversation);
  if (!conversation) return;
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  conversation.messages.push({ from: "me", text: text, time: time });
  conversation.preview = text;
  conversation.time = "now";
  chatInput.value = "";
  saveMessages();
  renderConversations();
  renderChat(conversation);
});

if (chatProfileBtn) chatProfileBtn.addEventListener("click", function () {
  if (selectedConversation) openProfile(selectedConversation);
});

document.querySelectorAll("[data-message-person]").forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.stopPropagation();
    openMessages(button.dataset.messagePerson);
  });
});

// =========================================================
// PROFILE LINKS / PROFILE MODAL
// =========================================================

const profileModal = document.getElementById("profileModal");
const closeProfile = document.getElementById("closeProfile");
const messageFromProfile = document.getElementById("messageFromProfile");
const editProfileBtn = document.getElementById("editProfileBtn");
const profileEdit = document.getElementById("profileEdit");
const saveProfileEdit = document.getElementById("saveProfileEdit");
const cancelProfileEdit = document.getElementById("cancelProfileEdit");
const editProfileName = document.getElementById("editProfileName");
const editProfileBio = document.getElementById("editProfileBio");

const profilePeople = {
  "Bandile Dlamini": { initials: "B", bio: "Computer Science student • Building Campusly • Always learning." },
  "Alicia Nair": { initials: "A", avatar: "images/alicia.png", bio: "Computer Science student • Coding club • Web development enthusiast." },
  "Rahul Mehta": { initials: "R", avatar: "images/rahul.png", bio: "Mechanical Engineering student • Football • Campus events." },
  "Sneha Kapoor": { initials: "S", bio: "Design-minded student who loves photography and campus events." },
  "Arjun Iyer": { initials: "A", bio: "Student • Tech projects • Always looking for the next campus challenge." },
  "Kavya Shah": { initials: "K", bio: "Student • Music • Community events • Meeting new people." },
  "Priya Menon": { initials: "P", bio: "Student • Academics • Study groups and campus life." }
};

let currentProfile = "Bandile Dlamini";

function getSavedProfile() {
  return JSON.parse(localStorage.getItem("campuslyProfile") || "null") || {
    name: "Bandile Dlamini",
    bio: "Computer Science student • Building Campusly • Always learning."
  };
}

function openProfile(name) {
  if (!profileModal) return;
  currentProfile = name || "Bandile Dlamini";
  const saved = getSavedProfile();
  const data = profilePeople[currentProfile] || profilePeople["Bandile Dlamini"];
  const isMe = currentProfile === "Bandile Dlamini";
  const displayName = isMe ? saved.name : currentProfile;
  const bio = isMe ? saved.bio : data.bio;
  const avatar = document.getElementById("profileAvatar");
  document.getElementById("profileTitle").textContent = displayName;
  document.getElementById("profileBio").textContent = bio;
  avatar.innerHTML = data.avatar ? '<img src="' + data.avatar + '" alt="' + escapeHTML(displayName) + '">' : escapeHTML(data.initials);
  document.getElementById("profileAbout").textContent = isMe
    ? "Interested in technology, campus communities, fitness, and building useful projects with other students."
    : bio + " Connect through Campusly and discover what is happening around campus.";
  editProfileBtn.style.display = isMe ? "inline-flex" : "none";
  messageFromProfile.style.display = isMe ? "none" : "inline-flex";
  if (profileEdit) profileEdit.classList.add("hidden");
  profileModal.classList.add("open");
  profileModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProfileModal() {
  if (!profileModal) return;
  profileModal.classList.remove("open");
  profileModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-profile]").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.stopPropagation();
    openProfile(element.dataset.profile);
  });
});

if (closeProfile) closeProfile.addEventListener("click", closeProfileModal);
if (profileModal) profileModal.addEventListener("click", function (event) {
  if (event.target === profileModal) closeProfileModal();
});
if (editProfileBtn) editProfileBtn.addEventListener("click", function () {
  const saved = getSavedProfile();
  editProfileName.value = saved.name;
  editProfileBio.value = saved.bio;
  profileEdit.classList.remove("hidden");
  editProfileBtn.style.display = "none";
});
if (cancelProfileEdit) cancelProfileEdit.addEventListener("click", function () {
  profileEdit.classList.add("hidden");
  editProfileBtn.style.display = "inline-flex";
});
if (saveProfileEdit) saveProfileEdit.addEventListener("click", function () {
  const name = editProfileName.value.trim() || "Bandile Dlamini";
  const bio = editProfileBio.value.trim() || "Computer Science student • Building Campusly • Always learning.";
  localStorage.setItem("campuslyProfile", JSON.stringify({ name: name, bio: bio }));
  profileEdit.classList.add("hidden");
  editProfileBtn.style.display = "inline-flex";
  openProfile("Bandile Dlamini");
});
if (messageFromProfile) messageFromProfile.addEventListener("click", function () {
  closeProfileModal();
  openMessages(currentProfile);
});

const profileNav = document.getElementById("profileNav");
const quickProfileBtn = document.getElementById("quickProfileBtn");
if (quickProfileBtn) quickProfileBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  openProfile("Bandile Dlamini");
});

// =========================================================
// NOTIFICATIONS
// =========================================================

const notificationBtn = document.getElementById("notificationBtn");
const notificationPopover = document.getElementById("notificationPopover");
const notificationBadge = document.getElementById("notificationBadge");
const markNotificationsRead = document.getElementById("markNotificationsRead");

function openNotifications() {
  if (!notificationPopover) return;
  notificationPopover.classList.remove("hidden");
  notificationPopover.setAttribute("aria-hidden", "false");
}
function closeNotifications() {
  if (!notificationPopover) return;
  notificationPopover.classList.add("hidden");
  notificationPopover.setAttribute("aria-hidden", "true");
}
if (notificationBtn) notificationBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  if (notificationPopover.classList.contains("hidden")) openNotifications(); else closeNotifications();
});
if (markNotificationsRead) markNotificationsRead.addEventListener("click", function () {
  document.querySelectorAll(".notification-item.unread").forEach(function (item) { item.classList.remove("unread"); });
  if (notificationBadge) notificationBadge.style.display = "none";
});
document.querySelectorAll(".notification-item").forEach(function (item) {
  item.addEventListener("click", function () {
    item.classList.remove("unread");
    if (item.dataset.notification === "message") {
      closeNotifications();
      openMessages("Alicia Nair");
    }
  });
});

document.addEventListener("click", function (event) {
  if (notificationPopover && !notificationPopover.classList.contains("hidden") && !notificationPopover.contains(event.target) && event.target !== notificationBtn) closeNotifications();
});

document.addEventListener("keydown", function (event) {
  if (event.key !== "Escape") return;
  closeNotifications();
  if (messagesModal && messagesModal.classList.contains("open")) closeMessagesModal();
  if (profileModal && profileModal.classList.contains("open")) closeProfileModal();
});

updateMessageBadges();
