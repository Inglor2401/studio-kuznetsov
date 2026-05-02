// ============================================================
// STUDIO KUZNETSOV — single source of truth
// Все тексты, проекты, материалы. Никаких хардкодов в компонентах.
// ============================================================

export type Project = {
  slug: string;
  number: string;
  title: string;
  location: string;
  district: string;
  area: number;
  year: number;
  type: string;
  materials: string;
  cover: string;
  photos: string[];
  floorplan: string;
  section: string;
  brief: string;
  story: string;
};

export type Material = {
  slug: string;
  name: string;
  origin: string;        // короткий тег региона/города UPPERCASE — заменяет числовой индекс
  source: string;        // полное описание поставщика/типа
  usedIn: string[];
  image: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type ApproachStep = {
  duration: string;     // длительность фазы — заменяет числовой индекс
  title: string;
  description: string;
};

export type PressItem = {
  publication: string;
  title: string;
  year: number;
  url?: string;
};

export type NavItem = {
  href: string;
  label: string;
};

export type Principle = {
  number: string;
  title: string;
  text: string;
};

export const SITE = {
  studio: {
    name: 'STUDIO KUZNETSOV',
    nameShort: 'SK',
    principal: 'Артём Кузнецов',
    role: 'Основатель, главный архитектор',
    location: 'Москва',
    address: 'Шоурум на Патриарших, по записи',
    foundedYear: 2014,
    bioShort: 'Архитектура жилых пространств для тех, кто строит дом надолго.',
    bio: `STUDIO KUZNETSOV — мастерская архитектуры интерьеров, основанная в 2014 году в Москве. Работаем с резиденциями, городскими квартирами от 200 m² и загородными домами. Каждый проект ведёт лично Артём — от концепции до сдачи объекта с авторским надзором.

С нами работают семьи, которые строят свой первый и единственный дом, а не очередную квартиру под сдачу. Поэтому мы не торопимся: средний цикл проекта — от 14 до 22 месяцев.`,
  },

  contact: {
    email: 'studio@kuznetsov.ru',
    emailLabel: 'studio@kuznetsov.ru',
    telegram: 'https://t.me/studio_kuznetsov',
    telegramLabel: '@studio_kuznetsov',
    phone: '+7 495 000 00 00',
    phoneLabel: '+7 495 000 00 00',
  },

  navigation: [
    { href: '/projects', label: 'Проекты' },
    { href: '/studio', label: 'Студия' },
    { href: '/materials', label: 'Материалы' },
    { href: '/contact', label: 'Контакт' },
  ] as NavItem[],

  antiList: [
    {
      number: '01',
      title: 'Не работаем по референсам с Pinterest',
      text: 'Авторский интерьер не собирается из чужих кадров. Бриф начинается с разговора о том, как вы живёте — кто рано встаёт, где читают, что любят готовить, кому нужна тишина. Папка сохранённых картинок описывает эстетику, которая понравилась кому-то другому; нам нужна сценарная карта вашей семьи.',
    },
    {
      number: '02',
      title: 'Не используем типовые решения',
      text: 'Каждое решение проектируется под конкретный сценарий и конкретный объём. Готовый блок с кухней-островом, готовая раскладка спальни, готовый угол гардеробной — всё это экономит время, но забирает у интерьера свойство быть вашим. Мы повторяем материалы и пропорции, но никогда не повторяем планировки.',
    },
    {
      number: '03',
      title: 'Не запускаем проект с бюджетом ниже 8 млн ₽',
      text: 'Восемь миллионов — это нижний порог отделки, при котором используются материалы и подрядчики, за которых мы готовы поручиться. Ниже этой суммы возможен только компромисс: либо качество материалов, либо качество исполнения. Ни то, ни другое не вписывается в результат, который мы можем подписать.',
    },
    {
      number: '04',
      title: 'Не сдаём объект без авторского надзора',
      text: 'Любая идея на бумаге проверяется реальностью стройки: где встанет розетка, как ляжет шов травертина, где упрётся плинтус в наличник двери. Авторский надзор — это не контроль подрядчика, это десятки решений в день, без которых проект незаметно теряет свою точность. Мы выезжаем на объект каждую неделю до фотофиксации.',
    },
  ] as Principle[],

  approach: [
    {
      duration: '2 НЕДЕЛИ',
      title: 'Брифинг',
      description: 'Личная встреча в шоуруме на Патриарших. Обсуждаем функциональный сценарий, бюджетные рамки, сроки. На этом этапе становится ясно — мы подходим друг другу или нет.',
    },
    {
      duration: '4–6 НЕДЕЛЬ',
      title: 'Концепция',
      description: 'Объёмно-планировочное решение, материальная палитра, mood-карта. По итогам — макет 1:50 и подбор ключевых материалов в плотном виде.',
    },
    {
      duration: '12 НЕДЕЛЬ',
      title: 'Проектная документация',
      description: 'Полный комплект чертежей: обмеры, перепланировка, развёртки, узлы, мебельный план, спецификации. Документация передаётся подрядчику на тендер.',
    },
    {
      duration: '8–14 МЕСЯЦЕВ',
      title: 'Реализация',
      description: 'Координация с подрядчиками, технадзор, контроль закупок. Работаем с проверенным пулом монтажников и производителей мебели.',
    },
    {
      duration: 'ЕЖЕНЕДЕЛЬНО',
      title: 'Авторский надзор',
      description: 'Выезды на объект до сдачи. Финальная фотофиксация — обязательная часть процесса, без неё проект не считается сданным.',
    },
  ] as ApproachStep[],

  faq: [
    {
      question: 'С каким бюджетом вы работаете?',
      answer: 'Минимум — 8 млн ₽ на отделку, без учёта мебели и техники. Средний бюджет проектов 2024 года — 22 млн ₽.',
    },
    {
      question: 'Сколько длится проект?',
      answer: 'От 14 до 22 месяцев в зависимости от объёма и сложности. Концепция — 4–6 недель, проектная документация — 3–4 месяца, реализация — от 8 месяцев.',
    },
    {
      question: 'Работаете ли вы вне Москвы?',
      answer: 'Да. В портфолио есть проекты в Подмосковье — Барвиха, Жуковка, Николина Гора. Вне региона работаем только при условии командировок раз в две недели.',
    },
    {
      question: 'Можете ли вы доработать чужой проект?',
      answer: 'Нет. Берём только полные циклы — от концепции до сдачи. Доработка чужих решений никогда не даёт результат, за который мы готовы поручиться.',
    },
    {
      question: 'Сами строите или передаёте подрядчикам?',
      answer: 'Не строим. Передаём проверенным подрядчикам и ведём авторский надзор. У нас четыре постоянных партнёра, с которыми работаем больше шести лет.',
    },
    {
      question: 'Будут ли мои интерьеры опубликованы?',
      answer: 'Только с вашего письменного согласия. Без согласия — даже на сайте студии. Это часть договора.',
    },
  ] as FAQ[],

  press: [
    { publication: 'AD Russia', title: 'Дом на Николиной Горе', year: 2023 },
    { publication: 'Salon Interior', title: 'Пентхаус, который перевернул вкус', year: 2024 },
    { publication: 'Elle Decoration', title: 'Тишина как материал', year: 2024 },
    { publication: 'INTERIOR+DESIGN', title: 'Архитекторы интерьера: новое поколение', year: 2023 },
  ] as PressItem[],

  projects: [
    {
      slug: 'patriarshie-penthouse',
      number: '01',
      title: 'Пентхаус, Патриаршие',
      location: 'Москва',
      district: 'Патриаршие пруды',
      area: 240,
      year: 2024,
      type: 'Резиденция',
      materials: 'Дуб, известковая штукатурка, каррарский мрамор',
      cover: '/images/projects/01/cover.avif',
      photos: [
        '/images/projects/01/01.avif',
        '/images/projects/01/02.avif',
        '/images/projects/01/03.avif',
        '/images/projects/01/04.avif',
      ],
      floorplan: '/svg/floorplans/01.svg',
      section: '/svg/sections/01.svg',
      brief: 'Семья из четырёх человек, единственное жильё. Запрос на тишину и медленный ритм после переезда из загородного дома.',
      story: 'Двухуровневый пентхаус в дореволюционном доме на Патриарших. Выходы на крышу с видом на пруд, два камина, библиотека на 4000 томов. Ключевое решение — отказ от любых открытых полок: вся библиотека встроена в дубовые шкафы по периметру второго уровня.',
    },
    {
      slug: 'ostozhenka-apartment',
      number: '02',
      title: 'Квартира, Остоженка',
      location: 'Москва',
      district: 'Остоженка',
      area: 320,
      year: 2023,
      type: 'Городская квартира',
      materials: 'Орех, травертин, латунь',
      cover: '/images/projects/02/cover.avif',
      photos: [
        '/images/projects/02/01.avif',
        '/images/projects/02/02.avif',
        '/images/projects/02/03.avif',
      ],
      floorplan: '/svg/floorplans/02.svg',
      section: '/svg/sections/02.svg',
      brief: 'Семья коллекционеров современного искусства. Запрос — фон для коллекции, который сам остаётся в тени.',
      story: 'Перепланировка трёх объединённых квартир. Ключевое решение — сквозная анфилада из пяти комнат вдоль фасада, плюс закрытая хозяйская зона со стороны двора. Стены под живопись — травертин в тон, не белый.',
    },
    {
      slug: 'barvikha-house',
      number: '03',
      title: 'Дом, Барвиха',
      location: 'Подмосковье',
      district: 'Барвиха',
      area: 580,
      year: 2024,
      type: 'Загородный дом',
      materials: 'Дикий камень, дуб, бетон',
      cover: '/images/projects/03/cover.avif',
      photos: [
        '/images/projects/03/01.avif',
        '/images/projects/03/02.avif',
        '/images/projects/03/03.avif',
        '/images/projects/03/04.avif',
      ],
      floorplan: '/svg/floorplans/03.svg',
      section: '/svg/sections/03.svg',
      brief: 'Дом на склоне, выход в лес. Семья на постоянное проживание, без приёма гостей.',
      story: 'Полный реверс типичной барвихинской программы: ноль гостевых, один хозблок, общая зона на 60 m² без зонирования. Главная гостиная — двусветная, потолок 8 м, открытый камин в центре, зимний сад с южной стороны.',
    },
    {
      slug: 'khamovniki-loft',
      number: '04',
      title: 'Лофт, Хамовники',
      location: 'Москва',
      district: 'Хамовники',
      area: 180,
      year: 2023,
      type: 'Лофт',
      materials: 'Бетон, сталь, чёрный ясень',
      cover: '/images/projects/04/cover.avif',
      photos: [
        '/images/projects/04/01.avif',
        '/images/projects/04/02.avif',
        '/images/projects/04/03.avif',
      ],
      floorplan: '/svg/floorplans/04.svg',
      section: '/svg/sections/04.svg',
      brief: 'Архитектор-холостяк, второе жильё для работы и редких приёмов.',
      story: 'Бывший склад текстильной фабрики, потолок 4.8 м, чугунные колонны. Решение — оставить всю промышленную оболочку, добавив один объём в центре: чёрный куб со спальней, ванной и гардеробной. Кухня и гостиная — вокруг куба, без перегородок.',
    },
    {
      slug: 'zhukovka-residence',
      number: '05',
      title: 'Резиденция, Жуковка',
      location: 'Подмосковье',
      district: 'Жуковка',
      area: 720,
      year: 2022,
      type: 'Резиденция',
      materials: 'Известковая штукатурка, дуб, травертин',
      cover: '/images/projects/05/cover.avif',
      photos: [
        '/images/projects/05/01.avif',
        '/images/projects/05/02.avif',
        '/images/projects/05/03.avif',
      ],
      floorplan: '/svg/floorplans/05.svg',
      section: '/svg/sections/05.svg',
      brief: 'Семья с тремя детьми. Главный запрос — никаких «детских интерьеров».',
      story: 'Резиденция на участке 60 соток, без забора со стороны леса. Все детские — обычные комнаты со взрослой палитрой и материалами, через 20 лет ничего не придётся менять. Бассейн под одной крышей с домом, по диагонали — баня.',
    },
    {
      slug: 'tverskaya-apartment',
      number: '06',
      title: 'Квартира, Тверская',
      location: 'Москва',
      district: 'Тверская',
      area: 210,
      year: 2024,
      type: 'Городская квартира',
      materials: 'Дуб, латунь, лён',
      cover: '/images/projects/06/cover.avif',
      photos: [
        '/images/projects/06/01.avif',
        '/images/projects/06/02.avif',
        '/images/projects/06/03.avif',
      ],
      floorplan: '/svg/floorplans/06.svg',
      section: '/svg/sections/06.svg',
      brief: 'Пара дипломатов с большой коллекцией винтажной мебели Скандинавии 1960-х.',
      story: 'Историческая квартира с лепниной. Решение — сохранить всю лепнину в идеале и добавить только современные плоскости из дуба и латуни без декора. Мебель клиентов — Wegner, Juhl — встроилась без замечаний.',
    },
    {
      slug: 'rublevka-house',
      number: '07',
      title: 'Дом, Рублёвка',
      location: 'Подмосковье',
      district: 'Рублёво-Успенское ш.',
      area: 650,
      year: 2023,
      type: 'Загородный дом',
      materials: 'Бетон, дуб, слюда',
      cover: '/images/projects/07/cover.avif',
      photos: [
        '/images/projects/07/01.avif',
        '/images/projects/07/02.avif',
        '/images/projects/07/03.avif',
        '/images/projects/07/04.avif',
      ],
      floorplan: '/svg/floorplans/07.svg',
      section: '/svg/sections/07.svg',
      brief: 'Семья IT-предпринимателя, дом на первое время после переезда из города.',
      story: 'Минимальный загородный дом для семьи, привыкшей к городским квартирам. Один уровень, три спальни, общая зона 80 m² с панорамным остеклением на лес. Слюда в светильниках — единственный декоративный материал на весь дом.',
    },
    {
      slug: 'nikolina-gora-dacha',
      number: '08',
      title: 'Дача, Николина Гора',
      location: 'Подмосковье',
      district: 'Николина Гора',
      area: 380,
      year: 2022,
      type: 'Загородный дом',
      materials: 'Сосна, камень, штукатурка',
      cover: '/images/projects/08/cover.avif',
      photos: [
        '/images/projects/08/01.avif',
        '/images/projects/08/02.avif',
        '/images/projects/08/03.avif',
      ],
      floorplan: '/svg/floorplans/08.svg',
      section: '/svg/sections/08.svg',
      brief: 'Реставрация исторической дачи 1948 года. Семья — внуки первоначальных владельцев.',
      story: 'Сохранили все капитальные стены, террасы и веранду 1948 года. Внутри — обновлённая инженерия и новая планировка под современный сценарий, но материалы только аутентичные эпохе: сосна, камень, штукатурка с известью.',
    },
  ] as Project[],

  materials: [
    { slug: 'oak',          name: 'Дуб европейский',         origin: 'БУРГУНДИЯ',  source: 'European white oak',  usedIn: ['01', '03', '06', '07'], image: '/images/materials/oak.avif' },
    { slug: 'travertine',   name: 'Травертин',                origin: 'ТИВОЛИ',     source: 'Cava Romana',          usedIn: ['02', '05'],             image: '/images/materials/travertine.avif' },
    { slug: 'carrara',      name: 'Каррарский мрамор',        origin: 'КАРРАРА',    source: 'Statuario, Тоскана',   usedIn: ['01'],                   image: '/images/materials/carrara.avif' },
    { slug: 'lime-plaster', name: 'Известковая штукатурка',   origin: 'ВЕНЕЦИЯ',    source: 'Marchetti, ручная',    usedIn: ['01', '05', '08'],       image: '/images/materials/lime-plaster.avif' },
    { slug: 'walnut',       name: 'Орех американский',        origin: 'ОГАЙО',      source: 'Black walnut',         usedIn: ['02'],                   image: '/images/materials/walnut.avif' },
    { slug: 'wild-stone',   name: 'Дикий камень',             origin: 'КАРЕЛИЯ',    source: 'Кварцит, Лоухи',       usedIn: ['03', '08'],             image: '/images/materials/wild-stone.avif' },
    { slug: 'concrete',     name: 'Архитектурный бетон',      origin: 'ШВЕЙЦАРИЯ',  source: 'Holcim Sustainable',   usedIn: ['03', '04', '07'],       image: '/images/materials/concrete.avif' },
    { slug: 'brass',        name: 'Латунь',                   origin: 'МИЛАН',      source: 'Tre Più',              usedIn: ['02', '06'],             image: '/images/materials/brass.avif' },
    { slug: 'black-ash',    name: 'Чёрный ясень',             origin: 'СМОЛАНД',    source: 'Skogen, морёный',      usedIn: ['04'],                   image: '/images/materials/black-ash.avif' },
    { slug: 'mica',         name: 'Слюда',                    origin: 'ЧУПА',       source: 'Карелия, мусковит',    usedIn: ['07'],                   image: '/images/materials/mica.avif' },
  ] as Material[],

  meta: {
    title: 'STUDIO KUZNETSOV — архитектура жилых пространств',
    description: 'Мастерская архитектуры интерьеров. Резиденции, городские квартиры от 200 m², загородные дома. Москва, Патриаршие.',
    ogImage: '/og.jpg',
    siteUrl: 'https://studiokuznetsov.com',
  },
};
