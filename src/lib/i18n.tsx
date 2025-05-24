'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'nl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  nl: {
    // Algemene navigatie
    welcome: 'Welkom bij Genius!',
    start: 'Start het spel',
    levels: 'Levels',
    flags: 'Behaalde flags',
    hints: 'Tips',
    quiz: 'Quiz',
    language: 'Taal',
    darkMode: 'Donker thema',
    back: 'Terug',
    next: 'Volgende',
    submit: 'Versturen',
    attempts: 'Pogingen',
    points: 'punten',
    totalPoints: 'Totaal aantal punten',
    flagsFound: 'flags gevonden',
    level: 'Level',
    category: 'Categorie',
    difficulty: 'Moeilijkheidsgraad',
    easy: 'Makkelijk',
    medium: 'Gemiddeld',
    hard: 'Moeilijk',
    settings: 'Instellingen',
    settingsDescription: 'Pas de instellingen aan om het spel aan te passen aan jouw voorkeuren',
    appearance: 'Weergave',
    theme: 'Thema',
    light: 'Licht',
    dark: 'Donker',
    system: 'Systeem',
    fontSize: 'Tekstgrootte',
    small: 'Klein',
    large: 'Groot',
    sound: 'Geluid',
    soundOn: 'Aan',
    soundOff: 'Uit',
    animations: 'Animaties',
    animationsOn: 'Aan',
    animationsOff: 'Uit',
    backToHome: 'Terug naar start',
    settingsMessage: 'Welkom bij de instellingen! Hier kun je de taal aanpassen.',

    // Home page
    startGameEasy: 'Makkelijk',
    startGameHard: 'Moeilijk',
    easyGameDescription: 'Begin met de basis encryptiemethoden: Caesar cipher en ROT13. Perfect voor beginners!',
    hardGameDescription: 'Uitdagende puzzels met verschillende encryptiemethoden. Voor de echte codebrekers!',
    hintsDescription: 'Leer meer over verschillende encryptiemethoden en bekijk voorbeelden.',
    quizDescription: 'Test je kennis van encryptie met deze uitdagende quiz!',

    // Quiz page
    quizTitle: 'Laten we je cybersecurity kennis testen!',
    quizTip1: 'Lees de vraag zorgvuldig en let op de details van de encryptiemethode.',
    quizTip2: 'Gebruik de voorbeelden in de hints pagina als referentie.',
    quizTip3: 'Probeer eerst zelf te ontcijferen voordat je de cheatsheet gebruikt.',
    question: 'Vraag',
    of: 'van',
    seeResults: 'Bekijk resultaten',
    quizComplete: 'Quiz voltooid!',
    correctAnswers: 'juiste antwoorden',
    tryAgain: 'Opnieuw proberen',
    yourScore: 'Je score',
    outOf: 'van de',
    questions: 'vragen',

    // Instellingen
    gameSettings: 'Spelinstellingen',
    selectLanguage: 'Selecteer taal',
    currentLanguage: 'Nederlands',

    // Level pagina
    enterFlag: 'Voer je flag in:',
    correctFlag: 'Correct! Je hebt de flag gevonden!',
    wrongFlag: 'Helaas, dat is niet de juiste flag. Probeer het opnieuw!',
    levelWelcome: 'Welkom bij level',
    flagPlaceholder: 'FLAG_1{...}',
    levelComplete: 'Level voltooid!',
    nextLevel: 'Ga naar het volgende level',
    decodeMessage: 'Probeer dit bericht te decoderen:',
    showHint: 'Toon hint',
    hideHint: 'Verberg hint',

    // Flags pagina
    achievements: 'Prestaties',
    noFlags: 'Nog geen vlaggen gevonden',
    flagDetails: 'Flag details',
    flagId: 'Flag ID',
    flagLevel: 'Level',
    flagCategory: 'Categorie',
    flagPoints: 'Punten',
    flagHint: 'Hint',
    foundAt: 'Gevonden op',
    flagsMessage: 'Geweldig werk! Blijf zoeken naar meer vlaggen!',

    // Hints pagina
    encryptionHints: 'Hier zijn enkele handige tips over verschillende soorten encryptie!',
    caesarTitle: 'Caesar Cijfer',
    caesarDesc: 'Een Caesar cijfer verschuift elke letter in het alfabet met een vast aantal posities. Bijvoorbeeld, met een verschuiving van 1 wordt A naar B, B naar C, enzovoort.',
    rot13Title: 'ROT13',
    rot13Desc: 'ROT13 is een speciaal geval van het Caesar cijfer waarbij elke letter 13 posities wordt verschoven. Het is zijn eigen inverse, wat betekent dat het toepassen van ROT13 twee keer de originele tekst teruggeeft.',
    base64Title: 'Base64',
    base64Desc: 'Base64 is een manier om binaire gegevens te coderen met alleen afdrukbare ASCII-tekens. Het wordt vaak gebruikt voor het coderen van afbeeldingen en andere binaire gegevens in tekstformaat.',
    showSolution: 'Toon oplossing',
    hideSolution: 'Verberg oplossing',
    example: 'Voorbeeld',
    solution: 'Oplossing',

    // Nieuwe Einstein vertalingen
    einsteinCongratulations: 'Fantastisch werk, mijn jonge vriend!',
    einsteinQuote: 'Je hebt alle puzzels opgelost! Net zoals ik altijd zei: "Het is niet dat ik zo slim ben, het is gewoon dat ik langer met de problemen blijf zitten."',
    einsteinReward: 'Als beloning voor je doorzettingsvermogen, hier is een speciale code die ik voor je heb gemaakt:',
    einsteinCaesarTitle: 'Ah, een Caesar cipher!',
    einsteinRot13Title: 'Interessant, een ROT13 transformatie!',
    einsteinCaesarDesc: 'Laat me je helpen met deze klassieke versleuteling. De letters zijn verschoven met {shift} posities. Kun je het ontcijferen?',
    einsteinRot13Desc: 'Een elegante symmetrische transformatie! Elke letter wordt 13 posities verschoven. Probeer het eens!',
    einsteinQuestion: 'Wat denk je dat het betekent?',
    einsteinPlaceholder: 'Typ hier je antwoord...',
    einsteinSubmit: 'Laat me zien of je het hebt!',
    einsteinCorrect: 'Uitstekend! Je hebt het perfect ontcijferd!',
    einsteinIncorrect: 'Hmm, dat lijkt niet helemaal te kloppen. Probeer het nog eens!',

    // Nieuwe Einstein vertalingen voor moeilijke versleuteling
    einsteinMorseTitle: 'Ah, Morse code!',
    einsteinMorseDesc: 'Een klassieke manier van communiceren met punten en strepen. Elke letter heeft zijn eigen unieke patroon.',
    einsteinBinaryTitle: 'Interessant, binaire code!',
    einsteinBinaryDesc: 'De taal van computers! Elke letter wordt weergegeven door een reeks van 0\'en en 1\'en.',
    einsteinHexTitle: 'Ah, hexadecimale notatie!',
    einsteinHexDesc: 'Een elegante manier om binaire gegevens te representeren met 16 verschillende symbolen.',
    einsteinBase64Title: 'Fascinerend, Base64 codering!',
    einsteinBase64Desc: 'A method to represent binary data using 64 different characters.',
    showCheatSheet: 'Toon hulpmiddel',
    hideCheatSheet: 'Verberg hulpmiddel',

    // Certificaat
    certificateTitle: 'Genius CTF Certificaat',
    certificateCongrats: 'Gefeliciteerd, {name}!',
    certificateFoundFlags: 'Aantal gevonden flags',
    certificateDate: 'Datum',
    certificateFlagList: 'Gevonden flags:',
    certificateFlag: 'Flag',
    certificatePoints: 'Punten',
    certificateFooter: 'Blijf leren en ontdekken, net als Einstein!',
    certificateNameLabel: 'Naam voor op certificaat',
  },
  en: {
    // General navigation
    welcome: 'Welcome to Genius!',
    start: 'Start the game',
    levels: 'Levels',
    flags: 'Achieved flags',
    hints: 'Hints',
    quiz: 'Quiz',
    language: 'Language',
    darkMode: 'Dark mode',
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
    attempts: 'Attempts',
    points: 'points',
    totalPoints: 'Total points',
    flagsFound: 'flags found',
    level: 'Level',
    category: 'Category',
    difficulty: 'Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    settings: 'Settings',
    settingsDescription: 'Adjust the settings to customize the game to your preferences',
    appearance: 'Appearance',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    fontSize: 'Font Size',
    small: 'Small',
    large: 'Large',
    sound: 'Sound',
    soundOn: 'On',
    soundOff: 'Off',
    animations: 'Animations',
    animationsOn: 'On',
    animationsOff: 'Off',
    backToHome: 'Back to Home',
    settingsMessage: 'Welcome to the settings! Here you can change the language.',

    // Home page
    startGameEasy: 'Easy',
    startGameHard: 'Hard',
    easyGameDescription: 'Start with basic encryption methods: Caesar cipher and ROT13. Perfect for beginners!',
    hardGameDescription: 'Challenging puzzles with various encryption methods. For the real codebreakers!',
    hintsDescription: 'Learn more about different encryption methods and view examples.',
    quizDescription: 'Test your encryption knowledge with this challenging quiz!',

    // Quiz page
    quizTitle: 'Let\'s test your cybersecurity knowledge!',
    quizTip1: 'Read the question carefully and pay attention to the encryption method details.',
    quizTip2: 'Use the examples on the hints page as a reference.',
    quizTip3: 'Try to decipher it yourself before using the cheat sheet.',
    question: 'Question',
    of: 'of',
    seeResults: 'See Results',
    quizComplete: 'Quiz Complete!',
    correctAnswers: 'correct answers',
    tryAgain: 'Try Again',
    yourScore: 'Your score',
    outOf: 'out of',
    questions: 'questions',

    // Instellingen
    gameSettings: 'Game Settings',
    selectLanguage: 'Select Language',
    currentLanguage: 'English',

    // Level pagina
    enterFlag: 'Enter your flag:',
    correctFlag: 'Correct! You found the flag!',
    wrongFlag: 'Sorry, that\'s not the right flag. Try again!',
    levelWelcome: 'Welcome to level',
    flagPlaceholder: 'FLAG_1{...}',
    levelComplete: 'Level complete!',
    nextLevel: 'Go to next level',
    decodeMessage: 'Try to decode this message:',
    showHint: 'Show hint',
    hideHint: 'Hide hint',

    // Flags pagina
    achievements: 'Achievements',
    noFlags: 'No flags found yet',
    flagDetails: 'Flag details',
    flagId: 'Flag ID',
    flagLevel: 'Level',
    flagCategory: 'Category',
    flagPoints: 'Points',
    flagHint: 'Hint',
    foundAt: 'Found at',
    flagsMessage: 'Great work! Keep searching for more flags!',

    // Hints pagina
    encryptionHints: 'Here are some helpful hints about different types of encryption!',
    caesarTitle: 'Caesar Cipher',
    caesarDesc: 'A Caesar cipher shifts each letter in the alphabet by a fixed number of positions. For example, with a shift of 1, A becomes B, B becomes C, and so on.',
    rot13Title: 'ROT13',
    rot13Desc: 'ROT13 is a special case of the Caesar cipher where each letter is shifted by 13 positions. It\'s its own inverse, meaning applying ROT13 twice returns the original text.',
    base64Title: 'Base64',
    base64Desc: 'Base64 is a way to encode binary data using only printable ASCII characters. It\'s often used for encoding images and other binary data in text format.',
    showSolution: 'Show solution',
    hideSolution: 'Hide solution',
    example: 'Example',
    solution: 'Solution',

    // Nieuwe Einstein vertalingen
    einsteinCongratulations: 'Fantastic work, my young friend!',
    einsteinQuote: 'You\'ve solved all the puzzles! As I always said: "It\'s not that I\'m so smart, it\'s just that I stay with problems longer."',
    einsteinReward: 'As a reward for your perseverance, here\'s a special code I made for you:',
    einsteinCaesarTitle: 'Ah, a Caesar cipher!',
    einsteinRot13Title: 'Interesting, a ROT13 transformation!',
    einsteinCaesarDesc: 'Let me help you with this classic encryption. The letters are shifted by {shift} positions. Can you decipher it?',
    einsteinRot13Desc: 'An elegant symmetric transformation! Each letter is shifted by 13 positions. Give it a try!',
    einsteinQuestion: 'What do you think it means?',
    einsteinPlaceholder: 'Type your answer here...',
    einsteinSubmit: 'Let me see if you got it!',
    einsteinCorrect: 'Excellent! You\'ve deciphered it perfectly!',
    einsteinIncorrect: 'Hmm, that doesn\'t seem quite right. Try again!',

    // Einstein translations for hard encryption
    einsteinMorseTitle: 'Ah, Morse code!',
    einsteinMorseDesc: 'A classic way of communicating with dots and dashes. Each letter has its own unique pattern.',
    einsteinBinaryTitle: 'Interesting, binary code!',
    einsteinBinaryDesc: 'The language of computers! Each letter is represented by a series of 0s and 1s.',
    einsteinHexTitle: 'Ah, hexadecimal notation!',
    einsteinHexDesc: 'An elegant way to represent binary data using 16 different symbols.',
    einsteinBase64Title: 'Fascinating, Base64 encoding!',
    einsteinBase64Desc: 'A method to represent binary data using 64 different characters.',
    showCheatSheet: 'Show cheat sheet',
    hideCheatSheet: 'Hide cheat sheet',

    // Certificaat
    certificateTitle: 'Genius CTF Certificate',
    certificateCongrats: 'Congratulations, {name}!',
    certificateFoundFlags: 'Number of flags found',
    certificateDate: 'Date',
    certificateFlagList: 'Found flags:',
    certificateFlag: 'Flag',
    certificatePoints: 'Points',
    certificateFooter: 'Keep learning and discovering, just like Einstein!',
    certificateNameLabel: 'Name for certificate',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('nl');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    let text = translations[language][key] || key;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        text = text.replace(`{${key}}`, String(value));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 