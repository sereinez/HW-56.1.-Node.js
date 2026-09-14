import { jest } from '@jest/globals';
import { asyncOperationDemo } from './asyncOperationDemo.js';

describe('asyncOperationDemo', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('кидає TypeError, якщо callback не передано або не є функцією', () => {
    expect(() => asyncOperationDemo()).toThrow(TypeError);
    expect(() => asyncOperationDemo('not a function')).toThrow(TypeError);
  });

  test('синхронно логує "Перший виклик", а потім "Останній виклик" до будь-яких асинхронних логів', () => {
    asyncOperationDemo(() => {});

    expect(consoleSpy.mock.calls[0][0]).toBe('Перший виклик');
    expect(consoleSpy.mock.calls[1][0]).toBe('Останній виклик');
  });

  test('викликає callback рівно по одному разу для кожної з трьох операцій', done => {
    const receivedOperations = [];

    asyncOperationDemo(operation => {
      receivedOperations.push(operation);

      if (receivedOperations.length === 3) {
        expect(receivedOperations.sort()).toEqual(
          ['nextTick', 'setImmediate', 'setTimeout'].sort()
        );
        done();
      }
    });
  });

  test('process.nextTick завершується першим серед асинхронних операцій', done => {
    const order = [];

    asyncOperationDemo(operation => {
      order.push(operation);

      if (order.length === 3) {
        expect(order[0]).toBe('nextTick');
        done();
      }
    });
  });

  test('логує повідомлення "Завершено виконання: [operation]" для кожної операції', done => {
    let finished = 0;

    asyncOperationDemo(operation => {
      console.log(`Завершено виконання: ${operation}`);
      finished += 1;

      if (finished === 3) {
        const loggedMessages = consoleSpy.mock.calls.map(call => call[0]);
        expect(loggedMessages).toContain('Завершено виконання: nextTick');
        expect(loggedMessages).toContain('Завершено виконання: setImmediate');
        expect(loggedMessages).toContain('Завершено виконання: setTimeout');
        done();
      }
    });
  });
});
