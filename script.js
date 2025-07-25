// Инициализация Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBrLNZv3CgCeGyNAgENLEGFf70aWJDm4Ik",
  authDomain: "casino-org.firebaseapp.com",
  databaseURL: "https://casino-org-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "casino-org",
  storageBucket: "casino-org.appspot.com",
  messagingSenderId: "1028536859715",
  appId: "1:1028536859715:web:be40dfc23130a5b347a8f6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Работа с отзывами
const form = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("username").value || "Аноним";
  const message = document.getElementById("message").value;
  const rating = parseInt(document.getElementById("rating").value);

  const newReview = {
    name,
    message,
    rating,
    timestamp: Date.now()
  };

  push(ref(db, "reviews"), newReview);
  form.reset();
});

function renderReview({ name, message, rating }) {
  const div = document.createElement("div");
  div.className = "review";

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
  div.innerHTML = `
    <div class="stars">${stars}</div>
    <div class="name">${name}</div>
    <div class="text">${message}</div>
  `;

  return div;
}

onValue(ref(db, "reviews"), (snapshot) => {
  reviewList.innerHTML = "";
  const reviews = [];

  snapshot.forEach(child => {
    reviews.push(child.val());
  });

  reviews
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10)
    .forEach(review => {
      reviewList.appendChild(renderReview(review));
    });
});