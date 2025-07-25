import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, query, limitToLast } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

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

document.getElementById('languageSwitch').addEventListener('change', (e) => {
  const checked = e.target.checked;
  document.getElementById('main-title').textContent = checked ? 'CASINO.ORG дүкеніне қош келдіңіз' : 'Добро пожаловать в магазин CASINO.ORG';
  document.getElementById('sub-title').textContent = checked ? 'Қазақстан бойынша үздік тауарлар' : 'Топовые товары по Казахстану';
  document.getElementById('cities').textContent = checked ? 'Астана, Алматы, Қарағанды, Павлодар, Көкшетау, Семей, Тараз, Ақтөбе' : 'Астана, Алматы, Караганда, Павлодар, Кокшетау, Семей, Тараз, Актобе';
});

document.getElementById('burger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('active');
});
document.getElementById('closeSidebar').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('active');
});

document.getElementById('reviewForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim() || 'Аноним';
  const message = document.getElementById('message').value.trim();
  const rating = document.getElementById('rating').value;

  push(ref(db, 'reviews'), {
    username,
    message,
    rating,
    timestamp: Date.now()
  });

  this.reset();
  alert('Спасибо за отзыв!');
});

function showStars(count) {
  return '★'.repeat(count) + '☆'.repeat(5 - count);
}

onValue(query(ref(db, 'reviews'), limitToLast(10)), snapshot => {
  const container = document.getElementById('reviewList');
  container.innerHTML = '';
  const reviews = [];
  snapshot.forEach(child => reviews.unshift(child.val()));
  reviews.forEach(r => {
    const div = document.createElement('div');
    div.classList.add('review-item');
    div.innerHTML = `<strong>${r.username}</strong><div class="stars">${showStars(r.rating)}</div><p>${r.message}</p>`;
    container.appendChild(div);
  });
});

// Пуш при изменении ссылок
document.querySelectorAll('[data-link]').forEach(el => {
  el.addEventListener('click', () => {
    alert('Ссылки были обновлены!');
  });
});