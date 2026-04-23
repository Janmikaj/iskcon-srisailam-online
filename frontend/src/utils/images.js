// ✅ These are the high-quality fallbacks
import WelcomeImage from "../assets/topimage.jpg";
import BhaktiRetreat from "../assets/bhakti_retreat.jpg";
import KartikDeepotsava from "../assets/kartik_deepotsava.jpg";
import GitaJayanti from "../assets/gita_jayanti.jpg";
import VaikunthaEkadashi from "../assets/vaikuntha_ekadashi.jpg";
import NewYearKirtan from "../assets/newyear_kirtan.jpg";

// Helper to convert "Kirtan Night" to "kirtan_night.jpg"
const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^\w-]+/g, ""); // Remove special chars like &
};

export const getEventImage = (title, index = 0) => {
  if (!title) return WelcomeImage;

  // 1. Try to use the custom user-uploaded image from public folder
  // Note: Since this is in 'public', we just use the absolute path
  const customImagePath = `/assets/events/${slugify(title)}.jpg`;
  
  // 2. Fallback logic if it's a known category
  const t = title.toLowerCase();
  
  // 📖 Gita/Philosophy -> Gita Jayanti
  if (t.includes('gita') || t.includes('wisdom') || t.includes('class') || t.includes('seminar') || t.includes('talk') || t.includes('literature')) {
    // If the custom image exists, your browser will prefer it. 
    // We return the custom path, and we'll handle the 'error' fallback in the component if needed.
    return customImagePath; 
  }
  
  // 🧘 Yoga/Meditation -> Bhakti Retreat
  if (t.includes('yoga') || t.includes('meditation') || t.includes('workshop')) {
    return customImagePath;
  }
  
  // Default to returning the custom path
  // The browser will try to load it. If it fails, it will look like a broken image
  // unless we add an onError handler in the React component.
  return customImagePath;
};

// We will also export a helper for the "src" to handle fallbacks
export const handleImageError = (e, title, index) => {
  const t = title.toLowerCase();
  const allImages = [WelcomeImage, BhaktiRetreat, KartikDeepotsava, GitaJayanti, VaikunthaEkadashi, NewYearKirtan];
  
  if (t.includes('kirtan') || t.includes('bhajan') || t.includes('aarti') || t.includes('sandhya')) {
    e.target.src = (index % 2 === 0) ? NewYearKirtan : KartikDeepotsava;
  } else if (t.includes('gita') || t.includes('wisdom') || t.includes('class')) {
    e.target.src = GitaJayanti;
  } else if (t.includes('yoga') || t.includes('meditation') || t.includes('workshop')) {
    e.target.src = BhaktiRetreat;
  } else if (t.includes('seva') || t.includes('cleaning') || t.includes('volunteer')) {
    e.target.src = WelcomeImage;
  } else if (t.includes('feast') || t.includes('prasadam')) {
    e.target.src = VaikunthaEkadashi;
  } else {
    e.target.src = allImages[index % allImages.length];
  }
};
