'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'nl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string | string[];
}

interface Translations {
  [key: string]: {
    [key: string]: string | string[];
  };
}

const translations: Translations = {
  nl: {
    // Algemene navigatie
    welcome: 'Welkom bij Genius! Het doel is om zoveel mogelijk flags te vinden. Deze flags zijn verborgen in de website en je moet ze vinden door de website te inspecteren. Op de flags pagina kun je je vlaggen bekijken en een certificaat downloaden.',
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
    quizFlagFound: 'Gefeliciteerd! Je hebt de Quiz Master flag verdiend!',
    easyGameFlagFound: 'Gefeliciteerd! Je hebt de Easy Game Master flag verdiend!',
    hardGameFlagFound: 'Gefeliciteerd! Je hebt de Hard Game Master flag verdiend!',
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
    themeFlagFound: 'Gefeliciteerd! Je hebt de Theme Master flag verdiend!',
    textFlagFound: 'Gefeliciteerd! Je hebt de Text Wizard flag verdiend!',
    soundFlagFound: 'Gefeliciteerd! Je hebt de Sound Master flag verdiend!',
    animationFlagFound: 'Gefeliciteerd! Je hebt de Animation Expert flag verdiend!',

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
    achievements: 'Bekijk je vlaggen',
    noFlags: 'Nog geen vlaggen gevonden',
    flagDetails: 'Flag details',
    flagId: 'Flag ID',
    flagLevel: 'Level',
    flagCategory: 'Categorie',
    flagPoints: 'Punten',
    flagHint: 'Hint',
    foundAt: 'Gevonden op',
    flagsMessage: 'Geweldig werk! Blijf zoeken naar meer vlaggen!',
    // Certificate translations
    certificateTitle: 'Genius Certificaat',
    certificateNameLabel: 'Naam',
    certificateCongrats: 'Gefeliciteerd {name}!',
    certificateFoundFlags: 'Aantal gevonden vlaggen',
    certificateDate: 'Datum',
    certificateFlagList: 'Gevonden vlaggen:',
    certificateFlag: 'Vlag',
    certificatePoints: 'Punten',
    certificateFooter: 'Bedankt voor je deelname aan Genius!',
    // 404
    '404Message': 'Je hebt een geheime plek gevonden! Dit is de 404 flag. Ga terug naar de startpagina.',

    // Hints pagina - uitgebreide vertalingen
    encryptionHints: 'Hier zijn enkele hints om je te helpen met het decoderen van de verschillende encryptiemethoden.',
    firstDecryptionFlagFound: 'Gefeliciteerd! Je hebt de Eerste Decryptie flag verdiend!',
    decryptionTool: 'Decryptie Tool',
    enterEncryptedText: 'Voer gecodeerde tekst in',
    encryptedTextPlaceholder: 'Plak hier je gecodeerde tekst...',
    decrypt: 'Decodeer',
    decryptedResult: 'Gedecodeerd resultaat',
    decryptionError: 'Kon de tekst niet decoderen. Probeer een andere methode.',
    close: 'Sluiten',
    
    // Caesar Cipher
    caesarTitle: 'Caesar Cijfer',
    caesarDesc: 'Het Caesar cijfer is een van de oudste versleutelingsmethoden, genoemd naar Julius Caesar. Het werkt door elke letter in het alfabet een vast aantal posities te verschuiven.',
    caesarSteps: [
      '1. Schrijf het alfabet op: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
      '2. Voor elke letter in de versleutelde tekst, tel je het aantal posities terug volgens de verschuiving',
      '3. Als je bij het begin van het alfabet komt, ga je verder vanaf het einde',
      '4. Voorbeeld met verschuiving 3: K → H (3 terug), H → E (3 terug), O → L (3 terug), etc.'
    ],
    caesarTips: [
      '• De verschuiving is altijd een getal tussen 1 en 25',
      '• Veel gebruikte verschuivingen zijn 3, 5, 7 en 13',
      '• Als je de verschuiving niet weet, probeer dan verschuivingen van 1-25 tot je leesbare tekst krijgt',
      '• Zoek naar veel voorkomende woorden zoals "DE", "EN", "IS" om je verschuiving te controleren'
    ],
    caesarCheatSheet: 'Caesar Cijfer Hulpmiddel:',
    caesarCheatSheetDesc: 'Gebruik deze tabel om snel te decoderen. Zoek de versleutelde letter in de bovenste rij en lees de originele letter in de onderste rij.',
    
    // ROT13
    rot13Title: 'ROT13',
    rot13Desc: 'ROT13 is een speciaal geval van het Caesar cijfer waarbij elke letter 13 posities wordt verschoven. Het is zijn eigen inverse, wat betekent dat het toepassen van ROT13 twee keer de originele tekst teruggeeft.',
    rot13Steps: [
      '1. Schrijf het alfabet op: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
      '2. Voor elke letter, tel je 13 posities vooruit',
      '3. Als je bij het einde van het alfabet komt, begin je opnieuw bij het begin',
      '4. Voorbeeld: E → R (13 vooruit), B → O (13 vooruit), G → T (13 vooruit)'
    ],
    rot13Tips: [
      '• ROT13 is zijn eigen inverse - twee keer toepassen geeft de originele tekst',
      '• Alleen letters worden verschoven, cijfers en speciale tekens blijven hetzelfde',
      '• Veel gebruikt in online forums om spoilers of aanstootgevende inhoud te verbergen',
      '• De verschuiving is altijd 13, dus je hoeft niet te raden'
    ],
    rot13CheatSheet: 'ROT13 Hulpmiddel:',
    rot13CheatSheetDesc: 'Gebruik deze tabel om snel te decoderen. Zoek de versleutelde letter in de bovenste rij en lees de originele letter in de onderste rij.',
    
    // Morse Code
    morseTitle: 'Morse Code',
    morseDesc: 'Morse code is een methode om tekst te verzenden met behulp van korte en lange signalen (punten en strepen). Elke letter en cijfer heeft zijn eigen unieke patroon.',
    morseSteps: [
      '1. Verdeel het bericht in individuele Morse code karakters (gescheiden door spaties)',
      '2. Voor elk karakter, zoek de bijbehorende letter op in de Morse code tabel',
      '3. Veel voorkomende patronen om te onthouden:',
      '   • E = . (één punt)',
      '   • T = - (één streep)',
      '   • A = .- (punt-streep)',
      '   • N = -. (streep-punt)',
      '4. Voeg de letters samen om woorden te vormen'
    ],
    morseTips: [
      '• Letters worden gescheiden door spaties',
      '• Woorden worden gescheiden door forward slashes (/)',
      '• Cijfers zijn langer dan letters (5 punten/strepen)',
      '• De meest voorkomende letters hebben de kortste codes',
      '• Gebruik het hulpmiddel voor onbekende patronen'
    ],
    morseCheatSheet: 'Morse Code Hulpmiddel:',
    morseCheatSheetDesc: 'Gebruik deze tabel om snel te decoderen. Zoek het Morse patroon en lees de bijbehorende letter of cijfer.',
    
    // Binary
    binaryTitle: 'Binaire Code',
    binaryDesc: 'Binaire code is de taal van computers, waarbij elke letter wordt weergegeven door een reeks van 0\'en en 1\'en. Elke 8 bits (1 byte) vertegenwoordigt één karakter.',
    binarySteps: [
      '1. Verdeel de binaire string in groepen van 8 bits (1 byte)',
      '2. Converteer elke byte naar zijn decimale waarde',
      '3. Gebruik de ASCII tabel om de decimale waarde naar een karakter te converteren',
      '4. Veel voorkomende ASCII waarden om te onthouden:',
      '   • A = 65 (01000001)',
      '   • a = 97 (01100001)',
      '   • 0 = 48 (00110000)',
      '   • Spatie = 32 (00100000)'
    ],
    binaryTips: [
      '• Elk karakter wordt weergegeven door 8 bits',
      '• Hoofdletters zijn 65-90 in decimaal',
      '• Kleine letters zijn 97-122 in decimaal',
      '• Cijfers zijn 48-57 in decimaal',
      '• Gebruik een online binaire naar ASCII converter voor langere berichten'
    ],
    binaryCheatSheet: 'Binaire Code Hulpmiddel:',
    binaryCheatSheetDesc: 'Gebruik deze tabel om snel te decoderen. Zoek de binaire code en lees de bijbehorende letter of cijfer.',
    
    // Hexadecimal
    hexTitle: 'Hexadecimale Code',
    hexDesc: 'Hexadecimale notatie is een elegante manier om binaire gegevens weer te geven met 16 verschillende symbolen (0-9 en A-F). Elke twee hexadecimale cijfers vertegenwoordigen één byte.',
    hexSteps: [
      '1. Verdeel de hex string in paren van karakters',
      '2. Converteer elk paar naar zijn decimale waarde',
      '3. Gebruik de ASCII tabel om de decimale waarde naar een karakter te converteren',
      '4. Veel voorkomende hex waarden om te onthouden:',
      '   • A = 41 (hex)',
      '   • a = 61 (hex)',
      '   • 0 = 30 (hex)',
      '   • Spatie = 20 (hex)'
    ],
    hexTips: [
      '• Elk karakter wordt weergegeven door 2 hex cijfers',
      '• Hex gebruikt 0-9 en A-F',
      '• A = 10, B = 11, C = 12, D = 13, E = 14, F = 15',
      '• Hoofdletters zijn 41-5A in hex',
      '• Kleine letters zijn 61-7A in hex'
    ],
    hexCheatSheet: 'Hexadecimale Code Hulpmiddel:',
    hexCheatSheetDesc: 'Gebruik deze tabel om snel te decoderen. Zoek de hexadecimale code en lees de bijbehorende letter of cijfer.',
    
    // Base64
    base64Title: 'Base64 Codering',
    base64Desc: 'Base64 is een methode om binaire gegevens te coderen met behulp van 64 verschillende karakters (A-Z, a-z, 0-9, +, en /). Het wordt vaak gebruikt voor het coderen van afbeeldingen en andere binaire gegevens in tekstformaat.',
    base64Steps: [
      '1. Base64 gebruikt deze 64 karakters: A-Z, a-z, 0-9, +, en /',
      '2. Elk karakter vertegenwoordigt 6 bits data',
      '3. De = aan het einde is padding',
      '4. Om te decoderen:',
      '   • Converteer elk karakter naar zijn 6-bit waarde',
      '   • Combineer de bits in groepen van 8',
      '   • Converteer elke 8-bit groep naar zijn ASCII karakter'
    ],
    base64Tips: [
      '• Eindigt altijd met = of == voor padding',
      '• Veel gebruikt in e-mail bijlagen en web data',
      '• Kan alle binaire gegevens coderen',
      '• De output is altijd langer dan de input',
      '• Gebruik een online Base64 decoder voor langere berichten'
    ],
    base64CheatSheet: 'Base64 Hulpmiddel:',
    base64CheatSheetDesc: 'Gebruik deze tabel om snel te decoderen. Zoek de Base64 code en lees de bijbehorende letter of cijfer.',

    // Algemene secties
    stepByStep: 'Stap voor Stap Decoderen:',
    tipsAndTricks: 'Tips & Trucs:',
    examples: 'Voorbeelden:',
    cheatsheet: 'Hulpmiddel:',
    cheatsheetDesc: 'Gebruik deze tabel om snel te decoderen:',

    // Decryptie Tool sectie
    selectMethod: 'Selecteer decryptiemethode',
    caesarCipher: 'Caesar Cijfer',
    binaryCode: 'Binaire Code',
    hexCode: 'Hexadecimale Code',
    shiftAmount: 'Aantal posities verschuiven',
    invalidBinary: 'Ongeldige binaire code. Gebruik alleen 0, 1 en spaties.',
    invalidHex: 'Ongeldige hexadecimale code. Gebruik alleen 0-9, A-F en spaties.',
    invalidBase64: 'Ongeldige Base64 code.',

    // Admin pagina
    adminPanel: 'Admin Panel',
    adminPanelDescription: 'Welkom in het admin panel. Hier kun je de instellingen van de applicatie beheren.',
    adminMessage: 'Je hebt de geheime admin pagina gevonden! Pas op wat je doet...',
    maintenanceMode: 'Maintenance Mode',
    toggleMaintenance: 'Schakel Maintenance Mode',
    updateSettings: 'Instellingen Bijwerken',
    applyUpdates: 'Updates Toepassen',
    dangerZone: 'Gevarenzone',
    deleteAllData: 'Verwijder Alle Data',
    typeToConfirm: 'Type DELETE_ALL om te bevestigen',
    deleteWarning: 'Waarschuwing: Deze actie kan niet ongedaan worden gemaakt. Type DELETE_ALL om te bevestigen.',
    adminDeleteFlagFound: 'Gefeliciteerd! Je hebt de Delete Daredevil flag gevonden!',
    adminMaintenanceFlagFound: 'Gefeliciteerd! Je hebt de Maintenance Master flag gevonden!',
    adminSettingsFlagFound: 'Gefeliciteerd! Je hebt de Settings Specialist flag gevonden!',

    // Einstein quiz
    einsteinCaesarTitle: 'Caesar Cijfer',
    einsteinCaesarDesc: 'Voer de juiste oplossing in voor deze Caesar-cijfer puzzel.',
    einsteinMorseTitle: 'Morse Code',
    einsteinMorseDesc: 'Voer de juiste oplossing in voor deze Morse-code puzzel.',
    einsteinHexTitle: 'Hexadecimale Code',
    einsteinHexDesc: 'Voer de juiste oplossing in voor deze hexadecimale code puzzel.',
    einsteinBinaryTitle: 'Binaire Code',
    einsteinBinaryDesc: 'Voer de juiste oplossing in voor deze binaire code puzzel.',
    einsteinCongratulations: 'Geweldig werk! Je hebt deze puzzel opgelost!',
    einsteinQuote: 'De ware waarde van een mens kan worden gevonden in de mate waarin hij bevrijding van het zelf heeft bereikt.',
    showCheatSheet: 'Toon hulpmiddel',
    einsteinQuestion: 'Vraag',
    einsteinSubmit: 'Versturen',
    einsteinPlaceholder: 'Typ hier je antwoord...',
    einsteinCorrect: 'Correct! Goed gedaan!',
    einsteinIncorrect: 'Helaas, dat is niet het juiste antwoord. Probeer het opnieuw!',
    einsteinFlagFound: 'Gefeliciteerd! Je hebt de Einstein flag gevonden!',

    // Quiz vragen
    quizQuestion1: 'Wat is een wachtwoord?',
    quizAnswer1_1: 'Geheime toegangscode',
    quizAnswer1_2: 'Computer programma',
    quizAnswer1_3: 'Schadelijk bestand',
    quizAnswer1_4: 'Webpagina',

    quizQuestion2: 'Wat is phishing?',
    quizAnswer2_1: 'Vissen sport',
    quizAnswer2_2: 'Online oplichting',
    quizAnswer2_3: 'Computer programma',
    quizAnswer2_4: 'Schadelijk bestand',

    quizQuestion3: 'Wat is een firewall?',
    quizAnswer3_1: 'Brandmuur',
    quizAnswer3_2: 'Netwerk beveiliging',
    quizAnswer3_3: 'Schadelijk bestand',
    quizAnswer3_4: 'Webpagina',

    quizQuestion4: 'Wat is encryptie?',
    quizAnswer4_1: 'Schadelijk bestand',
    quizAnswer4_2: 'Webpagina',
    quizAnswer4_3: 'Data versleuteling',
    quizAnswer4_4: 'Computer programma',

    quizQuestion5: 'Wat is een virus?',
    quizAnswer5_1: 'Biologische ziekte',
    quizAnswer5_2: 'Webpagina',
    quizAnswer5_3: 'Computer programma',
    quizAnswer5_4: 'Schadelijke software',
  },
  en: {
    // General navigation
    welcome: "Welcome to Genius! The goal is to find as many flags as possible. These flags are hidden throughout the website, and you need to find them by inspecting the site. On the flags page, you can view your collected flags and download a certificate.",
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
    startGameEasy: 'Easy Mode',
    startGameHard: 'Hard Mode',
    easyGameDescription: 'Start with basic encryption methods: Caesar cipher and ROT13. Perfect for beginners!',
    hardGameDescription: 'Challenging puzzles with various encryption methods. For the real codebreakers!',
    hintsDescription: 'Learn more about different encryption methods and view examples.',
    quizDescription: 'Test your encryption knowledge with this challenging quiz!',

    // Quiz page
    quizTitle: 'Let\'s test your cybersecurity knowledge!',
    quizTip1: 'Read the question carefully and pay attention to the encryption method details.',
    quizTip2: 'Use the examples on the hints page as a reference.',
    quizTip3: 'Try to decipher it yourself before using the cheat sheet.',
    quizFlagFound: 'Congratulations! You\'ve earned the Quiz Master flag!',
    easyGameFlagFound: 'Congratulations! You\'ve earned the Easy Game Master flag!',
    hardGameFlagFound: 'Congratulations! You\'ve earned the Hard Game Master flag!',
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
    themeFlagFound: 'Congratulations! You\'ve earned the Theme Master flag!',
    textFlagFound: 'Congratulations! You\'ve earned the Text Wizard flag!',
    soundFlagFound: 'Congratulations! You\'ve earned the Sound Master flag!',
    animationFlagFound: 'Congratulations! You\'ve earned the Animation Expert flag!',

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
    achievements: 'Show your flags',
    noFlags: 'No flags found yet',
    flagDetails: 'Flag details',
    flagId: 'Flag ID',
    flagLevel: 'Level',
    flagCategory: 'Category',
    flagPoints: 'Points',
    flagHint: 'Hint',
    foundAt: 'Found at',
    flagsMessage: 'Great work! Keep searching for more flags!',
    // Certificate translations
    certificateTitle: 'Genius Certificate',
    certificateNameLabel: 'Name',
    certificateCongrats: 'Congratulations {name}!',
    certificateFoundFlags: 'Number of flags found',
    certificateDate: 'Date',
    certificateFlagList: 'Found flags:',
    certificateFlag: 'Flag',
    certificatePoints: 'Points',
    certificateFooter: 'Thank you for participating in Genius!',
    // 404
    '404Message': 'You found a secret place! This is the 404 flag. Go back to the homepage.',

    // Hints pagina - uitgebreide vertalingen
    encryptionHints: 'Here are some hints to help you decode the different encryption methods.',
    firstDecryptionFlagFound: 'Congratulations! You\'ve earned the First Decryption flag!',
    decryptionTool: 'Decryption Tool',
    enterEncryptedText: 'Enter encrypted text',
    encryptedTextPlaceholder: 'Paste your encrypted text here...',
    decrypt: 'Decrypt',
    decryptedResult: 'Decrypted result',
    decryptionError: 'Could not decrypt the text. Try a different method.',
    close: 'Close',
    
    // Caesar Cipher
    caesarTitle: 'Caesar Cipher',
    caesarDesc: 'The Caesar cipher is one of the oldest encryption methods, named after Julius Caesar. It works by shifting each letter in the alphabet by a fixed number of positions.',
    caesarSteps: [
      '1. Write down the alphabet: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
      '2. For each letter in the encrypted text, count backwards by the shift number',
      '3. If you reach the start of the alphabet, continue from the end',
      '4. Example with shift 3: K → H (3 back), H → E (3 back), O → L (3 back), etc.'
    ],
    caesarTips: [
      '• The shift is always a number between 1 and 25',
      '• Common shifts are 3, 5, 7, and 13',
      '• If you don\'t know the shift, try shifting by 1-25 until you get readable text',
      '• Look for common words like "THE", "AND", "IS" to verify your shift'
    ],
    caesarCheatSheet: 'Caesar Cipher Cheat Sheet:',
    caesarCheatSheetDesc: 'Use this table to quickly decode. Find the encrypted letter in the top row and read the original letter in the bottom row.',
    
    // ROT13
    rot13Title: 'ROT13',
    rot13Desc: 'ROT13 is a special case of the Caesar cipher where each letter is shifted by 13 positions. It\'s its own inverse, meaning applying ROT13 twice returns the original text.',
    rot13Steps: [
      '1. Write down the alphabet: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
      '2. For each letter, count 13 positions forward',
      '3. If you reach the end of the alphabet, start from the beginning',
      '4. Example: E → R (13 forward), B → O (13 forward), G → T (13 forward)'
    ],
    rot13Tips: [
      '• ROT13 is its own inverse - applying it twice gives you the original text',
      '• Only letters are shifted, numbers and special characters stay the same',
      '• Common in online forums to hide spoilers or offensive content',
      '• The shift is always 13, so you don\'t need to guess the shift'
    ],
    rot13CheatSheet: 'ROT13 Cheat Sheet:',
    rot13CheatSheetDesc: 'Use this table to quickly decode. Find the encrypted letter in the top row and read the original letter in the bottom row.',
    
    // Morse Code
    morseTitle: 'Morse Code',
    morseDesc: 'Morse code is a method of transmitting text using short and long signals (dots and dashes). Each letter and number has its own unique pattern.',
    morseSteps: [
      '1. Split the message into individual Morse code characters (separated by spaces)',
      '2. For each character, look up its corresponding letter in the Morse code table',
      '3. Common patterns to remember:',
      '   • E = . (single dot)',
      '   • T = - (single dash)',
      '   • A = .- (dot-dash)',
      '   • N = -. (dash-dot)',
      '4. Join the letters together to form words'
    ],
    morseTips: [
      '• Letters are separated by spaces',
      '• Words are separated by forward slashes (/)',
      '• Numbers are longer than letters (5 dots/dashes)',
      '• The most common letters have the shortest codes',
      '• Use the cheat sheet to look up unfamiliar patterns'
    ],
    morseCheatSheet: 'Morse Code Cheat Sheet:',
    morseCheatSheetDesc: 'Use this table to quickly decode. Find the Morse pattern and read the corresponding letter or number.',
    
    // Binary
    binaryTitle: 'Binary Code',
    binaryDesc: 'Binary code is the language of computers, where each letter is represented by a series of 0s and 1s. Each 8 bits (1 byte) represents one character.',
    binarySteps: [
      '1. Split the binary string into groups of 8 bits (1 byte)',
      '2. Convert each byte to its decimal value',
      '3. Use the ASCII table to convert the decimal value to a character',
      '4. Common ASCII values to remember:',
      '   • A = 65 (01000001)',
      '   • a = 97 (01100001)',
      '   • 0 = 48 (00110000)',
      '   • Space = 32 (00100000)'
    ],
    binaryTips: [
      '• Each character is represented by 8 bits',
      '• Uppercase letters are 65-90 in decimal',
      '• Lowercase letters are 97-122 in decimal',
      '• Numbers are 48-57 in decimal',
      '• Use an online binary to ASCII converter for longer messages'
    ],
    binaryCheatSheet: 'Binary Code Cheat Sheet:',
    binaryCheatSheetDesc: 'Use this table to quickly decode. Find the binary code and read the corresponding letter or number.',
    
    // Hexadecimal
    hexTitle: 'Hexadecimal Code',
    hexDesc: 'Hexadecimal notation is an elegant way to represent binary data using 16 different symbols (0-9 and A-F). Each two hexadecimal digits represent one byte.',
    hexSteps: [
      '1. Split the hex string into pairs of characters',
      '2. Convert each pair to its decimal value',
      '3. Use the ASCII table to convert the decimal value to a character',
      '4. Common hex values to remember:',
      '   • A = 41 (hex)',
      '   • a = 61 (hex)',
      '   • 0 = 30 (hex)',
      '   • Space = 20 (hex)'
    ],
    hexTips: [
      '• Each character is represented by 2 hex digits',
      '• Hex uses 0-9 and A-F',
      '• A = 10, B = 11, C = 12, D = 13, E = 14, F = 15',
      '• Uppercase letters are 41-5A in hex',
      '• Lowercase letters are 61-7A in hex'
    ],
    hexCheatSheet: 'Hexadecimal Code Cheat Sheet:',
    hexCheatSheetDesc: 'Use this table to quickly decode. Find the hexadecimal code and read the corresponding letter or number.',
    
    // Base64
    base64Title: 'Base64 Encoding',
    base64Desc: 'Base64 is a method to encode binary data using 64 different characters (A-Z, a-z, 0-9, +, and /). It\'s often used for encoding images and other binary data in text format.',
    base64Steps: [
      '1. Base64 uses these 64 characters: A-Z, a-z, 0-9, +, and /',
      '2. Each character represents 6 bits of data',
      '3. The = at the end is padding',
      '4. To decode:',
      '   • Convert each character to its 6-bit value',
      '   • Combine the bits into groups of 8',
      '   • Convert each 8-bit group to its ASCII character'
    ],
    base64Tips: [
      '• Always ends with = or == for padding',
      '• Common in email attachments and web data',
      '• Can encode any binary data',
      '• The output is always longer than the input',
      '• Use an online Base64 decoder for longer messages'
    ],
    base64CheatSheet: 'Base64 Cheat Sheet:',
    base64CheatSheetDesc: 'Use this table to quickly decode. Find the Base64 code and read the corresponding letter or number.',

    // General sections
    stepByStep: 'Step-by-Step Decoding:',
    tipsAndTricks: 'Tips & Tricks:',
    examples: 'Examples:',
    cheatsheet: 'Cheat Sheet:',
    cheatsheetDesc: 'Use this table to quickly decode:',

    // Decryption Tool section
    selectMethod: 'Select decryption method',
    caesarCipher: 'Caesar Cipher',
    binaryCode: 'Binary Code',
    hexCode: 'Hexadecimal Code',
    shiftAmount: 'Shift amount',
    invalidBinary: 'Invalid binary code. Use only 0, 1 and spaces.',
    invalidHex: 'Invalid hexadecimal code. Use only 0-9, A-F and spaces.',
    invalidBase64: 'Invalid Base64 code.',

    // Admin page
    adminPanel: 'Admin Panel',
    adminPanelDescription: 'Welcome to the admin panel. Here you can manage the application settings.',
    adminMessage: 'You\'ve found the secret admin page! Be careful what you do...',
    maintenanceMode: 'Maintenance Mode',
    toggleMaintenance: 'Toggle Maintenance Mode',
    updateSettings: 'Update Settings',
    applyUpdates: 'Apply Updates',
    dangerZone: 'Danger Zone',
    deleteAllData: 'Delete All Data',
    typeToConfirm: 'Type DELETE_ALL to confirm',
    deleteWarning: 'Warning: This action cannot be undone. Please type DELETE_ALL to confirm.',
    adminDeleteFlagFound: 'Congratulations! You\'ve found the Delete Daredevil flag!',
    adminMaintenanceFlagFound: 'Congratulations! You\'ve found the Maintenance Master flag!',
    adminSettingsFlagFound: 'Congratulations! You\'ve found the Settings Specialist flag!',

    // Einstein quiz
    einsteinCaesarTitle: 'Caesar Cipher',
    einsteinCaesarDesc: 'Enter the correct solution for this Caesar cipher puzzle.',
    einsteinMorseTitle: 'Morse Code',
    einsteinMorseDesc: 'Enter the correct solution for this Morse code puzzle.',
    einsteinHexTitle: 'Hexadecimal Code',
    einsteinHexDesc: 'Enter the correct solution for this hexadecimal code puzzle.',
    einsteinBinaryTitle: 'Binary Code',
    einsteinBinaryDesc: 'Enter the correct solution for this binary code puzzle.',
    einsteinCongratulations: 'Great work! You solved this puzzle!',
    einsteinQuote: 'The true value of a human being can be found in the degree to which he has attained liberation from the self.',
    showCheatSheet: 'Show cheat sheet',
    einsteinQuestion: 'Question',
    einsteinSubmit: 'Submit',
    einsteinPlaceholder: 'Type your answer here...',
    einsteinCorrect: 'Correct! Well done!',
    einsteinIncorrect: 'Sorry, that\'s not the right answer. Try again!',
    einsteinFlagFound: 'Congratulations! You\'ve found the Einstein flag!',

    // Quiz questions
    quizQuestion1: 'What is a password?',
    quizAnswer1_1: 'Secret access code',
    quizAnswer1_2: 'Computer program',
    quizAnswer1_3: 'Malicious file',
    quizAnswer1_4: 'Webpage',

    quizQuestion2: 'What is phishing?',
    quizAnswer2_1: 'Fishing sport',
    quizAnswer2_2: 'Online fraud',
    quizAnswer2_3: 'Computer program',
    quizAnswer2_4: 'Malicious file',

    quizQuestion3: 'What is a firewall?',
    quizAnswer3_1: 'Fire wall',
    quizAnswer3_2: 'Network security',
    quizAnswer3_3: 'Malicious file',
    quizAnswer3_4: 'Webpage',

    quizQuestion4: 'What is encryption?',
    quizAnswer4_1: 'Malicious file',
    quizAnswer4_2: 'Webpage',
    quizAnswer4_3: 'Data encryption',
    quizAnswer4_4: 'Computer program',

    quizQuestion5: 'What is a virus?',
    quizAnswer5_1: 'Biological disease',
    quizAnswer5_2: 'Webpage',
    quizAnswer5_3: 'Computer program',
    quizAnswer5_4: 'Malicious software',
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
    let text = translations[language][key];
    if (text === undefined) {
      return key;
    }
    
    if (Array.isArray(text)) {
      return text;
    }
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        text = (text as string).replace(`{${key}}`, String(value));
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