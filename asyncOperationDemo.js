/**
 * asyncOperationDemo.js
 *
 * Демонструє порядок виконання асинхронних API Node.js:
 * process.nextTick, setImmediate та setTimeout(0) у межах циклу подій (event loop).
 *
 * Порядок виконання, який гарантує Node.js:
 *  1. Весь синхронний код у тілі функції виконується одразу
 *     ("Перший виклик" -> плануємо 3 операції -> "Останній виклик").
 *  2. Після завершення поточної операції (коли стек викликів порожній),
 *     Node.js спочатку спорожняє черзу process.nextTick — вона виконується
 *     ПЕРШОЮ, ще до переходу до наступної фази циклу подій.
 *  3. Далі цикл подій переходить у фазу "check", де виконується setImmediate.
 *  4. Після цього (у фазі "timers") виконується setTimeout(0).
 *
 * Тобто фактичний порядок логів:
 *   Перший виклик
 *   Останній виклик
 *   Виконано nextTick      -> Завершено виконання: nextTick
 *   Виконано setImmediate  -> Завершено виконання: setImmediate
 *   Виконано setTimeout    -> Завершено виконання: setTimeout
 *
 * @param {(operation: 'nextTick' | 'setImmediate' | 'setTimeout') => void} callback
 *        Функція зворотного викову, яка отримує ідентифікатор операції
 *        одразу після її завершення.
 */
function asyncOperationDemo(callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('asyncOperationDemo: параметр "callback" має бути функцією');
  }

  console.log('Перший виклик');

  // 1. Найшвидша асинхронна операція — виконується одразу після поточного
  //    синхронного коду, ще до переходу до наступної фази циклу подій.
  process.nextTick(() => {
    console.log('Виконано nextTick');
    callback('nextTick');
  });

  // 2. Планує виконання коду у фазі "check" наступної ітерації циклу подій.
  setImmediate(() => {
    console.log('Виконано setImmediate');
    callback('setImmediate');
  });

  // 3. Планує виконання коду у фазі "timers"; навіть із затримкою 0
  //    виконується після nextTick і, як правило, після setImmediate.
  setTimeout(() => {
    console.log('Виконано setTimeout');
    callback('setTimeout');
  }, 0);

  console.log('Останній виклик');
}

export { asyncOperationDemo };
