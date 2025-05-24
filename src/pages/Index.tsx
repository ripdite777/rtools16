
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Settings, Crosshair, Wifi, Server, Cpu, Wrench, Zap, GraduationCap, MousePointer, BarChart3, Edit3, Command } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const tools = [
  {
    id: 'buy-script',
    title: 'Buy Script Generator',
    description: 'Advanced team-based weapon buying scripts with bind commands',
    icon: Target,
    path: '/buy-script',
    featured: true
  },
  {
    id: 'config-builder',
    title: 'Config Builder',
    description: 'Complete CS 1.6 configuration file generator',
    icon: Settings,
    path: '/config-builder'
  },
  {
    id: 'crosshair',
    title: 'Crosshair Generator',
    description: 'Customize your crosshair with live preview (UNDER CARE)',
    icon: Crosshair,
    path: '/crosshair'
  },
  {
    id: 'rate-calculator',
    title: 'Rate Calculator',
    description: 'Optimize network settings for your connection',
    icon: Wifi,
    path: '/rate-calculator'
  },
  {
    id: 'server-cfg',
    title: 'Server.cfg Generator',
    description: 'Create server configuration files (UNDER CARE)',
    icon: Server,
    path: '/server-cfg'
  },
  {
    id: 'fps-boost',
    title: 'FPS Boost Config',
    description: 'Maximize your frame rate performance (UNDER CARE)',
    icon: Zap,
    path: '/fps-boost'
  },
  {
    id: 'training-cfg',
    title: 'Training CFG',
    description: 'Practice mode configuration generator (UNDER CARE)',
    icon: GraduationCap,
    path: '/training-cfg'
  },
  {
    id: 'jumpthrow',
    title: 'Jumpthrow Bind',
    description: 'Perfect grenade throwing bind maker (UNDER CARE)',
    icon: MousePointer,
    path: '/jumpthrow'
  },
  {
    id: 'netgraph',
    title: 'Net Graph Tool',
    description: 'Position your network information display (UNDER CARE)',
    icon: BarChart3,
    path: '/netgraph'
  },
  {
    id: 'config-cleaner',
    title: 'Config Cleaner',
    description: 'Fix and optimize existing configurations (UNDER CARE)',
    icon: Wrench,
    path: '/config-cleaner'
  },
  {
    id: 'autoexec',
    title: 'HLDS Autoexec',
    description: 'Server startup script generator (UNDER CARE)',
    icon: Cpu,
    path: '/autoexec'
  },
  {
    id: 'regedit',
    title: 'Registry Editor',
    description: 'Windows optimization for CS 1.6 (UNDER CARE)',
    icon: Edit3,
    path: '/regedit'
  },
  {
    id: 'cmd-cleaner',
    title: 'CMD Cleaner',
    description: 'System performance optimization commands (UNDER CARE)',
    icon: Command,
    path: '/cmd-cleaner'
  }
];

const featuredTools = [
  { id: 'buy-script', title: 'Buy Script Generator', path: '/buy-script' },
  { id: 'config-builder', title: 'Config Builder', path: '/config-builder' },
  { id: 'crosshair', title: 'Crosshair Generator', path: '/crosshair' },
  { id: 'rate-calculator', title: 'Rate Calculator', path: '/rate-calculator' },
  { id: 'fps-boost', title: 'FPS Boost Config', path: '/fps-boost' }
];

const Index = () => {
  const [currentTool, setCurrentTool] = useState(featuredTools[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTool(prev => {
        const currentIndex = featuredTools.findIndex(tool => tool.id === prev.id);
        const nextIndex = (currentIndex + 1) % featuredTools.length;
        return featuredTools[nextIndex];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-900">rtools16</h1>
              <p className="text-amber-700 text-sm mt-1">holly freak your game experience mf</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-amber-600">Counter-Strike 1.6</div>
              <div className="text-xs text-amber-500">Configuration Toolkit</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-amber-900 mb-6">
            The Ultimate CS 1.6 Toolkit
          </h2>
          <p className="text-xl text-amber-700 mb-8 max-w-2xl mx-auto">
            13 powerful tools to optimize your Counter-Strike experience. From buy scripts to FPS boosters, 
            everything you need to dominate the server.
          </p>
          <Link 
            to={currentTool.path}
            className="inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in"
          >
            <Target className="mr-2" size={20} />
            Start with {currentTool.title}
          </Link>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-amber-900 text-center mb-12">
            Choose Your Tool
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link key={tool.id} to={tool.path}>
                  <Card className={`h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-amber-200 ${
                    tool.featured ? 'ring-2 ring-amber-400 bg-gradient-to-br from-amber-50 to-orange-50' : 'bg-white/70 hover:bg-white/90'
                  }`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          tool.featured ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-600'
                        }`}>
                          <IconComponent size={20} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className={`text-lg ${
                            tool.featured ? 'text-amber-900' : 'text-gray-900'
                          }`}>
                            {tool.title}
                          </CardTitle>
                          {tool.featured && (
                            <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">rtools16</h4>
              <p className="text-amber-200">
                The most comprehensive Counter-Strike 1.6 configuration toolkit. 
                Built by gamers, for gamers.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Tools</h4>
              <ul className="space-y-2 text-amber-200">
                <li><Link to="/buy-script" className="hover:text-white">Buy Script Generator</Link></li>
                <li><Link to="/crosshair" className="hover:text-white">Crosshair Generator</Link></li>
                <li><Link to="/fps-boost" className="hover:text-white">FPS Boost Config</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-amber-200">
                <li>✓ No backend required</li>
                <li>✓ Mobile responsive</li>
                <li>✓ Copy-paste ready configs</li>
                <li>✓ Live previews</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-6 text-center text-amber-300">
            <p>&copy; 2024 rtools16. Made for the CS 1.6 community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
