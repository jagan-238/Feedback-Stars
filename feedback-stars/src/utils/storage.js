
export const saveRating = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Failed to save rating:", error);
  }
};

export const loadRating = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? Number(value) : 0;
  } catch (error) {
    console.error("Failed to load rating:", error);
    return 0;
  }
};

// Clear rating from localStorage
export const clearRating = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to clear rating:", error);
  }
};
