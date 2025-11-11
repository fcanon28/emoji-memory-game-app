const API_URL = "https://api.api-ninjas.com/v1/emoji";
const API_KEY = import.meta.env.VITE_NINJAS_API_KEY;

export const fetchEmojis = async (group = "smileys_emotion") => {
  try {
    const response = await fetch(`${API_URL}?group=${group}`, {
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch emojis", error);
    throw error;
  }
};

export const fetchFlagEmojis = async (subgroup = "country_flag") => {
  try {
    const response = await fetch(`${API_URL}?subgroup=${subgroup}`, {
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch emojis", error);
    throw error;
  }
};

export const fetchHandEmojis = async (subgroup = "hands") => {
  try {
    const response = await fetch(`${API_URL}?subgroup=${subgroup}`, {
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch emojis", error);
    throw error;
  }
};

export const fetchSportEmojis = async (subgroup = "sport") => {
  try {
    const response = await fetch(`${API_URL}?subgroup=${subgroup}`, {
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch emojis", error);
    throw error;
  }
};

export const fetchWarningEmojis = async (subgroup = "warning") => {
  try {
    const response = await fetch(`${API_URL}?subgroup=${subgroup}`, {
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch emojis", error);
    throw error;
  }
};
