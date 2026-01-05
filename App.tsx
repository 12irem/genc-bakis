import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import { ARTICLES } from './content';
import { ArticleCard } from './components/ArticleCard';
import { DataChart, PullQuote, Timeline } from './components/Visualizers';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-journal-900 hover:text-journal-accent transition-colors">
           <div className="w-8 h-8 bg-journal-900 text-white flex items-center justify-center font-serif font-bold rounded">G</div>
           <span className="font-serif font-bold text-xl tracking-tight">Genç Bakış</span>
        </Link>

        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
           <Link to="/" className={`hover:text-journal-900 transition-colors ${location.pathname === '/' ? 'text-journal-accent' : ''}`}>Ana Sayfa</Link>
           {ARTICLES.slice(0, 4).map(art => (
             <Link key={art.id} to={`/article/${art.id}`} className="hover:text-journal-900 transition-colors truncate max-w-[100px]">{art.category}</Link>
           ))}
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-800">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 py-4 px-4 shadow-lg flex flex-col space-y-4">
           <Link to="/" onClick={() => setIsOpen(false)} className="block font-medium text-gray-800">Ana Sayfa</Link>
           {ARTICLES.map(art => (
             <Link key={art.id} to={`/article/${art.id}`} onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 py-1 border-b border-gray-50">{art.title}</Link>
           ))}
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-journal-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif font-bold text-xl mb-4">Genç Bakış</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Üsküdar Üniversitesi İletişim Fakültesi <br/>
            Dijital Medya ve Hikaye Anlatımı Dersi <br/>
            Final Projesi
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">İçerik</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Metodoloji</a></li>
          </ul>
        </div>
        <div>
           <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">Bağlantıda Kalın</h4>
           <div className="flex space-x-4">
             <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
           </div>
           <p className="mt-4 text-xs text-gray-600">
             © 2025 Genç Bakış. Tüm hakları saklıdır.
           </p>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <span className="text-journal-accent font-bold tracking-widest text-xs uppercase mb-4 block">Dijital Hikaye Dosyası</span>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-journal-900 mb-6 leading-tight">
            Gelecek Kaygısı ve Gençlik: <br className="hidden md:block"/> Türkiye'nin İşsizlik Sınavı
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Diplomalı işsizlikten beyin göçüne, psikolojik etkilerden sosyal medya arayışlarına kadar gençliğin en büyük sorunu üzerine derinlemesine bir inceleme.
          </p>
        </div>
      </section>

      <main className="flex-1 bg-journal-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onClick={(id) => navigate(`/article/${id}`)} 
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = ARTICLES.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return <div className="p-10 text-center">Makale bulunamadı. <Link to="/" className="text-blue-600">Ana sayfaya dön</Link></div>;
  }

  // Helper to parse **bold** text
  const formatText = (text: string) => {
    // Split by ** to isolate bold sections. 
    // Example: "Normal **Bold** Normal" -> ["Normal ", "Bold", " Normal"]
    const parts = text.split('**');
    return parts.map((part, index) => 
      index % 2 === 1 ? <strong key={index} className="font-bold text-gray-900">{part}</strong> : part
    );
  };

  const renderContent = () => {
    return article.content.map((paragraph, index) => {
      let extraComponent = null;

      if (index === 2 && article.chartData && article.chartType) {
        extraComponent = <DataChart type={article.chartType} data={article.chartData} />;
      }

      if (index === 5) {
         const sentence = paragraph.split('.')[0] + '.';
         extraComponent = <PullQuote text={sentence.length < 100 ? sentence : "Genç işsizliği sadece ekonomik değil, toplumsal bir krizdir."} />;
      }
      
      if (article.id === 'son-on-yil' && index === 1) {
        extraComponent = <Timeline />;
      }

      return (
        <React.Fragment key={index}>
          <p className="mb-6 text-gray-800 leading-8 text-lg font-light font-sans">
            {formatText(paragraph)}
          </p>
          {extraComponent}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="w-full h-[400px] relative">
        <img src={article.coverImage} className="w-full h-full object-cover" alt="Cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
                <span className="bg-journal-accent px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 inline-block">{article.category}</span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">{article.title}</h1>
                <p className="text-lg md:text-xl font-light text-gray-200">{article.subtitle}</p>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4 order-2 lg:order-1">
           <div className="sticky top-24">
             <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-journal-900 mb-8 transition-colors group">
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Ana Sayfaya Dön
             </button>
             
             <div className="border-t border-gray-200 pt-6">
                <h4 className="font-bold text-gray-900 mb-4 font-serif">Diğer Başlıklar</h4>
                <ul className="space-y-3">
                    {ARTICLES.filter(a => a.id !== article.id).slice(0, 5).map(rel => (
                        <li key={rel.id}>
                            <Link to={`/article/${rel.id}`} className="text-sm text-gray-600 hover:text-journal-blue transition-colors block leading-snug">
                                {rel.title}
                            </Link>
                        </li>
                    ))}
                </ul>
             </div>
           </div>
        </aside>

        <article className="lg:w-3/4 order-1 lg:order-2 max-w-3xl">
           <div className="prose prose-lg prose-slate max-w-none">
              <div className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-journal-900">
                {renderContent()}
              </div>
           </div>

           <div className="mt-16 pt-8 border-t border-gray-200 bg-gray-50 p-6 rounded-lg">
             <h3 className="font-serif font-bold text-lg mb-4 flex items-center text-journal-900">
                Kaynakça
             </h3>
             <ul className="space-y-2">
               {article.references.map((ref, i) => (
                 <li key={i} className="text-sm text-gray-600 break-words">
                   <span className="font-semibold text-gray-800 mr-2">•</span>
                   {ref.title} 
                   <a href={ref.url} target="_blank" rel="noreferrer" className="block text-journal-blue hover:underline text-xs mt-1">
                     {ref.url}
                   </a>
                 </li>
               ))}
             </ul>
           </div>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </HashRouter>
  );
};