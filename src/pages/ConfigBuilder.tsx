import React, { useState } from 'react';
import { Settings, Download, Copy, RotateCcw, Upload, Eye, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const ConfigBuilder = () => {
  const { toast } = useToast();
  
  // Performance settings
  const [fpsMax, setFpsMax] = useState([100]);
  const [showFps, setShowFps] = useState(false);
  const [netGraph, setNetGraph] = useState(false);
  const [developer, setDeveloper] = useState(false);
  
  // Graphics settings
  const [clNosmooth, setClNosmooth] = useState(true);
  const [rMmx, setRMmx] = useState(true);
  const [vDark, setVDark] = useState(true);
  const [rDecals, setRDecals] = useState([-99999]);
  const [maxShells, setMaxShells] = useState([-99999]);
  const [maxSmokepuffs, setMaxSmokepuffs] = useState([-99999]);
  const [mpDecals, setMpDecals] = useState([-99999]);
  const [glTexturemode, setGlTexturemode] = useState('GL_LINEAR_MIPMAP_LINEAR');
  const [glRoundDown, setGlRoundDown] = useState([3]);
  const [glMaxSize, setGlMaxSize] = useState([256]);
  const [clWeatherPrecips, setClWeatherPrecips] = useState(false);
  const [rDetailTextures, setRDetailTextures] = useState(false);
  
  // HUD settings
  const [hudFastswitch, setHudFastswitch] = useState(true);
  const [dynamicCrosshair, setDynamicCrosshair] = useState(false);
  const [violenceHgibs, setViolenceHgibs] = useState(true);
  const [corpseStay, setCorpseStay] = useState([600]);
  const [viewsize, setViewsize] = useState([120]);
  const [hudCenterid, setHudCenterid] = useState(false);
  const [hudDeathnotices, setHudDeathnotices] = useState(true);
  const [hudDrawhistory, setHudDrawhistory] = useState(true);
  const [clCenterprint, setClCenterprint] = useState(true);
  
  // Mouse settings
  const [sensitivity, setSensitivity] = useState([2.5]);
  const [mYaw, setMYaw] = useState([0.022]);
  const [mPitch, setMPitch] = useState([0.022]);
  const [zoomSensitivity, setZoomSensitivity] = useState([1.2]);
  const [mFilter, setMFilter] = useState(false);
  const [mCustomaccel, setMCustomaccel] = useState([0]);
  
  // Movement settings
  const [clBobcycle, setClBobcycle] = useState([0.8]);
  const [clBob, setClBob] = useState([0.01]);
  const [clBobup, setClBobup] = useState([0.5]);
  const [clSidespeed, setClSidespeed] = useState([400]);
  const [clForwardspeed, setClForwardspeed] = useState([400]);
  const [clBackspeed, setClBackspeed] = useState([400]);
  
  // Player settings
  const [playerName, setPlayerName] = useState('Player');
  const [rightHand, setRightHand] = useState(true);
  const [clMinmodels, setClMinmodels] = useState(false);
  const [clMinCt, setClMinCt] = useState([2]);
  const [clMinT, setClMinT] = useState([1]);
  const [clAllowdownload, setClAllowdownload] = useState(false);
  
  // Audio settings
  const [bgmVolume, setBgmVolume] = useState([0]);
  const [volume, setVolume] = useState([0.8]);
  const [suitVolume, setSuitVolume] = useState([0.25]);
  const [hisound, setHisound] = useState(true);
  const [roomType, setRoomType] = useState([0]);
  
  // Network settings
  const [rate, setRate] = useState([25000]);
  const [updateRate, setUpdateRate] = useState([102]);
  const [cmdRate, setCmdRate] = useState([105]);
  const [exInterp, setExInterp] = useState('0.01');
  const [hpkMaxsize, setHpkMaxsize] = useState([0.001]);
  const [dlMax, setDlMax] = useState([9999]);
  const [clTimeout, setClTimeout] = useState([60]);
  const [clPushlatency, setClPushlatency] = useState([-999]);
  
  // Autobuy settings
  const [autobuyT, setAutobuyT] = useState('ak47 deagle vesthelm hegrenade flash');
  const [autobuyCT, setAutobuyCT] = useState('m4a1 deagle vesthelm defuser hegrenade flash');
  const [autobuyKey, setAutobuyKey] = useState('F1');
  const [rebuyKey, setRebuyKey] = useState('F2');

  // Config Upload & Preview settings
  const [configLink, setConfigLink] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [configTitle, setConfigTitle] = useState('My Config');
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState('');

  const validateConfigLink = (link: string) => {
    const allowedDomains = ['mediafire.com', 'dosya.tc', 'dosya.co', 'dosyaupload.com'];
    try {
      const url = new URL(link);
      const domain = url.hostname.replace('www.', '');
      return allowedDomains.some(allowed => domain.includes(allowed)) && link.endsWith('.cfg');
    } catch {
      return false;
    }
  };

  const validateImageLink = (link: string) => {
    const allowedDomains = ['resmim.net', 'prnt.sc', 'hizliresim.com', 'imgur.com'];
    try {
      const url = new URL(link);
      const domain = url.hostname.replace('www.', '');
      return allowedDomains.some(allowed => domain.includes(allowed));
    } catch {
      return false;
    }
  };

  const validateAutobuyCommand = (command: string) => {
    const validCommands = [
      // Pistols
      'glock', 'usp', 'p228', 'deagle', 'elite', 'fiveseven',
      // Rifles
      'ak47', 'm4a1', 'aug', 'sg552', 'famas', 'galil',
      // SMGs
      'mp5', 'tmp', 'p90', 'mac10', 'ump45',
      // Snipers
      'awp', 'scout', 'g3sg1', 'sg550',
      // Shotguns
      'm3', 'xm1014',
      // Equipment
      'vest', 'vesthelm', 'defuser', 'nvgs', 'shield',
      // Grenades
      'hegrenade', 'flash', 'sgren', 'smokegrenade'
    ];
    
    const commands = command.toLowerCase().split(' ').filter(cmd => cmd.trim());
    return commands.every(cmd => validCommands.includes(cmd));
  };

  const handleAutobuyChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (validateAutobuyCommand(value) || value === '') {
      setter(value);
    } else {
      toast({
        title: "Invalid Command",
        description: "Only valid weapon and equipment names are allowed",
        variant: "destructive"
      });
    }
  };

  const handleShowPreview = () => {
    setPreviewError('');
    
    if (!configLink) {
      setPreviewError('Config link is required');
      return;
    }
    
    if (!validateConfigLink(configLink)) {
      setPreviewError('Invalid config link. Must be from allowed domains and end with .cfg');
      return;
    }
    
    if (imageLink && !validateImageLink(imageLink)) {
      setPreviewError('Invalid image link. Must be from allowed image hosting sites');
      return;
    }
    
    setShowPreview(true);
    toast({
      title: "Preview Ready",
      description: "Config preview is now visible",
    });
  };

  const clearUpload = () => {
    setConfigLink('');
    setImageLink('');
    setConfigTitle('My Config');
    setShowPreview(false);
    setPreviewError('');
  };

  const copyShareConfig = () => {
    const shareData = {
      title: configTitle,
      cfg: configLink,
      image: imageLink || undefined
    };
    
    navigator.clipboard.writeText(JSON.stringify(shareData, null, 2));
    toast({
      title: "Copied!",
      description: "Config share data copied to clipboard",
    });
  };

  const applyNetworkPreset = (preset: string) => {
    switch (preset) {
      case 'pro':
        setCmdRate([105]);
        setUpdateRate([102]);
        setRate([25000]);
        break;
      case 'high':
        setRate([100000]);
        break;
      case 'medium':
        setRate([50000]);
        break;
      case 'low':
        setRate([25000]);
        break;
      case 'lan':
        setCmdRate([900]);
        setUpdateRate([102]);
        setRate([100000]);
        break;
    }
    toast({
      title: "Preset Applied",
      description: `${preset} network settings applied`,
    });
  };

  const generateConfig = () => {
    const config = `// Generated by rtools16 - Config Builder
// Performance Settings
fps_max ${fpsMax[0]}
cl_showfps ${showFps ? '1' : '0'}
net_graph ${netGraph ? '1' : '0'}
developer ${developer ? '1' : '0'}
cl_minmodels ${clMinmodels ? '1' : '0'}
${clMinmodels ? `cl_min_ct ${clMinCt[0]}` : ''}
${clMinmodels ? `cl_min_t ${clMinT[0]}` : ''}

// Graphics Settings
cl_nosmooth "${clNosmooth ? '1' : '0'}"
r_mmx "${rMmx ? '1' : '0'}"
v_dark "${vDark ? '1' : '0'}"
r_decals "${rDecals[0]}"
max_shells "${maxShells[0]}"
max_smokepuffs "${maxSmokepuffs[0]}"
mp_decals "${mpDecals[0]}"
gl_texturemode "${glTexturemode}"
gl_round_down "${glRoundDown[0]}"
gl_max_size "${glMaxSize[0]}"
cl_weather "${clWeatherPrecips ? '1' : '0'}"
r_detailtextures "${rDetailTextures ? '1' : '0'}"

// HUD Settings
hud_fastswitch ${hudFastswitch ? '1' : '0'}
cl_dynamiccrosshair ${dynamicCrosshair ? '1' : '0'}
violence_hgibs ${violenceHgibs ? '1' : '0'}
cl_corpsestay ${corpseStay[0]}
viewsize ${viewsize[0]}
hud_centerid ${hudCenterid ? '1' : '0'}
hud_deathnotices ${hudDeathnotices ? '1' : '0'}
hud_drawhistory ${hudDrawhistory ? '1' : '0'}
cl_centerprint ${clCenterprint ? '1' : '0'}

// Mouse Settings
sensitivity ${sensitivity[0]}
m_yaw ${mYaw[0]}
m_pitch ${mPitch[0]}
zoom_sensitivity_ratio ${zoomSensitivity[0]}
m_filter ${mFilter ? '1' : '0'}
m_customaccel ${mCustomaccel[0]}

// Movement Settings
cl_bobcycle ${clBobcycle[0]}
cl_bob ${clBob[0]}
cl_bobup ${clBobup[0]}
cl_sidespeed ${clSidespeed[0]}
cl_forwardspeed ${clForwardspeed[0]}
cl_backspeed ${clBackspeed[0]}

// Player Settings
name "${playerName}"
cl_righthand ${rightHand ? '1' : '0'}
cl_minmodels ${clMinmodels ? '1' : '0'}
cl_allowdownload ${clAllowdownload ? '1' : '0'}

// Audio Settings
MP3Volume ${bgmVolume[0]}
volume ${volume[0]}
suitvolume ${suitVolume[0]}
hisound ${hisound ? '1' : '0'}
room_type ${roomType[0]}

// Network Settings
rate ${rate[0]}
cl_updaterate ${updateRate[0]}
cl_cmdrate ${cmdRate[0]}
ex_interp "${exInterp}"
hpk_maxsize "${hpkMaxsize[0]}"
cl_download_ingame 0
cl_dlmax "${dlMax}"
cl_timeout ${clTimeout[0]}
cl_pushlatency ${clPushlatency[0]}

// Autobuy Binds
bind "${autobuyKey}" "buy ${autobuyT}"
bind "${rebuyKey}" "buy ${autobuyCT}"

// Additional optimizations
cl_cmdbackup 2
con_color "255 180 30"
echo "Config loaded successfully!"
`;
    return config;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateConfig());
    toast({
      title: "Copied!",
      description: "Config copied to clipboard",
    });
  };

  const downloadConfig = () => {
    const config = generateConfig();
    const blob = new Blob([config], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.cfg';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "Config file downloaded",
    });
  };

  const resetSettings = () => {
    setFpsMax([100]);
    setShowFps(false);
    setNetGraph(false);
    setDeveloper(false);
    setClNosmooth(true);
    setRMmx(true);
    setVDark(true);
    setRDecals([-99999]);
    setMaxShells([-99999]);
    setMaxSmokepuffs([-99999]);
    setMpDecals([-99999]);
    setGlTexturemode('GL_LINEAR_MIPMAP_LINEAR');
    setHudFastswitch(true);
    setDynamicCrosshair(false);
    setViolenceHgibs(true);
    setCorpseStay([600]);
    setViewsize([120]);
    setSensitivity([2.5]);
    setMYaw([0.022]);
    setMPitch([0.022]);
    setZoomSensitivity([1.2]);
    setClBobcycle([0.8]);
    setClBob([0.01]);
    setClBobup([0.5]);
    setPlayerName('Player');
    setRightHand(true);
    setRate([25000]);
    setUpdateRate([102]);
    setCmdRate([105]);
    setExInterp('0.01');
    setHpkMaxsize([0.001]);
    setDlMax([96]);
    setAutobuyT('ak47 deagle vesthelm hegrenade flash');
    setAutobuyCT('m4a1 deagle vesthelm defuser hegrenade flash');
    setAutobuyKey('F1');
    setRebuyKey('F2');
    setClMinmodels(false);
    setClMinCt([2]);
    setClMinT([1]);
    clearUpload();
    toast({
      title: "Reset!",
      description: "All settings reset to defaults",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="text-amber-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-amber-900">Config Builder</h1>
                <p className="text-amber-700 text-sm mt-1">Complete CS 1.6 configuration generator</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={resetSettings} variant="outline" size="sm">
                <RotateCcw size={16} className="mr-2" />
                Reset
              </Button>
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                <Copy size={16} className="mr-2" />
                Copy
              </Button>
              <Button onClick={downloadConfig} size="sm" className="bg-amber-600 hover:bg-amber-700">
                <Download size={16} className="mr-2" />
                Download .cfg
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="graphics">Graphics</TabsTrigger>
                <TabsTrigger value="hud">HUD</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="mouse">Mouse</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Settings</CardTitle>
                    <CardDescription>Optimize your game performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>FPS Max: {fpsMax[0]}</Label>
                      <Slider
                        value={fpsMax}
                        onValueChange={setFpsMax}
                        max={300}
                        min={60}
                        step={10}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-fps"
                        checked={showFps}
                        onCheckedChange={setShowFps}
                      />
                      <Label htmlFor="show-fps">Show FPS Counter</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="net-graph"
                        checked={netGraph}
                        onCheckedChange={setNetGraph}
                      />
                      <Label htmlFor="net-graph">Net Graph</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="developer"
                        checked={developer}
                        onCheckedChange={setDeveloper}
                      />
                      <Label htmlFor="developer">Developer Mode</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="min-models"
                        checked={clMinmodels}
                        onCheckedChange={setClMinmodels}
                      />
                      <Label htmlFor="min-models">Use Minimum Models</Label>
                    </div>
                    
                    {clMinmodels && (
                      <>
                        <div className="space-y-2">
                          <Label>CT Model (cl_min_ct): {clMinCt[0] === 2 ? 'GIGN' : clMinCt[0] === 4 ? 'GSG-9' : clMinCt[0] === 7 ? 'SAS' : 'SEAL'}</Label>
                          <Slider
                            value={clMinCt}
                            onValueChange={setClMinCt}
                            max={9}
                            min={2}
                            step={1}
                            className="w-full"
                          />
                          <div className="text-xs text-gray-500">
                            2: GIGN | 4: GSG-9 | 7: SAS | 9: SEAL
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>T Model (cl_min_t): {clMinT[0] === 1 ? 'Elite' : clMinT[0] === 5 ? 'Guerilla' : clMinT[0] === 6 ? 'Arctic' : 'Phoenix'}</Label>
                          <Slider
                            value={clMinT}
                            onValueChange={setClMinT}
                            max={8}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="text-xs text-gray-500">
                            1: Elite | 5: Guerilla | 6: Arctic | 8: Phoenix
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="graphics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Graphics Settings</CardTitle>
                    <CardDescription>Optimize visual settings for performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="cl-nosmooth"
                        checked={clNosmooth}
                        onCheckedChange={setClNosmooth}
                      />
                      <Label htmlFor="cl-nosmooth">Disable Mouse Smoothing</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="r-mmx"
                        checked={rMmx}
                        onCheckedChange={setRMmx}
                      />
                      <Label htmlFor="r-mmx">Enable MMX</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="v-dark"
                        checked={vDark}
                        onCheckedChange={setVDark}
                      />
                      <Label htmlFor="v-dark">Dark Mode</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="weather"
                        checked={clWeatherPrecips}
                        onCheckedChange={setClWeatherPrecips}
                      />
                      <Label htmlFor="weather">Weather Effects</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="detail-textures"
                        checked={rDetailTextures}
                        onCheckedChange={setRDetailTextures}
                      />
                      <Label htmlFor="detail-textures">Detail Textures</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Texture Mode</Label>
                      <Select value={glTexturemode} onValueChange={setGlTexturemode}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GL_LINEAR_MIPMAP_LINEAR">Linear Mipmap Linear</SelectItem>
                          <SelectItem value="GL_LINEAR">Linear</SelectItem>
                          <SelectItem value="GL_NEAREST">Nearest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>GL Max Size: {glMaxSize[0]}</Label>
                      <Slider
                        value={glMaxSize}
                        onValueChange={setGlMaxSize}
                        max={512}
                        min={64}
                        step={64}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>GL Round Down: {glRoundDown[0]}</Label>
                      <Slider
                        value={glRoundDown}
                        onValueChange={setGlRoundDown}
                        max={6}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Decals: {rDecals[0]}</Label>
                      <Slider
                        value={rDecals}
                        onValueChange={setRDecals}
                        max={4096}
                        min={-99999}
                        step={100}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Max Shells: {maxShells[0]}</Label>
                      <Slider
                        value={maxShells}
                        onValueChange={setMaxShells}
                        max={500}
                        min={-99999}
                        step={50}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Max Smoke Puffs: {maxSmokepuffs[0]}</Label>
                      <Slider
                        value={maxSmokepuffs}
                        onValueChange={setMaxSmokepuffs}
                        max={500}
                        min={-99999}
                        step={50}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>MP Decals: {mpDecals[0]}</Label>
                      <Slider
                        value={mpDecals}
                        onValueChange={setMpDecals}
                        max={300}
                        min={-99999}
                        step={50}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hud" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>HUD Settings</CardTitle>
                    <CardDescription>Customize your heads-up display</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="fast-switch"
                        checked={hudFastswitch}
                        onCheckedChange={setHudFastswitch}
                      />
                      <Label htmlFor="fast-switch">Fast Weapon Switch</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dynamic-crosshair"
                        checked={dynamicCrosshair}
                        onCheckedChange={setDynamicCrosshair}
                      />
                      <Label htmlFor="dynamic-crosshair">Dynamic Crosshair</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="violence-hgibs"
                        checked={violenceHgibs}
                        onCheckedChange={setViolenceHgibs}
                      />
                      <Label htmlFor="violence-hgibs">Show Blood/Gore</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="centerid"
                        checked={hudCenterid}
                        onCheckedChange={setHudCenterid}
                      />
                      <Label htmlFor="centerid">Center Player ID</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="deathnotices"
                        checked={hudDeathnotices}
                        onCheckedChange={setHudDeathnotices}
                      />
                      <Label htmlFor="deathnotices">Death Notices</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="drawhistory"
                        checked={hudDrawhistory}
                        onCheckedChange={setHudDrawhistory}
                      />
                      <Label htmlFor="drawhistory">Draw History</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="centerprint"
                        checked={clCenterprint}
                        onCheckedChange={setClCenterprint}
                      />
                      <Label htmlFor="centerprint">Center Print Messages</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Corpse Stay Time: {corpseStay[0]}s</Label>
                      <Slider
                        value={corpseStay}
                        onValueChange={setCorpseStay}
                        max={3600}
                        min={0}
                        step={60}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>View Size: {viewsize[0]}</Label>
                      <Slider
                        value={viewsize}
                        onValueChange={setViewsize}
                        max={120}
                        min={90}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audio" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Audio Settings</CardTitle>
                    <CardDescription>Configure audio and sound settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Master Volume: {volume[0]}</Label>
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>BGM Volume: {bgmVolume[0]}</Label>
                      <Slider
                        value={bgmVolume}
                        onValueChange={setBgmVolume}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Suit Volume: {suitVolume[0]}</Label>
                      <Slider
                        value={suitVolume}
                        onValueChange={setSuitVolume}
                        max={1}
                        min={0}
                        step={0.05}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Room Type: {roomType[0]}</Label>
                      <Slider
                        value={roomType}
                        onValueChange={setRoomType}
                        max={30}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="hisound"
                        checked={hisound}
                        onCheckedChange={setHisound}
                      />
                      <Label htmlFor="hisound">High Quality Sound</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mouse" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mouse & Movement Settings</CardTitle>
                    <CardDescription>Fine-tune your mouse sensitivity and movement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Sensitivity: {sensitivity[0]}</Label>
                      <Slider
                        value={sensitivity}
                        onValueChange={setSensitivity}
                        max={10}
                        min={0.1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Mouse Yaw: {mYaw[0]}</Label>
                      <Slider
                        value={mYaw}
                        onValueChange={setMYaw}
                        max={0.1}
                        min={0.01}
                        step={0.001}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Mouse Pitch: {mPitch[0]}</Label>
                      <Slider
                        value={mPitch}
                        onValueChange={setMPitch}
                        max={0.1}
                        min={0.01}
                        step={0.001}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Zoom Sensitivity: {zoomSensitivity[0]}</Label>
                      <Slider
                        value={zoomSensitivity}
                        onValueChange={setZoomSensitivity}
                        max={3}
                        min={0.1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Custom Accel: {mCustomaccel[0]}</Label>
                      <Slider
                        value={mCustomaccel}
                        onValueChange={setMCustomaccel}
                        max={3}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="mouse-filter"
                        checked={mFilter}
                        onCheckedChange={setMFilter}
                      />
                      <Label htmlFor="mouse-filter">Mouse Filter</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Bob Cycle: {clBobcycle[0]}</Label>
                      <Slider
                        value={clBobcycle}
                        onValueChange={setClBobcycle}
                        max={2}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Bob Amount: {clBob[0]}</Label>
                      <Slider
                        value={clBob}
                        onValueChange={setClBob}
                        max={0.1}
                        min={0}
                        step={0.01}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Bob Up: {clBobup[0]}</Label>
                      <Slider
                        value={clBobup}
                        onValueChange={setClBobup}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Side Speed: {clSidespeed[0]}</Label>
                      <Slider
                        value={clSidespeed}
                        onValueChange={setClSidespeed}
                        max={1000}
                        min={100}
                        step={50}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Forward Speed: {clForwardspeed[0]}</Label>
                      <Slider
                        value={clForwardspeed}
                        onValueChange={setClForwardspeed}
                        max={1000}
                        min={100}
                        step={50}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Back Speed: {clBackspeed[0]}</Label>
                      <Slider
                        value={clBackspeed}
                        onValueChange={setClBackspeed}
                        max={1000}
                        min={100}
                        step={50}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Player Name</Label>
                      <Input
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Enter your player name"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="right-hand"
                        checked={rightHand}
                        onCheckedChange={setRightHand}
                      />
                      <Label htmlFor="right-hand">Right Hand Weapon Model</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="minmodels"
                        checked={clMinmodels}
                        onCheckedChange={setClMinmodels}
                      />
                      <Label htmlFor="minmodels">Use Minimum Models</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allow-download"
                        checked={clAllowdownload}
                        onCheckedChange={setClAllowdownload}
                      />
                      <Label htmlFor="allow-download">Allow Downloads</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="network" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Network Settings</CardTitle>
                    <CardDescription>Optimize your connection settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Network Presets</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => applyNetworkPreset('pro')}>
                          Pro (105/102)
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => applyNetworkPreset('lan')}>
                          LAN (900/102)
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Rate Presets</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => applyNetworkPreset('high')}>
                          High (100k)
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => applyNetworkPreset('medium')}>
                          Medium (50k)
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => applyNetworkPreset('low')}>
                          Low (25k)
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Rate: {rate[0]}</Label>
                      <Slider
                        value={rate}
                        onValueChange={setRate}
                        max={100000}
                        min={1000}
                        step={1000}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Update Rate: {updateRate[0]}</Label>
                      <Slider
                        value={updateRate}
                        onValueChange={setUpdateRate}
                        max={102}
                        min={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>CMD Rate: {cmdRate[0]}</Label>
                      <Slider
                        value={cmdRate}
                        onValueChange={setCmdRate}
                        max={900}
                        min={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Ex Interp</Label>
                      <Input
                        value={exInterp}
                        onChange={(e) => setExInterp(e.target.value)}
                        placeholder="0.01"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>HPK Max Size: {hpkMaxsize[0]}</Label>
                      <Slider
                        value={hpkMaxsize}
                        onValueChange={setHpkMaxsize}
                        max={0.001}
                        min={0.001}
                        step={0.001}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>DlMax: {dlMax[0]}</Label>
                      <Input
                        value={dlMax}
                        onValueChange={setDlMax}
                        max={1024}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Timeout: {clTimeout[0]}s</Label>
                      <Slider
                        value={clTimeout}
                        onValueChange={setClTimeout}
                        max={300}
                        min={30}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Push Latency: {clPushlatency[0]}</Label>
                      <Slider
                        value={clPushlatency}
                        onValueChange={setClPushlatency}
                        max={0}
                        min={-999}
                        step={10}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Terrorist Autobuy</Label>
                      <Input
                        value={autobuyT}
                        onChange={(e) => handleAutobuyChange(e.target.value, setAutobuyT)}
                        placeholder="ak47 deagle vesthelm hegrenade flash"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Counter-Terrorist Autobuy</Label>
                      <Input
                        value={autobuyCT}
                        onChange={(e) => handleAutobuyChange(e.target.value, setAutobuyCT)}
                        placeholder="m4a1 deagle vesthelm defuser hegrenade flash"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Autobuy Key</Label>
                      <Input
                        value={autobuyKey}
                        onChange={(e) => setAutobuyKey(e.target.value)}
                        placeholder="F1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Rebuy Key</Label>
                      <Input
                        value={rebuyKey}
                        onChange={(e) => setRebuyKey(e.target.value)}
                        placeholder="F2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>🧩 Config Yükleyici + Görsel Önizleme</CardTitle>
                    <CardDescription>Kendi config'ini yükle, paylaş ve görsel önizleme ile başkalarıyla paylaş</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Config Title</Label>
                      <Input
                        value={configTitle}
                        onChange={(e) => setConfigTitle(e.target.value)}
                        placeholder="My LAN Config"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Config Dosya Linki (.cfg)</Label>
                      <Input
                        value={configLink}
                        onChange={(e) => setConfigLink(e.target.value)}
                        placeholder="https://dosya.tc/myconfig.cfg"
                      />
                      <p className="text-xs text-gray-500">
                        Kabul edilen siteler: mediafire.com, dosya.tc, dosya.co, dosyaupload.com
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Config Görsel Linki (opsiyonel)</Label>
                      <Input
                        value={imageLink}
                        onChange={(e) => setImageLink(e.target.value)}
                        placeholder="https://imgur.com/abcd123.png"
                      />
                      <p className="text-xs text-gray-500">
                        Kabul edilen siteler: resmim.net, prnt.sc, hizliresim.com, imgur.com
                      </p>
                    </div>
                    
                    {previewError && (
                      <div className="text-red-500 text-sm">{previewError}</div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button onClick={handleShowPreview} variant="outline">
                        <Eye size={16} className="mr-2" />
                        Önizlemeyi Göster
                      </Button>
                      <Button onClick={clearUpload} variant="outline">
                        <Trash2 size={16} className="mr-2" />
                        Temizle
                      </Button>
                      {showPreview && (
                        <Button onClick={copyShareConfig}>
                          <Copy size={16} className="mr-2" />
                          Kopyala Paylaşım
                        </Button>
                      )}
                    </div>
                    
                    {showPreview && (
                      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                        <h4 className="font-medium mb-2">{configTitle}</h4>
                        <p className="text-sm text-gray-600 mb-2">Config: {configLink}</p>
                        {imageLink && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 mb-1">Preview:</p>
                            <img 
                              src={imageLink} 
                              alt="Config preview" 
                              className="max-w-[200px] max-h-[150px] object-contain border rounded"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Configuration Preview</CardTitle>
                <CardDescription>Live preview of your config file</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generateConfig()}
                  readOnly
                  className="min-h-[600px] font-mono text-sm"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigBuilder;
