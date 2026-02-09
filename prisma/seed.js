const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const informaticsQuestions = [
  {
    topic: "Алгоритмы",
    difficulty: "easy",
    text: "Что такое алгоритм?",
    options: [
      "Последовательность действий для решения задачи",
      "Компьютерная игра",
      "Математическая формула",
      "Название языка программирования"
    ],
    correctIndex: 0,
    explanation: "Алгоритм — это набор шагов, приводящих к результату."
  },
  {
    topic: "Данные",
    difficulty: "easy",
    text: "Какой тип данных хранит целые числа?",
    options: ["String", "Boolean", "Integer", "Array"],
    correctIndex: 2
  },
  {
    topic: "Сеть",
    difficulty: "easy",
    text: "Что обозначает HTTP?",
    options: [
      "High Transfer Text Protocol",
      "HyperText Transfer Protocol",
      "Hyper Transfer Text Processor",
      "Host Transfer Text Program"
    ],
    correctIndex: 1,
    explanation: "HTTP — протокол передачи гипертекста."
  },
  {
    topic: "Код",
    difficulty: "easy",
    text: "Что делает цикл?",
    options: [
      "Повторяет действия",
      "Ускоряет интернет",
      "Меняет цвет экрана",
      "Удаляет файлы"
    ],
    correctIndex: 0
  },
  {
    topic: "Безопасность",
    difficulty: "medium",
    text: "Что такое пароль?",
    options: [
      "Секретное слово для доступа",
      "Тип файла",
      "Настройка монитора",
      "Команда в терминале"
    ],
    correctIndex: 0
  },
  {
    topic: "Программирование",
    difficulty: "medium",
    text: "Какой оператор сравнения означает " +
      "\"равно\"?",
    options: ["=", "==", ":=", "==="],
    correctIndex: 1
  },
  {
    topic: "Память",
    difficulty: "medium",
    text: "Для чего нужна оперативная память?",
    options: [
      "Хранит данные временно",
      "Запускает интернет",
      "Выводит звук",
      "Сохраняет фотографии навсегда"
    ],
    correctIndex: 0
  },
  {
    topic: "Логика",
    difficulty: "easy",
    text: "Что возвращает логический тип?",
    options: ["Число", "Текст", "Правда/ложь", "Картинку"],
    correctIndex: 2
  },
  {
    topic: "Интернет",
    difficulty: "easy",
    text: "Что такое браузер?",
    options: [
      "Программа для просмотра сайтов",
      "Антивирус",
      "Графический редактор",
      "Офисная таблица"
    ],
    correctIndex: 0
  },
  {
    topic: "Файлы",
    difficulty: "medium",
    text: "Какой расширение у текстового файла?",
    options: [".txt", ".mp3", ".png", ".exe"],
    correctIndex: 0
  },
  {
    topic: "Код",
    difficulty: "medium",
    text: "Что такое переменная?",
    options: [
      "Контейнер для данных",
      "Кнопка мыши",
      "Команда печати",
      "Название монитора"
    ],
    correctIndex: 0
  },
  {
    topic: "Логика",
    difficulty: "medium",
    text: "Если условие false, что происходит?",
    options: [
      "Блок if выполняется",
      "Блок if пропускается",
      "Программа выключается",
      "Удаляются файлы"
    ],
    correctIndex: 1
  },
  {
    topic: "Графика",
    difficulty: "easy",
    text: "Как называется точка на экране?",
    options: ["Пиксель", "Байт", "Кадр", "Сектор"],
    correctIndex: 0
  },
  {
    topic: "Интернет",
    difficulty: "medium",
    text: "Что такое URL?",
    options: [
      "Адрес в интернете",
      "Тип вируса",
      "Графический формат",
      "Команда компиляции"
    ],
    correctIndex: 0
  },
  {
    topic: "Безопасность",
    difficulty: "medium",
    text: "Что такое фишинг?",
    options: [
      "Попытка украсть данные через поддельные сайты",
      "Метод сжатия файлов",
      "Тип процессора",
      "Антивирусный скан"
    ],
    correctIndex: 0
  },
  {
    topic: "Код",
    difficulty: "hard",
    text: "Что означает термин " +
      "\"компиляция\"?",
    options: [
      "Преобразование кода в исполняемый файл",
      "Удаление программы",
      "Создание базы данных",
      "Обновление операционной системы"
    ],
    correctIndex: 0
  },
  {
    topic: "Сеть",
    difficulty: "hard",
    text: "Что такое IP-адрес?",
    options: [
      "Уникальный адрес устройства в сети",
      "Пароль Wi-Fi",
      "Тип браузера",
      "Марка компьютера"
    ],
    correctIndex: 0
  },
  {
    topic: "Архитектура",
    difficulty: "medium",
    text: "Что такое операционная система?",
    options: [
      "Набор программ для управления устройством",
      "Тип видеокарты",
      "Текстовый редактор",
      "Команда в терминале"
    ],
    correctIndex: 0
  },
  {
    topic: "Данные",
    difficulty: "hard",
    text: "Что такое база данных?",
    options: [
      "Организованное хранилище информации",
      "Графический редактор",
      "Модуль памяти",
      "Видео-файл"
    ],
    correctIndex: 0
  },
  {
    topic: "Код",
    difficulty: "medium",
    text: "Что делает оператор return?",
    options: [
      "Возвращает значение из функции",
      "Удаляет переменную",
      "Создаёт цикл",
      "Запускает браузер"
    ],
    correctIndex: 0
  }
];

const physicsQuestions = [
  {
    topic: "Механика",
    difficulty: "easy",
    text: "Какая единица измерения силы?",
    options: ["Ньютон", "Ватт", "Джоуль", "Паскаль"],
    correctIndex: 0
  },
  {
    topic: "Энергия",
    difficulty: "easy",
    text: "Что такое работа в физике?",
    options: [
      "Произведение силы на путь",
      "Скорость тела",
      "Температура",
      "Плотность вещества"
    ],
    correctIndex: 0
  },
  {
    topic: "Оптика",
    difficulty: "easy",
    text: "Как называется явление разложения света?",
    options: ["Дисперсия", "Интерференция", "Дифракция", "Поляризация"],
    correctIndex: 0
  },
  {
    topic: "Электричество",
    difficulty: "easy",
    text: "Что измеряют амперметром?",
    options: ["Силу тока", "Напряжение", "Сопротивление", "Мощность"],
    correctIndex: 0
  },
  {
    topic: "Термодинамика",
    difficulty: "medium",
    text: "Как называется процесс передачи тепла без движения вещества?",
    options: ["Теплопроводность", "Конвекция", "Излучение", "Испарение"],
    correctIndex: 0
  },
  {
    topic: "Механика",
    difficulty: "medium",
    text: "Скорость — это...",
    options: ["Путь за единицу времени", "Масса тела", "Сила", "Энергия"],
    correctIndex: 0
  },
  {
    topic: "Энергия",
    difficulty: "medium",
    text: "Как называется энергия движения?",
    options: ["Кинетическая", "Потенциальная", "Внутренняя", "Тепловая"],
    correctIndex: 0
  },
  {
    topic: "Электричество",
    difficulty: "medium",
    text: "Единица измерения напряжения?",
    options: ["Вольт", "Ампер", "Ом", "Тесла"],
    correctIndex: 0
  },
  {
    topic: "Оптика",
    difficulty: "medium",
    text: "Какой прибор собирает свет?",
    options: ["Линза", "Призма", "Зеркало", "Провод"],
    correctIndex: 0
  },
  {
    topic: "Механика",
    difficulty: "medium",
    text: "Что такое инерция?",
    options: [
      "Свойство тела сохранять скорость",
      "Сила притяжения",
      "Давление газа",
      "Скорость света"
    ],
    correctIndex: 0
  },
  {
    topic: "Астрономия",
    difficulty: "medium",
    text: "Как называется спутник Земли?",
    options: ["Луна", "Марс", "Венера", "Юпитер"],
    correctIndex: 0
  },
  {
    topic: "Механика",
    difficulty: "hard",
    text: "Второй закон Ньютона: F = ...",
    options: ["m * a", "m / a", "a / m", "m * v"],
    correctIndex: 0
  },
  {
    topic: "Энергия",
    difficulty: "hard",
    text: "Единица измерения мощности?",
    options: ["Ватт", "Джоуль", "Паскаль", "Ньютон"],
    correctIndex: 0
  },
  {
    topic: "Оптика",
    difficulty: "hard",
    text: "Скорость света в вакууме примерно...",
    options: [
      "300 000 км/с",
      "150 000 км/с",
      "30 000 км/с",
      "3 000 км/с"
    ],
    correctIndex: 0
  },
  {
    topic: "Электричество",
    difficulty: "hard",
    text: "Что такое электрический ток?",
    options: [
      "Упорядоченное движение зарядов",
      "Движение планет",
      "Передача тепла",
      "Световое излучение"
    ],
    correctIndex: 0
  },
  {
    topic: "Механика",
    difficulty: "hard",
    text: "Что такое импульс?",
    options: [
      "Произведение массы на скорость",
      "Сила на площадь",
      "Скорость света",
      "Работа за время"
    ],
    correctIndex: 0
  },
  {
    topic: "Термодинамика",
    difficulty: "medium",
    text: "Температура измеряется в...",
    options: ["Градусах", "Ньютонах", "Амперах", "Ваттах"],
    correctIndex: 0
  },
  {
    topic: "Энергия",
    difficulty: "medium",
    text: "Как называется запас энергии тела?",
    options: ["Потенциальная", "Кинетическая", "Внутренняя", "Световая"],
    correctIndex: 0
  },
  {
    topic: "Оптика",
    difficulty: "medium",
    text: "Явление огибания препятствий волной — это...",
    options: ["Дифракция", "Дисперсия", "Интерференция", "Поляризация"],
    correctIndex: 0
  },
  {
    topic: "Электричество",
    difficulty: "medium",
    text: "Сопротивление измеряется в...",
    options: ["Омах", "Вольтах", "Амперах", "Кельвинах"],
    correctIndex: 0
  }
];

async function main() {
  await prisma.question.deleteMany();

  await prisma.question.createMany({
    data: informaticsQuestions.map((q) => ({
      subject: "informatics",
      topic: q.topic,
      difficulty: q.difficulty,
      text: q.text,
      options: JSON.stringify(q.options),
      correctIndex: q.correctIndex,
      explanation: q.explanation
    }))
  });

  await prisma.question.createMany({
    data: physicsQuestions.map((q) => ({
      subject: "physics",
      topic: q.topic,
      difficulty: q.difficulty,
      text: q.text,
      options: JSON.stringify(q.options),
      correctIndex: q.correctIndex,
      explanation: q.explanation
    }))
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
