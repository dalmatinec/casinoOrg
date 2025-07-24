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