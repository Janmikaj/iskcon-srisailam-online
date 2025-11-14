import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home: 'Home',
          activities: 'Activities',
          donate: 'Donate',
          contact: 'Contact',
          welcome: 'Welcome to ISKCON Srisailam',
          templeHighlights: 'Experience Divine Bliss',
          templeDescription: 'ISKCON Srisailam is a spiritual haven nestled in the sacred hills of Srisailam. Our temple offers a serene environment for devotees to connect with Lord Krishna and experience the teachings of Bhagavad-gita.',
          donateNow: 'Donate Now',
          listView: 'List View',
          calendarView: 'Calendar View',
          required: 'Required',
          invalidEmail: 'Invalid email address',
          positiveAmount: 'Amount must be positive',
          name: 'Name',
          email: 'Email',
          amount: 'Amount',
          category: 'Category',
          general: 'General',
          prasadam: 'Prasadam',
          education: 'Education',
          submitDonation: 'Submit Donation',
          thankYouDonation: 'Thank you for your generous donation!',
          contactInfo: 'Contact Information',
          phone: 'Phone',
          message: 'Message',
          sendMessage: 'Send Message',
          messageSent: 'Your message has been sent. We will get back to you soon.',
        },
      },
      te: {
        translation: {
          home: 'హోమ్',
          activities: 'కార్యకలాపాలు',
          donate: 'దానం చేయండి',
          contact: 'సంప్రదించండి',
          welcome: 'ISKCON శ్రీశైలంకు స్వాగతం',
          templeHighlights: 'దివ్య ఆనందాన్ని అనుభవించండి',
          templeDescription: 'ISKCON శ్రీశైలం శ్రీశైలం పవిత్ర కొండల్లో ఉన్న ఆధ్యాత్మిక స్వర్గం. మా ఆలయం భక్తులకు శ్రీకృష్ణుడితో సంబంధం కలిగి ఉండటానికి మరియు భగవద్గీత బోధనలను అనుభవించడానికి ప్రశాంతమైన వాతావరణాన్ని అందిస్తుంది.',
          donateNow: 'ఇప్పుడే దానం చేయండి',
          listView: 'జాబితా వీక్షణ',
          calendarView: 'క్యాలెండర్ వీక్షణ',
          required: 'తప్పనిసరి',
          invalidEmail: 'చెల్లని ఇమెయిల్ చిరునామా',
          positiveAmount: 'మొత్తం ధనాత్మకంగా ఉండాలి',
          name: 'పేరు',
          email: 'ఇమెయిల్',
          amount: 'మొత్తం',
          category: 'వర్గం',
          general: 'సాధారణ',
          prasadam: 'ప్రసాదం',
          education: 'విద్య',
          submitDonation: 'దానాన్ని సమర్పించండి',
          thankYouDonation: 'మీ ఉదార విరాళానికి ధన్యవాదాలు!',
          contactInfo: 'సంప్రదింపు సమాచారం',
          phone: 'ఫోన్',
          message: 'సందేశం',
          sendMessage: 'సందేశాన్ని పంపండి',
          messageSent: 'మీ సందేశం పంపబడింది. మేము త్వరలో మీకు తిరిగి వస్తాము.',
        },
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

