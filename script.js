// Язык переключение
const langSwitch = document.getElementById('languageSwitch');
const title = document.getElementById('main-title');
const subTitle = document.getElementById('sub-title');
const cities = document.getElementById('cities');

langSwitch.addEventListener('change', () => {
  if (langSwitch.checked) {
    title.textContent = 'CASINO.ORG дүкеніне қош келдіңіз';
    subTitle.textContent = 'Қазақстан бойынша үздік тауарлар';
    cities.textContent = 'Астана, Алматы, Қарағанды, Павлодар, Көкшетау, Семей, Тараз, Ақтөбе';
  } else {
    title.textContent = 'Добро пожаловать в магазин CASINO.ORG';
    subTitle.textContent = 'Топовые товары по Казахстану';
    cities.textContent = 'Астана, Алматы, Караганда, Павлодар, Кокшетау, Семей, Тараз, Актобе';
  }
});

// Firebase
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

// Отзывы
const form = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value || "Аноним";
  const message = document.getElementById("message").value;
  const rating = parseInt(document.getElementById("rating").value);

  push(ref(db, "reviews"), {
    username,
    message,
    rating,
    timestamp: Date.now()
  });

  form.reset();
});

onValue(ref(db, "reviews"), (snapshot) => {
  const reviews = [];
  snapshot.forEach(child => {
    reviews.push(child.val());
  });

  reviewList.innerHTML = "";
  reviews
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10)
    .forEach(r => {
      reviewList.innerHTML += `
        <div class="review-item">
          <div><strong>${r.username}</strong></div>
          <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
          <div>${r.message}</div>
        </div>
      `;
    });
});

// Пуш при смене ссылок
const links = {
  operatorBtn: "https://t.me/your_operator_link",
  chatBtn: "https://t.me/your_chat_link",
  channelBtn: "https://t.me/your_channel_link"
};

Object.entries(links).forEach(([id, url]) => {
  const el = document.getElementById(id);
  el.addEventListener("click", () => {
    alert("Ссылки были обновлены. Переходите по новым адресам.");
  });
});