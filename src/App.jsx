import { useState, useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import logoImg from './logo.png'
import homeIcon from './home.png'
import servicesIcon from './services.png'
import reportIcon from './report.png'
import certIcon from './certificate.png'
import contactIcon from './contact.png'

// Translation Dictionaries
const translations = {
  en: {
    brand: 'GramSetu',
    navHome: 'Home',
    navServices: 'Services',
    navComplaints: 'Complaints',
    navGramSabha: 'Gram Sabha',
    navCertificates: 'Certificates',
    navContact: 'Contact',
    ctaLogin: 'Login / Register',
    heroBadge: 'Digital Gram Panchayat Portal',
    heroTitle: 'Bridging <span class="text-brand-gradient">Citizens</span> and Local <span class="text-brand-gradient">Governance</span>',
    heroDesc: 'Revolutionizing rural administration with absolute transparency, instant digital certifications, and direct civic audits. Welcome to the future of Gram Panchayat.',
    btnGetStarted: 'Get Started',
    btnWatchDemo: 'Watch Demo',
    
    featuresTitle: 'Features & Services',
    featuresSubtitle: 'Explore our core digital utilities designed to improve transparency and connectivity in rural administration.',
    
    complaintCardTitle: 'Complaint Management',
    complaintCardDesc: 'Connect citizens to swift grievance reporting and live tracking of local resolution progress.',
    fundCardTitle: 'Fund Transparency',
    fundCardDesc: 'Audit village treasury funds, track allocations, and monitor real-time expenditure reports.',
    certCardTitle: 'Digital Certificates',
    certCardDesc: 'Generate and instantly download residency, income, and local official documents securely.',
    sabhaCardTitle: 'Gram Sabha Participation',
    sabhaCardDesc: 'Access meeting schedules, vote on public agendas, and read resolution minutes online.',
    feedbackCardTitle: 'Citizen Feedback',
    feedbackCardDesc: 'Provide input on development works to evaluate contractors and local body performances.',
    aiCardTitle: 'AI Voice Assistant',
    aiCardDesc: 'Navigate administrative workflows using voice prompts in local Marathi and English dialects.',

    statsTitle: 'Panchayat Live Analytics',
    statsSubtitle: 'Real-time indicators dynamically calculated based on citizen registrations, grievance handling, and fiscal reporting.',
    statConnected: 'Total Connected Citizens',
    statComplaints: 'Complaints Resolved',
    statServices: 'Services Delivered',
    statTransparency: 'Transparency Rating',
    
    chartTitle: 'Budget Allocation vs Expenditure',
    chartSubtitle: 'Treasury Audit in Lakhs (INR)',
    chartLegendAllocated: 'Allocated Budget',
    chartLegendSpent: 'Spent Budget',
    chartInfrastructure: 'Infrastructure',
    chartWater: 'Water Supply',
    chartEducation: 'Education',
    chartSocial: 'Social Welfare',
    chartAgri: 'Agriculture',
    chartFilterAll: 'All Sectors',

    progressTitle: 'Work Completion Rate',
    progressSubtitle: 'Ongoing developmental works progressing on schedule.',
    progressText: 'completed tasks',

    complaintFormTitle: 'File a New Grievance',
    labelName: 'Citizen Name',
    labelCategory: 'Issue Category',
    labelDesc: 'Elaborate your Grievance',
    placeholderName: 'e.g. Sachin Tendulkar',
    placeholderDesc: 'Please write details here (e.g., Streetlight out on Ward 3 Main Road)...',
    btnSubmitGrievance: 'Submit Grievance',

    liveTrackerTitle: 'Live Grievance Log',
    statusPending: 'Under Review',
    statusResolved: 'Resolved',
    statusCategoryWater: 'Water Supply',
    statusCategoryLights: 'Street Lights',
    statusCategoryWaste: 'Waste Management',
    statusCategoryRoads: 'Road Quality',

    certTitle: 'Digital Document Hub',
    certSubtitle: 'Request, verify, and download official Gram Panchayat credentials instantly.',
    certBoxTitle: 'Apply for Document',
    certInputLabel: 'Resident Full Name',
    placeholderCertName: 'e.g. Sunita Deshmukh',
    btnGenerateCert: 'Generate Document',
    btnDownloadCert: 'Download Official PNG',

    // Auth translations
    loginTitle: 'Citizen Portal Login',
    loginSubtitle: 'Enter your registered credentials to access digital services.',
    loginCompulsoryMsgCert: 'Authentication is compulsory to download or request certificates.',
    loginCompulsoryMsgComp: 'Authentication is compulsory to submit a grievance.',
    labelUsername: 'Username / Mobile Number',
    labelPassword: 'Password / OTP PIN',
    placeholderUsername: 'e.g., 9876543210',
    placeholderPassword: '••••••',
    btnSubmitLogin: 'Secure Login',
    btnSubmitRegister: 'Register Account',
    btnDemoLogin: 'Quick Demo Login (Sarpanch)',
    navLogout: 'Logout',

    // Upload & Request Form translations
    uploadIdLabel: 'Upload Identity Proof (Compulsory)',
    uploadIdDesc: 'Drag & drop or click to upload Aadhaar, Ration Card, or Voter ID (JPG/PNG)',
    uploadCompulsoryError: 'This document request requires a valid file attachment.',
    uploadCompulsoryErrorComp: 'An image of the issue is compulsory to submit a grievance.',
    complaintImgLabel: 'Upload Grievance Photo (Compulsory)',
    complaintImgDesc: 'Drag & drop or click to upload photo of the issue (broken pipe, broken street light, etc.)',
    docRequestModalTitle: 'Official Document Request',
    docRequestNameLabel: 'Applicant Full Name',
    docRequestPurposeLabel: 'Purpose of Application',
    docRequestSubmitBtn: 'Submit Request',
    docSuccessTitle: 'Request Submitted Successfully!',
    docSuccessDesc: 'Your document request has been submitted to the Gram Sevak. Once approved, it will be issued and logged in the live audit ledger.',
    docRegisterReq: 'Request Document',

    voiceAssistantTitle: 'GramSetu Voice Mitra',
    voiceSuggestLabel: 'Frequently Asked:',
    voicePrompt1: 'How do I apply for a Birth Certificate?',
    voicePrompt2: 'When is the next Gram Sabha meeting?',
    voicePrompt3: 'How to check my complaint status?',
    voiceInputPlaceholder: 'Ask something or select a prompt...',
    voiceBtnListen: 'Ask Voice Mitra',
    voiceBtnListening: 'Listening...',
    voiceResponse1: 'To apply for a Birth Certificate, navigate to the Digital Certificates section, fill in your details, or download the physical application form from our Services tab. Processing takes 2 working days.',
    voiceResponse2: 'The next Gram Sabha meeting is scheduled for July 15th, 2026, at 10:00 AM in the Village Panchayat Office Hall. All ward representatives must attend.',
    voiceResponse3: 'You can check your grievance status in the Live Grievance Log below. Once resolved by the ward officer, the status tag will update from "Under Review" to "Resolved" in blue.',
    voiceDefaultResponse: 'I can assist you with certificate applications, Gram Sabha schedules, and grievance logging. Please select one of the quick options or ask a question.',

    techTitle: 'Robust Administrative Architecture',
    techSubtitle: 'We integrate secure, low-latency frameworks to sustain transparency even in remote rural corridors.',
    tech1Title: 'AI-Powered Governance',
    tech1Desc: 'Automated grievance routing and local dialect speech processing designed for citizen inclusivity.',
    tech2Title: 'Real-Time Audits',
    tech2Desc: 'Publicly visible distributed ledger for financial allocations and project timelines.',
    tech3Title: 'Marathi + English Locale',
    tech3Desc: 'Full regional translation interfaces to bypass administrative text barriers.',
    tech4Title: 'Secure Credentials',
    tech4Desc: 'Cryptographically verifiable, locally rendered certifications instantly printable.'
  },
  mr: {
    brand: 'ग्रामसेतू',
    navHome: 'मुख्यपृष्ठ',
    navServices: 'सेवा',
    navComplaints: 'तक्रारी',
    navGramSabha: 'ग्रामसभा',
    navCertificates: 'प्रमाणपत्रे',
    navContact: 'संपर्क',
    ctaLogin: 'लॉगिन / नोंदणी',
    heroBadge: 'डिजिटल ग्रामपंचायत पोर्टल',
    heroTitle: 'नागरिक आणि <span class="text-brand-gradient">स्थानिक प्रशासन</span> जोडणारा <span class="text-brand-gradient">डिजिटल दुवा</span>',
    heroDesc: 'पारदर्शक कारभार, त्वरित डिजिटल दाखले आणि थेट आर्थिक लेखापरीक्षणासह ग्रामीण प्रशासनात क्रांती. ग्रामपंचायतीच्या उज्ज्वल डिजिटल भविष्यात आपले स्वागत आहे.',
    btnGetStarted: 'सुरू करूया',
    btnWatchDemo: 'डेमो पहा',
    
    featuresTitle: 'वैशिष्ट्ये आणि सेवा',
    featuresSubtitle: 'ग्रामीण प्रशासनात पारदर्शकता आणि सुलभता वाढवण्यासाठी डिझाइन केलेल्या आमच्या डिजिटल सेवा एक्सप्लोर करा.',
    
    complaintCardTitle: 'तक्रार निवारण',
    complaintCardDesc: 'नागरिकांना जलद तक्रार नोंदणी आणि स्थानिक निवारण प्रगतीचे थेट ट्रॅकिंग प्रदान करते.',
    fundCardTitle: 'निधी पारदर्शकता',
    fundCardDesc: 'गावाच्या तिजोरी निधीचे लेखापरीक्षण करा, वाटप तपासा आणि थेट खर्च अहवाल पहा.',
    certCardTitle: 'डिजिटल प्रमाणपत्रे',
    certCardDesc: 'रहिवासी, उत्पन्न आणि इतर स्थानिक अधिकृत दस्तऐवज त्वरित आणि सुरक्षितपणे डाउनलोड करा.',
    sabhaCardTitle: 'ग्रामसभा सहभाग',
    sabhaCardDesc: 'बैठकीचे वेळापत्रक पहा, सार्वजनिक अजेंडांवर मतदान करा आणि सभेचे इतिवृत्त ऑनलाइन वाचा.',
    feedbackCardTitle: 'नागरिक अभिप्राय',
    feedbackCardDesc: 'गाव विकासाच्या कामांवर आपले मत मांडून कंत्राटदार आणि स्थानिक संस्थांचे मूल्यांकन करा.',
    aiCardTitle: 'AI आवाज सहाय्यक',
    aiCardDesc: 'स्थानिक मराठी आणि इंग्रजी बोलीभाषेत व्हॉइस कमांड्स वापरून शासकीय कामकाज समजून घ्या.',

    statsTitle: 'पंचायत थेट विश्लेषण',
    statsSubtitle: 'नागरिकांची नोंदणी, तक्रार निवारण आणि आर्थिक अहवालावर आधारित थेट आकडेवारी.',
    statConnected: 'एकूण जोडलेले नागरिक',
    statComplaints: 'निवारण तक्रारी',
    statServices: 'वितरित केलेल्या सेवा',
    statTransparency: 'पारदर्शकता रेटिंग',
    
    chartTitle: 'बजेट वाटप विरुद्ध खर्च',
    chartSubtitle: 'तिजोरी लेखापरीक्षण - लाख (रुपये)',
    chartLegendAllocated: 'वाटप केलेला निधी',
    chartLegendSpent: 'खर्च केलेला निधी',
    chartInfrastructure: 'पायाभूत सुविधा',
    chartWater: 'पाणी पुरवठा',
    chartEducation: 'शिक्षण',
    chartSocial: 'समाज कल्याण',
    chartAgri: 'कृषी विभाग',
    chartFilterAll: 'सर्व क्षेत्रे',

    progressTitle: 'काम पूर्ण होण्याचा दर',
    progressSubtitle: 'वेळापत्रकानुसार प्रगतीपथावर असलेले गाव विकास प्रकल्प.',
    progressText: 'पूर्ण कामे',

    complaintFormTitle: 'नवीन तक्रार नोंदवा',
    labelName: 'नागरिकाचे नाव',
    labelCategory: 'तक्रारीचा प्रकार',
    labelDesc: 'तुमची तक्रार सविस्तर लिहा',
    placeholderName: 'उदा. सचिन तेंडुलकर',
    placeholderDesc: 'कृपया येथे तक्रारीचे सविस्तर वर्णन लिहा (उदा. वॉर्ड ३ मधील पथदिवा बंद आहे)...',
    btnSubmitGrievance: 'तक्रार नोंदवा',

    liveTrackerTitle: 'थेट तक्रार नोंदवही',
    statusPending: 'तपासणी सुरू',
    statusResolved: 'निवारण झाले',
    statusCategoryWater: 'पाणी पुरवठा',
    statusCategoryLights: 'पथदिवे',
    statusCategoryWaste: 'कचरा व्यवस्थापन',
    statusCategoryRoads: 'रस्त्याची दुरवस्था',

    certTitle: 'डिजिटल दस्तऐवज केंद्र',
    certSubtitle: 'अधिकृत ग्रामपंचायत प्रमाणपत्रे आणि दस्तऐवज सुरक्षितपणे अर्ज करा आणि डाउनलोड करा.',
    certBoxTitle: 'दस्तऐवजासाठी अर्ज',
    certInputLabel: 'रहिवाशाचे पूर्ण नाव',
    placeholderCertName: 'उदा. सुनिता देशमुख',
    btnGenerateCert: 'दस्तऐवज जनरेट करा',
    btnDownloadCert: 'अधिकृत दाखला डाउनलोड करा',

    // Auth translations
    loginTitle: 'नागरिक पोर्टल लॉगिन',
    loginSubtitle: 'डिजिटल सेवा मिळवण्यासाठी तुमची नोंदणीकृत माहिती प्रविष्ट करा.',
    loginCompulsoryMsgCert: 'प्रमाणपत्रे डाउनलोड किंवा अर्ज करण्यासाठी लॉगिन आवश्यक आहे.',
    loginCompulsoryMsgComp: 'तक्रार नोंदवण्यासाठी लॉगिन आवश्यक आहे.',
    labelUsername: 'वापरकर्ता नाव / मोबाईल नंबर',
    labelPassword: 'पासवर्ड / ओटीपी पिन',
    placeholderUsername: 'उदा. 9876543210',
    placeholderPassword: '••••••',
    btnSubmitLogin: 'सुरक्षित लॉगिन',
    btnSubmitRegister: 'खाते नोंदणी करा',
    btnDemoLogin: 'डेमो लॉगिन (सरपंच)',
    navLogout: 'लॉगआउट',

    // Upload & Request Form translations
    uploadIdLabel: 'ओळखपत्र अपलोड करा (अनिवार्य)',
    uploadIdDesc: 'येथे फाईल ड्रॅग करा किंवा आधार कार्ड, रेशन कार्ड किंवा मतदार ओळखपत्र अपलोड करण्यासाठी क्लिक करा (JPG/PNG)',
    uploadCompulsoryError: 'या दस्तऐवजासाठी फाईल जोडणे अनिवार्य आहे.',
    uploadCompulsoryErrorComp: 'तक्रार नोंदवण्यासाठी समस्येचा फोटो जोडणे अनिवार्य आहे.',
    complaintImgLabel: 'तक्रारीचा फोटो अपलोड करा (अनिवार्य)',
    complaintImgDesc: 'येथे फाईल ड्रॅग करा किंवा समस्येचा फोटो अपलोड करण्यासाठी क्लिक करा (उदा. फुटलेली पाईपलाईन, बंद पथदिवे)',
    docRequestModalTitle: 'अधिकृत दस्तऐवजासाठी अर्ज',
    docRequestNameLabel: 'अर्जदाराचे पूर्ण नाव',
    docRequestPurposeLabel: 'अर्जाचे कारण',
    docRequestSubmitBtn: 'अर्ज सादर करा',
    docSuccessTitle: 'अर्ज यशस्वीरित्या सादर केला गेला!',
    docSuccessDesc: 'तुमचा दाखल्याचा अर्ज ग्रामसेवकांकडे मंजुरीसाठी पाठवण्यात आला आहे. मंजुरी मिळाल्यानंतर तो जारी केला जाईल व लेजरमध्ये नोंदवला जाईल.',
    docRegisterReq: 'दाखला मिळवा',

    voiceAssistantTitle: 'ग्रामसेतू आवाज मित्र',
    voiceSuggestLabel: 'नेहमी विचारले जाणारे:',
    voicePrompt1: 'जन्म दाखल्यासाठी अर्ज कसा करावा?',
    voicePrompt2: 'पुढील ग्रामसभा बैठक कधी आहे?',
    voicePrompt3: 'माझ्या तक्रारीची स्थिती कशी तपासायची?',
    voiceInputPlaceholder: 'काहीतरी विचारा किंवा प्रश्न निवडा...',
    voiceBtnListen: 'आवाज मित्राशी बोला',
    voiceBtnListening: 'ऐकत आहे...',
    voiceResponse1: 'जन्म दाखल्यासाठी अर्ज करण्यासाठी, डिजिटल प्रमाणपत्रे विभागावर जा, तुमची माहिती भरा किंवा सेवा टॅबमधून प्रत्यक्ष अर्ज डाउनलोड करा. या कामासाठी २ कार्यालयीन दिवस लागतात.',
    voiceResponse2: 'पुढील ग्रामसभा बैठक १५ जुलै २०२६ रोजी सकाळी १०:०० वाजता ग्रामपंचायत कार्यालय सभागृहात आयोजित करण्यात आली आहे. सर्व वॉर्ड प्रतिनिधींची उपस्थिती अनिवार्य आहे.',
    voiceResponse3: 'तुम्ही खालील थेट तक्रार नोंदवहीमध्ये तुमच्या तक्रारीची स्थिती तपासू शकता. वॉर्ड अधिकाऱ्याने तक्रार सोडवल्यानंतर स्टेटस "तपासणी सुरू" वरून निळ्या रंगात "निवारण झाले" असे बदलेल.',
    voiceDefaultResponse: 'मी तुम्हाला प्रमाणपत्र अर्ज, ग्रामसभा वेळापत्रक आणि तक्रार नोंदणीमध्ये मदत करू शकतो. कृपया त्वरित पर्यायांपैकी एक निवडा किंवा तुमचा प्रश्न विचारा.',

    techTitle: 'मजबूत प्रशासकीय तंत्रज्�~ान',
    techSubtitle: 'दुर्गम ग्रामीण भागातही पारदर्शकता टिकवून ठेवण्यासाठी आम्ही सुरक्षित आणि गतिमान प्रणाली वापरतो.',
    tech1Title: 'AI-सक्षम प्रशासन',
    tech1Desc: 'नागरिकांच्या समावेशकतेसाठी स्वयंचलित तक्रार वर्गीकरण आणि स्थानिक बोलीभाषा आवाज प्रक्रिया.',
    tech2Title: 'थेट आर्थिक लेखापरीक्षण',
    tech2Desc: 'आर्थिक वाटप आणि प्रकल्पाच्या वेळेचे सार्वजनिकरीत्या दृश्यमान लेखापरीक्षण.',
    tech3Title: 'मराठी + इंग्रजी भाषा पर्याय',
    tech3Desc: 'प्रशासकीय भाषेतील अडथळे दूर करण्यासाठी संपूर्ण प्रादेशिक अनुवाद इंटरफेस.',
    tech4Title: 'सुरक्षित प्रमाणपत्रे',
    tech4Desc: 'त्वरित मुद्रण करण्यायोग्य आणि पडताळणीस सोपे डिजिटल स्वाक्षरीचे दाखले.'
  }
}

// Initial complaints state
const initialComplaints = [
  {
    id: 1,
    name: 'Suresh Patil',
    category: 'Water Supply',
    categoryMr: 'पाणी पुरवठा',
    desc: 'Severe water pipeline leakage near the primary school is causing road flooding.',
    descMr: 'प्राथमिक शाळेजवळ पिण्याच्या पाण्याच्या पाईपलाईनला मोठे गळती लागली असून पाणी रस्त्यावर पसरले आहे.',
    status: 'Pending',
    date: '2026-06-23',
    image: 'https://images.unsplash.com/photo-1542013936693-8848e5740a7a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    name: 'Meena Deshmukh',
    category: 'Street Lights',
    categoryMr: 'पथदिवे',
    desc: 'Main road streetlights in Ward 3 have been non-functional for over 5 days.',
    descMr: 'वॉर्ड क्र. ३ मधील मुख्य रस्त्यावरील पथदिवे गेल्या ५ दिवसांपासून बंद आहेत, रात्री अंधार असतो.',
    status: 'Resolved',
    date: '2026-06-22',
    image: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    name: 'Ramesh Pawar',
    category: 'Waste Management',
    categoryMr: 'कचरा व्यवस्थापन',
    desc: 'Garbage accumulation near the temple square. The tractor did not visit yesterday.',
    descMr: 'मंदिर चौकात कचऱ्याचा ढीग साचला आहे. काल कचरा गोळा करणारी गाडी आली नव्हती.',
    status: 'Pending',
    date: '2026-06-23',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=600'
  }
]

// Funds allocation data (Lakhs INR)
const initialFundsData = {
  Infrastructure: { allocated: 0, spent: 0, records: [] },
  WaterSupply: { allocated: 0, spent: 0, records: [] },
  Education: { allocated: 0, spent: 0, records: [] },
  SocialWelfare: { allocated: 0, spent: 0, records: [] },
  Agriculture: { allocated: 0, spent: 0, records: [] }
}

const documentsList = [
  {
    id: 'residency',
    titleEn: 'Residency Certificate',
    titleMr: 'रहिवासी दाखला',
    descEn: 'Official proof of residence in the Gram Panchayat jurisdiction.',
    descMr: 'ग्रामपंचायत हद्दीतील वास्तव्याचा अधिकृत पुरावा.',
    icon: '🏠',
    speedEn: '2 Working Days',
    speedMr: '२ कामकाजाचे दिवस',
    canvasTitleEn: 'RESIDENT CERTIFICATE',
    canvasTitleMr: 'रहिवासी दाखला',
    line1En: (name) => `This is officially certified that Shri / Smt: ${name}`,
    line1Mr: (name) => `प्रमाणित करण्यात येते की, श्री / श्रीमती: ${name}`,
    line2En: 'is a recognized and bonafide resident of Ward No. 3, GramSetu Village.',
    line2Mr: 'हे वॉर्ड क्र. ३, ग्रामसेतू गावचे अधिकृत आणि नोंदणीकृत रहिवासी आहेत.',
  },
  {
    id: 'income',
    titleEn: 'Income Certificate',
    titleMr: 'उत्पन्न दाखला',
    descEn: 'Certified document stating the annual family income for scholarship & aid.',
    descMr: 'शिष्यवृत्ती आणि शासकीय योजनांसाठी कुटुंबाचे वार्षिक उत्पन्न प्रमाणपत्र.',
    icon: '💰',
    speedEn: '2 Working Days',
    speedMr: '२ कामकाजाचे दिवस',
    canvasTitleEn: 'INCOME CERTIFICATE',
    canvasTitleMr: 'उत्पन्न दाखला',
    line1En: (name) => `This is officially certified that the family income of Shri / Smt: ${name}`,
    line1Mr: (name) => `प्रमाणित करण्यात येते की, श्री / श्रीमती: ${name}`,
    line2En: 'is verified to be below INR 1,50,000/- (One Lakh Fifty Thousand only) annually.',
    line2Mr: 'यांच्या कुटुंबाचे एकूण वार्षिक उत्पन्न रु. १,५०,०००/- पेक्षा कमी आहे.',
  },
  {
    id: 'birth',
    titleEn: 'Birth Certificate',
    titleMr: 'जन्म दाखला',
    descEn: 'Official administrative registration of child birth details.',
    descMr: 'बालकाच्या जन्माची नोंदणी दर्शवणारे अधिकृत प्रमाणपत्र.',
    icon: '👶',
    speedEn: '2 Working Days',
    speedMr: '२ कामकाजाचे दिवस',
    canvasTitleEn: 'BIRTH CERTIFICATE',
    canvasTitleMr: 'जन्म दाखला',
    line1En: (name) => `This is officially certified that the birth registration for Child of: ${name}`,
    line1Mr: (name) => `प्रमाणित करण्यात येते की, श्री / श्रीमती: ${name}`,
    line2En: 'has been verified in Register No. 4 under registration record.',
    line2Mr: 'यांच्या पालकांचे नाव जन्म नोंदवही भाग क्र. ४ मध्ये नोंदवले गेले आहे.',
  },
  {
    id: 'marriage',
    titleEn: 'Marriage Certificate',
    titleMr: 'विवाह नोंदणी प्रमाणपत्र',
    descEn: 'Administrative credential confirming marriage details registration.',
    descMr: 'विवाह नोंदणी कायद्यांतर्गत विवाह नोंदणीचे प्रमाणपत्र.',
    icon: '💍',
    speedEn: '2 Working Days',
    speedMr: '२ कामकाजाचे दिवस',
    canvasTitleEn: 'MARRIAGE CERTIFICATE',
    canvasTitleMr: 'विवाह प्रमाणपत्र',
    line1En: (name) => `This is officially certified that the marriage registry of: ${name}`,
    line1Mr: (name) => `प्रमाणित करण्यात येते की, श्री / श्रीमती: ${name}`,
    line2En: 'has been solemnized and registered under Maharashtra Marriage Rules.',
    line2Mr: 'यांचे विवाह ग्रामसेतू निबंधक कार्यालयात अधिकृत नोंदवले गेले आहे.',
  }
]

const initialDocRequests = [
  {
    id: 1,
    applicantName: 'Dnyaneshwar Gaikwad',
    docType: 'residency',
    docTitleEn: 'Residency Certificate',
    docTitleMr: 'रहिवासी दाखला',
    purpose: 'Agriculture Loan Application',
    date: '2026-06-23',
    idProofName: 'aadhaar_card.png',
    idProofPreview: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=400',
    status: 'Pending'
  },
  {
    id: 2,
    applicantName: 'Meena Deshmukh',
    docType: 'income',
    docTitleEn: 'Income Certificate',
    docTitleMr: 'उत्पन्न दाखला',
    purpose: 'Daughter\'s College Admission',
    date: '2026-06-22',
    idProofName: 'ration_card.png',
    idProofPreview: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400',
    status: 'Pending'
  },
  {
    id: 3,
    applicantName: 'Ramesh Pawar',
    docType: 'birth',
    docTitleEn: 'Birth Certificate',
    docTitleMr: 'जन्म दाखला',
    purpose: 'School Transfer Admission',
    date: '2026-06-24',
    idProofName: 'voter_id.png',
    idProofPreview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    status: 'Pending'
  }
]

const initialAnnouncements = [
  { id: 1, title: 'Next Gram Sabha Meeting', details: 'Scheduled for July 15th, 2026, at 10:00 AM in the Panchayat Hall.', date: '2026-06-24' },
  { id: 2, title: 'Clean Village Drive', details: 'Join us this Sunday at 7:00 AM for the weekly cleanliness campaign starting from the main chowk.', date: '2026-06-22' }
]


const drawCertificate = (canvas, doc, name, lang) => {
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  // Clean canvas & set high resolution for display
  canvas.width = 842
  canvas.height = 595

  // Draw background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Outer primary border (green)
  ctx.strokeStyle = '#10b981'
  ctx.lineWidth = 14
  ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30)

  // Inner gold border
  ctx.strokeStyle = '#eab308'
  ctx.lineWidth = 3
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60)

  // Subtle background pattern (concentric circles overlay)
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.04)'
  ctx.lineWidth = 1.5
  for (let r = 100; r <= 350; r += 40) {
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, r, 0, Math.PI * 2)
    ctx.stroke()
  }

  // Header State Name
  ctx.fillStyle = '#064e3b'
  ctx.textAlign = 'center'
  ctx.font = 'bold 24px "Outfit", "Noto Sans Devanagari", sans-serif'
  ctx.fillText(lang === 'en' ? 'GOVERNMENT OF MAHARASHTRA' : 'महाराष्ट्र शासन', canvas.width / 2, 85)

  ctx.fillStyle = '#10b981'
  ctx.font = 'bold 18px "Outfit", "Noto Sans Devanagari", sans-serif'
  ctx.fillText(lang === 'en' ? 'DISTRICT PUNE • GRAM PANCHAYAT GRAMSETU' : 'जिल्हा पुणे • ग्रामपंचायत ग्रामसेतू', canvas.width / 2, 115)

  // Golden separator line
  ctx.strokeStyle = '#eab308'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(180, 135)
  ctx.lineTo(canvas.width - 180, 135)
  ctx.stroke()

  // Certificate Title
  ctx.fillStyle = '#0f172a'
  ctx.font = 'bold 38px "Outfit", "Noto Sans Devanagari", sans-serif'
  ctx.fillText(lang === 'en' ? doc.canvasTitleEn : doc.canvasTitleMr, canvas.width / 2, 195)

  // Body Text
  ctx.fillStyle = '#334155'
  ctx.font = '500 18px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif'
  
  const displayName = name.trim() || (lang === 'en' ? '[Enter Name in Portal]' : '[पोर्टलमध्ये नाव लिहा]')
  const line1 = lang === 'en' ? doc.line1En(displayName) : doc.line1Mr(displayName)
  ctx.fillText(line1, canvas.width / 2, 270)

  const line2 = lang === 'en' ? doc.line2En : doc.line2Mr
  ctx.fillText(line2, canvas.width / 2, 310)

  const line3 = lang === 'en'
    ? 'His/Her resident status is verified as active under rural census records.'
    : 'त्यांच्या रहिवासी स्थितीची पडताळणी ग्रामीण जनगणना नोंदीनुसार करण्यात आली आहे.'
  ctx.fillText(line3, canvas.width / 2, 350)

  const line4 = lang === 'en'
    ? 'This certificate is generated digitally and does not require manual attestation.'
    : 'हे प्रमाणपत्र डिजिटल प्रणालीद्वारे व्युत्पन्न केले गेले असून स्वाक्षरीची आवश्यकता नाही.'
  ctx.fillText(line4, canvas.width / 2, 390)

  // Date
  ctx.textAlign = 'left'
  ctx.fillStyle = '#475569'
  ctx.font = '600 15px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif'
  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : 'mr-IN')
  ctx.fillText(`${lang === 'en' ? 'Date of Issue' : 'जारी केल्याची तारीख'}: ${today}`, 70, 480)

  // Official Stamp (Drawn)
  ctx.save()
  ctx.beginPath()
  ctx.arc(canvas.width - 180, 460, 45, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.7)' // Red stamp color
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(canvas.width - 180, 460, 38, 0, Math.PI * 2)
  ctx.stroke()
  
  ctx.translate(canvas.width - 180, 460)
  ctx.rotate(-Math.PI / 8) // Slight tilt
  ctx.fillStyle = 'rgba(220, 38, 38, 0.7)'
  ctx.font = 'bold 12px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('GRAM PANCHAYAT', 0, -5)
  ctx.fillText('GRAMSETU', 0, 10)
  ctx.restore()

  // Signatory
  ctx.textAlign = 'right'
  ctx.fillStyle = '#0f172a'
  
  // Stylized Signature
  ctx.font = 'italic 32px "Brush Script MT", "Cursive", serif'
  ctx.fillText('Sunita D.', canvas.width - 70, 435)
  
  ctx.font = 'italic 16px "Outfit", sans-serif'
  ctx.fillText('Gram Sevak / Sarpanch', canvas.width - 70, 460)
  ctx.font = '600 14px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif'
  ctx.fillStyle = '#475569'
  ctx.fillText(lang === 'en' ? 'Authorized Signature Office' : 'प्राधिकृत स्वाक्षरी कार्यालय', canvas.width - 70, 485)
}

export default function App() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)
  const [splineLoading, setSplineLoading] = useState(true)
  const [activeFeature, setActiveFeature] = useState(null)
  const [fundFilter, setFundFilter] = useState('All')
  const [complaints, setComplaints] = useState([])
  const [newComplaint, setNewComplaint] = useState({ name: '', category: 'Water Supply', desc: '', image: null, fileName: null, fileSize: null, ward: 1 })
  const [viewMode, setViewMode] = useState('landing') // 'landing' or 'dashboard'
  const [adminActiveTab, setAdminActiveTab] = useState('overview') // 'overview', 'grievances', 'documents', 'announcements', 'profile'
  const [citizenActiveTab, setCitizenActiveTab] = useState('status') // 'status', 'complaint', 'documents', 'funds'
  const [fundsData, setFundsData] = useState(initialFundsData)
  const [docRequests, setDocRequests] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [profiles, setProfiles] = useState({})

  const [newFundRecord, setNewFundRecord] = useState({ title: '', amount: '', sector: 'Infrastructure', proof: null, proofPreview: null })
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', details: '' })

  // Profile Form States
  const [citizenProfileModalOpen, setCitizenProfileModalOpen] = useState(false)
  const [profileForm, setProfileForm] = useState({ name: '', phone: '', avatar: '', ward: 1, password: '', age: '', income: '', category: 'General' })
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [profileError, setProfileError] = useState('')

  // Auth & Session States
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [loginTab, setLoginTab] = useState('login') // 'login' or 'register'
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginMsg, setLoginMsg] = useState('')
  const [pendingAction, setPendingAction] = useState(null)

  // Document Request States
  const [docModalOpen, setDocModalOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [docApplicantName, setDocApplicantName] = useState('')
  const [docPurpose, setDocPurpose] = useState('')
  const [docIdFile, setDocIdFile] = useState(null)
  const [docIdFileError, setDocIdFileError] = useState(false)
  const [docSuccess, setDocSuccess] = useState(false)
  // Complaint Image states
  const [complaintImageError, setComplaintImageError] = useState(false)
  const [lightboxImg, setLightboxImg] = useState(null)

  // Fetch initial database.json data from backend on mount
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.complaints) setComplaints(data.complaints)
        if (data.docRequests) setDocRequests(data.docRequests)
        if (data.fundsData) setFundsData(data.fundsData)
        if (data.announcements) setAnnouncements(data.announcements)
        if (data.profiles) setProfiles(data.profiles)
      })
      .catch(err => console.error("Error fetching data from API backend:", err))
  }, [])

  // Auto-fill applicant name and reset ward when logged in
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      setNewComplaint(prev => ({ ...prev, name: currentUser.name, ward: currentUser.ward || 1 }))
    } else {
      setNewComplaint(prev => ({ ...prev, name: '', ward: 1 }))
    }
  }, [isLoggedIn, currentUser])

  // Sync profile form when profiles or currentUser changes
  useEffect(() => {
    if (currentUser) {
      const savedProfile = profiles[currentUser.username] || {}
      setProfileForm({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        avatar: currentUser.avatar || '',
        ward: currentUser.ward || 1,
        password: savedProfile.password || '',
        age: savedProfile.age || '',
        income: savedProfile.income || '',
        category: savedProfile.category || 'General'
      })
    }
  }, [currentUser, profiles])
  // Floating Voice Assistant States
  const [voiceOpen, setVoiceOpen] = useState(false)
  const [voiceMessages, setVoiceMessages] = useState([])
  const [isListening, setIsListening] = useState(false)

  // Testimonials state
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const canvasRef = useRef(null)
  const t = translations[lang]

  // Track window scroll for transparent to solid navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Auth & Session Handlers
  const triggerActionWithAuth = (actionCallback, messageKey) => {
    if (isLoggedIn) {
      actionCallback(currentUser)
    } else {
      setLoginMsg(lang === 'en' ? translations.en[messageKey] : translations.mr[messageKey])
      setPendingAction(() => actionCallback)
      setLoginModalOpen(true)
    }
  }

  // Calculate sector expenditures based on selected fundFilter
  const getBudgetChartHeights = (sector) => {
    const data = fundsData[sector]
    if (!data) return { allocH: '0px', spentH: '0px', allocVal: 0, spentVal: 0 }
    
    // Max scale limit (100 Lakhs = 100% height = 150px)
    const factor = 150 / 100 
    return {
      allocH: `${data.allocated * factor}px`,
      spentH: `${data.spent * factor}px`,
      allocVal: data.allocated,
      spentVal: data.spent
    }
  }

  const redirectToDashboard = (user) => {
    setViewMode('dashboard')
  }


  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const username = loginForm.username.trim().toLowerCase()
    const password = loginForm.password
    const wardMatch = username.match(/^ward([1-7])$/)
    const savedProfile = profiles[username] || {}

    if (username === 'sureshpatil') {
      const expectedPassword = savedProfile.password || 'sureshpatil123'
      if (password === expectedPassword) {
        const mockUser = {
          name: savedProfile.name || 'Suresh Patil',
          role: lang === 'en' ? 'Sarpanch' : 'सरपंच',
          phone: savedProfile.phone || '9876543211',
          avatar: savedProfile.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120',
          username: username
        }
        setIsLoggedIn(true)
        setCurrentUser(mockUser)
        setLoginModalOpen(false)
        setLoginForm({ username: '', password: '' })
        setLoginMsg('')
        if (pendingAction) {
          pendingAction(mockUser)
          setPendingAction(null)
        } else {
          redirectToDashboard(mockUser)
        }
        return
      }
    }
    
    if (username === 'sunitadeshmukh') {
      const expectedPassword = savedProfile.password || 'sunitadeshmukh123'
      if (password === expectedPassword) {
        const mockUser = {
          name: savedProfile.name || 'Sunita Deshmukh',
          role: lang === 'en' ? 'Gram Sevak' : 'ग्रामसेवक',
          phone: savedProfile.phone || '9876543210',
          avatar: savedProfile.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
          username: username
        }
        setIsLoggedIn(true)
        setCurrentUser(mockUser)
        setLoginModalOpen(false)
        setLoginForm({ username: '', password: '' })
        setLoginMsg('')
        if (pendingAction) {
          pendingAction(mockUser)
          setPendingAction(null)
        } else {
          redirectToDashboard(mockUser)
        }
        return
      }
    }
    
    if (wardMatch) {
      const wardNum = parseInt(wardMatch[1])
      const expectedPassword = savedProfile.password || `ward@${wardNum}`
      if (password === expectedPassword) {
        const mockUser = {
          name: savedProfile.name || `Ward ${wardNum} Member`,
          role: lang === 'en' ? `Ward ${wardNum} Member` : `वॉर्ड क्र. ${wardNum} सदस्य`,
          phone: savedProfile.phone || `987654320${wardNum}`,
          avatar: savedProfile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
          ward: savedProfile.ward !== undefined ? parseInt(savedProfile.ward) : wardNum,
          username: username
        }
        setIsLoggedIn(true)
        setCurrentUser(mockUser)
        setLoginModalOpen(false)
        setLoginForm({ username: '', password: '' })
        setLoginMsg('')
        if (pendingAction) {
          pendingAction(mockUser)
          setPendingAction(null)
        } else {
          redirectToDashboard(mockUser)
        }
        return
      }
    }
    
    if (username === 'rameshmane') {
      const expectedPassword = savedProfile.password || 'rameshmane123'
      if (password === expectedPassword) {
        const mockUser = {
          name: savedProfile.name || 'Ramesh Mane',
          role: lang === 'en' ? 'Citizen' : 'नागरिक',
          phone: savedProfile.phone || '9876543212',
          avatar: savedProfile.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
          username: username
        }
        setIsLoggedIn(true)
        setCurrentUser(mockUser)
        setLoginModalOpen(false)
        setLoginForm({ username: '', password: '' })
        setLoginMsg('')
        if (pendingAction) {
          pendingAction(mockUser)
          setPendingAction(null)
        } else {
          redirectToDashboard(mockUser)
        }
        return
      }
    }

    setLoginMsg(lang === 'en' ? 'Invalid credentials! Try rameshmane / rameshmane123, ward1 / ward@1, sureshpatil or sunitadeshmukh.' : 'चुकीचे क्रेडेंशियल्स! rameshmane / rameshmane123, ward1 / ward@1, sureshpatil किंवा sunitadeshmukh वापरा.')
  }

  const handleQuickDemoLogin = (role) => {
    let demoUser;
    if (role === 'sarpanch') {
      const username = 'sureshpatil'
      const savedProfile = profiles[username] || {}
      demoUser = {
        name: savedProfile.name || 'Suresh Patil',
        role: lang === 'en' ? 'Sarpanch' : 'सरपंच',
        phone: savedProfile.phone || '9876543211',
        avatar: savedProfile.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120',
        username: username
      }
    } else if (role === 'gramsevak') {
      const username = 'sunitadeshmukh'
      const savedProfile = profiles[username] || {}
      demoUser = {
        name: savedProfile.name || 'Sunita Deshmukh',
        role: lang === 'en' ? 'Gram Sevak' : 'ग्रामसेवक',
        phone: savedProfile.phone || '9876543210',
        avatar: savedProfile.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
        username: username
      }
    } else {
      const username = 'ward1'
      const savedProfile = profiles[username] || {}
      demoUser = {
        name: savedProfile.name || 'Ward 1 Member',
        role: lang === 'en' ? 'Ward 1 Member' : 'वॉर्ड क्र. १ सदस्य',
        phone: savedProfile.phone || '9876543201',
        avatar: savedProfile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
        ward: savedProfile.ward !== undefined ? parseInt(savedProfile.ward) : 1,
        username: username
      }
    }

    setIsLoggedIn(true)
    setCurrentUser(demoUser)
    setLoginModalOpen(false)
    setLoginMsg('')

    if (pendingAction) {
      pendingAction(demoUser)
      setPendingAction(null)
    } else {
      redirectToDashboard(demoUser)
    }
  }

  const handleDocRequestSubmit = (e) => {
    e.preventDefault()
    if (!docIdFile) {
      setDocIdFileError(true)
      return
    }

    const reqBody = {
      applicantName: docApplicantName,
      docType: selectedDoc.id,
      docTitleEn: selectedDoc.titleEn,
      docTitleMr: selectedDoc.titleMr,
      purpose: docPurpose,
      idProofName: docIdFile.name,
      idProofPreview: docIdFile.preview,
      status: 'Pending'
    }

    fetch('/api/doc-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    })
      .then(res => res.json())
      .then(savedRequest => {
        setDocRequests(prev => [savedRequest, ...prev])
        setDocSuccess(true)
      })
      .catch(err => console.error("Error saving document request:", err))
  }



  // Handle new complaint submissions
  const handleComplaintSubmitInternal = (user) => {
    const authorName = user ? user.name : newComplaint.name;
    const newObj = {
      name: authorName,
      category: newComplaint.category,
      categoryMr: newComplaint.category === 'Water Supply' ? 'पाणी पुरवठा' 
                  : newComplaint.category === 'Street Lights' ? 'पथदिवे'
                  : newComplaint.category === 'Waste Management' ? 'कचरा व्यवस्थापन'
                  : 'रस्त्याची दुरवस्था',
      desc: newComplaint.desc,
      descMr: newComplaint.desc, // Fallback for simplicity
      status: 'Pending',
      image: newComplaint.image,
      ward: parseInt(newComplaint.ward || 1)
    }

    fetch('/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObj)
    })
      .then(res => res.json())
      .then(savedComplaint => {
        setComplaints(prev => [savedComplaint, ...prev])
        setNewComplaint({ name: isLoggedIn && currentUser ? currentUser.name : '', category: 'Water Supply', desc: '', image: null, fileName: null, fileSize: null, ward: 1 })
        setComplaintImageError(false)
        alert(lang === 'en' ? 'Grievance submitted successfully! Checked live in ledger.' : 'तक्रार यशस्वीरित्या नोंदवली गेली! नोंदवहीत तपासा.')
      })
      .catch(err => console.error("Error saving complaint:", err))
  }

  const handleComplaintSubmit = (e) => {
    e.preventDefault()
    
    if (!isLoggedIn) {
      triggerActionWithAuth((user) => {
        setNewComplaint(prev => ({ ...prev, name: user.name }))
      }, 'loginCompulsoryMsgComp')
      return
    }

    if (!newComplaint.name.trim() || !newComplaint.desc.trim()) return

    if (!newComplaint.image) {
      setComplaintImageError(true)
      return
    }

    handleComplaintSubmitInternal()
  }

  // Voice Assistant: trigger replies
  const handleVoiceSend = (userText, speakText) => {
    if (!userText) return
    
    // Add user message
    const userMsgId = Date.now()
    setVoiceMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: userText }])

    // Match responses
    let assistantReply = t.voiceDefaultResponse
    if (userText.includes('Birth') || userText.includes('जन्म')) {
      assistantReply = t.voiceResponse1
    } else if (userText.includes('Sabha') || userText.includes('ग्रामसभा') || userText.includes('बैठक')) {
      assistantReply = t.voiceResponse2
    } else if (userText.includes('complaint') || userText.includes('तक्रार') || userText.includes('स्थिती')) {
      assistantReply = t.voiceResponse3
    }

    // Speech Synthesis
    if ('speechSynthesis' in window) {
      // cancel ongoing speech
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(speakText || assistantReply)
      // Pick Marathi voice if lang is mr, else English
      utterance.lang = lang === 'mr' ? 'mr-IN' : 'en-US'
      utterance.rate = 1.0
      window.speechSynthesis.speak(utterance)
    }

    // Add assistant writing delay
    setTimeout(() => {
      setVoiceMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'assistant', text: assistantReply }])
    }, 6000) // Simulated writing wait or shorter
    setTimeout(() => {
      // shorten response delay for smooth feeling
      setVoiceMessages((prev) => {
        // filter duplicate assistant typing indicators
        const filtered = prev.filter(m => m.id !== 'typing')
        return [...filtered, { id: Date.now() + 2, sender: 'assistant', text: assistantReply }]
      })
    }, 700)
  }

  // Preset prompts handler
  const handleSuggestionClick = (optionIndex) => {
    let qText = ''
    let answerSpeech = ''
    
    if (optionIndex === 1) {
      qText = t.voicePrompt1
      answerSpeech = t.voiceResponse1
    } else if (optionIndex === 2) {
      qText = t.voicePrompt2
      answerSpeech = t.voiceResponse2
    } else if (optionIndex === 3) {
      qText = t.voicePrompt3
      answerSpeech = t.voiceResponse3
    }

    handleVoiceSend(qText, answerSpeech)
  }

  // Listen using Web Speech API
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(lang === 'en' 
        ? 'Speech Recognition is not supported by your browser. Please type or select a question!' 
        : 'तुमच्या ब्राउझरमध्ये व्हॉइस रिकग्निशन सपोर्ट नाही. कृपया टाईप करा किंवा सुचवलेला प्रश्न निवडा!')
      return
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRec()
    recognition.lang = lang === 'mr' ? 'mr-IN' : 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript
      handleVoiceSend(speechToText)
    }

    recognition.start()
  }

  // Interactive Chart values: dynamic totals based on complaints
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length
  const pendingCount = complaints.filter(c => c.status === 'Pending').length
  const totalCount = complaints.length
  



  // Filter keys
  const sectors = ['Infrastructure', 'WaterSupply', 'Education', 'SocialWelfare', 'Agriculture']

  // Testimonial list
  const testimonials = [
    {
      text: lang === 'en' 
        ? "“GramSetu has completely transformed how our village communicates. I submitted a street light issue and it was fixed in just 2 days!”"
        : "“ग्रामसेतूमुळे आमच्या गावातील संवाद पूर्णपणे बदलला आहे. मी पथदिव्यांची तक्रार नोंदवली आणि अवघ्या २ दिवसांत ती दुरुस्त झाली!”",
      name: lang === 'en' ? "Dnyaneshwar Gaikwad" : "ज्�~ानेश्वर गायकवाड",
      role: lang === 'en' ? "Farmer, Ward 3" : "शेतकरी, वॉर्ड क्र. ३",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
    },
    {
      text: lang === 'en'
        ? "“The fund transparency chart lets us audit road budgets directly. It brings genuine digital honesty to our Gram Panchayat.”"
        : "“निधी पारदर्शकता तक्त्यामुळे आम्हाला रस्त्यांच्या बजेटचे थेट लेखापरीक्षण करता येते. यामुळे आमच्या ग्रामपंचायतीमध्ये खरी डिजिटल प्रामाणिकता आली आहे.”",
      name: lang === 'en' ? "Sunita Deshmukh" : "सुनिता देशमुख",
      role: lang === 'en' ? "School Teacher" : "शिक्षिका",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
    },
    {
      text: lang === 'en'
        ? "“Downloading Residency certificates instantly saved me multiple trips to the taluka office. GramSetu is a blessing!”"
        : "“रहिवासी दाखला त्वरित डाउनलोड मिळाल्याने माझे तालुका कार्यालयातील हेलपाटे वाचले. ग्रामसेतू वरदान आहे!”",
      name: lang === 'en' ? "Ramchandra Jadhav" : "रामचंद्र जाधव",
      role: lang === 'en' ? "Sarpanch, GramSetu" : "सरपंच, ग्रामसेतू",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120"
    }
  ]

  // Features description toggle helpers
  const featuresList = [
    { key: 'complaint', title: t.complaintCardTitle, desc: t.complaintCardDesc, section: '#dashboard' },
    { key: 'funds', title: t.fundCardTitle, desc: t.fundCardDesc, section: '#dashboard' },
    { key: 'certs', title: t.certCardTitle, desc: t.certCardDesc, section: '#certificates' },
    { key: 'sabha', title: t.sabhaCardTitle, desc: t.sabhaCardDesc, section: '#hero' },
    { key: 'feedback', title: t.feedbackCardTitle, desc: t.feedbackCardDesc, section: '#dashboard' },
    { key: 'ai', title: t.aiCardTitle, desc: t.aiCardDesc, section: 'voice' }
  ]

  // --- ADMIN DASHBOARD TAB RENDERERS ---
  const renderOverviewTab = (isSarpanch) => {
    const resolvedCount = complaints.filter(c => c.status === 'Resolved').length
    const pendingCount = complaints.filter(c => c.status === 'Pending').length
    const pendingDocs = docRequests.filter(d => d.status === 'Pending').length
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        {/* Stats Row */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <span className="admin-stat-label">{lang === 'en' ? 'Registered Citizens' : 'नोंदणीकृत नागरिक'}</span>
            <span className="admin-stat-val">1,245</span>
            <div className="admin-stat-trend">📈 +12% this month</div>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-label">{lang === 'en' ? 'Resolved Grievances' : 'निवारण तक्रारी'}</span>
            <span className="admin-stat-val">{85 + resolvedCount}</span>
            <div className="admin-stat-trend" style={{ color: 'var(--brand-green)' }}>✓ {resolvedCount} portal additions</div>
          </div>
          {isSarpanch ? (
            <div className="admin-stat-card">
              <span className="admin-stat-label">{lang === 'en' ? 'Pending Grievances' : 'प्रलंबित तक्रारी'}</span>
              <span className="admin-stat-val">{pendingCount}</span>
              <div className="admin-stat-trend" style={{ color: pendingCount > 0 ? '#ef4444' : 'var(--brand-teal)' }}>
                {pendingCount > 0 ? '⚠️ Action Required' : '✓ All Resolved'}
              </div>
            </div>
          ) : (
            <div className="admin-stat-card">
              <span className="admin-stat-label">{lang === 'en' ? 'Pending Certificates' : 'प्रलंबित दाखला अर्ज'}</span>
              <span className="admin-stat-val">{pendingDocs}</span>
              <div className="admin-stat-trend" style={{ color: pendingDocs > 0 ? '#ef4444' : 'var(--brand-teal)' }}>
                {pendingDocs > 0 ? '⚠️ Awaiting Signing' : '✓ All Signed'}
              </div>
            </div>
          )}
          <div className="admin-stat-card">
            <span className="admin-stat-label">{lang === 'en' ? 'Treasury Balance' : 'पंचायत तिजोरी शिल्लक'}</span>
            <span className="admin-stat-val">225.0 Lakhs</span>
            <div className="admin-stat-trend">💰 INR (Pune District)</div>
          </div>
        </div>

        <div className="admin-content-grid">
          {/* Main Visual: Budget Allocations Chart */}
          <div className="admin-card">
            <h3 className="admin-card-title">📊 {lang === 'en' ? 'Budget Allocation vs Expenditure' : 'तिजोरी बजेट आणि खर्च अहवाल'}</h3>
            <div className="bar-chart-container" style={{ margin: '1.5rem 0' }}>
              {sectors.map(sec => {
                const data = fundsData[sec]
                const allocVal = data ? data.allocated : 0
                const spentVal = data ? data.spent : 0
                const factor = 120 / 100 
                return (
                  <div key={sec} className="chart-bar-group">
                    <div className="bars-wrapper">
                      <div className="chart-bar allocated" style={{ height: `${allocVal * factor}px` }} title={`Allocated: ${allocVal} Lakhs`}></div>
                      <div className="chart-bar spent" style={{ height: `${spentVal * factor}px` }} title={`Spent: ${spentVal} Lakhs`}></div>
                    </div>
                    <span className="bar-label">
                      {sec === 'Infrastructure' ? (lang === 'en' ? 'Infra' : 'इन्फ्रा')
                       : sec === 'WaterSupply' ? (lang === 'en' ? 'Water' : 'पाणी')
                       : sec === 'Education' ? (lang === 'en' ? 'Edu' : 'शिक्षण')
                       : sec === 'SocialWelfare' ? (lang === 'en' ? 'Welfare' : 'कल्याण')
                       : (lang === 'en' ? 'Agri' : 'कृषी')}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Activity / Announcement preview */}
          <div className="admin-card">
            <h3 className="admin-card-title">📢 {lang === 'en' ? 'Live Announcement Feed' : 'प्रसिद्ध केलेल्या घोषणा'}</h3>
            <div className="announcement-list-mini">
              {announcements.map(ann => (
                <div key={ann.id} className="announcement-item-mini">
                  <h5>{ann.title}</h5>
                  <p>{ann.details}</p>
                  <span style={{ fontSize: '0.65rem', color: 'var(--dark-text-muted)' }}>📅 {ann.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  const renderGrievancesTab = () => {
    const handleResolveGrievance = (id) => {
      fetch('/api/complaints/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'Resolved' } : c))
          }
        })
        .catch(err => console.error("Error resolving grievance:", err))
    }

    const filteredComplaints = isWardMember
      ? complaints.filter(item => String(item.ward) === String(currentUser.ward))
      : complaints;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        <div className="admin-card">
          <h3 className="admin-card-title">📋 {lang === 'en' ? 'Grievance Resolution Desk' : 'तक्रारींचे निवारण केंद्र'}</h3>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{lang === 'en' ? 'ID' : 'क्र.'}</th>
                  <th>{lang === 'en' ? 'Citizen' : 'नागरिक'}</th>
                  <th>{lang === 'en' ? 'Ward' : 'वॉर्ड'}</th>
                  <th>{lang === 'en' ? 'Category' : 'श्रेणी'}</th>
                  <th>{lang === 'en' ? 'Description' : 'तक्रार वर्णन'}</th>
                  <th>{lang === 'en' ? 'Attachment' : 'फोटो पुरावा'}</th>
                  <th>{lang === 'en' ? 'Date' : 'तारीख'}</th>
                  <th>{lang === 'en' ? 'Status' : 'स्थिती'}</th>
                  <th>{lang === 'en' ? 'Action' : 'कृती'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map(item => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>
                    <td><strong style={{ color: '#fff' }}>{item.name}</strong></td>
                    <td>{item.ward ? (lang === 'en' ? `Ward ${item.ward}` : `वॉर्ड क्र. ${item.ward}`) : '-'}</td>
                    <td>
                      <span style={{ color: 'var(--brand-green)', fontWeight: 600 }}>
                        {lang === 'en' ? item.category : item.categoryMr}
                      </span>
                    </td>
                    <td style={{ maxWidth: '280px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {lang === 'en' ? item.desc : item.descMr || item.desc}
                    </td>
                    <td>
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt="Grievance Proof" 
                          className="table-img-thumb"
                          onClick={() => setLightboxImg(item.image)}
                        />
                      ) : (
                        <span style={{ color: 'var(--dark-text-muted)', fontStyle: 'italic' }}>None</span>
                      )}
                    </td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`badge-status ${item.status === 'Resolved' ? 'resolved' : 'pending'}`}>
                        {item.status === 'Resolved' ? t.statusResolved : t.statusPending}
                      </span>
                    </td>
                    <td>
                      {item.status === 'Pending' ? (
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem', borderRadius: '8px' }}
                          onClick={() => handleResolveGrievance(item.id)}
                        >
                          ✓ {lang === 'en' ? 'Resolve' : 'निवारण करा'}
                        </button>
                      ) : (
                        <span style={{ color: 'var(--brand-teal)', fontWeight: 600 }}>✓ {lang === 'en' ? 'Completed' : 'पूर्ण झाले'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Treasury fund allocation adjusting form */}
        <div className="admin-card">
          <h3 className="admin-card-title">💰 {lang === 'en' ? 'Add Fund Distribution Record' : 'गाव निधी विवरण जोडा'}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--dark-text-muted)', textAlign: 'left', marginTop: '-1rem' }}>
            {lang === 'en' 
              ? 'Add a new fund expenditure record with proof of work. This will be publicly visible to all citizens.' 
              : 'कामाच्या पुराव्यासह नवीन निधी खर्चाची नोंद करा. हे सर्व नागरिकांना सार्वजनिकरित्या दिसेल.'}
          </p>
          <form className="complaint-form" style={{ marginTop: '1.5rem' }} onSubmit={(e) => {
            e.preventDefault();
            if (!newFundRecord.title || !newFundRecord.amount || !newFundRecord.proofPreview) {
              alert(lang === 'en' ? 'Please fill all fields and upload proof' : 'कृपया सर्व माहिती भरा आणि पुरावा अपलोड करा');
              return;
            }
            
            const sector = newFundRecord.sector;
            const amount = parseInt(newFundRecord.amount);
            
            setFundsData(prev => ({
              ...prev,
              [sector]: { 
                ...prev[sector], 
                spent: prev[sector].spent + amount,
                allocated: prev[sector].allocated + amount,
                records: [...(prev[sector].records || []), {
                  id: Date.now(),
                  title: newFundRecord.title,
                  amount: amount,
                  date: new Date().toISOString().split('T')[0],
                  proof: newFundRecord.proofPreview
                }]
              }
            }));
            setNewFundRecord({ title: '', amount: '', sector: 'Infrastructure', proof: null, proofPreview: null });
            alert(lang === 'en' ? 'Fund record added successfully!' : 'निधीची नोंद यशस्वीरित्या जोडली!');
          }}>
            <div className="form-group">
              <label>{lang === 'en' ? 'Work Title' : 'कामाचे नाव'}</label>
              <input type="text" className="form-control" value={newFundRecord.title} onChange={e => setNewFundRecord({...newFundRecord, title: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>{lang === 'en' ? 'Amount (in Lakhs)' : 'रक्कम (लाखात)'}</label>
              <input type="number" min="1" className="form-control" value={newFundRecord.amount} onChange={e => setNewFundRecord({...newFundRecord, amount: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>{lang === 'en' ? 'Sector' : 'विभाग'}</label>
              <select className="form-control" value={newFundRecord.sector} onChange={e => setNewFundRecord({...newFundRecord, sector: e.target.value})}>
                {sectors.map(sec => <option key={sec} value={sec}>{lang === 'en' ? sec.replace(/([A-Z])/g, ' $1').trim() : (sec === 'Infrastructure' ? 'पायाभूत सुविधा' : sec === 'WaterSupply' ? 'पाणी पुरवठा' : sec === 'Education' ? 'शिक्षण' : sec === 'SocialWelfare' ? 'समाज कल्याण' : 'कृषी विभाग')}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>{lang === 'en' ? 'Proof of Work (Photo/Doc)' : 'कामाचा पुरावा (फोटो/कागदपत्र)'}</label>
              <input type="file" className="form-control" accept="image/*" onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setNewFundRecord({...newFundRecord, proof: file, proofPreview: reader.result});
                  reader.readAsDataURL(file);
                }
              }} required />
            </div>
            {newFundRecord.proofPreview && (
              <div style={{ marginTop: '1rem' }}>
                <img src={newFundRecord.proofPreview} alt="Proof Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', objectFit: 'cover' }} />
              </div>
            )}
            <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
              {lang === 'en' ? 'Add Record' : 'नोंद करा'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const renderDocumentsTab = () => {
    const handleDocumentAction = (id, newStatus, requestDetails) => {
      let rejectionReason = ''
      if (newStatus === 'Rejected') {
        rejectionReason = window.prompt(lang === 'en' ? 'Enter rejection reason:' : 'नाकारण्याचे कारण प्रविष्ट करा:')
        if (rejectionReason === null) return // cancelled
      }

      fetch('/api/doc-requests/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, rejectionReason })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setDocRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus, rejectionReason } : req))
            
            if (newStatus === 'Approved' && canvasRef.current) {
              // Draw and download the certificate
              const matchedDoc = documentsList.find(d => d.id === requestDetails.docType)
              if (matchedDoc) {
                drawCertificate(canvasRef.current, matchedDoc, requestDetails.applicantName, lang)
                
                // Add signature sign simulation on canvas
                const canvas = canvasRef.current
                const ctx = canvas.getContext('2d')
                ctx.font = 'bold italic 12px "Outfit", sans-serif'
                ctx.fillStyle = '#064e3b'
                ctx.textAlign = 'right'
                ctx.fillText(`Digitally signed by Gram Sevak Sunita Deshmukh on ${new Date().toLocaleDateString()}`, canvas.width - 70, 510)
                
                const url = canvas.toDataURL('image/png')
                const link = document.createElement('a')
                link.download = `Signed_${matchedDoc.id}_Certificate_${requestDetails.applicantName.trim().replace(/\s+/g, '_')}.png`
                link.href = url
                link.click()
              }
            }
          }
        })
        .catch(err => console.error("Error updating document request status:", err))
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        <div className="admin-card">
          <h3 className="admin-card-title">📜 {lang === 'en' ? 'Digital Certificate Requests Review Queue' : 'दाखला प्रमाणपत्र वितरण रांग'}</h3>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{lang === 'en' ? 'ID' : 'क्र.'}</th>
                  <th>{lang === 'en' ? 'Applicant' : 'अर्जदार'}</th>
                  <th>{lang === 'en' ? 'Document Type' : 'दाखल्याचा प्रकार'}</th>
                  <th>{lang === 'en' ? 'Purpose' : 'कारण'}</th>
                  <th>{lang === 'en' ? 'ID Proof Attachment' : 'ओळखपत्र पुरावा'}</th>
                  <th>{lang === 'en' ? 'Submission Date' : 'अर्ज तारीख'}</th>
                  <th>{lang === 'en' ? 'Status' : 'स्थिती'}</th>
                  <th>{lang === 'en' ? 'Action' : 'कृती'}</th>
                </tr>
              </thead>
              <tbody>
                {docRequests.map(req => (
                  <tr key={req.id}>
                    <td>#{req.id}</td>
                    <td><strong style={{ color: '#fff' }}>{req.applicantName}</strong></td>
                    <td>
                      <span style={{ color: 'var(--brand-teal)', fontWeight: 600 }}>
                        {lang === 'en' ? req.docTitleEn : req.docTitleMr}
                      </span>
                    </td>
                    <td>{req.purpose}</td>
                    <td>
                      {req.idProofPreview ? (
                        <img 
                          src={req.idProofPreview} 
                          alt="ID Verification" 
                          className="table-img-thumb"
                          onClick={() => setLightboxImg(req.idProofPreview)}
                        />
                      ) : (
                        <span style={{ color: 'var(--dark-text-muted)' }}>None</span>
                      )}
                    </td>
                    <td>{req.date}</td>
                    <td>
                      <span className={`badge-status ${req.status === 'Approved' ? 'approved' : (req.status === 'Rejected' ? 'rejected' : 'pending')}`}>
                        {req.status === 'Approved' ? (lang === 'en' ? 'Issued' : 'वितरित') 
                         : req.status === 'Rejected' ? (lang === 'en' ? 'Rejected' : 'नाकारले') 
                         : (lang === 'en' ? 'Pending' : 'प्रलंबित')}
                      </span>
                    </td>
                    <td>
                      {req.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          <button 
                            className="btn btn-primary" 
                            style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', borderRadius: '8px' }}
                            onClick={() => handleDocumentAction(req.id, 'Approved', req)}
                          >
                            ✓ {lang === 'en' ? 'Approve & Issue' : 'मंजूर करा'}
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', borderRadius: '8px', borderColor: '#ef4444', color: '#ef4444' }}
                            onClick={() => handleDocumentAction(req.id, 'Rejected', req)}
                          >
                            ✗ {lang === 'en' ? 'Reject' : 'नाकारा'}
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontWeight: 600, color: req.status === 'Approved' ? 'var(--brand-green)' : '#ef4444' }}>
                          {req.status === 'Approved' ? (lang === 'en' ? 'Issued' : 'वितरित झाले') : (lang === 'en' ? 'Rejected' : 'नाकारले गेले')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderAnnouncementsTab = () => {
    const handlePublishAnnouncement = (e) => {
      e.preventDefault()
      if (!newAnnouncement.title.trim() || !newAnnouncement.details.trim()) return

      const newAnnObj = {
        id: announcements.length + 1,
        title: newAnnouncement.title,
        details: newAnnouncement.details,
        date: new Date().toISOString().split('T')[0]
      }
      setAnnouncements([newAnnObj, ...announcements])
      setNewAnnouncement({ title: '', details: '' })
      alert(lang === 'en' ? 'Announcement published successfully! Ticker updated on landing page.' : 'घोषणा यशस्वीरित्या प्रकाशित केली! मुख्य पानावर तपासा.')
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        <div className="admin-content-grid" style={{ gridTemplateColumns: '1.2fr 1.8fr' }}>
          {/* Publisher Form */}
          <div className="admin-card">
            <h3 className="admin-card-title">📢 {lang === 'en' ? 'Publish Panchayat Broadcast' : 'नवीन घोषणा प्रसिद्ध करा'}</h3>
            <form onSubmit={handlePublishAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label>{lang === 'en' ? 'Announcement Title' : 'घोषणा शीर्षक'}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}
                  placeholder={lang === 'en' ? 'e.g. Health Camp Announcement' : 'उदा. मोफत आरोग्य शिबीर'}
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>{lang === 'en' ? 'Detailed Message' : 'सविस्तर मजकूर'}</label>
                <textarea 
                  className="form-textarea" 
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}
                  placeholder={lang === 'en' ? 'Write announcement details here...' : 'येथे सविस्तर घोषणा मजकूर लिहा...'}
                  value={newAnnouncement.details}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, details: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                🚀 {lang === 'en' ? 'Publish Live Announcement' : 'घोषणा थेट प्रसिद्ध करा'}
              </button>
            </form>
          </div>

          {/* Publisher Log list */}
          <div className="admin-card">
            <h3 className="admin-card-title">📋 {lang === 'en' ? 'Published Broadcasting Log' : 'प्रसिद्ध केलेल्या घोषणांची नोंदणी'}</h3>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{lang === 'en' ? 'Date' : 'तारीख'}</th>
                    <th>{lang === 'en' ? 'Title' : 'शीर्षक'}</th>
                    <th>{lang === 'en' ? 'Announcement Details' : 'सविस्तर माहिती'}</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map(ann => (
                    <tr key={ann.id}>
                      <td style={{ whiteSpace: 'nowrap' }}>{ann.date}</td>
                      <td><strong style={{ color: '#fff' }}>{ann.title}</strong></td>
                      <td>{ann.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleProfileSave = (e) => {
    e.preventDefault()
    if (!profileForm.name.trim() || !profileForm.phone.trim()) {
      setProfileError(lang === 'en' ? 'Name and Phone are compulsory.' : 'नाव आणि फोन नंबर अनिवार्य आहेत.')
      return
    }

    const updatedProfile = {
      name: profileForm.name,
      phone: profileForm.phone,
      avatar: profileForm.avatar,
      ward: parseInt(profileForm.ward),
      password: profileForm.password || undefined,
      age: profileForm.age,
      income: profileForm.income,
      category: profileForm.category
    }

    fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: currentUser.username,
        profile: updatedProfile
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProfiles(prev => ({
            ...prev,
            [currentUser.username]: data.profile
          }))
          setCurrentUser(prev => ({
            ...prev,
            name: data.profile.name,
            phone: data.profile.phone,
            avatar: data.profile.avatar,
            ward: data.profile.ward
          }))
          setProfileSuccess(true)
          setProfileError('')
          setTimeout(() => setProfileSuccess(false), 3000)
        }
      })
      .catch(err => {
        console.error("Error updating profile:", err)
        setProfileError(lang === 'en' ? 'Failed to save profile.' : 'प्रोफाइल सेव्ह करण्यात अपयश आले.')
      })
  }

  const renderProfileTab = () => {
    return (
      <div className="admin-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 className="admin-card-title">👤 {lang === 'en' ? 'Edit Profile & Credentials' : 'माहिती व क्रेडेंशियल्स संपादित करा'}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--dark-text-muted)', marginBottom: '1.5rem' }}>
          {lang === 'en' ? 'Update your personal details, profile picture, and login password.' : 'तुमचे वैयक्तिक तपशील, प्रोफाइल फोटो आणि लॉगिन पासवर्ड अपडेट करा.'}
        </p>

        {profileSuccess && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--brand-green)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '1.25rem', fontSize: '0.9rem', fontWeight: 600 }}>
            ✓ {lang === 'en' ? 'Profile updated successfully!' : 'प्रोफाइल यशस्वीरित्या अपडेट झाली!'}
          </div>
        )}

        {profileError && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '1.25rem', fontSize: '0.9rem', fontWeight: 600 }}>
            ⚠️ {profileError}
          </div>
        )}

        <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
          <div className="form-group">
            <label htmlFor="prof-name">{lang === 'en' ? 'Full Name' : 'पूर्ण नाव'}</label>
            <input 
              type="text" 
              id="prof-name"
              className="form-input" 
              value={profileForm.name}
              onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prof-phone">{lang === 'en' ? 'Contact Phone' : 'संपर्क फोन'}</label>
            <input 
              type="text" 
              id="prof-phone"
              className="form-input" 
              value={profileForm.phone}
              onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>{lang === 'en' ? 'Age' : 'वय'}</label>
            <input 
              type="number" 
              className="form-input" 
              value={profileForm.age}
              onChange={(e) => setProfileForm(prev => ({ ...prev, age: e.target.value }))}
              placeholder={lang === 'en' ? 'Enter your age' : 'तुमचे वय प्रविष्ट करा'}
            />
          </div>

          <div className="form-group">
            <label>{lang === 'en' ? 'Annual Income' : 'वार्षिक उत्पन्न'}</label>
            <input 
              type="number" 
              className="form-input" 
              value={profileForm.income}
              onChange={(e) => setProfileForm(prev => ({ ...prev, income: e.target.value }))}
              placeholder={lang === 'en' ? 'e.g. 50000' : 'उदा. 50000'}
            />
          </div>

          <div className="form-group">
            <label>{lang === 'en' ? 'Category' : 'वर्ग / प्रवर्ग़'}</label>
            <select 
              className="form-input"
              value={profileForm.category}
              onChange={(e) => setProfileForm(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="General">General (खुला)</option>
              <option value="OBC">OBC (इतर मागास वर्ग)</option>
              <option value="SC">SC (अनुसूचित जाती)</option>
              <option value="ST">ST (अनुसूचित जमाती)</option>
              <option value="VJNT">VJNT (विमुक्त जाती / भटक्या जमाती)</option>
            </select>
          </div>

          {isWardMember && (
            <div className="form-group">
              <label htmlFor="prof-ward">{lang === 'en' ? 'Assigned Ward' : 'नियुक्त वॉर्ड'}</label>
              <select 
                id="prof-ward"
                className="form-input"
                value={profileForm.ward}
                onChange={(e) => setProfileForm(prev => ({ ...prev, ward: parseInt(e.target.value) }))}
              >
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <option key={num} value={num}>{lang === 'en' ? `Ward ${num}` : `वॉर्ड क्र. ${num}`}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="prof-password">{lang === 'en' ? 'Custom Password (optional)' : 'नवीन पासवर्ड (पर्यायी)'}</label>
            <input 
              type="password" 
              id="prof-password"
              className="form-input" 
              placeholder={lang === 'en' ? 'Leave empty to keep default' : 'पूर्वनिर्धारित ठेवण्यासाठी रिकामे सोडा'}
              value={profileForm.password}
              onChange={(e) => setProfileForm(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label>{lang === 'en' ? 'Profile Picture' : 'प्रोफाइल फोटो'}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.5rem' }}>
              <img 
                src={profileForm.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'} 
                alt="Avatar Preview" 
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--brand-green)' }} 
              />
              <div style={{ flex: 1 }}>
                <label 
                  htmlFor="prof-avatar-file" 
                  className="btn btn-secondary" 
                  style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.8rem', border: '1px solid var(--light-surface-border)', background: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: '8px' }}
                >
                  📸 {lang === 'en' ? 'Upload Photo' : 'फोटो अपलोड करा'}
                  <input 
                    type="file" 
                    id="prof-avatar-file" 
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = () => {
                          setProfileForm(prev => ({ ...prev, avatar: reader.result }))
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                </label>
                <p style={{ fontSize: '0.75rem', color: 'var(--dark-text-muted)', marginTop: '0.35rem' }}>
                  {lang === 'en' ? 'JPG or PNG. Max 5MB.' : 'जेपीजी किंवा पीएनजी. कमाल ५MB.'}
                </p>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}>
            💾 {lang === 'en' ? 'Save Profile Changes' : 'बदल जतन करा'}
          </button>
        </form>
      </div>
    )
  }

  const isWardMember = isLoggedIn && currentUser && (
    currentUser.role.includes('Ward') || 
    currentUser.role.includes('सदस्य')
  )
  const isOfficial = isLoggedIn && currentUser && (
    currentUser.role.includes('Sarpanch') || 
    currentUser.role.includes('Gram Sevak') || 
    currentUser.role.includes('Ward') || 
    currentUser.role.includes('सरपंच') || 
    currentUser.role.includes('ग्रामसेवक') || 
    currentUser.role.includes('सदस्य')
  )
  const isSarpanch = isOfficial && (currentUser.role.includes('Sarpanch') || currentUser.role.includes('सरपंच'))
  const isGrievanceHandler = isSarpanch || isWardMember
  const isDocumentHandler = isOfficial && (currentUser.role.includes('Gram Sevak') || currentUser.role.includes('ग्रामसेवक'))
  const isCitizen = isLoggedIn && currentUser && (
    currentUser.role.includes('Citizen') || 
    currentUser.role.includes('नागरिक')
  )

  // --- CITIZEN DASHBOARD RENDERING AND LOGIC ---
  const renderCitizenStatusTab = () => {
    const myComplaints = complaints.filter(c => c.name === currentUser.name)
    const myDocRequests = docRequests.filter(r => r.applicantName === currentUser.name)
    const docsRequestedCount = myDocRequests.length

    const pendingGrievances = myComplaints.filter(c => c.status === 'Pending').length
    const resolvedGrievances = myComplaints.filter(c => c.status === 'Resolved').length
    const totalGrievances = myComplaints.length

    // Village-wide complaint analytics
    const totalVC = complaints.length
    const resolvedVC = complaints.filter(c => c.status === 'Resolved').length
    const pendingVC = complaints.filter(c => c.status === 'Pending').length

    // SVG Donut chart
    const R = 52, CIRC = 2 * Math.PI * R
    const resArc = totalVC > 0 ? (resolvedVC / totalVC) * CIRC : 0
    const penArc = totalVC > 0 ? (pendingVC / totalVC) * CIRC : 0

    // Budget
    const totalAllocated = Object.values(fundsData).reduce((s, d) => s + (d.allocated || 0), 0)
    const totalSpent     = Object.values(fundsData).reduce((s, d) => s + (d.spent     || 0), 0)
    const budgetUtilization = Math.round((totalSpent / totalAllocated) * 100) || 0
    const remainingBudget   = totalAllocated - totalSpent

    // Sparkline trend (simulated 12-month data)
    const trendData = [7, 11, 5, 14, 9, 8, 13, 6, 10, 8, 12, Math.max(totalVC, 1)]
    const maxTrend  = Math.max(...trendData)

    // Project data
    const mockProjects = [
      { id:1, em:'⚡', name: lang==='en' ? 'Solar Street Lighting Grid'       : 'सौर पथदिवे जोडणी',         loc:'Wards 1, 3 & 4',   dept: lang==='en' ? 'Energy Dept.'   : 'ऊर्जा विभाग',   pct:88,  budget:12.5, st:'In Progress' },
      { id:2, em:'💧', name: lang==='en' ? 'Piped Drinking Water Connection'  : 'नळ पाणी पुरवठा योजना',     loc:'Wards 2 & 5',     dept: lang==='en' ? 'Water Works'    : 'जलसंपदा',       pct:100, budget:35.0, st:'Completed'   },
      { id:3, em:'🖥️', name: lang==='en' ? 'Primary School IT Lab Setup'      : 'शाळा डिजिटल लॅब',          loc:'Ward 2 School',   dept: lang==='en' ? 'Education'      : 'शिक्षण विभाग',  pct:60,  budget:8.5,  st:'In Progress' },
      { id:4, em:'🏥', name: lang==='en' ? 'Primary Health Clinic Extension'  : 'आरोग्य केंद्र विस्तार',    loc:'Ward 6 Center',   dept: lang==='en' ? 'Healthcare'     : 'आरोग्य विभाग',  pct:15,  budget:22.0, st:'Pending'     },
    ]

    // Schemes data
    const mockSchemes = [
      { id:1, em:'🌾', nm:'PM Kisan Samman Nidhi',                  st: lang==='en' ? 'Active • ₹6,000/yr'       : 'सुरू • ₹६,०००/वर्ष',        el: lang==='en' ? 'Marginal & small farmers'           : 'अल्पभूधारक शेतकरी',              clr:'#10b981' },
      { id:2, em:'🏠', nm:'PM Awas Yojana (Rural)',                  st: lang==='en' ? 'Applications Open'        : 'अर्ज सुरू',                   el: lang==='en' ? 'Families in kutcha/damaged houses'  : 'कच्च्या घरातील कुटुंब',          clr:'#0ea5e9' },
      { id:3, em:'📚', nm: lang==='en' ? 'Post-Matric Scholarship' : 'शिष्यवृत्ती कार्यक्रम',    st: lang==='en' ? 'Deadline: Aug 31'          : 'अंतिम: ऑग. ३१',               el: lang==='en' ? 'Rural backward-class college students' : 'मागासवर्गीय विद्यार्थी',           clr:'#8b5cf6' },
      { id:4, em:'👴', nm: lang==='en' ? 'Vayoshri Pension Scheme'  : 'वयोश्री पेन्शन',            st: lang==='en' ? 'Eligible • ₹300/month'    : 'पात्र • ₹३००/माह',            el: lang==='en' ? 'Village residents aged 60+'              : '६०+ वयाचे ग्रामस्थ',              clr:'#f59e0b' },
    ]

    // Sector metadata
    const SECT = {
      Infrastructure: { em:'🏗️', nm: lang==='en'?'Infrastructure':'पायाभूत सोयी',         clr:'#10b981' },
      WaterSupply:    { em:'🚰', nm: lang==='en'?'Water Supply':'पाणी पुरवठा',             clr:'#0ea5e9' },
      Education:      { em:'📚', nm: lang==='en'?'Education':'शिक्षण',                     clr:'#8b5cf6' },
      SocialWelfare:  { em:'🤝', nm: lang==='en'?'Social Welfare':'समाज कल्याण',           clr:'#f59e0b' },
      Agriculture:    { em:'🌾', nm: lang==='en'?'Agriculture':'शेती',                     clr:'#14b8a6' },
    }

    // AI quick prompts
    const aiPrompts = [
      lang==='en' ? '📋 Check my complaint status'       : '📋 माझी तक्रार तपासा',
      lang==='en' ? '📜 Apply for a certificate'         : '📜 दाखल्यासाठी अर्ज',
      lang==='en' ? '💰 View treasury budget details'    : '💰 बजेट तपशील पहा',
      lang==='en' ? '📅 Gram Sabha schedule & agenda'    : '📅 ग्रामसभा वेळापत्रक',
    ]

    const handleAiClick = (prompt) => {
      const botAnswers = [
        `You have filed ${totalGrievances} complaint(s). ${pendingGrievances} pending, ${resolvedGrievances} resolved.`,
        'Go to the "Request Documents" tab. Choose: Residency, Income, Birth, or Marriage certificate.',
        `Total budget: ₹${totalAllocated}L. Spent: ₹${totalSpent}L (${budgetUtilization}%). Remaining: ₹${remainingBudget.toFixed(1)}L.`,
        'Next Gram Sabha: July 15, 2026 at 10:00 AM in the Village Panchayat Hall.',
      ]
      const idx = aiPrompts.indexOf(prompt)
      const reply = idx >= 0 ? botAnswers[idx] : 'I can help with certificates, complaints, schemes, and budget queries!'
      setVoiceMessages(prev => [
        ...prev,
        { from: 'user', text: prompt },
        { from: 'bot',  text: reply  },
      ])
      setVoiceOpen(true)
    }

    return (
      <div className="citizen-dashboard-overview">

        {/* ============================================================
            MODULE 1: PREMIUM HEADER
            ============================================================ */}
        <div className="glass-card premium-header-card">
          <div className="header-left">
            <span className="header-badge-text">🇮🇳 {lang==='en' ? 'Smart Village Digital Portal' : 'स्मार्ट ग्राम डिजिटल पोर्टल'}</span>
            <h2 className="header-welcome-h2">
              {lang==='en' ? 'Welcome back, ' : 'स्वागत आहे, '}
              <span className="header-name-grad">{currentUser.name}</span>
            </h2>
            <p className="header-subtitle-p">
              {lang==='en'
                ? 'Your citizen portal is synced with Pune District Treasury — last updated just now.'
                : 'तुमचा पोर्टल पुणे जिल्हा तिजोरीशी समक्रमित आहे — आत्ताच अपडेट केले.'}
            </p>
            <div className="header-tags-row">
              <span className="htag htag-green">✓ {lang==='en' ? 'Verified Citizen' : 'सत्यापित नागरिक'}</span>
              <span className="htag htag-blue">📍 {lang==='en' ? 'Rajgurunagar, Pune' : 'राजगुरुनगर, पुणे'}</span>
              <span className="htag htag-gold">🏆 {lang==='en' ? 'Digital India Participant' : 'डिजिटल इंडिया सहभागी'}</span>
            </div>
          </div>

          <div className="header-right-col">
            <div className="weather-card">
              <span className="weather-temp">☀️ 28°C</span>
              <span className="weather-condition">{lang==='en' ? 'Sunny • Rajgurunagar' : 'उन्हाळा • राजगुरुनगर'}</span>
              <span className="weather-datestr">
                {new Date().toLocaleDateString(lang==='en' ? 'en-IN' : 'mr-IN', { weekday:'short', day:'numeric', month:'short', year:'numeric' })}
              </span>
            </div>
            <div className="header-action-row">
              <div className="bell-btn-hdr" onClick={() => setVoiceOpen(true)} title="Notifications">
                🔔
                <span className="bell-count-badge">3</span>
              </div>
              <div className="hdr-profile-pill">
                <img className="hdr-avatar" src={currentUser.avatar} alt={currentUser.name} />
                <div>
                  <div className="hdr-user-name">{currentUser.name}</div>
                  <div className="hdr-user-role">{lang==='en' ? 'Citizen' : 'नागरिक'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            MODULE 2: KPI STATISTICS ROW
            ============================================================ */}
        <div className="kpi-grid-v2">
          {[
            { lbl: lang==='en'?'Total Grievances Filed':'एकूण तक्रारी नोंदवल्या',   val: totalGrievances,     sfx:'',  em:'📝', clr:'#10b981', bg:'rgba(16,185,129,0.12)', pill: '100% logged',                     pc:'g' },
            { lbl: lang==='en'?'Awaiting Resolution':'प्रलंबित तक्रारी',           val: pendingGrievances,   sfx:'',  em:'⏳', clr:'#eab308', bg:'rgba(234,179,8,0.12)',  pill: pendingGrievances > 0 ? `${pendingGrievances} pending` : '✓ All resolved', pc: pendingGrievances>0 ? 'y' : 'g' },
            { lbl: lang==='en'?'Documents Applied':'दाखला अर्ज केलेले',             val: docsRequestedCount,  sfx:'',  em:'📜', clr:'#0ea5e9', bg:'rgba(14,165,233,0.12)', pill: lang==='en'?'Govt. Hub':'शासकीय केंद्र', pc:'b' },
            { lbl: lang==='en'?'Treasury Spent':'तिजोरी खर्च',                      val: budgetUtilization,   sfx:'%', em:'💰', clr:'#14b8a6', bg:'rgba(20,184,166,0.12)', pill: `₹${Math.round(totalSpent)}L / ₹${Math.round(totalAllocated)}L`, pc:'t' },
          ].map((k, i) => (
            <div key={i} className="glass-card kpi-card-v2">
              <div className="kpi-top-row">
                <span className="kpi-card-label">{k.lbl}</span>
                <span className="kpi-icon-box" style={{ color: k.clr, background: k.bg }}>{k.em}</span>
              </div>
              <span className="kpi-num-v2">{k.val}{k.sfx}</span>
              <span className={`kpi-pill-v2 ${k.pc}`}>↗ {k.pill}</span>
            </div>
          ))}
        </div>

        {/* ============================================================
            MAIN 2-COLUMN GRID
            ============================================================ */}
        <div className="dash-main-grid">

          {/* ====== LEFT COLUMN ====== */}
          <div className="dash-left-col">

            {/* MODULE 3: VILLAGE SNAPSHOT */}
            <div className="glass-card">
              <div className="sec-hdr">
                <div>
                  <h3 className="sec-title">🏡 {lang==='en' ? 'Village Vital Snapshot' : 'गाव माहिती व सद्यस्थिती'}</h3>
                  <p className="sec-sub">{lang==='en' ? 'Census 2026 — Rajgurunagar Village Profile' : '२०२६ जनगणना — राजगुरुनगर ग्राम प्रोफाइल'}</p>
                </div>
                <span className="live-pill">● LIVE</span>
              </div>
              <div className="snapshot-grid-v2">
                {[
                  { em:'👥', v:'8,420', lbl: lang==='en'?'Population':'एकूण लोकसंख्या',       chg:'+2.3%', up:true  },
                  { em:'🏠', v:'1,650', lbl: lang==='en'?'Households':'एकूण कुटुंबे',          chg:'+1.1%', up:true  },
                  { em:'🚰', v:'94%',   lbl: lang==='en'?'Water Tap Coverage':'नळ जोडणी',       chg:'+6%',   up:true  },
                  { em:'🛣️', v:'88%',   lbl: lang==='en'?'Paved Roads':'पक्के रस्ते',           chg:'+4%',   up:true  },
                  { em:'🏫', v:'3',     lbl: lang==='en'?'Z.P. Schools':'जि. प. शाळा',           chg:'Active',up:true  },
                  { em:'🏥', v:'1',     lbl: lang==='en'?'Health Centers':'आरोग्य केंद्रे',     chg:'24/7 OPD',up:true},
                ].map((s, i) => (
                  <div key={i} className="snap-card-v2">
                    <span className="snap-em">{s.em}</span>
                    <span className="snap-v">{s.v}</span>
                    <span className="snap-lbl">{s.lbl}</span>
                    <span className={`snap-chg ${s.up ? 'up' : 'down'}`}>{s.up ? '↑' : '↓'} {s.chg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MODULE 4: FUND TRANSPARENCY */}
            <div className="glass-card">
              <div className="sec-hdr">
                <div>
                  <h3 className="sec-title">💰 {lang==='en' ? 'Treasury Fiscal Transparency' : 'बजेट वाटप व खर्च लेखापरीक्षण'}</h3>
                  <p className="sec-sub">{lang==='en' ? 'Live budget ledger in Lakhs INR • Audited by ward reps' : 'थेट ग्रामपंचायत आर्थिक विवरण (लाख रु.) • वॉर्ड प्रतिनिधींद्वारे लेखापरीक्षित'}</p>
                </div>
              </div>
              <div className="fund-flex">
                {/* SVG Circular Gauge */}
                <div className="fund-gauge-col">
                  <svg className="fund-gauge-svg" width="148" height="148" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"/>
                    <circle cx="60" cy="60" r="48" fill="none"
                      stroke="url(#gaugeGrad)" strokeWidth="10"
                      strokeDasharray={`${(budgetUtilization/100)*(2*Math.PI*48)} ${2*Math.PI*48}`}
                      strokeDashoffset={`${2*Math.PI*48*0.25}`}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                    <defs>
                      <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981"/>
                        <stop offset="100%" stopColor="#14b8a6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="fund-center-overlay">
                    <span className="fund-pct-big">{budgetUtilization}%</span>
                    <span className="fund-pct-lbl">{lang==='en'?'Utilized':'खर्च'}</span>
                  </div>
                  <div className="fund-summary-list">
                    {[
                      { lbl: lang==='en'?'Allocated':'मंजूर',  val: `₹${totalAllocated}L`,             clr: '#fff'      },
                      { lbl: lang==='en'?'Spent':'खर्च',       val: `₹${totalSpent}L`,                 clr: '#10b981'   },
                      { lbl: lang==='en'?'Remaining':'शिल्लक', val: `₹${remainingBudget.toFixed(1)}L`, clr: '#14b8a6'   },
                    ].map((r, i) => (
                      <div key={i} className="fund-sum-row">
                        <span>{r.lbl}</span>
                        <strong style={{ color: r.clr }}>{r.val}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sector bars */}
                <div className="fund-sectors-col">
                  {Object.entries(fundsData).map(([key, data]) => {
                    const meta = SECT[key] || { em:'📊', nm: key, clr:'#10b981' }
                    const pct  = Math.round((data.spent / data.allocated) * 100) || 0
                    return (
                      <div key={key} className="sector-row">
                        <div className="sector-hdr">
                          <span className="sect-em">{meta.em}</span>
                          <span className="sect-name">{meta.nm}</span>
                          <span className="sect-amts">₹{data.spent}L / ₹{data.allocated}L</span>
                          <span className="sect-pct" style={{ color: meta.clr }}>{pct}%</span>
                        </div>
                        <div className="sector-track">
                          <div className="sector-fill" style={{ width:`${pct}%`, background: meta.clr }}></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* MODULE 5: PROJECTS TRACKER */}
            <div className="glass-card">
              <div className="sec-hdr">
                <div>
                  <h3 className="sec-title">🚧 {lang==='en' ? 'Live Infrastructure Works Ledger' : 'गाव विकास कामांची सद्यस्थिती'}</h3>
                  <p className="sec-sub">{lang==='en' ? '4 active works tracked in real-time' : '४ सक्रिय विकासकामे थेट ट्रॅक'}</p>
                </div>
              </div>
              <div className="projects-list-v2">
                {mockProjects.map(p => {
                  const sc = p.st==='Completed' ? 'g' : p.st==='In Progress' ? 'b' : 'y'
                  const stLbl = p.st==='Completed' ? (lang==='en'?'✓ Completed':'✓ पूर्ण') : p.st==='In Progress' ? (lang==='en'?'⚡ In Progress':'⚡ प्रगतीपथावर') : (lang==='en'?'⏳ Pending':'⏳ प्रलंबित')
                  const barClr = p.st==='Completed' ? '#10b981' : p.st==='In Progress' ? '#0ea5e9' : '#eab308'
                  return (
                    <div key={p.id} className="proj-item-v2">
                      <div className="proj-em-box">{p.em}</div>
                      <div className="proj-content">
                        <div className="proj-top-row">
                          <div>
                            <div className="proj-nm">{p.name}</div>
                            <div className="proj-meta">📍 {p.loc} • {p.dept}</div>
                          </div>
                          <span className={`stat-pill ${sc}`}>{stLbl}</span>
                        </div>
                        <div>
                          <div className="proj-prog-hdr">
                            <span>{lang==='en'?'Completion':'पूर्णता'}</span>
                            <strong>{p.pct}%</strong>
                          </div>
                          <div className="proj-prog-track">
                            <div className="proj-prog-fill" style={{ width:`${p.pct}%`, background: barClr }}></div>
                          </div>
                        </div>
                        <div className="proj-footer-row">
                          <span>{lang==='en'?'Budget Allocated':'मंजूर बजेट'}</span>
                          <strong>₹{p.budget} Lakhs</strong>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* MODULE 6: COMPLAINT ANALYTICS */}
            <div className="glass-card">
              <div className="sec-hdr">
                <div>
                  <h3 className="sec-title">📊 {lang==='en' ? 'Village Complaint Analytics' : 'ग्राम तक्रार विश्लेषण'}</h3>
                  <p className="sec-sub">{lang==='en' ? 'Real-time grievance tracking across all 7 wards' : 'सर्व ७ वॉर्डांमधील तक्रारींचे थेट विश्लेषण'}</p>
                </div>
              </div>
              <div className="analytics-flex">
                {/* SVG Donut Chart */}
                <div className="donut-wrap">
                  <svg width="160" height="160" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14"/>
                    {totalVC > 0 && (
                      <circle cx="60" cy="60" r={R} fill="none" stroke="#10b981" strokeWidth="14"
                        strokeDasharray={`${resArc} ${CIRC - resArc}`}
                        strokeDashoffset={`${CIRC * 0.25}`}
                        transform="rotate(-90 60 60)"
                      />
                    )}
                    {totalVC > 0 && penArc > 0 && (
                      <circle cx="60" cy="60" r={R} fill="none" stroke="#eab308" strokeWidth="14"
                        strokeDasharray={`${penArc} ${CIRC - penArc}`}
                        strokeDashoffset={`${CIRC * 0.25 - resArc}`}
                        transform="rotate(-90 60 60)"
                      />
                    )}
                  </svg>
                  <div className="donut-center-abs">
                    <span className="donut-big-num">{totalVC}</span>
                    <span className="donut-small-lbl">{lang==='en'?'Total':'एकूण'}</span>
                  </div>
                </div>

                <div className="analytics-right">
                  <div className="legend-rows">
                    {[
                      { clr:'#10b981', lbl: lang==='en'?'Resolved':'निवारित',     cnt: resolvedVC     },
                      { clr:'#eab308', lbl: lang==='en'?'Pending':'प्रलंबित',     cnt: pendingVC      },
                      { clr:'#94a3b8', lbl: lang==='en'?'Avg. Resolution':'सरासरी निवारण वेळ', cnt: '3.2d' },
                    ].map((r, i) => (
                      <div key={i} className="leg-row">
                        <div className="leg-dot" style={{ background: r.clr }}></div>
                        <span className="leg-lbl">{r.lbl}</span>
                        <span className="leg-cnt" style={{ color: r.clr }}>{r.cnt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sparkline trend */}
                  <div className="sparkline-section">
                    <span className="spark-title">{lang==='en' ? 'Monthly Trend (Last 12 Months)' : 'मासिक कल (गेले १२ महिने)'}</span>
                    <div className="sparkline-bars">
                      {trendData.map((v, i) => (
                        <div key={i} className="spk-bar"
                          style={{ height:`${(v/maxTrend)*48}px`, background: i===trendData.length-1 ? '#10b981' : 'rgba(16,185,129,0.28)' }}
                          title={`Month ${i+1}: ${v} complaints`}
                        />
                      ))}
                    </div>
                    <div className="spark-x-labels">
                      <span>Jan</span><span>Apr</span><span>Jul</span><span>{lang==='en'?'Now':'आता'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent complaint mini-timeline */}
              <div style={{ marginTop:'1.5rem', borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:'1.25rem' }}>
                <p style={{ fontSize:'0.72rem', fontWeight:600, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'0.75rem' }}>
                  {lang==='en' ? 'Recent Complaint Activity' : 'अलीकडील तक्रार घडामोडी'}
                </p>
                <div className="mini-timeline">
                  {complaints.length === 0 ? (
                    <p style={{ color:'#64748b', fontSize:'0.82rem' }}>{lang==='en' ? 'No complaints on record.' : 'कोणतीही तक्रार नाही.'}</p>
                  ) : complaints.slice(0, 4).map((c, i) => (
                    <div key={i} className="mini-complaint-row">
                      <span className={`mini-dot ${c.status==='Resolved'?'gr':'yw'}`}></span>
                      <span className="mini-cat">{lang==='en' ? c.category : c.categoryMr || c.category}</span>
                      <span className="mini-by">{c.name}</span>
                      <span className="mini-dt">{c.date}</span>
                      <span className={`mini-st ${c.status==='Resolved'?'res':'pnd'}`}>{c.status==='Resolved' ? t.statusResolved : t.statusPending}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MODULE 9: INTERACTIVE VILLAGE MAP */}
            <div className="glass-card">
              <div className="sec-hdr">
                <div>
                  <h3 className="sec-title">🗺️ {lang==='en' ? 'Interactive Smart Village Map' : 'परस्परसंवादी भौगोलिक नकाशा'}</h3>
                  <p className="sec-sub">{lang==='en' ? 'Hover on glowing markers to view active works and complaints' : 'सक्रिय कामे व तक्रारी पाहण्यासाठी बिंदूंवर माउस न्या'}</p>
                </div>
              </div>
              <div className="village-map-container" style={{ height:'390px' }}>
                <div className="map-grid-overlay"></div>
                {/* Roads */}
                <div className="map-road" style={{ top:'46%', left:'5%', width:'90%', height:'8px' }}></div>
                <div className="map-road" style={{ top:'8%',  left:'32%', width:'8px', height:'76%' }}></div>
                <div className="map-road" style={{ top:'22%', left:'65%', width:'8px', height:'60%' }}></div>
                {/* Markers */}
                <div className="map-marker school"    style={{ top:'20%', left:'26%' }}><div className="marker-tooltip">🏫 Z.P. Primary School — IT Lab (60% done)</div></div>
                <div className="map-marker school"    style={{ top:'32%', left:'58%' }}><div className="marker-tooltip">🏫 Z.P. Upper Primary School — Active</div></div>
                <div className="map-marker hospital"  style={{ top:'66%', left:'25%' }}><div className="marker-tooltip">🏥 Community Health Center — OPD 24/7</div></div>
                <div className="map-marker tank"      style={{ top:'12%', left:'72%' }}><div className="marker-tooltip">🚰 Piped Water Storage Tank — 94% Coverage</div></div>
                <div className="map-marker tank"      style={{ top:'70%', left:'76%' }}><div className="marker-tooltip">🚰 Ward 6 Water Distribution Node</div></div>
                <div className="map-marker project"   style={{ top:'43%', left:'50%' }}><div className="marker-tooltip">⚡ Solar Street Light Grid — 88% Complete</div></div>
                <div className="map-marker complaint" style={{ top:'49%', left:'42%' }}><div className="marker-tooltip">⚠️ Unresolved: Water Pipe Leakage</div></div>
                <div className="map-marker complaint" style={{ top:'80%', left:'63%' }}><div className="marker-tooltip">⚠️ Unresolved: Street Light Breakdown</div></div>
                {/* Ward labels */}
                {[1,2,3,4,5,6,7].map(w => (
                  <span key={w} className="ward-lbl" style={{ top:`${8+(w-1)*11}%`, left:`${6+((w-1)%4)*24}%` }}>W{w}</span>
                ))}
                {/* Legend */}
                <div className="map-legend-bar">
                  {[
                    { clr:'#0ea5e9', lbl:'School'    },
                    { clr:'#ef4444', lbl:'Health'    },
                    { clr:'#3b82f6', lbl:'Water'     },
                    { clr:'#10b981', lbl:'Project'   },
                    { clr:'#f59e0b', lbl:'Complaint' },
                  ].map((l, i) => (
                    <span key={i} className="map-leg-item">
                      <span className="map-leg-dot" style={{ background: l.clr }}></span>
                      {l.lbl}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* MY PERSONAL SUBMISSIONS TABLE */}
            <div className="glass-card">
              <div className="sec-hdr">
                <div>
                  <h3 className="sec-title">📋 {lang==='en' ? 'My Applications & Complaints' : 'माझे अर्ज आणि तक्रारी'}</h3>
                  <p className="sec-sub">{lang==='en' ? 'Your personal submission history and real-time status' : 'तुमचा वैयक्तिक नोंदणी इतिहास आणि थेट स्थिती'}</p>
                </div>
              </div>

              {/* Grievances */}
              <div style={{ marginBottom:'1.5rem' }}>
                <h4 style={{ fontSize:'0.85rem', fontWeight:600, color:'var(--brand-green)', marginBottom:'0.75rem' }}>
                  📝 {lang==='en' ? 'My Grievances' : 'माझ्या तक्रारी'}
                </h4>
                {myComplaints.length === 0 ? (
                  <div className="empty-v2"><span className="emj">📭</span><p>{lang==='en' ? 'No complaints filed yet. Use the "File Complaint" tab.' : 'कोणतीही तक्रार नोंदवलेली नाही.'}</p></div>
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead><tr>
                        <th>{lang==='en'?'Ward':'वॉर्ड'}</th>
                        <th>{lang==='en'?'Category':'श्रेणी'}</th>
                        <th>{lang==='en'?'Details':'तपशील'}</th>
                        <th>{lang==='en'?'Date':'तारीख'}</th>
                        <th>{lang==='en'?'Status':'स्थिती'}</th>
                      </tr></thead>
                      <tbody>
                        {myComplaints.map(item => (
                          <tr key={item.id}>
                            <td>{item.ward ? `Ward ${item.ward}` : '—'}</td>
                            <td><span style={{ color:'var(--brand-green)', fontWeight:600 }}>{lang==='en' ? item.category : item.categoryMr || item.category}</span></td>
                            <td style={{ maxWidth:'180px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.desc}</td>
                            <td>{item.date}</td>
                            <td><span className={`badge-status ${item.status==='Resolved'?'resolved':'pending'}`}>{item.status==='Resolved' ? t.statusResolved : t.statusPending}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Document Requests */}
              <div>
                <h4 style={{ fontSize:'0.85rem', fontWeight:600, color:'var(--brand-teal)', marginBottom:'0.75rem' }}>
                  📜 {lang==='en' ? 'My Document Applications' : 'माझे दाखल्यांचे अर्ज'}
                </h4>
                {myDocRequests.length === 0 ? (
                  <div className="empty-v2"><span className="emj">📭</span><p>{lang==='en' ? 'No document requests yet. Use the "Request Documents" tab.' : 'दाखल्यासाठी कोणताही अर्ज नाही.'}</p></div>
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead><tr>
                        <th>{lang==='en'?'Document Type':'दाखल्याचा प्रकार'}</th>
                        <th>{lang==='en'?'Purpose':'कारण'}</th>
                        <th>{lang==='en'?'Date':'तारीख'}</th>
                        <th>{lang==='en'?'Status':'स्थिती'}</th>
                        <th>{lang==='en'?'Action':'कृती'}</th>
                      </tr></thead>
                      <tbody>
                        {myDocRequests.map(req => {
                          const matchedDoc = documentsList.find(d => d.id === req.docType)
                          return (
                            <tr key={req.id}>
                              <td><strong>{lang==='en' ? req.docTitleEn : req.docTitleMr}</strong></td>
                              <td>{req.purpose}</td>
                              <td>{req.date}</td>
                              <td>
                                <span className={`badge-status ${req.status==='Approved'?'resolved':req.status==='Rejected'?'rejected':'pending'}`}>
                                  {req.status==='Approved' ? (lang==='en'?'Issued':'जारी केला') : req.status==='Rejected' ? (lang==='en'?'Rejected':'नाकारला') : t.statusPending}
                                </span>
                                {req.status === 'Rejected' && req.rejectionReason && (
                                  <div style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '4px', maxWidth: '150px', wordWrap: 'break-word' }}>
                                    {lang === 'en' ? 'Reason: ' : 'कारण: '} {req.rejectionReason}
                                  </div>
                                )}
                              </td>
                              <td>
                                {req.status==='Approved' && matchedDoc ? (
                                  <button className="btn btn-primary" style={{ padding:'0.3rem 0.65rem', fontSize:'0.72rem', borderRadius:'6px' }}
                                    onClick={() => {
                                      if (canvasRef.current) {
                                        drawCertificate(canvasRef.current, matchedDoc, req.applicantName, lang)
                                        const cv = canvasRef.current, ctx = cv.getContext('2d')
                                        ctx.font = 'bold italic 12px "Outfit", sans-serif'
                                        ctx.fillStyle = '#064e3b'; ctx.textAlign = 'right'
                                        ctx.fillText(`Digitally signed by Gram Sevak Sunita Deshmukh on ${req.date}`, cv.width - 70, 510)
                                        const url = cv.toDataURL('image/png')
                                        const a = document.createElement('a')
                                        a.download = `Signed_${matchedDoc.id}_${req.applicantName.trim().replace(/\s+/g,'_')}.png`
                                        a.href = url; a.click()
                                      }
                                    }}>
                                    📥 {lang==='en'?'Download':'डाउनलोड'}
                                  </button>
                                ) : <span style={{ color:'#475569', fontSize:'0.8rem' }}>—</span>}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

          </div>{/* end left col */}

          {/* ====== RIGHT COLUMN ====== */}
          <div className="dash-right-col">

            {/* MODULE 7: UPCOMING GRAM SABHA */}
            <div className="glass-card gram-sabha-v2">
              <span className="sabha-badge-v2">📅 {lang==='en' ? 'Upcoming Gram Sabha' : 'पुढील ग्रामसभा'}</span>
              <h3 className="sabha-h3">{lang==='en' ? 'Village Council General Assembly' : 'ग्रामसभा सार्वजनिक बैठक'}</h3>
              <div className="sabha-dtl-list">
                <div className="sabha-dtl-item"><span>📅</span> <strong>July 15, 2026</strong></div>
                <div className="sabha-dtl-item"><span>⏰</span> <strong>10:00 AM IST</strong></div>
                <div className="sabha-dtl-item"><span>📍</span> <strong>{lang==='en' ? 'Village Panchayat Hall' : 'पंचायत कार्यालय सभागृह'}</strong></div>
              </div>
              <div className="sabha-agenda-box">
                <span className="agenda-heading">{lang==='en' ? 'Agenda:' : 'अजेंडा:'}</span>
                <ul className="agenda-items-ul">
                  <li>{lang==='en' ? 'Monsoon Drainage & Water Logging Plan' : 'पावसाळी गटार व स्वच्छता नियोजन'}</li>
                  <li>{lang==='en' ? 'Ward 3 & 5 Solar Lights Grid Approval' : 'नवीन सौर दिवे मंजुरी'}</li>
                  <li>{lang==='en' ? 'Agricultural Subsidy Review & Allocation' : 'कृषी अनुदान लाभार्थी निश्चिती'}</li>
                </ul>
              </div>
              <button className="btn btn-primary" style={{ width:'100%', padding:'0.65rem' }}
                onClick={() => alert(lang==='en' ? 'Agenda details & voting portal will open on Sabha date!' : 'अजेंडा तपशील व मतदान सभेच्या तारखेला खुले होईल!')}>
                🔗 {lang==='en' ? 'View Details & Agenda' : 'अजेंडा व तपशील पहा'}
              </button>
            </div>

            {/* MODULE 8: GOVERNMENT SCHEMES */}
            <div className="glass-card">
              <div className="sec-hdr">
                <h3 className="sec-title">🌾 {lang==='en' ? 'Welfare Schemes Desk' : 'शासकीय योजना केंद्र'}</h3>
              </div>
              <div className="schemes-v2">
                {mockSchemes.map(s => (
                  <div key={s.id} className="scheme-v2" onClick={() => alert(`Application for ${s.nm} opens soon!`)}>
                    <span className="scheme-em">{s.em}</span>
                    <div className="scheme-bd">
                      <div className="scheme-nm">{s.nm}</div>
                      <div className="scheme-st" style={{ color: s.clr }}>{s.st}</div>
                      <div className="scheme-el">{s.el}</div>
                    </div>
                    <button className="scheme-arrow">→</button>
                  </div>
                ))}
              </div>
            </div>

            {/* MODULE 10: AI GRAMSETU ASSISTANT */}
            <div className="glass-card ai-panel-v2">
              <div className="sec-hdr">
                <div>
                  <h3 className="sec-title">🤖 {lang==='en' ? 'GramSetu AI Mitra' : 'ग्रामसेतू AI मित्र'}</h3>
                  <p className="sec-sub">{lang==='en' ? 'Your digital governance assistant' : 'तुमचा डिजिटल शासन सहाय्यक'}</p>
                </div>
                <div className="ai-status-dot-live" title="Online"></div>
              </div>
              <div className="ai-prompts-v2">
                {aiPrompts.map((p, i) => (
                  <button key={i} className="ai-chip-v2" onClick={() => handleAiClick(p)}>{p}</button>
                ))}
              </div>
              <div className="ai-caps-grid">
                {[
                  { em:'📋', lbl: lang==='en'?'Complaint Status':'तक्रार स्थिती' },
                  { em:'📜', lbl: lang==='en'?'Certificates':'दाखले'             },
                  { em:'💰', lbl: lang==='en'?'Budget Info':'बजेट माहिती'       },
                  { em:'🗣️', lbl: lang==='en'?'Marathi Voice':'मराठी व्हॉइस'    },
                ].map((c, i) => (
                  <div key={i} className="ai-cap"><span>{c.em}</span><span>{c.lbl}</span></div>
                ))}
              </div>
              <button className="btn btn-primary" style={{ width:'100%', padding:'0.6rem', borderRadius:'12px' }} onClick={() => setVoiceOpen(true)}>
                💬 {lang==='en' ? 'Open Full AI Chat' : 'AI चॅट उघडा'}
              </button>
            </div>

            {/* MODULE 11: NOTIFICATIONS PANEL */}
            <div className="glass-card">
              <div className="sec-hdr">
                <h3 className="sec-title">📢 {lang==='en' ? 'Panchayat Live Alerts' : 'पंचायत थेट सूचना'}</h3>
                <span className="notif-count-pill">5</span>
              </div>
              <div className="notifs-v2">
                {[
                  { em:'⚡', cls:'prj', txt: lang==='en'?'Solar lights grid reached 88% completion in Wards 1 & 3':'वॉर्ड १ व ३ मध्ये सौर दिवे ८८% पूर्ण', time:'2h' },
                  { em:'📝', cls:'cmp', txt: lang==='en'?'New complaint filed: Water leakage reported in Ward 4':'नवीन तक्रार: वॉर्ड ४ मधील पाणी गळती नोंदवली', time:'5h' },
                  { em:'📜', cls:'doc', txt: lang==='en'?'Gram Sevak Sunita Deshmukh issued a residency certificate':'ग्रामसेवक सुनिता देशमुखांनी रहिवासी दाखला मंजूर केला', time:'1d' },
                  { em:'💰', cls:'bgt', txt: lang==='en'?'Agriculture sector budget increased by ₹5L for farmers':'शेतकऱ्यांसाठी कृषी बजेट ₹५ लाखांनी वाढले', time:'2d' },
                  { em:'📅', cls:'sab', txt: lang==='en'?'Gram Sabha scheduled: July 15, 2026 at 10:00 AM':'ग्रामसभा: १५ जुलै २०२६, सकाळी १०:०० वाजता', time:'3d' },
                ].map((n, i) => (
                  <div key={i} className="notif-row">
                    <div className={`notif-em-box ${n.cls}`}>{n.em}</div>
                    <div className="notif-content">
                      <span className="notif-txt">{n.txt}</span>
                      <span className="notif-time">{n.time} {lang==='en'?'ago':'पूर्वी'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>{/* end right col */}
        </div>{/* end main grid */}

      </div>
    )
  }


  const renderCitizenComplaintTab = () => {
    return (
      <div className="admin-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 className="form-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>📝 {t.complaintFormTitle}</h3>
        <form onSubmit={handleComplaintSubmit} className="complaint-form">
          <div className="form-group">
            <label htmlFor="citizen-comp-name">{t.labelName}</label>
            <input 
              type="text" 
              id="citizen-comp-name"
              className="form-input" 
              value={newComplaint.name}
              disabled
              style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="citizen-comp-cat">{t.labelCategory}</label>
            <select 
              id="citizen-comp-cat"
              className="form-input"
              value={newComplaint.category}
              onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
            >
              <option value="Water Supply">{lang === 'en' ? 'Water Supply' : 'पाणी पुरवठा'}</option>
              <option value="Street Lights">{lang === 'en' ? 'Street Lights' : 'पथदिवे'}</option>
              <option value="Waste Management">{lang === 'en' ? 'Waste Management' : 'कचरा व्यवस्थापन'}</option>
              <option value="Road Quality">{lang === 'en' ? 'Road Quality' : 'रस्त्याची दुरवस्था'}</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="citizen-comp-ward">{lang === 'en' ? 'Select Ward' : 'वॉर्ड निवडा'}</label>
            <select 
              id="citizen-comp-ward"
              className="form-input"
              value={newComplaint.ward || 1}
              onChange={(e) => setNewComplaint({...newComplaint, ward: parseInt(e.target.value)})}
            >
              {[1, 2, 3, 4, 5, 6, 7].map(num => (
                <option key={num} value={num}>{lang === 'en' ? `Ward ${num}` : `वॉर्ड क्र. ${num}`}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="citizen-comp-desc">{t.labelDesc}</label>
            <textarea 
              id="citizen-comp-desc"
              className="form-textarea" 
              placeholder={t.placeholderDesc}
              value={newComplaint.desc}
              onChange={(e) => setNewComplaint({...newComplaint, desc: e.target.value})}
              required
            ></textarea>
          </div>

          <div className="form-group" style={{ marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--light-text-muted)' }}>{t.complaintImgLabel}</label>
            
            {!newComplaint.image ? (
              <div className="image-upload-wrapper">
                <label 
                  htmlFor="citizen-complaint-img-upload"
                  className={`image-upload-area ${complaintImageError ? 'error' : ''}`}
                  style={{ background: 'var(--light-bg)', border: '2px dashed var(--light-surface-border)' }}
                >
                  <span className="upload-icon">📸</span>
                  <span className="upload-text" dangerouslySetInnerHTML={{ __html: t.complaintImgDesc }}></span>
                  <input 
                    type="file" 
                    id="citizen-complaint-img-upload" 
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = () => {
                          setNewComplaint(prev => ({
                            ...prev,
                            image: reader.result,
                            fileName: file.name,
                            fileSize: `${(file.size / 1024).toFixed(1)} KB`
                          }))
                          setComplaintImageError(false)
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                </label>
                {complaintImageError && (
                  <div className="upload-error-msg">
                    ⚠️ {t.uploadCompulsoryErrorComp}
                  </div>
                )}
              </div>
            ) : (
              <div className="upload-preview-container">
                <img src={newComplaint.image} alt="Complaint Preview" className="upload-preview-img" />
                <div className="upload-preview-info">
                  <span className="upload-preview-name">{newComplaint.fileName}</span>
                  <span className="upload-preview-size">{newComplaint.fileSize}</span>
                </div>
                <button 
                  type="button" 
                  className="upload-preview-remove"
                  onClick={() => setNewComplaint(prev => ({ ...prev, image: null, fileName: null, fileSize: null }))}
                >
                  {lang === 'en' ? 'Remove' : 'काढून टाका'}
                </button>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>{t.btnSubmitGrievance}</button>
        </form>
      </div>
    )
  }

  const renderCitizenDocumentsTab = () => {
    return (
      <div className="admin-card">
        <h3 className="admin-card-title">📜 {lang === 'en' ? 'Digital Document Hub' : 'डिजिटल दाखले केंद्र'}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--dark-text-muted)', marginBottom: '1.5rem', textAlign: 'left' }}>
          {t.certSubtitle}
        </p>
        <div className="docs-grid">
          {documentsList.map((doc) => (
            <div key={doc.id} className="doc-card" style={{ color: 'var(--light-text-main)' }}>
              <span className="doc-icon">{doc.icon}</span>
              <h3 className="doc-title">{lang === 'en' ? doc.titleEn : doc.titleMr}</h3>
              <p className="doc-desc">{lang === 'en' ? doc.descEn : doc.descMr}</p>
              <div className="doc-meta">
                <span className="doc-speed">⚡ {lang === 'en' ? doc.speedEn : doc.speedMr}</span>
              </div>
              <button 
                className="doc-action-btn"
                onClick={() => {
                  triggerActionWithAuth((user) => {
                    setSelectedDoc(doc)
                    setDocApplicantName(user.name)
                    setDocPurpose('')
                    setDocIdFile(null)
                    setDocIdFileError(false)
                    setDocSuccess(false)
                    setDocModalOpen(true)
                  }, 'loginCompulsoryMsgCert')
                }}
              >
                📥 {lang === 'en' ? t.docRegisterReq : t.docRegisterReq}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderCitizenFundsTab = () => {
    let allRecords = []
    if (fundFilter === 'All') {
      sectors.forEach(sec => {
        if (fundsData[sec] && fundsData[sec].records) {
          allRecords = [...allRecords, ...fundsData[sec].records]
        }
      })
    } else {
      if (fundsData[fundFilter] && fundsData[fundFilter].records) {
        allRecords = fundsData[fundFilter].records
      }
    }
    allRecords.sort((a, b) => b.id - a.id)

    return (
      <div className="admin-card">
        <h3 className="chart-title">💰 {lang === 'en' ? 'Fund Distribution Records' : 'गाव निधी विवरण'}</h3>
        <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'left', marginBottom: '1.5rem' }}>
          {lang === 'en' ? 'Transparent tracking of village funds and proof of work.' : 'गावातील निधी आणि कामाच्या पुराव्यांचा पारदर्शक मागोवा.'}
        </p>

        <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '1.5rem', width: '100%' }}>
          <button 
            style={{ 
              padding: '0.4rem 0.85rem', 
              borderRadius: '50px', 
              fontSize: '0.75rem', 
              border: '1px solid var(--light-surface-border)',
              background: fundFilter === 'All' ? 'var(--brand-green)' : 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            onClick={() => setFundFilter('All')}
          >
            {t.chartFilterAll}
          </button>
          {sectors.map(sec => (
            <button 
              key={sec}
              style={{ 
                padding: '0.4rem 0.85rem', 
                borderRadius: '50px', 
                fontSize: '0.75rem', 
                border: '1px solid var(--light-surface-border)',
                background: fundFilter === sec ? 'var(--brand-green)' : 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setFundFilter(sec)}
            >
              {lang === 'en' ? sec.replace(/([A-Z])/g, ' $1').trim() : (sec === 'Infrastructure' ? 'पायाभूत सुविधा' : sec === 'WaterSupply' ? 'पाणी पुरवठा' : sec === 'Education' ? 'शिक्षण' : sec === 'SocialWelfare' ? 'समाज कल्याण' : 'कृषी विभाग')}
            </button>
          ))}
        </div>

        <div className="fund-records-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {allRecords.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
              {lang === 'en' ? 'No fund records available for this sector.' : 'या विभागासाठी कोणतीही निधी नोंद उपलब्ध नाही.'}
            </p>
          ) : (
            allRecords.map(record => (
              <div key={record.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img src={record.proof} alt="Proof" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer' }} onClick={() => setLightboxImg(record.proof)} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--light-text-main)' }}>{record.title}</h4>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--dark-text-muted)' }}>
                    <span>📅 {record.date}</span>
                    <span style={{ color: 'var(--brand-teal)', fontWeight: 600 }}>💰 ₹{record.amount} Lakhs</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {viewMode === 'dashboard' && isOfficial ? (
        <div className="admin-dashboard-layout">
          {/* Admin Sidebar */}
          <aside className="admin-sidebar">
            <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <img src={logoImg} alt="GramSetu Logo" style={{ height: '40px', objectFit: 'contain' }} />
            </div>

            <div className="admin-profile-card">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="admin-profile-avatar" 
                onClick={() => setCitizenProfileModalOpen(true)} 
                style={{ cursor: 'pointer' }} 
              />
              <div className="admin-profile-info">
                <span className="admin-profile-name">{currentUser.name}</span>
                <span className="admin-profile-role">{currentUser.role}</span>
              </div>
            </div>

            <ul className="admin-nav-list">
              <li>
                <button 
                  className={`admin-nav-item ${adminActiveTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setAdminActiveTab('overview')}
                >
                  📊 <span>{lang === 'en' ? 'Overview' : 'आकडेवारी'}</span>
                </button>
              </li>
              {isGrievanceHandler && (
                <li>
                  <button 
                    className={`admin-nav-item ${adminActiveTab === 'grievances' ? 'active' : ''}`}
                    onClick={() => setAdminActiveTab('grievances')}
                  >
                    📋 <span>{lang === 'en' ? 'Grievances' : 'तक्रारी निवारण'}</span>
                  </button>
                </li>
              )}
              {isDocumentHandler && (
                <li>
                  <button 
                    className={`admin-nav-item ${adminActiveTab === 'documents' ? 'active' : ''}`}
                    onClick={() => setAdminActiveTab('documents')}
                  >
                    📜 <span>{lang === 'en' ? 'Document Requests' : 'दाखले अर्ज'}</span>
                  </button>
                </li>
              )}
              {isSarpanch && (
                <li>
                  <button 
                    className={`admin-nav-item ${adminActiveTab === 'announcements' ? 'active' : ''}`}
                    onClick={() => setAdminActiveTab('announcements')}
                  >
                    📢 <span>{lang === 'en' ? 'Announcements' : 'घोषणा प्रसिद्धी'}</span>
                  </button>
                </li>
              )}
              <li>
                <button 
                  className={`admin-nav-item ${adminActiveTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setAdminActiveTab('profile')}
                >
                  👤 <span>{lang === 'en' ? 'My Profile' : 'माझी प्रोफाइल'}</span>
                </button>
              </li>
            </ul>

            <div className="admin-sidebar-footer">
              <button 
                className="admin-nav-item"
                onClick={() => {
                  setIsLoggedIn(false)
                  setCurrentUser(null)
                  setViewMode('landing')
                }}
                style={{ color: '#ef4444' }}
              >
                🚪 <span>{lang === 'en' ? 'Logout' : 'लॉगआउट'}</span>
              </button>
            </div>
          </aside>

          {/* Admin Main Content Area */}
          <main className="admin-main-content">
            <header className="admin-header-bar">
              <div className="admin-welcome-text">
                <h2>{lang === 'en' ? `Hello, ${currentUser.name}` : `नमस्कार, ${currentUser.name}`}</h2>
                <p>{lang === 'en' ? `Gram Panchayat Administrative System • Role: ${currentUser.role}` : `ग्रामपंचायत प्रशासकीय प्रणाली • भूमिका: ${currentUser.role}`}</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button 
                  className="lang-toggle" 
                  onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
                >
                  <span className={lang === 'en' ? 'active' : ''}>EN</span>
                  <span>/</span>
                  <span className={lang === 'mr' ? 'active' : ''}>मराठी</span>
                </button>
              </div>
            </header>

            {adminActiveTab === 'overview' && renderOverviewTab(isGrievanceHandler)}
            {adminActiveTab === 'grievances' && isGrievanceHandler && renderGrievancesTab()}
            {adminActiveTab === 'documents' && isDocumentHandler && renderDocumentsTab()}
            {adminActiveTab === 'announcements' && isSarpanch && renderAnnouncementsTab()}
            {adminActiveTab === 'profile' && renderProfileTab()}
          </main>
        </div>
      ) : viewMode === 'dashboard' && isCitizen ? (
        <div className="admin-dashboard-layout">
          {/* Citizen Sidebar */}
          <aside className="admin-sidebar">
            <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <img src={logoImg} alt="GramSetu Logo" style={{ height: '40px', objectFit: 'contain' }} />
            </div>

            <div className="admin-profile-card">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="admin-profile-avatar" 
                onClick={() => setCitizenProfileModalOpen(true)} 
                style={{ cursor: 'pointer' }} 
              />
              <div className="admin-profile-info">
                <span className="admin-profile-name">{currentUser.name}</span>
                <span className="admin-profile-role">{currentUser.role}</span>
              </div>
            </div>

            <ul className="admin-nav-list">
              <li>
                <button 
                  className={`admin-nav-item ${citizenActiveTab === 'status' ? 'active' : ''}`}
                  onClick={() => setCitizenActiveTab('status')}
                >
                  📊 <span>{lang === 'en' ? 'Overview & Status' : 'अर्ज व तक्रारी स्थिती'}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`admin-nav-item ${citizenActiveTab === 'complaint' ? 'active' : ''}`}
                  onClick={() => setCitizenActiveTab('complaint')}
                >
                  📋 <span>{lang === 'en' ? 'File a Complaint' : 'नवीन तक्रार नोंदवा'}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`admin-nav-item ${citizenActiveTab === 'documents' ? 'active' : ''}`}
                  onClick={() => setCitizenActiveTab('documents')}
                >
                  📜 <span>{lang === 'en' ? 'Request Documents' : 'दाखल्यांसाठी अर्ज'}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`admin-nav-item ${citizenActiveTab === 'funds' ? 'active' : ''}`}
                  onClick={() => setCitizenActiveTab('funds')}
                >
                  💰 <span>{lang === 'en' ? 'Fund Distributions' : 'गाव निधी विवरण'}</span>
                </button>
              </li>
            </ul>

            <div className="admin-sidebar-footer">
              <button 
                className="admin-nav-item"
                onClick={() => {
                  setIsLoggedIn(false)
                  setCurrentUser(null)
                  setViewMode('landing')
                }}
                style={{ color: '#ef4444' }}
              >
                🚪 <span>{lang === 'en' ? 'Logout' : 'लॉगआउट'}</span>
              </button>
            </div>
          </aside>

          {/* Citizen Main Content Area */}
          <main className="admin-main-content">
            <header className="admin-header-bar">
              <div className="admin-welcome-text">
                <h2>{lang === 'en' ? `Welcome, ${currentUser.name}` : `स्वागत आहे, ${currentUser.name}`}</h2>
                <p>{lang === 'en' ? 'Citizen Self-Service Dashboard' : 'नागरिक सेवा स्वयं-सहायता डॅशबोर्ड'}</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button 
                  className="lang-toggle" 
                  onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
                >
                  <span className={lang === 'en' ? 'active' : ''}>EN</span>
                  <span>/</span>
                  <span className={lang === 'mr' ? 'active' : ''}>मराठी</span>
                </button>
              </div>
            </header>

            {citizenActiveTab === 'status' && renderCitizenStatusTab()}
            {citizenActiveTab === 'complaint' && renderCitizenComplaintTab()}
            {citizenActiveTab === 'documents' && renderCitizenDocumentsTab()}
            {citizenActiveTab === 'funds' && renderCitizenFundsTab()}
          </main>
        </div>
      ) : (
        <>


      {/* Navigation Header */}
      <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <nav className="navbar">
          <a href="#hero" className="logo-container">
            <img src={logoImg} alt="GramSetu Logo" style={{ height: '40px', objectFit: 'contain', display: 'block' }} />
          </a>

          <ul className="nav-links">
            <li>
              <a href="#hero" className="nav-link">
                <img src={homeIcon} alt="" className="nav-icon" />
                {t.navHome}
              </a>
            </li>
            <li>
              <a href="#features" className="nav-link">
                <img src={servicesIcon} alt="" className="nav-icon" />
                {t.navServices}
              </a>
            </li>
            <li>
              <a href="#dashboard" className="nav-link">
                <img src={reportIcon} alt="" className="nav-icon" />
                {t.navComplaints}
              </a>
            </li>
            <li>
              <a href="#certificates" className="nav-link">
                <img src={certIcon} alt="" className="nav-icon" />
                {t.navCertificates}
              </a>
            </li>
            <li>
              <a href="#tech" className="nav-link">
                <img src={contactIcon} alt="" className="nav-icon" />
                {t.navContact}
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            {/* Language Selection Switch */}
            <button 
              className="lang-toggle" 
              onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
              title={lang === 'en' ? 'मराठी मध्ये बदला' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <span className={lang === 'en' ? 'active' : ''}>EN</span>
              <span>/</span>
              <span className={lang === 'mr' ? 'active' : ''}>मराठी</span>
            </button>

            {isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(255,255,255,0.06)', padding: '0.35rem 0.75rem', borderRadius: '50px', border: '1px solid var(--dark-surface-border)' }}>
                  <img src={currentUser.avatar} alt="" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }} className="user-nav-name">{currentUser.name}</span>
                </div>
                {(currentUser.role.includes('Sarpanch') || currentUser.role.includes('Gram Sevak') || currentUser.role.includes('सरपंच') || currentUser.role.includes('ग्रामसेवक')) && (
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', background: 'var(--brand-teal)' }} 
                    onClick={() => setViewMode('dashboard')}
                  >
                    {lang === 'en' ? 'Dashboard' : 'डॅशबोर्ड'}
                  </button>
                )}
                <button className="btn btn-secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }} onClick={() => {
                  setIsLoggedIn(false)
                  setCurrentUser(null)
                  setViewMode('landing')
                }}>
                  {t.navLogout}
                </button>
              </div>

            ) : (
              <button className="btn btn-primary" onClick={() => {
                setLoginMsg('')
                setLoginModalOpen(true)
              }}>{t.ctaLogin}</button>
            )}
          </div>
        </nav>
      </header>



      {/* Hero Section */}

      <section id="hero" className="hero-section">
        {/* Fullscreen Spline Background */}
        <div className="hero-spline-bg">
          {splineLoading && (
            <div className="spline-loading">
              <div className="spinner"></div>
              <p>{lang === 'en' ? 'Syncing 3D Panchayat Model...' : '३D पंचायत मॉडेल लोड होत आहे...'}</p>
            </div>
          )}
          <Spline 
            scene="https://prod.spline.design/lmAZ3HrHUC62hX6K/scene.splinecode" 
            onLoad={() => setSplineLoading(false)}
          />
        </div>

        {/* Readability Gradient Overlay */}
        <div className="hero-overlay"></div>

        <div className="hero-container">
          <div className="hero-content">
            <span className="badge">{t.heroBadge}</span>
            <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t.heroTitle }}></h1>
            <p className="hero-description">{t.heroDesc}</p>
            <div className="hero-actions">
              <a href="#features" className="btn btn-primary">{t.btnGetStarted}</a>
              <a href="#dashboard" className="btn btn-secondary">{t.btnWatchDemo}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section (Light Theme) */}
      <section id="features" className="light-theme-section">
        <div className="section-header">
          <span className="text-brand-gradient bold" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {lang === 'en' ? 'COMMUNITY UTILITIES' : 'सामुदायिक सेवा'}
          </span>
          <h2 className="section-title">{t.featuresTitle}</h2>
          <p className="section-subtitle">{t.featuresSubtitle}</p>
        </div>

        <div className="features-grid">
          {featuresList.map((feat, idx) => (
            <div 
              key={feat.key}
              className={`feature-card ${activeFeature === idx ? 'active' : ''}`}
              onClick={() => {
                setActiveFeature(idx)
                if (feat.section === 'voice') {
                  setVoiceOpen(true)
                } else {
                  const target = document.querySelector(feat.section)
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              <div className="feature-icon-wrapper">
                {idx === 0 && '📋'}
                {idx === 1 && '📊'}
                {idx === 2 && '📜'}
                {idx === 3 && '👥'}
                {idx === 4 && '💬'}
                {idx === 5 && '🎙️'}
              </div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-description">{feat.desc}</p>
              <span className="feature-action-indicator">
                {lang === 'en' ? 'Launch Feature' : 'प्रणाली उघडा'} &rarr;
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics & Grievance Manager Section */}
      <section id="dashboard" className="light-theme-section" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="section-header">
          <span className="text-brand-gradient bold" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {lang === 'en' ? 'LIVE DATA CORRIDOR' : 'थेट माहिती कॉरिडोअर'}
          </span>
          <h2 className="section-title">{t.statsTitle}</h2>
          <p className="section-subtitle">{t.statsSubtitle}</p>
        </div>

        {/* Counters panel */}
        <div className="stats-summary-grid">
          <div className="stat-counter-card">
            <div className="stat-number">1,245+</div>
            <div className="stat-label">{t.statConnected}</div>
          </div>
          <div className="stat-counter-card">
            <div className="stat-number">{85 + resolvedCount}+</div>
            <div className="stat-label">{t.statComplaints}</div>
          </div>
          <div className="stat-counter-card">
            <div className="stat-number">150,000+</div>
            <div className="stat-label">{t.statServices}</div>
          </div>
          <div className="stat-counter-card">
            <div className="stat-number">98.4%</div>
            <div className="stat-label">{t.statTransparency}</div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Charts side */}
          <div className="dashboard-visuals">
            <div>
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">{t.chartTitle}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'left' }}>{t.chartSubtitle}</p>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-color allocated"></span>
                    <span>{t.chartLegendAllocated}</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color spent"></span>
                    <span>{t.chartLegendSpent}</span>
                  </div>
                </div>
              </div>

              {/* Fund Category Filter Buttons */}
              <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '1rem', width: '100%' }}>
                <button 
                  style={{ 
                    padding: '0.3rem 0.75rem', 
                    borderRadius: '50px', 
                    fontSize: '0.75rem', 
                    border: '1px solid var(--light-surface-border)',
                    background: fundFilter === 'All' ? 'var(--brand-green)' : '#f1f5f9',
                    color: fundFilter === 'All' ? '#fff' : 'var(--light-text-main)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onClick={() => setFundFilter('All')}
                >
                  {t.chartFilterAll}
                </button>
                {sectors.map(sec => (
                  <button 
                    key={sec}
                    style={{ 
                      padding: '0.3rem 0.75rem', 
                      borderRadius: '50px', 
                      fontSize: '0.75rem', 
                      border: '1px solid var(--light-surface-border)',
                      background: fundFilter === sec ? 'var(--brand-green)' : '#f1f5f9',
                      color: fundFilter === sec ? '#fff' : 'var(--light-text-main)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                    onClick={() => setFundFilter(sec)}
                  >
                    {lang === 'en' ? sec.replace(/([A-Z])/g, ' $1').trim() : (sec === 'Infrastructure' ? 'पायाभूत सुविधा' : sec === 'WaterSupply' ? 'पाणी पुरवठा' : sec === 'Education' ? 'शिक्षण' : sec === 'SocialWelfare' ? 'समाज कल्याण' : 'कृषी विभाग')}
                  </button>
                ))}
              </div>

              {/* Bar Chart Bars */}
              <div className="bar-chart-container">
                {sectors.map(sec => {
                  const isVisible = fundFilter === 'All' || fundFilter === sec
                  const { allocH, spentH, allocVal, spentVal } = getBudgetChartHeights(sec)
                  
                  return (
                    <div 
                      key={sec} 
                      className="chart-bar-group" 
                      style={{ opacity: isVisible ? 1 : 0.2, transition: 'var(--transition-smooth)' }}
                    >
                      <div className="bars-wrapper">
                        <div 
                          className="chart-bar allocated" 
                          style={{ height: isVisible ? allocH : '10px' }} 
                          data-value={`${allocVal}L`}
                          title={`Allocated: ${allocVal} Lakhs`}
                        ></div>
                        <div 
                          className="chart-bar spent" 
                          style={{ height: isVisible ? spentH : '10px' }} 
                          data-value={`${spentVal}L`}
                          title={`Spent: ${spentVal} Lakhs`}
                        ></div>
                      </div>
                      <span className="bar-label">
                        {sec === 'Infrastructure' ? (lang === 'en' ? 'Infra' : 'इन्फ्रा')
                         : sec === 'WaterSupply' ? (lang === 'en' ? 'Water' : 'पाणी')
                         : sec === 'Education' ? (lang === 'en' ? 'Edu' : 'शिक्षण')
                         : sec === 'SocialWelfare' ? (lang === 'en' ? 'Welfare' : 'कल्याण')
                         : (lang === 'en' ? 'Agri' : 'कृषी')}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Radial progress ring layout */}
            <div className="radial-stats-row">
              <div className="progress-rings-container">
                <svg width="100" height="100" className="progress-ring-svg">
                  <circle className="progress-ring-bg" cx="50" cy="50" r="40" strokeWidth="8" fill="transparent"/>
                  <circle 
                    className="progress-ring-fill" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    strokeWidth="8" 
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={(2 * Math.PI * 40) * (1 - (85 + resolvedCount)/(85 + totalCount))}
                  />
                  {/* Text indicator inside circle */}
                  <text 
                    x="50" 
                    y="-45" 
                    textAnchor="middle" 
                    className="progress-percentage"
                    transform="rotate(90)"
                  >
                    {Math.round(((85 + resolvedCount) / (85 + totalCount)) * 100)}%
                  </text>
                </svg>

                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--light-text-main)' }}>{t.progressTitle}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{t.progressSubtitle}</p>
                </div>
              </div>

              <div className="stats-card-side">
                <h4>{lang === 'en' ? 'Resolution Efficiency' : 'निवारण गती'}</h4>
                <p>{lang === 'en' ? 'Average grievance close timeline calculated.' : 'तक्रारींचे निवारण करण्यासाठी लागणारा सरासरी वेळ.'}</p>
                <div className="stats-trend">36.5 Hrs</div>
              </div>
            </div>
          </div>

          {/* Grievance Ledger & Input Form */}
          <div className="dashboard-actions-panel">
            <div className="complaint-form-wrapper">
              <h3 className="form-title">📝 {t.complaintFormTitle}</h3>
              <form onSubmit={handleComplaintSubmit} className="complaint-form">
                <div className="form-group">
                  <label htmlFor="comp-name">{t.labelName}</label>
                  <input 
                    type="text" 
                    id="comp-name"
                    className="form-input" 
                    placeholder={t.placeholderName}
                    value={newComplaint.name}
                    onChange={(e) => setNewComplaint({...newComplaint, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="comp-cat">{t.labelCategory}</label>
                  <select 
                    id="comp-cat"
                    className="form-input"
                    value={newComplaint.category}
                    onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                  >
                    <option value="Water Supply">{lang === 'en' ? 'Water Supply' : 'पाणी पुरवठा'}</option>
                    <option value="Street Lights">{lang === 'en' ? 'Street Lights' : 'पथदिवे'}</option>
                    <option value="Waste Management">{lang === 'en' ? 'Waste Management' : 'कचरा व्यवस्थापन'}</option>
                    <option value="Road Quality">{lang === 'en' ? 'Road Quality' : 'रस्त्याची दुरवस्था'}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="comp-ward">{lang === 'en' ? 'Select Ward' : 'वॉर्ड निवडा'}</label>
                  <select 
                    id="comp-ward"
                    className="form-input"
                    value={newComplaint.ward || 1}
                    onChange={(e) => setNewComplaint({...newComplaint, ward: parseInt(e.target.value)})}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(num => (
                      <option key={num} value={num}>{lang === 'en' ? `Ward ${num}` : `वॉर्ड क्र. ${num}`}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="comp-desc">{t.labelDesc}</label>
                  <textarea 
                    id="comp-desc"
                    className="form-textarea" 
                    placeholder={t.placeholderDesc}
                    value={newComplaint.desc}
                    onChange={(e) => setNewComplaint({...newComplaint, desc: e.target.value})}
                    required
                  ></textarea>
                </div>

                <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                  <label style={{ color: 'var(--light-text-muted)' }}>{t.complaintImgLabel}</label>
                  
                  {!newComplaint.image ? (
                    <div className="image-upload-wrapper">
                      <label 
                        htmlFor="complaint-img-upload"
                        className={`image-upload-area ${complaintImageError ? 'error' : ''}`}
                        style={{ background: 'var(--light-bg)', border: '2px dashed var(--light-surface-border)' }}
                      >
                        <span className="upload-icon">📸</span>
                        <span className="upload-text" dangerouslySetInnerHTML={{ __html: t.complaintImgDesc }}></span>
                        <input 
                          type="file" 
                          id="complaint-img-upload" 
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = () => {
                                setNewComplaint(prev => ({
                                  ...prev,
                                  image: reader.result,
                                  fileName: file.name,
                                  fileSize: `${(file.size / 1024).toFixed(1)} KB`
                                }))
                                setComplaintImageError(false)
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                        />
                      </label>
                      {complaintImageError && (
                        <div className="upload-error-msg">
                          ⚠️ {t.uploadCompulsoryErrorComp}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="upload-preview-container">
                      <img src={newComplaint.image} alt="Complaint Preview" className="upload-preview-img" />
                      <div className="upload-preview-info">
                        <span className="upload-preview-name">{newComplaint.fileName}</span>
                        <span className="upload-preview-size">{newComplaint.fileSize}</span>
                      </div>
                      <button 
                        type="button" 
                        className="upload-preview-remove"
                        onClick={() => setNewComplaint(prev => ({ ...prev, image: null, fileName: null, fileSize: null }))}
                      >
                        {lang === 'en' ? 'Remove' : 'काढून टाका'}
                      </button>
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>{t.btnSubmitGrievance}</button>
              </form>
            </div>

            {/* Live Ledger logs */}
            <div className="live-tracker-wrapper">
              <div className="tracker-header">
                <h3 className="tracker-title">
                  <span className="pulse-dot"></span>
                  {t.liveTrackerTitle}
                </h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-green)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '50px' }}>
                  {totalCount} Active
                </span>
              </div>

              <div className="complaint-list">
                {complaints.map((item) => (
                  <div key={item.id} className={`complaint-item ${item.status === 'Resolved' ? 'resolved' : ''}`}>
                    <div className="complaint-meta">
                      <span className="complaint-author">{item.name}</span>
                      <span className={`complaint-status ${item.status === 'Resolved' ? 'status-resolved' : 'status-pending'}`}>
                        {item.status === 'Resolved' ? t.statusResolved : t.statusPending}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-green)' }}>
                      📂 {lang === 'en' ? item.category : item.categoryMr}
                    </span>
                    <p className="complaint-text">
                      {lang === 'en' ? item.desc : item.descMr}
                    </p>
                    {item.image && (
                      <div className="complaint-img-container" onClick={() => setLightboxImg(item.image)}>
                        <img src={item.image} alt="Grievance Attachment" className="complaint-img" />
                        <div className="complaint-img-overlay">
                          <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 600, background: 'rgba(0, 0, 0, 0.65)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                            🔍 {lang === 'en' ? 'View Photo' : 'फोटो पहा'}
                          </span>
                        </div>
                      </div>
                    )}
                    <span className="complaint-date">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Document Hub Section */}
      <section id="certificates" className="light-theme-section" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="section-header">
          <span className="text-brand-gradient bold" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {lang === 'en' ? 'CERTIFICATION (2 Working Days)' : 'प्रमाणपत्र वितरण (२ कामकाजाचे दिवस)'}
          </span>
          <h2 className="section-title">{t.certTitle}</h2>
          <p className="section-subtitle">{t.certSubtitle}</p>
        </div>

        <div className="docs-grid">
          {documentsList.map((doc) => (
            <div key={doc.id} className="doc-card" style={{ color: 'var(--light-text-main)' }}>
              <span className="doc-icon">{doc.icon}</span>
              <h3 className="doc-title">{lang === 'en' ? doc.titleEn : doc.titleMr}</h3>
              <p className="doc-desc">{lang === 'en' ? doc.descEn : doc.descMr}</p>
              <div className="doc-meta">
                <span className="doc-speed">⚡ {lang === 'en' ? doc.speedEn : doc.speedMr}</span>
              </div>
              <button 
                className="doc-action-btn"
                onClick={() => {
                  triggerActionWithAuth((user) => {
                    setSelectedDoc(doc)
                    setDocApplicantName(user.name)
                    setDocPurpose('')
                    setDocIdFile(null)
                    setDocIdFileError(false)
                    setDocSuccess(false)
                    setDocModalOpen(true)
                  }, 'loginCompulsoryMsgCert')
                }}
              >
                📥 {lang === 'en' ? t.docRegisterReq : t.docRegisterReq}
              </button>
            </div>
          ))}
        </div>

        {/* Hidden canvas used to draw certificates in memory for download */}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </section>

      {/* Testimonials (Citizen Slider Section) */}
      <section className="light-theme-section" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="section-header">
          <span className="text-brand-gradient bold" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {lang === 'en' ? 'CITIZEN TESTIMONIALS' : 'नागरिकांचे मत'}
          </span>
          <h2 className="section-title">{lang === 'en' ? 'What Gram Panchayat Members Say' : 'ग्रामस्थांचे अनुभव'}</h2>
        </div>

        <div className="testimonials-wrapper">
          <div 
            className="testimonial-card-container"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((test, index) => (
              <div key={index} className="testimonial-slide">
                <div className="testimonial-bubble">
                  <img src={test.img} alt={test.name} className="testimonial-avatar" />
                  <p className="testimonial-text">{test.text}</p>
                  <div className="testimonial-author-box">
                    <span className="testimonial-author-name">{test.name}</span>
                    <span className="testimonial-author-role">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`carousel-dot ${currentTestimonial === index ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section (Dark Theme) */}
      <section id="tech" className="tech-section">
        <div className="section-header">
          <span className="text-brand-gradient bold" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {lang === 'en' ? 'SYSTEM UNDERPINNING' : 'प्रणाली संरचना'}
          </span>
          <h2 className="section-title" style={{ color: '#fff' }}>{t.techTitle}</h2>
          <p className="section-subtitle" style={{ color: 'var(--dark-text-muted)' }}>{t.techSubtitle}</p>
        </div>

        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-icon-box">🧠</div>
            <h3 className="tech-title">{t.tech1Title}</h3>
            <p className="tech-desc">{t.tech1Desc}</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon-box">🔗</div>
            <h3 className="tech-title">{t.tech2Title}</h3>
            <p className="tech-desc">{t.tech2Desc}</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon-box">🌐</div>
            <h3 className="tech-title">{t.tech3Title}</h3>
            <p className="tech-desc">{t.tech3Desc}</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon-box">🛡️</div>
            <h3 className="tech-title">{t.tech4Title}</h3>
            <p className="tech-desc">{t.tech4Desc}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <a href="#hero" className="logo-container" style={{ alignSelf: 'flex-start' }}>
              <img src={logoImg} alt="GramSetu Logo" style={{ height: '45px', objectFit: 'contain', display: 'block' }} />
            </a>
            <p className="footer-tagline">
              {lang === 'en' 
                ? 'Empowering rural citizens through structured digital pathways, audits, and real-time governance integrations.'
                : 'पारदर्शक आर्थिक वाटप, डिजिटल दाखले आणि सुलभ तक्रार प्रणालीद्वारे ग्रामस्थांना सक्षम बनवणारे हक्काचे व्यासपीठ.'}
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon-btn">🐦</a>
              <a href="#" className="social-icon-btn">📸</a>
              <a href="#" className="social-icon-btn">💻</a>
              <a href="#" className="social-icon-btn">�~</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">{lang === 'en' ? 'Quick Navigation' : 'मुख्य दुवे'}</h4>
            <ul className="footer-links">
              <li><a href="#hero">{t.navHome}</a></li>
              <li><a href="#features">{t.navServices}</a></li>
              <li><a href="#dashboard">{t.navComplaints}</a></li>
              <li><a href="#certificates">{t.certCardTitle}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">{lang === 'en' ? 'Helpdesk Hours' : 'मदत केंद्र वेळ'}</h4>
            <ul className="footer-links">
              <li>Mon - Sat: 9:00 AM - 5:00 PM</li>
              <li>Sunday: Holiday</li>
              <li>Emergency Grievances: 24/7</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">{lang === 'en' ? 'Panchayat Contact' : 'पंचायतीशी संपर्क साधा'}</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📍</span>
              <span>Gram Panchayat Office Hall, Main Chowk, GramSetu Village, District Pune, Maharashtra - 410501.</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">✉️</span>
              <span>contact@gramsetu.gov.in</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GramSetu Portal. {lang === 'en' ? 'All rights reserved.' : 'सर्व हक्क राखीव.'}</p>
          <p>{lang === 'en' ? 'Designed for Rural Digital Governance Hackathon.' : 'ग्रामीण डिजिटल गव्हर्नन्स हॅकाथॉनसाठी डिझाइन केलेले.'}</p>
        </div>
      </footer>

      {/* Floating AI Voice Assistant chat widget */}
      <div className="voice-assistant-widget">
        {voiceOpen && (
          <div className="chatbot-panel glass-card">
            <div className="chatbot-header">
              <span style={{ fontWeight: 600 }}>🗣️ {t.voiceAssistantTitle}</span>
              <button 
                onClick={() => setVoiceOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <div className="chatbot-messages">
              <div className="chat-bubble bot">
                {lang === 'en' ? 'Hello! I am GramSetu Voice Mitra. Ask me about your complaint status, documents, budget details, schemes, or speak in Marathi/English!' 
                            : 'नमस्कार! मी तुमचा ग्रामसेतू व्हॉइस-मित्र आहे. मला तुमच्या तक्रारीची स्थिती, दाखले, बजेत तपशील, योजनांबद्दल विचारा किंवा इंग्रजी/मराठीत बोलण्यासाठी माइक दाबा!'}
              </div>
              
              {voiceMessages.map((msg) => (
                <div key={msg.id} className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Quick Suggestions Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem', background: 'rgba(7, 14, 27, 0.95)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--dark-text-muted)', fontWeight: 600 }}>
                {t.voiceSuggestLabel}
              </span>
              <div className="voice-suggestions" style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                <button className="voice-suggest-btn" style={{ padding: '0.35rem 0.65rem', fontSize: '0.7rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer' }} onClick={() => handleSuggestionClick(1)}>📜 {lang === 'en' ? 'Birth Cert' : 'जन्म दाखला'}</button>
                <button className="voice-suggest-btn" style={{ padding: '0.35rem 0.65rem', fontSize: '0.7rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer' }} onClick={() => handleSuggestionClick(2)}>📅 {lang === 'en' ? 'Gram Sabha' : 'ग्रामसभा बैठक'}</button>
                <button className="voice-suggest-btn" style={{ padding: '0.35rem 0.65rem', fontSize: '0.7rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer' }} onClick={() => handleSuggestionClick(3)}>🔍 {lang === 'en' ? 'Check status' : 'स्थिती तपासा'}</button>
              </div>
            </div>

            <div className="chatbot-input-container">
              <input 
                type="text" 
                className="chatbot-input" 
                placeholder={lang === 'en' ? 'Ask or type here...' : 'येथे विचारा किंवा टाईप करा...'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    const text = e.target.value.trim()
                    handleVoiceSend(text, text)
                    e.target.value = ''
                  }
                }}
              />
              <button 
                onClick={() => startListening()}
                style={{ background: 'var(--brand-green)', color: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '0.9rem' }}
                title={isListening ? 'Listening...' : 'Activate Voice Mic'}
              >
                🎙️
              </button>
            </div>
          </div>
        )}

        <button 
          className="chatbot-widget-btn"
          onClick={() => {
            setVoiceOpen(!voiceOpen)
          }}
          title={isListening ? t.voiceListenStart : t.voiceListenIdle}
          aria-label="Speak with AI Voice Assistant"
        >
          💬
        </button>
      </div>
      </>
      )}

      {/* Authentication Modal */}

      {citizenProfileModalOpen && (
        <div className="modal-backdrop" onClick={() => setCitizenProfileModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="modal-close-btn" onClick={() => setCitizenProfileModalOpen(false)}>&times;</button>
            {renderProfileTab()}
          </div>
        </div>
      )}

      {loginModalOpen && (
        <div className="modal-backdrop" onClick={() => setLoginModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setLoginModalOpen(false)}>&times;</button>
            
            <div className="modal-tab-headers">
              <button 
                className={`modal-tab-header ${loginTab === 'login' ? 'active' : ''}`}
                onClick={() => setLoginTab('login')}
              >
                {lang === 'en' ? 'Login' : 'लॉगिन'}
              </button>
              <button 
                className={`modal-tab-header ${loginTab === 'register' ? 'active' : ''}`}
                onClick={() => setLoginTab('register')}
              >
                {lang === 'en' ? 'Register' : 'नोंदणी करा'}
              </button>
            </div>

            {loginMsg && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textAlign: 'left' }}>
                ⚠️ {loginMsg}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label htmlFor="auth-username">{t.labelUsername}</label>
                <input 
                  type="text" 
                  id="auth-username"
                  className="form-input" 
                  placeholder={t.placeholderUsername}
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="auth-password">{t.labelPassword}</label>
                <input 
                  type="password" 
                  id="auth-password"
                  className="form-input" 
                  placeholder={t.placeholderPassword}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                {loginTab === 'login' ? t.btnSubmitLogin : t.btnSubmitRegister}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
                <hr style={{ flexGrow: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
                <span style={{ padding: '0 0.75rem', fontSize: '0.75rem', color: 'var(--dark-text-muted)', fontWeight: 600 }}>OR</span>
                <hr style={{ flexGrow: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => handleQuickDemoLogin('sarpanch')}
                  style={{ flex: '1 1 calc(50% - 0.25rem)', padding: '0.65rem', fontSize: '0.8rem', borderColor: 'var(--brand-green)', color: 'var(--brand-green)' }}
                >
                  ⚡ Sarpanch Demo
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => handleQuickDemoLogin('gramsevak')}
                  style={{ flex: '1 1 calc(50% - 0.25rem)', padding: '0.65rem', fontSize: '0.8rem', borderColor: 'var(--brand-teal)', color: 'var(--brand-teal)' }}
                >
                  ⚡ Gram Sevak Demo
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => handleQuickDemoLogin('ward1')}
                  style={{ flex: '1 1 100%', padding: '0.65rem', fontSize: '0.8rem', borderColor: '#eab308', color: '#eab308' }}
                >
                  ⚡ Ward 1 Member Demo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Application Modal */}
      {docModalOpen && selectedDoc && (
        <div className="modal-backdrop" onClick={() => setDocModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setDocModalOpen(false)}>&times;</button>
            
            {!docSuccess ? (
              <>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem', textAlign: 'left' }}>
                  📜 {t.docRequestModalTitle}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--dark-text-muted)', marginBottom: '1.5rem', textAlign: 'left' }}>
                  {lang === 'en' ? 'Applying for:' : 'अर्ज सुरू आहे:'}{' '}
                  <strong className="text-brand-gradient" style={{ fontSize: '0.95rem' }}>
                    {lang === 'en' ? selectedDoc.titleEn : selectedDoc.titleMr}
                  </strong>
                </p>

                <form onSubmit={handleDocRequestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label htmlFor="doc-applicant-name">{t.docRequestNameLabel}</label>
                    <input 
                      type="text" 
                      id="doc-applicant-name"
                      className="form-input" 
                      placeholder={t.placeholderCertName}
                      value={docApplicantName}
                      onChange={(e) => setDocApplicantName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="doc-purpose">{t.docRequestPurposeLabel}</label>
                    <input 
                      type="text" 
                      id="doc-purpose"
                      className="form-input" 
                      placeholder={lang === 'en' ? 'e.g., Scholarship application' : 'उदा. शिष्यवृत्ती अर्जासाठी'}
                      value={docPurpose}
                      onChange={(e) => setDocPurpose(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ color: 'var(--light-text-muted)' }}>{t.uploadIdLabel}</label>
                    
                    {!docIdFile ? (
                      <div className="image-upload-wrapper">
                        <label 
                          htmlFor="doc-id-upload"
                          className={`image-upload-area ${docIdFileError ? 'error' : ''}`}
                        >
                          <span className="upload-icon">📂</span>
                          <span className="upload-text" dangerouslySetInnerHTML={{ __html: t.uploadIdDesc }}></span>
                          <input 
                            type="file" 
                            id="doc-id-upload" 
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const file = e.target.files[0]
                              if (file) {
                                setDocIdFile({
                                  name: file.name,
                                  size: `${(file.size / 1024).toFixed(1)} KB`,
                                  preview: URL.createObjectURL(file)
                                })
                                setDocIdFileError(false)
                              }
                            }}
                          />
                        </label>
                        {docIdFileError && (
                          <div className="upload-error-msg">
                            ⚠️ {t.uploadCompulsoryError}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="upload-preview-container">
                        <img src={docIdFile.preview} alt="ID Preview" className="upload-preview-img" />
                        <div className="upload-preview-info">
                          <span className="upload-preview-name">{docIdFile.name}</span>
                          <span className="upload-preview-size">{docIdFile.size}</span>
                        </div>
                        <button 
                          type="button" 
                          className="upload-preview-remove"
                          onClick={() => setDocIdFile(null)}
                        >
                          {lang === 'en' ? 'Remove' : 'काढून टाका'}
                        </button>
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
                  >
                    🚀 {t.docRequestSubmitBtn}
                  </button>
                </form>
              </>
            ) : (
              <div className="success-checkmark-wrapper">
                <div className="success-icon">✓</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', color: '#fff' }}>
                  {t.docSuccessTitle}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--dark-text-muted)', lineHeight: '1.5' }}>
                  {t.docSuccessDesc}
                </p>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}
                  onClick={() => setDocModalOpen(false)}
                >
                  {lang === 'en' ? 'Done' : 'पूर्ण झाले'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="lightbox-backdrop" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setLightboxImg(null)} 
              style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', top: '1rem', right: '1rem' }}
            >
              &times;
            </button>
            <img src={lightboxImg} alt="Enlarged grievance photo attachment" className="lightbox-img" />
          </div>
        </div>
      )}
    </>
  )
}
