export const spiritualImages = [
  "https://images.unsplash.com/photo-1545063914-a1a6ec821c88?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1528641491999-599ac154f848?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1593073843550-500fd5945472?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1534430480872-3498386e7a56?q=80&w=1000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1602192103300-47e66756152e?q=80&w=1000&auto=format&fit=crop"
];

const categoryImages = {
  kirtan: [
    "https://images.unsplash.com/photo-1493170634181-c81f2619b907?q=80&w=1000&auto=format&fit=crop", // Kirtan mood
    "https://images.unsplash.com/photo-1533633036463-54859a0f4492?q=80&w=1000&auto=format&fit=crop", // Temple bells
    "https://images.unsplash.com/photo-1590059132223-9605f63e6396?q=80&w=1000&auto=format&fit=crop", // Sacred fire
  ],
  wisdom: [
    "https://images.unsplash.com/photo-1614362841007-11c0f00038cb?q=80&w=1000&auto=format&fit=crop", // Vedic literature
    "https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=1000&auto=format&fit=crop", // Ancient scripture
  ],
  meditation: [
    "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?q=80&w=1000&auto=format&fit=crop", // Meditation
    "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=1000&auto=format&fit=crop", // Yoga/Peace
  ],
  seva: [
    "https://images.unsplash.com/photo-1545063914-a1a6ec821c88?q=80&w=1000&auto=format&fit=crop", // Temple architecture
    "https://images.unsplash.com/photo-1593073843550-500fd5945472?q=80&w=1000&auto=format&fit=crop", // Ancient temple
    "https://images.unsplash.com/photo-1584622781564-1d9876a13d1e?q=80&w=1000&auto=format&fit=crop", // Temple stairs
  ],
  feast: [
    "https://images.unsplash.com/photo-1505305976870-c0be1440428d?q=80&w=1000&auto=format&fit=crop", // Flowers/Offerings
    "https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=1000&auto=format&fit=crop", // Indian market/flowers
  ],
  festival: [
    "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1000&auto=format&fit=crop", // Ritual
    "https://images.unsplash.com/photo-1611676279444-5577698aa13c?q=80&w=1000&auto=format&fit=crop", // Brass lamp
  ]
};

export const getEventImage = (title, index = 0) => {
  const t = title.toLowerCase();
  
  if (t.includes('kirtan') || t.includes('bhajan') || t.includes('aarti') || t.includes('sandhya') || t.includes('night')) {
    return categoryImages.kirtan[index % categoryImages.kirtan.length];
  }
  if (t.includes('gita') || t.includes('wisdom') || t.includes('class') || t.includes('seminar') || t.includes('talk') || t.includes('literature') || t.includes('book')) {
    return categoryImages.wisdom[index % categoryImages.wisdom.length];
  }
  if (t.includes('meditation') || t.includes('yoga') || t.includes('workshop') || t.includes('gathering')) {
    return categoryImages.meditation[index % categoryImages.meditation.length];
  }
  if (t.includes('seva') || t.includes('cleaning') || t.includes('garden') || t.includes('volunteer')) {
    return categoryImages.seva[index % categoryImages.seva.length];
  }
  if (t.includes('feast') || t.includes('prasadam') || t.includes('distribution')) {
    return categoryImages.feast[index % categoryImages.feast.length];
  }
  if (t.includes('puja') || t.includes('celebration') || t.includes('festival') || t.includes('dance') || t.includes('vijayotsava') || t.includes('navaratri')) {
    return categoryImages.festival[index % categoryImages.festival.length];
  }
  
  // Default to general spiritual images
  return spiritualImages[index % spiritualImages.length];
};
