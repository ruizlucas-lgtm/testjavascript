import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
  Sparkles, Video, PenTool, Layout, Settings, CheckCircle, Zap, 
  TrendingUp, DollarSign, Users, Briefcase, Wifi, WifiOff, Copy, 
  ArrowRight, Upload, Film, Play, Trash2, Plus, Lightbulb, 
  ChevronLeft, ChevronRight, LogOut, Mail, Lock, User, ShieldCheck, 
  Smartphone, Fingerprint, X, Scissors, Music, Type, Download, 
  HelpCircle, Pause, SkipForward, Bell, Moon, Cloud, CreditCard, 
  FileText, Check, Mic, Volume2, MonitorPlay, Move, Image as ImageIcon,
  Palette, Smile, LayoutTemplate, Maximize, RotateCw, Target,
  Zap as ZapIcon, Star, Rocket, Save
} from 'lucide-react';

// --- Theme Context ---
const ThemeContext = React.createContext(false);

// --- Components ---
const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) => {
  const isDark = useContext(ThemeContext);
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md disabled:opacity-50",
    secondary: isDark ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost: isDark ? "text-gray-400 hover:bg-gray-800 text-gray-200" : "text-gray-600 hover:bg-gray-100",
    danger: isDark ? "bg-red-900/30 text-red-400 border-red-800" : "bg-red-50 text-red-600 border-red-200"
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => {
  const isDark = useContext(ThemeContext);
  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl border shadow-sm p-6 transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
};

const Badge = ({ type = 'neutral', children }) => {
  const isDark = useContext(ThemeContext);
  const styles = {
    neutral: isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700",
    success: isDark ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700",
    indigo: isDark ? "bg-indigo-900/50 text-indigo-300" : "bg-indigo-100 text-indigo-700",
    amber: isDark ? "bg-amber-900/50 text-amber-300" : "bg-amber-100 text-amber-700",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[type] || styles.neutral}`}>{children}</span>;
};

const Toggle = ({ enabled, onChange }) => (
  <button onClick={() => onChange(!enabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}>
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

// --- Data ---
const PRO_TIPS = [
  { title: "Timing is Everything", text: "Based on your niche, posting at", highlight: "6:00 PM EST", suffix: "tends to get 25% more engagement." },
  { title: "Engagement Hack", text: "Replying to comments within the", highlight: "first 60 minutes", suffix: "can double your video's reach." },
  { title: "Retention Strategy", text: "Videos with captions hold attention", highlight: "80% longer", suffix: "than those without." },
  { title: "Viral Formula", text: "The most crucial part is the", highlight: "first 3 seconds", suffix: "— make your hook count!" }
];

const MOCK_IDEAS_POOL = [
    { template: "The 'Only One Ingredient' Challenge", type: "Viral Challenge" },
    { template: "5 Myths About [NICHE] You Believe", type: "Educational" },
    { template: "Day in the Life: [NICHE] Edition", type: "Vlog" },
    { title: "I Tried [Popular Trend] So You Don't Have To", type: "Review" },
    { template: "Stop Doing This in [NICHE]", type: "Educational" },
    { template: "My Secret [NICHE] Hack", type: "Tips & Tricks" },
    { template: "The Ugly Truth About [NICHE]", type: "Opinion" }
];

const MOCK_DATA = {
  script: {
    hook: "Stop scrolling! You've been doing [Action] wrong your whole life.",
    body: "Step 1: Start with X. \nStep 2: Apply the 80/20 rule. \nStep 3: Watch results improve.",
    cta: "Hit follow for more [Niche] secrets!"
  }
};

const EDITOR_TUTORIAL_STEPS = [
  { title: "The Timeline", text: "Drag clips here to arrange them.", target: "timeline" },
  { title: "Quick Tools", text: "Use 'Split' to cut silence, and 'Text' for captions.", target: "toolbar" },
  { title: "Thumbnail Mode", text: "Switch tabs above to design your custom thumbnail.", target: "mode-switch" },
  { title: "Export & Post", text: "Hit Export to render in 4K.", target: "export" }
];

const THUMBNAIL_BACKGROUNDS = [
  'bg-black',
  'bg-gradient-to-br from-indigo-500 to-purple-600',
  'bg-gradient-to-br from-red-500 to-orange-500',
  'bg-gradient-to-br from-green-400 to-cyan-500',
  'bg-gray-800'
];

const INITIAL_VIDEOS = [];
const INITIAL_VOICE_CLIPS = [];

export default function CreatorSparkApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userName, setUserName] = useState('Alex Creator');
  const [userEmail, setUserEmail] = useState('user@example.com');
  const [savedUser, setSavedUser] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', '']);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiKey, setApiKey] = useState('');
  const [demoMode, setDemoMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userNiche, setUserNiche] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [script, setScript] = useState(null);
  const [userVideos, setUserVideos] = useState(INITIAL_VIDEOS);
  const [voiceClips, setVoiceClips] = useState(INITIAL_VOICE_CLIPS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelinePosition, setTimelinePosition] = useState(30);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [activeAudioTrack, setActiveAudioTrack] = useState(null);
  const [activeVideoTrack, setActiveVideoTrack] = useState(null);
  const [showAudioSelector, setShowAudioSelector] = useState(false);
  const [showVideoSelector, setShowVideoSelector] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [editorOverlays, setEditorOverlays] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isDraggingOverlay, setIsDraggingOverlay] = useState(null);
  const [editingOverlayId, setEditingOverlayId] = useState(null);
  const [selectedOverlayId, setSelectedOverlayId] = useState(null); 
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  // Editor Mode State
  const [editorMode, setEditorMode] = useState('video');
  const [thumbnailBgIndex, setThumbnailBgIndex] = useState(0);
  const [thumbnailOverlays, setThumbnailOverlays] = useState([
     { id: 1, type: 'text', content: 'NEW VIDEO!', x: 50, y: 50, scale: 1, rotation: -5 }
  ]);
  
  // Auth & Onboarding State
  const [dbUsers, setDbUsers] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(false); 

  const fileInputRef = useRef(null);
  const editorFileInputRef = useRef(null);
  const voiceInputRef = useRef(null);
  const thumbnailImageInputRef = useRef(null);
  const codeInputRefs = useRef([]);
  const previewContainerRef = useRef(null);
  const thumbnailContainerRef = useRef(null);

  // --- Effects ---
  useEffect(() => {
    const saved = localStorage.getItem('creatorSparkUser');
    if (saved) {
      const parsedUser = JSON.parse(saved);
      setSavedUser(parsedUser);
      setUserName(parsedUser.name);
      setUserEmail(parsedUser.email || 'user@example.com');
      const storedDB = localStorage.getItem('creatorSpark_DB');
      if (storedDB) {
          const users = JSON.parse(storedDB);
          const found = users.find(u => u.email === parsedUser.email);
          if (found && found.niche) setUserNiche(found.niche);
      }
    }
    loadDbUsers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTipIndex(prev => (prev + 1) % PRO_TIPS.length), 6000);
    return () => clearInterval(interval);
  }, [currentTipIndex]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => setTimelinePosition(prev => (prev >= 100 ? 0 : prev + 0.5)), 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    let interval;
    if (isExporting) {
        interval = setInterval(() => {
            setExportProgress(prev => {
                if (prev >= 100) {
                    setIsExporting(false);
                    clearInterval(interval);
                    alert("Export Successful!");
                    return 0;
                }
                return prev + 5;
            });
        }, 150);
    }
    return () => clearInterval(interval);
  }, [isExporting]);

  useEffect(() => {
    return () => {
        [...userVideos, ...voiceClips].forEach(item => {
            if (item.url && item.url.startsWith('blob:')) URL.revokeObjectURL(item.url);
        });
        thumbnailOverlays.forEach(item => {
            if (item.type === 'image' && item.content && item.content.startsWith('blob:')) {
                URL.revokeObjectURL(item.content);
            }
        });
    };
  }, []);
  
  const loadDbUsers = () => {
      const db = localStorage.getItem('creatorSpark_DB');
      if (db) {
          setDbUsers(JSON.parse(db));
      }
  };

  // --- Handlers ---
  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    
    const loginEmail = e?.target?.elements?.email?.value || (e?.email) || userEmail;
    const loginPassword = e?.target?.elements?.password?.value; 
    const storedDB = localStorage.getItem('creatorSpark_DB');
    
    let valid = true;

    if (storedDB) {
        const users = JSON.parse(storedDB);
        const foundUser = users.find(u => u.email === loginEmail);
        
        if (foundUser) {
             if (loginPassword && foundUser.password && loginPassword !== foundUser.password) {
                 valid = false;
                 alert("Incorrect password!");
                 setLoading(false);
                 return;
             }
             setUserName(foundUser.name);
             setUserEmail(foundUser.email);
             if (foundUser.niche) setUserNiche(foundUser.niche);
        } else {
             setUserEmail(loginEmail);
        }
    } else {
        setUserEmail(loginEmail);
    }

    if (valid) {
        setTimeout(() => { setLoading(false); setShowTwoFactor(true); }, 800);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setUserName("Guest Creator"); 
    setUserEmail("guest@creatorspark.app");
    setUserNiche(""); 
    setTimeout(() => { setLoading(false); setIsAuthenticated(true); setActiveTab('dashboard'); }, 800);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    // Updated: use elements to safely access form inputs
    const formName = e.target.elements.name?.value;
    const formEmail = e.target.elements.email?.value;
    const formPassword = e.target.elements.password?.value;

    if (formName) {
        setUserName(formName);
        setUserEmail(formEmail);
        
        const storedDB = localStorage.getItem('creatorSpark_DB');
        let users = storedDB ? JSON.parse(storedDB) : [];
        if (!users.find(u => u.email === formEmail)) {
            users.push({ name: formName, email: formEmail, password: formPassword, niche: "" });
            localStorage.setItem('creatorSpark_DB', JSON.stringify(users));
            setDbUsers(users);
        }
    }
    
    setTimeout(() => { 
        setLoading(false); 
        setIsAuthenticated(true); 
        setShowOnboarding(true); 
    }, 800);
  };

  const handleDemoSignup = () => {
    setLoading(true);
    setUserName("New Creator");
    setUserEmail("new.creator@example.com");
    setTimeout(() => { setLoading(false); setIsAuthenticated(true); setActiveTab('dashboard'); }, 800);
  };
  
  const handleOnboardingComplete = (selectedNiche) => {
      setUserNiche(selectedNiche);
      setShowOnboarding(false);
      setActiveTab('dashboard');
      
      const storedDB = localStorage.getItem('creatorSpark_DB');
      if (storedDB) {
          let users = JSON.parse(storedDB);
          const idx = users.findIndex(u => u.email === userEmail);
          if (idx !== -1) {
              users[idx].niche = selectedNiche;
              localStorage.setItem('creatorSpark_DB', JSON.stringify(users));
              setDbUsers(users); 
          }
      }
  };

  const handleTwoFactorVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowTwoFactor(false);
      setIsAuthenticated(true);
      setActiveTab('dashboard');
      if (rememberMe) {
        localStorage.setItem('creatorSparkUser', JSON.stringify({ name: userName, email: userEmail }));
        setSavedUser({ name: userName, email: userEmail });
      }
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowTwoFactor(false);
    setAuthMode('login');
    setTwoFactorCode(['', '', '', '', '', '']);
    setShowOnboarding(false);
    loadDbUsers(); 
  };

  const forgetUser = () => {
    localStorage.removeItem('creatorSparkUser');
    setSavedUser(null);
  };
  
  const deleteDbUser = (email, e) => {
      e.stopPropagation();
      const updatedUsers = dbUsers.filter(u => u.email !== email);
      localStorage.setItem('creatorSpark_DB', JSON.stringify(updatedUsers));
      setDbUsers(updatedUsers);
      
      if (savedUser && savedUser.email === email) {
          forgetUser();
      }
  };

  const saveProfile = () => {
    setUserName(editName);
    setUserEmail(editEmail);
    if (savedUser) {
        const updated = { ...savedUser, name: editName, email: editEmail };
        setSavedUser(updated);
        localStorage.setItem('creatorSparkUser', JSON.stringify(updated));
    }
    const storedDB = localStorage.getItem('creatorSpark_DB');
    if (storedDB) {
        let users = JSON.parse(storedDB);
        const idx = users.findIndex(u => u.email === userEmail); 
        if(idx !== -1) {
            users[idx] = { ...users[idx], name: editName, email: editEmail };
            localStorage.setItem('creatorSpark_DB', JSON.stringify(users));
            setDbUsers(users);
        }
    }
    setIsEditingProfile(false);
  };

  const generateContent = async (type) => {
    setLoading(true);
    if (type === 'ideas') { setGeneratedIdeas([]); setSelectedIdea(null); setScript(null); }
    
    if (demoMode) {
      setTimeout(() => {
        if (type === 'ideas') {
            const niche = userNiche || "General";
            const shuffled = [...MOCK_IDEAS_POOL].sort(() => 0.5 - Math.random());
            setGeneratedIdeas(shuffled.slice(0, 4).map(item => ({
                title: item.title || item.template.replace('[NICHE]', niche),
                type: item.type,
                viralScore: 85 + Math.floor(Math.random() * 10)
            })));
        } else if (type === 'script') {
            setScript(MOCK_DATA.script);
        }
        setLoading(false);
      }, 1500);
      return;
    }
    setLoading(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserVideos(prev => [{ id: Date.now(), title: file.name, date: "Just now", status: "Ready", size: "5 MB", url: URL.createObjectURL(file), type: file.type }, ...prev]);
    }
    e.target.value = '';
  };
  
  const handleEditorFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newVideo = { id: Date.now(), title: file.name, date: "Just now", status: "Ready", size: "5 MB", url: URL.createObjectURL(file), type: file.type };
      setUserVideos(prev => [newVideo, ...prev]);
      setActiveVideoTrack(newVideo);
      setShowVideoSelector(false);
    }
    e.target.value = '';
  };

  const handleVoiceUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVoiceClips(prev => [{ id: Date.now(), name: file.name, duration: '00:15', size: '1.2 MB', date: "Just now", url: URL.createObjectURL(file) }, ...prev]);
    }
    e.target.value = '';
  };

  const deleteVideo = (id) => {
      const videoToDelete = userVideos.find(v => v.id === id);
      if (videoToDelete && videoToDelete.url && videoToDelete.url.startsWith('blob:')) {
          URL.revokeObjectURL(videoToDelete.url);
      }
      setUserVideos(userVideos.filter(v => v.id !== id));
      if (activeVideoTrack?.id === id) setActiveVideoTrack(null);
  };

  const deleteVoiceClip = (id) => {
      const clipToDelete = voiceClips.find(c => c.id === id);
      if (clipToDelete && clipToDelete.url && clipToDelete.url.startsWith('blob:')) {
          URL.revokeObjectURL(clipToDelete.url);
      }
      setVoiceClips(voiceClips.filter(c => c.id !== id));
      if (activeAudioTrack?.id === id) setActiveAudioTrack(null);
  };

  // Editor Logic
  const handleAddTextOverlay = () => {
      if (textInput.trim() !== "") {
          const newOverlay = { id: Date.now(), type: 'text', position: timelinePosition, content: textInput, x: 50, y: 50, scale: 1, rotation: 0 };
          if (editorMode === 'video') {
             setEditorOverlays([...editorOverlays, newOverlay]);
          } else {
             setThumbnailOverlays([...thumbnailOverlays, newOverlay]);
          }
          setShowTextEditor(false);
      }
  };

  // --- Editor Audio Logic ---
  const handleAddToTimeline = (clip) => {
    setActiveAudioTrack(clip);
    setActiveTab('editor'); 
    setEditorMode('video');
  };
  
  const handleAddVideoToTimeline = (video) => {
      setActiveVideoTrack(video);
      setActiveTab('editor');
      setEditorMode('video');
  }

  // --- Editor Tool Logic ---
  const handleSplit = () => {
      setEditorOverlays([...editorOverlays, { id: Date.now(), type: 'split', position: timelinePosition }]);
  };
  
  const handleTextToolClick = () => {
      setShowTextEditor(true);
      setTextInput("");
  };
  
  const handleEffect = () => {
      setEditorOverlays([...editorOverlays, { id: Date.now(), type: 'effect', position: timelinePosition }]);
  };

  // --- Thumbnail Logic ---
  const handleThumbnailBgChange = () => {
     setThumbnailBgIndex((prev) => (prev + 1) % THUMBNAIL_BACKGROUNDS.length);
  };

  const handleAddThumbnailSticker = () => {
      const stickers = ['🔥', '⭐', '😱', '🚀', '💯'];
      const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
      setThumbnailOverlays([...thumbnailOverlays, { id: Date.now(), type: 'text', content: randomSticker, x: 50, y: 50, scale: 1, rotation: 0 }]);
  };

  const handleAddThumbnailImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newOverlay = { 
        id: Date.now(), 
        type: 'image', 
        content: URL.createObjectURL(file), 
        x: 50, 
        y: 50,
        scale: 1,
        rotation: 0
      };
      setThumbnailOverlays([...thumbnailOverlays, newOverlay]);
    }
    e.target.value = '';
  };

  const handleOverlayScaleChange = (e) => {
      const newScale = parseFloat(e.target.value);
      if (editorMode === 'thumbnail' && selectedOverlayId) {
          setThumbnailOverlays(prev => prev.map(o => o.id === selectedOverlayId ? { ...o, scale: newScale } : o));
      }
  };
  
  const handleOverlayRotationChange = (e) => {
      const newRotation = parseInt(e.target.value);
      if (editorMode === 'thumbnail' && selectedOverlayId) {
          setThumbnailOverlays(prev => prev.map(o => o.id === selectedOverlayId ? { ...o, rotation: newRotation } : o));
      }
  };
  
  const handleOverlayWheel = (e, id) => {
      e.stopPropagation();
      e.preventDefault();
      setThumbnailOverlays(prev => prev.map(o => {
          if (o.id === id) {
              if (e.shiftKey) {
                  const rotationDelta = e.deltaY > 0 ? 5 : -5;
                  return { ...o, rotation: (o.rotation || 0) + rotationDelta };
              } else {
                  const delta = e.deltaY * -0.001;
                  const newScale = Math.min(Math.max(0.2, (o.scale || 1) + delta), 5);
                  return { ...o, scale: newScale };
              }
          }
          return o;
      }));
  };

  // --- Overlay Interaction Logic (Shared) ---
  const handleOverlayMouseDown = (e, id) => {
      e.stopPropagation();
      setIsDraggingOverlay(id);
      setSelectedOverlayId(id);
  };

  const handlePreviewMouseMove = (e) => {
      const container = editorMode === 'video' ? previewContainerRef.current : thumbnailContainerRef.current;
      if (isDraggingOverlay && container) {
          const rect = container.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          if (editorMode === 'video') {
             setEditorOverlays(prev => prev.map(overlay => {
                 if (overlay.id === isDraggingOverlay) {
                     return { ...overlay, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
                 }
                 return overlay;
             }));
          } else {
             setThumbnailOverlays(prev => prev.map(overlay => {
                 if (overlay.id === isDraggingOverlay) {
                     return { ...overlay, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
                 }
                 return overlay;
             }));
          }
      }
  };

  const handlePreviewMouseUp = () => {
      setIsDraggingOverlay(null);
  };

  const handleOverlayDoubleClick = (e, id) => {
      e.stopPropagation();
      setEditingOverlayId(id);
  };

  const handleOverlayUpdate = (e, id) => {
      if (e.key === 'Enter') {
          setEditingOverlayId(null);
      }
  };
  
  const handleOverlayChange = (e, id) => {
      const updater = (prev) => prev.map(overlay => {
          if (overlay.id === id) {
              return { ...overlay, content: e.target.value };
          }
          return overlay;
      });
      if (editorMode === 'video') {
          setEditorOverlays(updater);
      } else {
          setThumbnailOverlays(updater);
      }
  };

  const deleteOverlay = (id, e) => {
      e.stopPropagation();
      if (editorMode === 'video') {
         setEditorOverlays(prev => prev.filter(o => o.id !== id));
      } else {
         const overlayToDelete = thumbnailOverlays.find(o => o.id === id);
         if (overlayToDelete && overlayToDelete.type === 'image') {
            URL.revokeObjectURL(overlayToDelete.content);
         }
         setThumbnailOverlays(prev => prev.filter(o => o.id !== id));
      }
      if (selectedOverlayId === id) setSelectedOverlayId(null);
  }
  
  const handleExport = () => {
      setIsExporting(true);
      setExportProgress(0);
  }

  // --- Render Helpers ---
  const renderOnboarding = () => (
      <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className={`max-w-2xl w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row`}>
              <div className="md:w-1/3 bg-indigo-600 p-8 flex flex-col justify-between text-white">
                  <div>
                      <Rocket className="w-12 h-12 mb-4" />
                      <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
                      <p className="opacity-80 text-sm">Let's personalize your CreatorSpark experience.</p>
                  </div>
                  <div className="flex gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  </div>
              </div>
              <div className="md:w-2/3 p-8">
                  <h3 className="text-xl font-bold mb-6">What is your primary content niche?</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                      {['Gaming', 'Lifestyle', 'Tech', 'Education', 'Fitness', 'Cooking'].map(niche => (
                          <button 
                            key={niche}
                            onClick={() => handleOnboardingComplete(niche)}
                            className={`p-4 border rounded-xl text-left hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all group ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                          >
                             <span className="font-semibold group-hover:text-indigo-600">{niche}</span>
                          </button>
                      ))}
                  </div>
                  <button onClick={() => handleOnboardingComplete("General")} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Skip for now</button>
              </div>
          </div>
      </div>
  );

  const renderTwoFactorScreen = () => (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300 ${darkMode ? 'bg-black/80' : 'bg-gray-900/50'} backdrop-blur-sm`}>
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transition-colors`}>
        <div className="p-6 text-center">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-pulse ${darkMode ? 'bg-indigo-900/50' : 'bg-indigo-100'}`}>
            <Smartphone className={`w-8 h-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          </div>
          <h3 className="text-xl font-bold mb-2">2-Step Verification</h3>
          <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>To keep your account safe, we've sent a code.</p>
          <div className="flex gap-2 justify-center mb-6">{twoFactorCode.map((digit, idx) => (<input key={idx} ref={el => codeInputRefs.current[idx] = el} type="text" maxLength={1} value={digit} onChange={(e) => handleCodeChange(idx, e.target.value)} onKeyDown={(e) => handleKeyDown(idx, e)} className={`w-10 h-12 text-center text-xl font-bold border-2 rounded-lg focus:border-indigo-600 focus:ring-0 outline-none transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}/>))}</div>
          <Button onClick={handleTwoFactorVerify} className="w-full mb-3" disabled={loading}>{loading ? 'Verifying...' : 'Verify'}</Button>
          <button onClick={() => setShowTwoFactor(false)} className={`text-sm hover:underline ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cancel</button>
        </div>
      </div>
    </div>
  );

  const renderAuthScreen = () => (
    <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-lg mx-auto mb-4">C</div>
        <h2 className={`text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>CreatorSpark</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {savedUser ? (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-8 px-4 shadow sm:rounded-lg text-center`}>
             <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600 mx-auto mb-4">{savedUser.name.substring(0,2)}</div>
             <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{savedUser.name}</h3>
             <Button onClick={handleLogin} className="w-full mt-6"><Fingerprint className="w-5 h-5"/> Quick Login</Button>
             <button onClick={forgetUser} className="mt-4 text-sm text-gray-500">Switch Account</button>
          </div>
        ) : (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-8 px-4 shadow sm:rounded-lg`}>
            <form className="space-y-6" onSubmit={authMode === 'login' ? handleLogin : handleSignup}>
               {authMode === 'signup' && (
                 <div><label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label><input name="name" required className="w-full p-2 border rounded mt-1" placeholder="Creator Name"/></div>
               )}
               <div><label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label><input name="email" type="email" required className="w-full p-2 border rounded mt-1" placeholder="you@example.com"/></div>
               {authMode === 'login' && (
                 <div><label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label><input name="password" type="password" required className="w-full p-2 border rounded mt-1" placeholder="••••••"/></div>
               )}
               <div className="flex items-center"><input id="rem" type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="h-4 w-4 text-indigo-600"/><label htmlFor="rem" className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Remember me</label></div>
               <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}</Button>
            </form>
            
            {/* SAVED ACCOUNTS DB SECTION */}
            {dbUsers.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Saved Accounts</h4>
                    <div className="space-y-2">
                        {dbUsers.map((user, idx) => (
                            <div key={idx} onClick={(e) => handleLogin({ preventDefault: () => {}, target: { email: { value: user.email }, password: { value: user.password } } })} className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">{user.name.substring(0,2)}</div>
                                    <div>
                                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <button onClick={(e) => deleteDbUser(user.email, e)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4"/></button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-6"><Button variant="secondary" className="w-full" onClick={authMode === 'login' ? handleDemoLogin : handleDemoSignup}><Zap className="w-4 h-4 text-amber-500"/> {authMode === 'login' ? 'Try as Guest (No Account)' : 'Instant Test Account'}</Button></div>
            <div className="mt-6 text-center"><button onClick={() => setAuthMode(prev => prev === 'login' ? 'signup' : 'login')} className="text-sm text-indigo-600">{authMode === 'login' ? "Need account? Sign up" : "Have account? Log in"}</button></div>
          </div>
        )}
      </div>
    </div>
  );

  // --- Main Layout ---
  return (
    <ThemeContext.Provider value={darkMode}>
      {showTwoFactor && renderTwoFactorScreen()}
      {showOnboarding && renderOnboarding()}
      {!isAuthenticated ? renderAuthScreen() : (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
          {/* Sidebar */}
          <div className={`fixed top-0 left-0 h-full w-20 md:w-64 border-r z-40 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="p-6 flex items-center gap-3">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
               <span className={`font-bold text-xl hidden md:block ${darkMode ? 'text-white' : 'text-gray-900'}`}>CreatorSpark</span>
            </div>
            <nav className="mt-6 px-3 space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Layout },
                { id: 'generator', label: 'AI Generator', icon: Sparkles },
                { id: 'editor', label: 'Editor', icon: Scissors },
                { id: 'voice', label: 'Voice Clips', icon: Mic },
                { id: 'library', label: 'Library', icon: Film },
                { id: 'pricing', label: 'Plans', icon: CreditCard },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map(item => (
                <button 
                  key={item.id} 
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === item.id ? 'bg-indigo-600/10 text-indigo-500' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <item.icon className="w-5 h-5"/>
                  <span className="hidden md:block">{item.label}</span>
                </button>
              ))}
            </nav>
            <div className={`absolute bottom-0 w-full p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
               <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                     <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">{userName.substring(0,2)}</div>
                     <div className="hidden md:block overflow-hidden"><p className="text-sm font-medium truncate">{userName}</p><p className="text-xs opacity-60">Free Plan</p></div>
                  </div>
                  <button onClick={handleLogout}><LogOut className="w-4 h-4 opacity-50 hover:opacity-100"/></button>
               </div>
            </div>
          </div>

          {/* Main Area */}
          <div className="ml-20 md:ml-64 p-8 transition-all duration-300">
             <header className="flex justify-between items-center mb-8">
                <div>
                   <h1 className="text-2xl font-bold capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</h1>
                   <p className="text-sm opacity-60">Manage your creative workflow.</p>
                </div>
                <div className="flex gap-3">
                   {userName === "Guest Creator" ? (
                     <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">GUEST PREVIEW</span>
                   ) : demoMode ? (
                     <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">OFFLINE MODE</span>
                   ) : null}
                   <Button onClick={() => setActiveTab('generator')}><Sparkles className="w-4 h-4"/> New Post</Button>
                </div>
             </header>

             {/* DASHBOARD */}
             {activeTab === 'dashboard' && (
                <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card><Zap className="w-6 h-6 text-indigo-500 mb-2"/><h3 className="font-bold">Quick Start</h3><p className="text-sm opacity-70 mb-4">Launch a new project.</p><Button className="w-full" onClick={() => setActiveTab('generator')}>Create Now</Button></Card>
                      <Card><h3 className="text-sm font-bold uppercase opacity-60 mb-2">Weekly Goal</h3><div className="text-3xl font-bold mb-2">3/5</div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{width:'60%'}}></div></div></Card>
                      <Card><h3 className="text-sm font-bold uppercase opacity-60 mb-2">Niche</h3><div className="flex items-center gap-2 mb-4"><TrendingUp className="w-5 h-5 text-amber-500"/><span className="font-medium">{userNiche || "Not Set"}</span></div><button onClick={()=>setActiveTab('settings')} className="text-sm text-indigo-500">Change &rarr;</button></Card>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="h-full">
                         <h2 className="font-bold text-lg mb-4">Recent Concepts</h2>
                         {generatedIdeas.length > 0 ? (
                            <div className="space-y-2">{generatedIdeas.slice(0,3).map((idea, i) => <div key={i} className="p-3 border rounded-lg flex justify-between items-center"><span className="font-medium">{idea.title}</span><Badge>{idea.viralScore}%</Badge></div>)}</div>
                         ) : <div className="text-center py-8 opacity-50"><Sparkles className="w-8 h-8 mx-auto"/> No ideas yet</div>}
                      </Card>
                      <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl p-6 text-white relative overflow-hidden">
                         <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4"><Lightbulb className="w-4 h-4 text-indigo-300"/><Badge type="indigo">Daily Insight</Badge></div>
                            <h3 className="font-bold text-xl mb-2">{PRO_TIPS[currentTipIndex].title}</h3>
                            <p className="text-sm opacity-80">{PRO_TIPS[currentTipIndex].text} <span className="font-bold text-white">{PRO_TIPS[currentTipIndex].highlight}</span> {PRO_TIPS[currentTipIndex].suffix}</p>
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {/* GENERATOR */}
             {activeTab === 'generator' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
                   <div className="flex flex-col gap-6 overflow-y-auto pr-2">
                      <Card>
                         <h2 className="font-bold text-lg mb-4 flex gap-2"><Sparkles className="w-5 h-5 text-indigo-500"/> Generate Concepts</h2>
                         <div className="space-y-4">
                            <div><label className="block text-sm font-medium mb-1">Your Niche</label><input type="text" value={userNiche} onChange={e => setUserNiche(e.target.value)} className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`} placeholder="e.g. Fitness"/></div>
                            <Button className="w-full" onClick={() => generateContent('ideas')} disabled={loading}>{loading ? 'Thinking...' : 'Generate Ideas'}</Button>
                         </div>
                      </Card>
                      {generatedIdeas.length > 0 && (
                         <div className="space-y-3">
                            <h3 className="text-sm font-bold opacity-60 uppercase">Select an Idea</h3>
                            {generatedIdeas.map((idea, i) => (
                               <div key={i} onClick={() => { setSelectedIdea(idea); setScript(null); }} className={`p-4 rounded-xl border cursor-pointer hover:border-indigo-400 transition-all ${selectedIdea === idea ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}>
                                  <div className="flex justify-between"><h4 className="font-semibold">{idea.title}</h4></div>
                                  <p className="text-sm opacity-60 flex gap-2 mt-1"><Video className="w-3 h-3"/> {idea.type}</p>
                               </div>
                            ))}
                         </div>
                      )}
                   </div>
                   <div className="flex flex-col h-full overflow-hidden">
                      <Card className="h-full flex flex-col relative overflow-hidden">
                         <div className="relative z-10 flex-1 flex flex-col">
                            <h2 className="font-bold text-lg mb-4 flex gap-2"><PenTool className="w-5 h-5 text-indigo-500"/> AI Script Writer</h2>
                            {!selectedIdea ? (
                               <div className="flex-1 flex flex-col items-center justify-center opacity-40"><Layout className="w-12 h-12 mb-4"/><p>Select an idea to start.</p></div>
                            ) : !script ? (
                               <div className="flex-1 flex flex-col items-center justify-center text-center"><h3 className="font-bold text-xl mb-2">Ready?</h3><p className="mb-6">Write a script for: <br/><span className="text-indigo-500">"{selectedIdea.title}"</span></p><Button onClick={() => generateContent('script')} disabled={loading}>Generate Script</Button></div>
                            ) : (
                               <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-indigo-900/20 border-indigo-800' : 'bg-indigo-50 border-indigo-100'}`}><h4 className="text-xs font-bold text-indigo-500 uppercase mb-2">Hook</h4><p className="font-medium text-lg">{script.hook}</p></div>
                                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}><h4 className="text-xs font-bold opacity-50 uppercase mb-2">Body</h4><p className="whitespace-pre-wrap">{script.body}</p></div>
                                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-100'}`}><h4 className="text-xs font-bold text-green-500 uppercase mb-2">CTA</h4><p className="font-medium text-green-600">{script.cta}</p></div>
                               </div>
                            )}
                         </div>
                      </Card>
                   </div>
                </div>
             )}

             {/* EDITOR */}
             {activeTab === 'editor' && (
                <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
                   <div className="flex items-center justify-center gap-4 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mb-2">
                       <button onClick={() => setEditorMode('video')} className={`px-4 py-2 rounded-md text-sm font-bold ${editorMode === 'video' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600' : 'text-gray-500'}`}>Video Timeline</button>
                       <button onClick={() => setEditorMode('thumbnail')} className={`px-4 py-2 rounded-md text-sm font-bold ${editorMode === 'thumbnail' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600' : 'text-gray-500'}`}>Thumbnail Design</button>
                   </div>
                
                   <div className="flex-1 grid grid-cols-3 gap-6">
                      <div ref={editorMode === 'video' ? previewContainerRef : thumbnailContainerRef} 
                           className="col-span-2 bg-black rounded-xl relative flex items-center justify-center overflow-hidden group"
                           onMouseMove={handlePreviewMouseMove} onMouseUp={handlePreviewMouseUp} onMouseLeave={handlePreviewMouseUp}
                           onWheel={(e) => {
                              if (selectedOverlayId && editorMode === 'thumbnail') {
                                handleOverlayWheel(e, selectedOverlayId);
                              }
                           }}
                      >
                         {editorMode === 'video' ? (
                             <div className="w-full h-full relative flex items-center justify-center">
                                {activeVideoTrack ? (
                                   <>
                                     <div className={`text-center transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-60'}`}><Film className="w-16 h-16 text-indigo-500 mx-auto mb-4"/><h2 className="text-white font-bold text-xl">{activeVideoTrack.title}</h2></div>
                                     {editorOverlays.map(overlay => (
                                       <div key={overlay.id} className="absolute cursor-move select-none z-20" style={{ left: `${overlay.x}%`, top: `${overlay.y}%`, transform: 'translate(-50%, -50%)' }} onMouseDown={(e) => handleOverlayMouseDown(e, overlay.id)}>
                                          {overlay.type === 'text' && (
                                            editingOverlayId === overlay.id ? (
                                              <input autoFocus value={overlay.content} onChange={e => handleOverlayChange(e, overlay.id)} onBlur={() => setEditingOverlayId(null)} className="bg-black/50 text-white px-4 py-2 rounded text-2xl font-bold border-2 border-indigo-500 outline-none text-center" />
                                            ) : (
                                              <div onDoubleClick={() => setEditingOverlayId(overlay.id)} className="bg-black/50 text-white px-4 py-2 rounded text-2xl font-bold border-2 border-transparent hover:border-indigo-500/50 relative group">
                                                {overlay.content}
                                                <button onClick={(e) => deleteOverlay(overlay.id, e)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100"><X className="w-3 h-3"/></button>
                                              </div>
                                            )
                                          )}
                                          {overlay.type === 'effect' && <div className="fixed inset-0 bg-indigo-500/20 pointer-events-none w-full h-full mix-blend-overlay"></div>}
                                       </div>
                                     ))}
                                   </>
                                ) : (
                                   <div className="text-center"><MonitorPlay className="w-16 h-16 text-gray-700 mx-auto mb-4"/><p className="text-gray-500 mb-4">No clip selected</p><Button onClick={() => setShowVideoSelector(true)} variant="secondary"><Plus className="w-4 h-4"/> Add Clip</Button></div>
                                )}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2"><button onClick={() => setIsPlaying(!isPlaying)} className="p-3 bg-indigo-600 rounded-full text-white">{isPlaying ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5 ml-0.5"/>}</button></div>
                             </div>
                         ) : (
                             // Thumbnail Canvas
                             <div className={`w-full h-full relative flex items-center justify-center overflow-hidden ${THUMBNAIL_BACKGROUNDS[thumbnailBgIndex]}`}>
                                {thumbnailOverlays.map(overlay => (
                                   <div 
                                      key={overlay.id} 
                                      className={`absolute cursor-move select-none z-20 ${selectedOverlayId === overlay.id ? 'ring-2 ring-indigo-400 rounded' : ''}`}
                                      style={{ 
                                          left: `${overlay.x}%`, 
                                          top: `${overlay.y}%`, 
                                          transform: `translate(-50%, -50%) scale(${overlay.scale || 1}) rotate(${overlay.rotation || 0}deg)`
                                      }} 
                                      onMouseDown={(e) => handleOverlayMouseDown(e, overlay.id)}
                                      onWheel={(e) => handleOverlayWheel(e, overlay.id)}
                                   >
                                      {overlay.type === 'text' && (
                                         editingOverlayId === overlay.id ? (
                                           <input autoFocus value={overlay.content} onChange={e => handleOverlayChange(e, overlay.id)} onBlur={() => setEditingOverlayId(null)} className="bg-black/50 text-white px-6 py-4 rounded-xl text-5xl font-black border-4 border-yellow-400 outline-none text-center shadow-xl" />
                                         ) : (
                                           <div onDoubleClick={() => setEditingOverlayId(overlay.id)} className="bg-black/50 text-white px-6 py-4 rounded-xl text-5xl font-black border-4 border-transparent hover:border-yellow-400 cursor-text shadow-xl relative group uppercase">
                                             {overlay.content}
                                             <button onClick={(e) => deleteOverlay(overlay.id, e)} className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"><X className="w-4 h-4"/></button>
                                           </div>
                                         )
                                      )}
                                      {overlay.type === 'image' && (
                                          <div className="relative group">
                                              <img src={overlay.content} alt="Overlay" className="max-w-[250px] rounded-lg shadow-lg border-2 border-transparent hover:border-indigo-500" draggable={false} />
                                              <button onClick={(e) => deleteOverlay(overlay.id, e)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"><X className="w-4 h-4"/></button>
                                          </div>
                                      )}
                                   </div>
                                ))}
                                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">1280x720</div>
                             </div>
                         )}
                      </div>
                      
                      <div className="col-span-1 flex flex-col gap-4">
                         <Card className="flex-1 overflow-y-auto">
                            <div className="flex justify-between items-center mb-4"><h3 className="font-bold">Toolbox</h3><button onClick={() => { setTutorialStep(0); setShowTutorial(true); }} className="text-xs text-indigo-500 flex gap-1"><HelpCircle className="w-3 h-3"/> Help</button></div>
                            
                            {editorMode === 'video' ? (
                                showVideoSelector ? (
                                   <div className="animate-in slide-in-from-right"><div className="flex items-center gap-2 mb-4"><button onClick={() => setShowVideoSelector(false)}><ChevronLeft className="w-5 h-5"/></button><span className="font-bold">Select Video</span></div>
                                   <div className="space-y-2">{userVideos.map(v => <button key={v.id} onClick={() => { setActiveVideoTrack(v); setShowVideoSelector(false); }} className="w-full p-2 border rounded text-left flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"><Film className="w-4 h-4"/> <span className="truncate flex-1">{v.title}</span></button>)}
                                   <button onClick={() => { setShowVideoSelector(false); setActiveTab('library'); }} className="text-xs text-indigo-500 w-full mt-2 flex items-center justify-center gap-1"><Plus className="w-3 h-3"/> Go to Library</button>
                                   <div className="mt-2 pt-2 border-t text-center"><input type="file" ref={editorFileInputRef} className="hidden" accept="video/*" onChange={handleEditorFileUpload}/><button onClick={() => editorFileInputRef.current.click()} className="text-xs text-green-600 font-medium hover:underline flex items-center justify-center gap-1 w-full"><Upload className="w-3 h-3"/> Upload from Device</button></div></div></div>
                                ) : showAudioSelector ? (
                                   <div className="animate-in slide-in-from-right"><div className="flex items-center gap-2 mb-4"><button onClick={() => setShowAudioSelector(false)}><ChevronLeft className="w-5 h-5"/></button><span className="font-bold">Select Audio</span></div>
                                   <div className="space-y-2">{voiceClips.map(c => <button key={c.id} onClick={() => { setActiveAudioTrack(c); setShowAudioSelector(false); }} className="w-full p-2 border rounded text-left flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"><Volume2 className="w-4 h-4"/> <span className="truncate flex-1">{c.name}</span></button>)}</div></div>
                                ) : showTextEditor ? (
                                   <div className="animate-in slide-in-from-right"><div className="flex items-center gap-2 mb-4"><button onClick={() => setShowTextEditor(false)}><ChevronLeft className="w-5 h-5"/></button><span className="font-bold">Add Text</span></div>
                                   <textarea value={textInput} onChange={e => setTextInput(e.target.value)} className={`w-full p-2 border rounded h-24 text-sm mb-4 ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`} placeholder="Enter text..."></textarea><Button className="w-full" onClick={handleAddTextOverlay}>Add to Video</Button></div>
                                ) : (
                                   <>
                                   <Button onClick={() => setShowVideoSelector(true)} variant="secondary" className="w-full justify-start mb-4"><Plus className="w-4 h-4"/> Add Video</Button>
                                   <div className="grid grid-cols-2 gap-3">
                                      <button onClick={handleSplit} className="p-4 border rounded hover:bg-indigo-50 dark:hover:bg-gray-700 flex flex-col items-center gap-2"><Scissors className="w-5 h-5 text-indigo-500"/><span className="text-xs">Split</span></button>
                                      <button onClick={handleTextToolClick} className="p-4 border rounded hover:bg-indigo-50 dark:hover:bg-gray-700 flex flex-col items-center gap-2"><Type className="w-5 h-5 text-indigo-500"/><span className="text-xs">Text</span></button>
                                      <button onClick={() => setShowAudioSelector(true)} className="p-4 border rounded hover:bg-indigo-50 dark:hover:bg-gray-700 flex flex-col items-center gap-2"><Music className="w-5 h-5 text-indigo-500"/><span className="text-xs">Audio</span></button>
                                      <button onClick={handleEffect} className="p-4 border rounded hover:bg-indigo-50 dark:hover:bg-gray-700 flex flex-col items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-500"/><span className="text-xs">Effects</span></button>
                                   </div>
                                   </>
                                )
                            ) : (
                                // Thumbnail Tools
                                <div className="space-y-4">
                                   <div className="grid grid-cols-2 gap-3">
                                      <button onClick={handleThumbnailBgChange} className="p-4 border rounded hover:bg-indigo-50 dark:hover:bg-gray-700 flex flex-col items-center gap-2"><Palette className="w-5 h-5 text-purple-500"/><span className="text-xs">Background</span></button>
                                      <button onClick={() => { setShowTextEditor(true); setTextInput(""); }} className="p-4 border rounded hover:bg-indigo-50 dark:hover:bg-gray-700 flex flex-col items-center gap-2"><Type className="w-5 h-5 text-purple-500"/><span className="text-xs">Title</span></button>
                                      <button onClick={handleAddThumbnailSticker} className="p-4 border rounded hover:bg-indigo-50 dark:hover:bg-gray-700 flex flex-col items-center gap-2"><Smile className="w-5 h-5 text-purple-500"/><span className="text-xs">Sticker</span></button>
                                      <input type="file" ref={thumbnailImageInputRef} className="hidden" accept="image/*" onChange={handleAddThumbnailImage} />
                                      <button onClick={() => thumbnailImageInputRef.current.click()} className="p-4 border rounded hover:bg-indigo-50 dark:hover:bg-gray-700 flex flex-col items-center gap-2"><ImageIcon className="w-5 h-5 text-purple-500"/><span className="text-xs">Image</span></button>
                                   </div>
                                   {selectedOverlayId && (
                                       <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-bottom-2">
                                          <div className="space-y-1">
                                              <div className="flex justify-between text-xs opacity-60"><span>Size</span><span>{(thumbnailOverlays.find(o=>o.id===selectedOverlayId)?.scale || 1).toFixed(1)}x</span></div>
                                              <input type="range" min="0.2" max="3" step="0.1" value={thumbnailOverlays.find(o=>o.id===selectedOverlayId)?.scale || 1} onChange={handleOverlayScaleChange} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                                          </div>
                                          <div className="space-y-1">
                                              <div className="flex justify-between text-xs opacity-60"><span>Rotation</span><span>{Math.round(thumbnailOverlays.find(o=>o.id===selectedOverlayId)?.rotation || 0)}°</span></div>
                                              <input type="range" min="-180" max="180" step="5" value={thumbnailOverlays.find(o=>o.id===selectedOverlayId)?.rotation || 0} onChange={handleOverlayRotationChange} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                                          </div>
                                          <div className="text-xs text-center text-gray-400 italic">Tip: Shift + Scroll to rotate</div>
                                       </div>
                                   )}
                                   {showTextEditor && (
                                       <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border">
                                           <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold">Add Title</span><button onClick={() => setShowTextEditor(false)}><X className="w-3 h-3"/></button></div>
                                           <input value={textInput} onChange={e => setTextInput(e.target.value)} className="w-full p-1 border rounded text-sm mb-2" placeholder="Viral Text..."/>
                                           <Button onClick={handleAddTextOverlay} className="w-full h-8 text-xs">Add Text</Button>
                                       </div>
                                   )}
                                </div>
                            )}

                            <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                               <Button className="w-full" onClick={() => { setIsExporting(true); setExportProgress(0); }} disabled={isExporting}><Download className="w-4 h-4"/> {isExporting ? 'Exporting...' : (editorMode === 'video' ? 'Export Video' : 'Save Thumbnail')}</Button>
                            </div>
                         </Card>
                      </div>
                   </div>
                   
                   {/* Timeline */}
                   {editorMode === 'video' && (
                     <div onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setTimelinePosition(Math.min(100, Math.max(0, ((e.clientX - rect.left)/rect.width)*100))); }} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} h-48 rounded-xl border flex flex-col relative overflow-hidden`}>
                        <div className="h-8 border-b flex items-end px-4 text-xs font-mono opacity-50"><span className="flex-1 border-l pl-1">00:00</span><span className="flex-1 border-l pl-1">00:15</span><span className="flex-1 border-l pl-1">00:30</span><span className="flex-1 border-l pl-1">00:45</span></div>
                        <div className="flex-1 p-4 relative">
                           <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-30 pointer-events-none" style={{left: `${timelinePosition}%`}}><div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 rotate-45"></div></div>
                           <div className={`h-12 rounded-lg mb-2 border relative overflow-hidden group ${darkMode ? 'bg-indigo-900/30 border-indigo-800' : 'bg-indigo-100 border-indigo-200'}`}>
                               {activeVideoTrack ? <div className="flex items-center h-full px-3"><span className="text-xs font-bold text-indigo-500 truncate">{activeVideoTrack.title}</span><button onClick={(e) => {e.stopPropagation(); setActiveVideoTrack(null)}} className="ml-auto opacity-0 group-hover:opacity-100"><X className="w-3 h-3"/></button></div> : <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs italic opacity-50">No Video</span>}
                               {editorOverlays.map(o => o.type === 'split' && <div key={o.id} className="absolute top-0 bottom-0 w-0.5 bg-white border-l border-black z-20" style={{left:`${o.position}%`}}></div>)}
                           </div>
                           <div className={`h-8 rounded-lg border relative group ${darkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'}`}>
                               {activeAudioTrack ? <div className="flex items-center h-full px-3"><span className="text-xs font-bold text-green-600 truncate">{activeAudioTrack.name}</span><button onClick={(e) => {e.stopPropagation(); setActiveAudioTrack(null)}} className="ml-auto opacity-0 group-hover:opacity-100"><X className="w-3 h-3"/></button></div> : <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs italic opacity-50">No Audio</span>}
                           </div>
                        </div>
                     </div>
                   )}
                </div>
             )}

             {activeTab === 'voice' && (
               <div className="h-full flex flex-col gap-6">
                 <Card className="flex flex-col md:flex-row items-center justify-between gap-6">
                   <div><h2 className="text-2xl font-bold">Voice Clips</h2><p className="opacity-60">Manage recordings.</p></div>
                   <div className="flex gap-3 w-full md:w-auto"><input type="file" ref={voiceInputRef} className="hidden" accept="audio/*" onChange={handleVoiceUpload}/><Button onClick={() => voiceInputRef.current.click()} variant="secondary">Upload</Button><Button onClick={() => alert("Mic simulated.")}><Mic className="w-4 h-4"/> Record</Button></div>
                 </Card>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {voiceClips.map(clip => (
                     <Card key={clip.id} className="flex items-center justify-between p-4"><div className="flex items-center gap-4"><div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"><Volume2 className="w-5 h-5"/></div><div className="min-w-0"><h4 className="font-semibold truncate">{clip.name}</h4><span className="text-xs opacity-60">{clip.duration}</span></div></div><div className="flex gap-2"><button onClick={() => { setActiveAudioTrack(clip); setActiveTab('editor'); }} className="text-xs border px-2 py-1 rounded hover:bg-gray-100">Use</button><button onClick={() => deleteVoiceClip(clip.id)} className="text-red-500"><Trash2 className="w-4 h-4"/></button></div></Card>
                   ))}
                   <div onClick={() => voiceInputRef.current.click()} className="border-2 border-dashed rounded-xl flex items-center justify-center h-32 cursor-pointer opacity-50 hover:opacity-100"><Plus className="w-6 h-6"/></div>
                 </div>
               </div>
             )}

             {activeTab === 'library' && (
               <div className="h-full flex flex-col gap-6">
                 <div className="flex justify-between items-center"><h2 className="text-2xl font-bold">Library</h2><div className="flex gap-2"><input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload}/><Button onClick={() => fileInputRef.current.click()}>Upload</Button></div></div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center h-64 cursor-pointer opacity-50 hover:opacity-100"><Plus className="w-8 h-8"/><span>Add Video</span></div>
                   {userVideos.map(v => (
                     <Card key={v.id} className="flex flex-col h-64 p-0 overflow-hidden relative group border-0">
                       <div className="bg-black h-40 w-full flex items-center justify-center"><Film className="text-gray-600 w-12 h-12"/></div>
                       <div className="p-4 flex-1 flex flex-col justify-between"><div><h3 className="font-semibold truncate">{v.title}</h3><span className="text-xs opacity-60">{v.size}</span></div><div className="flex justify-between mt-2"><button onClick={() => { setActiveVideoTrack(v); setActiveTab('editor'); }} className="text-xs border px-2 py-1 rounded">Edit</button><button onClick={() => deleteVideo(v.id)} className="text-red-500"><Trash2 className="w-4 h-4"/></button></div></div>
                     </Card>
                   ))}
                 </div>
               </div>
             )}
             
             {activeTab === 'pricing' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
                   <div className="text-center mb-10"><h2 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upgrade your flow</h2><p className="opacity-60">Plans for every stage.</p></div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <Card className="flex flex-col h-full"><div className="mb-6"><h3 className="font-bold text-xl">Freemium</h3><div className="mt-4 text-4xl font-extrabold">$0</div><p className="text-sm opacity-60 mt-2">Try the basics.</p></div><ul className="space-y-4 mb-8 flex-1 opacity-80"><li className="flex gap-3"><Check className="w-5 h-5 text-green-500"/> 5 AI scripts/mo</li><li className="flex gap-3"><Check className="w-5 h-5 text-green-500"/> 720p Export</li><li className="flex gap-3"><Check className="w-5 h-5 text-green-500"/> No Watermark</li></ul><Button variant="outline" disabled>Current Plan</Button></Card>
                      <Card className="flex flex-col border-indigo-500 shadow-xl scale-105 z-10"><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"><span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Popular</span></div><div className="mb-6"><h3 className="font-bold text-xl text-indigo-500">Creator Pro</h3><div className="mt-4 text-4xl font-extrabold">$9.99</div></div><ul className="space-y-4 mb-8 flex-1"><li className="flex gap-3"><Check className="w-5 h-5 text-indigo-500"/> Unlimited AI</li><li className="flex gap-3"><Check className="w-5 h-5 text-indigo-500"/> 4K Export</li><li className="flex gap-3"><Check className="w-5 h-5 text-indigo-500"/> Priority Support</li></ul><Button>Upgrade</Button></Card>
                      <Card className="flex flex-col h-full"><div className="mb-6"><h3 className="font-bold text-xl">Agency</h3><div className="mt-4 text-4xl font-extrabold">$49.99</div><p className="text-sm opacity-60 mt-2">Maximum power for teams.</p></div><ul className="space-y-4 mb-8 flex-1 opacity-80"><li className="flex gap-3"><Check className="w-5 h-5 text-green-500"/> All Pro Features</li><li className="flex gap-3"><Check className="w-5 h-5 text-green-500"/> Unlimited Team Seats</li><li className="flex gap-3"><Check className="w-5 h-5 text-green-500"/> API Access</li><li className="flex gap-3"><Check className="w-5 h-5 text-green-500"/> Custom Branding</li><li className="flex gap-3"><Check className="w-5 h-5 text-green-500"/> Advanced Analytics</li><li className="flex gap-3"><Check className="w-5 h-5 text-green-500"/> 24/7 Dedicated Support</li></ul><Button variant="outline">Contact Sales</Button></Card>
                   </div>
                </div>
             )}

             {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto space-y-6">
                   <Card>
                      <div className="flex justify-between items-start">
                         <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-700">{userName.substring(0,2)}</div>
                            <div className="w-full">
                               {isEditingProfile ? (
                                  <div className="space-y-2 w-full"><input value={editName} onChange={e => setEditName(e.target.value)} className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`} placeholder="Name"/><input value={editEmail} onChange={e => setEditEmail(e.target.value)} className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`} placeholder="Email"/><div className="flex gap-2"><Button onClick={saveProfile} className="h-8 text-xs py-0"><Save className="w-3 h-3"/> Save</Button><Button onClick={()=>setIsEditingProfile(false)} variant="secondary" className="h-8 text-xs py-0">Cancel</Button></div></div>
                               ) : (
                                  <div><h3 className="font-bold text-lg">{userName}</h3><p className="text-sm opacity-60">{userEmail}</p><div className="mt-2 flex gap-2"><Badge type="indigo">Free</Badge></div></div>
                               )}
                            </div>
                         </div>
                         {!isEditingProfile && userName !== "Guest Creator" && <Button onClick={() => { setEditName(userName); setEditEmail(userEmail); setIsEditingProfile(true); }} variant="outline" className="text-xs h-8">Edit</Button>}
                      </div>
                   </Card>
                   <Card><h3 className="font-bold mb-4">App Config</h3><div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}><Moon className="w-4 h-4"/></div><span>Dark Mode</span></div><Toggle enabled={darkMode} onChange={setDarkMode}/></div></Card>
                   <Card><h3 className="font-bold mb-4">Support</h3><div className="space-y-2"><button className={`w-full p-3 rounded text-left flex justify-between items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}><span>Help Center</span><ChevronRight className="w-4 h-4"/></button></div></Card>
                   <div className="pt-6 border-t"><Button variant="danger" onClick={handleLogout} className="w-full justify-start"><LogOut className="w-4 h-4"/> Sign Out</Button></div>
                </div>
             )}
          </div>

          {/* Tutorial Overlay */}
          {showTutorial && (
             <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-sm w-full text-center relative`}>
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg"><HelpCircle className="w-8 h-8 text-indigo-600"/></div>
                   <h3 className="font-bold text-xl mt-4 mb-2">{EDITOR_TUTORIAL_STEPS[tutorialStep].title}</h3>
                   <p className="opacity-70 mb-6">{EDITOR_TUTORIAL_STEPS[tutorialStep].text}</p>
                   <div className="flex gap-3"><Button onClick={() => setShowTutorial(false)} variant="secondary" className="flex-1">Skip</Button><Button onClick={() => { const next = tutorialStep + 1; if (next < EDITOR_TUTORIAL_STEPS.length) setTutorialStep(next); else setShowTutorial(false); }} className="flex-1">Next</Button></div>
                   <div className="flex justify-center gap-1 mt-6">{EDITOR_TUTORIAL_STEPS.map((_,i) => <div key={i} className={`h-1.5 rounded-full transition-all ${i===tutorialStep ? 'w-6 bg-indigo-600' : 'w-1.5 bg-gray-300'}`}></div>)}</div>
                </div>
             </div>
          )}
          
          {/* Export Overlay */}
          {isExporting && (
             <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 text-center`}>
                   <RefreshCw className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4"/>
                   <h3 className="font-bold text-lg">Exporting... {exportProgress}%</h3>
                </div>
             </div>
          )}
        </div>
      )}
    </ThemeContext.Provider>
  );
}