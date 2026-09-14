# async-operation-demo

Демонстрація функції `asyncOperationDemo`, яка ілюструє порядок виконання
трьох асинхронних API Node.js — `process.nextTick`, `setImmediate` та
`setTimeout(0)` — у межах циклу подій (event loop).

## Вміст проєкту

```
async-demo/
├── asyncOperationDemo.js       # сама функція
├── index.js                    # приклад запуску (демо-скрипт)
├── asyncOperationDemo.test.js  # тести на Jest
├── package.json
└── README.md
```

## Встановлення

```bash
npm install
```


## Запуск демо

```bash
npm start
```

Очікуваний вивід у консолі:

```
Перший виклик
Останній виклик
Виконано nextTick
Завершено виконання: nextTick
Виконано setImmediate
Завершено виконання: setImmediate
Виконано setTimeout
Завершено виконання: setTimeout
```

## Запуск тестів

```bash
npm test
```


function asyncOperationDemo(
  callback: (operation: 'nextTick' | 'setImmediate' | 'setTimeout') => void
): void
```

