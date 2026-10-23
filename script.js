// Мобильное меню
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", false);
  }
});

// Тайм-код в окне монтажки
const tc = document.getElementById("tc");
let seconds = 12;
setInterval(() => {
  seconds = (seconds + 1) % 60;
  tc.textContent = String(seconds).padStart(2, "0");
}, 1000);

// Фильтр работ
const filter = document.getElementById("works-filter");
const works = document.querySelectorAll("#works-grid .work");

filter.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  filter.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
  works.forEach((work) => {
    const visible = chip.dataset.filter === "all" || work.dataset.type === chip.dataset.filter;
    work.classList.toggle("is-hidden", !visible);
  });
});

// Тарифы
const PRICES = {
  reels: [
    { name: "Старт", sum: "1 500 ₽", unit: "за ролик", items: ["До 30 секунд", "Динамичные склейки", "Субтитры", "Музыка из библиотеки"] },
    { name: "Блогер", sum: "9 900 ₽", unit: "8 роликов", hit: true, items: ["До 60 секунд каждый", "Анимированные субтитры", "Цветокоррекция и звук", "Обложки для ленты"] },
    { name: "Бренд", sum: "от 24 000 ₽", unit: "в месяц", items: ["20+ роликов", "Контент-план нарезок", "Фирменный стиль графики", "Отдельный менеджер"] },
  ],
  youtube: [
    { name: "Влог", sum: "4 000 ₽", unit: "до 15 минут", items: ["Чистка пауз и оговорок", "Музыка и переходы", "Простая графика", "Цветокоррекция"] },
    { name: "Обзор / обучение", sum: "7 500 ₽", unit: "до 30 минут", hit: true, items: ["Всё из «Влога»", "Инфографика и выноски", "Таймкоды для описания", "3 нарезки в Shorts"] },
    { name: "Подкаст", sum: "6 000 ₽", unit: "выпуск до 90 минут", items: ["Сведение звука", "Работа с 2–3 камерами", "Обложка выпуска", "5 нарезок в Shorts"] },
  ],
  event: [
    { name: "Тизер", sum: "5 000 ₽", unit: "1–2 минуты", items: ["Готов на следующий день", "Лучшие моменты", "Музыка под настроение", "Вертикальная версия"] },
    { name: "Фильм", sum: "15 000 ₽", unit: "до 40 минут", hit: true, items: ["Тизер в подарок", "Цветокоррекция", "Чистый звук речей", "Готов за 7 дней"] },
    { name: "Конференция", sum: "от 20 000 ₽", unit: "за день съёмки", items: ["Записи докладов", "Афтемуви на 3 минуты", "Нарезки для соцсетей", "Плашки спикеров"] },
  ],
};

const tabs = document.getElementById("price-tabs");
const pricesGrid = document.getElementById("prices-grid");

function renderPrices(type) {
  pricesGrid.innerHTML = PRICES[type].map((p) => `
    <article class="price${p.hit ? " price--hit" : ""}">
      ${p.hit ? '<span class="price__label">Чаще всего выбирают</span>' : ""}
      <h3>${p.name}</h3>
      <div class="price__sum">${p.sum} <small>${p.unit}</small></div>
      <ul>${p.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      <a href="#order" class="btn${p.hit ? "" : " btn--ghost"}">Выбрать</a>
    </article>`).join("");
}

tabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  tabs.querySelectorAll(".tab").forEach((t) => t.classList.toggle("is-active", t === tab));
  renderPrices(tab.dataset.tab);
});
renderPrices("reels");

// Форма заявки (демо: данные никуда не отправляются)
const form = document.getElementById("order-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const empty = !field.value.trim();
    field.classList.toggle("is-invalid", empty);
    if (empty) valid = false;
  });
  if (!valid) return;
  form.querySelector(".form__success").hidden = false;
  form.reset();
});
form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
