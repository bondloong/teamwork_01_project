## Обнаруженные утечки памяти и методы их исправления

### 1. Ошибка при удалении обработчика событий
**Расположение:**
`gameHelpers.ts`

**Описание:**
Была допущена ошибка при удалении слушателя события `removeEventListener('click', () => handleStartGameClick);` из-за чего
слушатель не удалялся и происходила утечка памяти.

**Решение:**
 Удаление слушателя было перенесено из `gameHelpers.ts` в `Game.tsx.` для использования корректного синтаксиса удаления:
  ```javascript
  canvas.removeEventListener('click', handleStartGame);
  ```

### 2. Утечка памяти в gameLoop

**Расположение:**
`Game.tsx`

**Описание:**
При завершении игры анимация продолжала выполняться, так как `requestAnimationFrame` продолжал вызывать `gameLoop`, даже если `gameOver` установлен в `true`.

**Решение:**
Использование `cancelAnimationFrame` для корректного завершения цикла анимации:
  ```javascript
  if (gameOver) {
    if (animationId.current !== null) {
      cancelAnimationFrame(animationId.current);
    }
    // ...
  }
```

### 3. Меморизация функций handleClose и NavigateToMain

**Расположение:**
`GameOverModal.tsx`

**Описание:**
Функции `handleClose` и `NavigateToMain`, используемые в обработчиках событий, создавались заново при каждом рендере, что приводило к избыточным вычислениям.

**Решение:**
Использование `useCallback` для мемоизации функций `handleClose` и `NavigateToMain`:
  ```javascript
  const handleClose = useCallback((): void => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  const NavigateToMain = useCallback((): void => {
    navigate(EAppRoutes.Main);
  }, [navigate]);
```
