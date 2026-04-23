// ✅ Import the local images you already have
import WelcomeImage from "../assets/topimage.jpg";
import BhaktiRetreat from "../assets/bhakti_retreat.jpg";
import KartikDeepotsava from "../assets/kartik_deepotsava.jpg";
import GitaJayanti from "../assets/gita_jayanti.jpg";
import VaikunthaEkadashi from "../assets/vaikuntha_ekadashi.jpg";
import NewYearKirtan from "../assets/newyear_kirtan.jpg";

export const getEventImage = (title, index = 0) => {
  const t = title.toLowerCase();
  
  // 🎶 Kirtan/Aarti -> Kirtan Night or Kartik image
  if (t.includes('kirtan') || t.includes('bhajan') || t.includes('aarti') || t.includes('sandhya')) {
    return (index % 2 === 0) ? NewYearKirtan : KartikDeepotsava;
  }
  
  // 📖 Gita/Philosophy -> Gita Jayanti image
  if (t.includes('gita') || t.includes('wisdom') || t.includes('class') || t.includes('seminar') || t.includes('talk') || t.includes('literature')) {
    return GitaJayanti;
  }
  
  // 🧘 Yoga/Meditation -> Bhakti Retreat image
  if (t.includes('yoga') || t.includes('meditation') || t.includes('workshop')) {
    return BhaktiRetreat;
  }
  
  // 🧹 Seva/Cleaning -> Beautiful Temple image
  if (t.includes('seva') || t.includes('cleaning') || t.includes('volunteer')) {
    return WelcomeImage;
  }
  
  // 🍛 Feast/Prasadam -> Vaikuntha Ekadashi image
  if (t.includes('feast') || t.includes('prasadam') || t.includes('distribution')) {
    return VaikunthaEkadashi;
  }
  
  // 🎊 Festivals -> Kartik or New Year
  if (t.includes('puja') || t.includes('celebration') || t.includes('festival') || t.includes('vijayotsava') || t.includes('navaratri')) {
    return (index % 2 === 0) ? KartikDeepotsava : NewYearKirtan;
  }
  
  // Default fallback (Cycle through all)
  const allImages = [WelcomeImage, BhaktiRetreat, KartikDeepotsava, GitaJayanti, VaikunthaEkadashi, NewYearKirtan];
  return allImages[index % allImages.length];
};
