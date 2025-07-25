import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase конфиг
const firebaseConfig = {
  apiKey: "AIzaSyBrLNZv3CgCeGyNAgENLEGFf70aWJDm4Ik",
  authDomain: "casino-org.firebaseapp.com",
  databaseURL: "https://casino-org-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "casino-org",
  storageBucket: "casino-org.firebasestorage.app",
  messagingSenderId: "1028536859715",
  appId: "1:1028536859715:web:be40dfc23130a5b347a8f6"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Переключение языка
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

// Уведомление при нажатии на ссылки
document.querySelectorAll('.link-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Ссылки были обновлены!');
  });
});

// Работа с отзывами
const reviewForm = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');

reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('username').value || 'Аноним';
  const message = document.getElementById('message').value;
  const rating = document.getElementById('rating').value;

  const reviewRef = ref(db, 'reviews');
  push(reviewRef, {
    name,
    message,
    rating: parseInt(rating),
    timestamp: Date.now()
  });

  reviewForm.reset();
});

const reviewRef = ref(db, 'reviews');
onValue(reviewRef, (snapshot) => {
  const data = snapshot.val();
  const reviews = Object.values(data || {}).sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);

  reviewList.innerHTML = '';
  reviews.forEach(review => {
    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `
      <strong>${review.name}</strong>
      <div class="stars">★`.repeat(review.rating) + `</div>
      <p>${review.message}</p>
    `;
    reviewList.appendChild(div);
  });
});