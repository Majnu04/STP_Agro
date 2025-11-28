import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  t: any;
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ t, onShopNow }) => {
  return (
    <div className="relative overflow-hidden min-h-[650px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/Hero.png" 
          alt="Agricultural background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute top-0 right-0 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-gradient-to-br from-agri-green/30 to-green-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse duration-[3000ms]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-agri-yellow/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-white space-y-4 md:space-y-6 lg:space-y-8 animate-in slide-in-from-left duration-700 text-center md:text-left">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-agri-yellow font-bold text-[9px] md:text-xs rounded-full mb-3 md:mb-6 shadow-sm">
                 <span className="w-2 h-2 rounded-full bg-agri-yellow animate-pulse"></span>
                 <span className="tracking-widest uppercase">{t.premiumAgriProducts}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold leading-tight tracking-tight">
                Strengthen Your Soil. <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-yellow to-yellow-200">Grow Your Future.</span>
              </h1>
            </div>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-lg mx-auto md:mx-0 leading-relaxed font-normal">
              {t.heroSubtitle} <span className="text-white font-bold underline decoration-agri-yellow decoration-2 underline-offset-4">50% OFF</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 justify-center md:justify-start w-full">
              <button 
                onClick={onShopNow}
                className="group relative overflow-hidden bg-agri-yellow text-green-950 px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(255,207,48,0.4)] hover:shadow-[0_8px_30px_rgba(255,207,48,0.6)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center w-full sm:w-auto cursor-pointer text-sm md:text-base"
              >
                <span className="relative z-10 flex items-center">
                  {t.shopNow}
                  <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              </button>
              
              <button className="group px-8 py-4 rounded-xl font-bold text-white border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-green-900 hover:border-white transition-all duration-300 flex items-center justify-center shadow-lg shadow-black/5 hover:shadow-xl w-full sm:w-auto">
                {t.viewCatalog}
              </button>
            </div>
            
            <div className="pt-4 md:pt-6 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-xs sm:text-sm text-gray-300 font-medium">
              <div className="flex items-center bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <CheckCircle size={14} className="text-agri-yellow mr-2" />
                {t.freeShipping}
              </div>
              <div className="flex items-center bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <CheckCircle size={14} className="text-agri-yellow mr-2" />
                {t.codAvailable}
              </div>
              <div className="flex items-center bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <CheckCircle size={14} className="text-agri-yellow mr-2" />
                {t.expertAdvice}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;