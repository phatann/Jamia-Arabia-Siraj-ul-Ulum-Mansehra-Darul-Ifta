import { Category, Fatwa } from './types';

export const APP_NAME_URDU = "جامعہ عربیہ سراج العلوم مانسہرہ";
export const APP_NAME_ENG = "Jamia Arabia Siraj-ul-Ulum Mansehra";
export const APP_DESCRIPTION = "The Online Darul-Ifta";

export const MOCK_FATWAS: Fatwa[] = [
  {
    id: "1001",
    fatwaNumber: "L-2023-1001",
    questionTitle: "Ruling on combined prayers during travel",
    questionDetails: "I am travelling for 3 days. Can I combine Zuhr and Asr prayers together while I am stopping at a rest area?",
    answer: "In the Hanafi school of thought, combining prayers (Jam' Bayn al-Salatayn) in terms of time (praying one in the time of the other) is not permitted except on the day of Arafah. However, 'Jam' Suwari' (apparent combination) is permitted, where you delay Zuhr until the end of its time and pray Asr at the beginning of its time.",
    category: Category.PRAYER,
    date: "2023-10-15",
    views: 1240,
    featured: true
  },
  {
    id: "1002",
    fatwaNumber: "L-2023-1002",
    questionTitle: "Investing in Stocks",
    questionDetails: "Is it permissible to invest in the stock market? Specifically technology companies.",
    answer: "Investing in stocks is permissible subject to certain conditions: 1) The core business of the company must be Halal. 2) The company's income from interest must be minimal and purified. 3) The company must have illiquid assets. Consult a local scholar for specific stock screening.",
    category: Category.BUSINESS,
    date: "2023-10-18",
    views: 3500,
    featured: true
  },
  {
    id: "1003",
    fatwaNumber: "L-2023-1003",
    questionTitle: "Meaning of a dream about rain",
    questionDetails: "I saw heavy rain in my dream. What does this signify?",
    answer: "Rain in a dream generally signifies mercy and relief from distress, provided it does not cause destruction. It may also indicate knowledge and wisdom.",
    category: Category.MISC,
    date: "2023-11-02",
    views: 890,
    featured: false
  },
  {
    id: "1004",
    fatwaNumber: "L-2023-1004",
    questionTitle: "Zakat on Gold Jewelry",
    questionDetails: "My wife has gold jewelry that she wears occasionally. Is Zakat due on it?",
    answer: "According to the Hanafi Madhhab, Zakat is obligatory on gold and silver jewelry regardless of whether it is worn or not, provided it reaches the Nisab threshold (87.48 grams of gold).",
    category: Category.ZAKAT,
    date: "2023-11-05",
    views: 5600,
    featured: true
  },
  {
    id: "1005",
    fatwaNumber: "L-2023-1005",
    questionTitle: "Nikah over video call",
    questionDetails: "Can a Nikah be performed over a video call if the groom is in another country?",
    answer: "For a valid Nikah, the physical presence of the witnesses and the contracting parties (or their proxies) in one gathering (Majlis) is a condition. A digital video call does not constitute a single Majlis in the physical sense. Therefore, the groom should appoint a proxy (Wakil) who is physically present at the gathering to contract the marriage on his behalf.",
    category: Category.MARRIAGE,
    date: "2023-12-01",
    views: 4200,
    featured: false
  }
];

export const CATEGORIES = Object.values(Category);