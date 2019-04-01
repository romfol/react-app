export function sortTasks(allItems, sortByTitle) {
  if (sortByTitle) {
    allItems.sort((a, b) => {
      const taskA = a.task.toUpperCase();
      const taskB = b.task.toUpperCase();
      if (taskA < taskB) {
        return -1;
      }
      if (taskA > taskB) {
        return 1;
      }
      return 0;
    });
    return allItems;
  } else return allItems;
}

export function filterTasks(allItems, showActive, showCompleted) {
  if (showActive) {
    return allItems.filter(task => !task.isDone);
  } else if (showCompleted) {
    return allItems.filter(task => task.isDone);
  } else return allItems;
}

export const pagesAmount = (allItems, itemsPerPage = 10) =>
  Math.ceil(allItems.length / itemsPerPage);
