
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, RefreshCw, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const weapons = {
  terrorist: {
    pistols: [
      { name: 'Glock', command: 'glock' },
      { name: 'Desert Eagle', command: 'deagle' },
      { name: 'P228', command: 'p228' },
      { name: 'Dual Berettas', command: 'elite' }
    ],
    rifles: [
      { name: 'AK-47', command: 'ak47' },
      { name: 'Galil', command: 'galil' },
      { name: 'SG552', command: 'sg552' }
    ],
    smgs: [
      { name: 'MP5 Navy', command: 'mp5navy' },
      { name: 'TMP', command: 'tmp' },
      { name: 'UMP45', command: 'ump45' },
      { name: 'P90', command: 'p90' },
      { name: 'MAC-10', command: 'mac10' }
    ],
    snipers: [
      { name: 'AWP', command: 'awp' },
      { name: 'Scout', command: 'scout' },
      { name: 'G3SG1', command: 'g3sg1' }
    ],
    shotguns: [
      { name: 'M3 Shotgun', command: 'm3' },
      { name: 'XM1014', command: 'xm1014' }
    ]
  },
  ct: {
    pistols: [
      { name: 'USP', command: 'usp' },
      { name: 'Desert Eagle', command: 'deagle' },
      { name: 'P228', command: 'p228' },
      { name: 'Five-SeveN', command: 'fiveseven' }
    ],
    rifles: [
      { name: 'M4A1', command: 'm4a1' },
      { name: 'Famas', command: 'famas' },
      { name: 'AUG', command: 'aug' }
    ],
    smgs: [
      { name: 'MP5 Navy', command: 'mp5navy' },
      { name: 'TMP', command: 'tmp' },
      { name: 'UMP45', command: 'ump45' },
      { name: 'P90', command: 'p90' }
    ],
    snipers: [
      { name: 'AWP', command: 'awp' },
      { name: 'Scout', command: 'scout' },
      { name: 'SG550', command: 'sg550' }
    ],
    shotguns: [
      { name: 'M3 Shotgun', command: 'm3' },
      { name: 'XM1014', command: 'xm1014' }
    ]
  }
};

const equipment = [
  { name: 'Kevlar Vest', command: 'vest' },
  { name: 'Vest + Helmet', command: 'vesthelm' },
  { name: 'Defuse Kit', command: 'defuser', ctOnly: true },
  { name: 'Night Vision', command: 'nvgs' }
];

const grenades = [
  { name: 'HE Grenade', command: 'hegrenade' },
  { name: 'Flashbang', command: 'flash' },
  { name: 'Smoke Grenade', command: 'sgren' }
];

const keyOptions = [
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  'KP_HOME', 'KP_UPARROW', 'KP_PGUP', 'KP_LEFTARROW', 'KP_5', 'KP_RIGHTARROW',
  'KP_END', 'KP_DOWNARROW', 'KP_PGDN', 'KP_INS', 'KP_DEL', 'KP_ENTER'
];

const BuyScript = () => {
  const [activeTeam, setActiveTeam] = useState('ct');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState('F2');

  const currentWeapons = weapons[activeTeam as keyof typeof weapons];

  const handleItemToggle = (command: string) => {
    setSelectedItems(prev => 
      prev.includes(command) 
        ? prev.filter(item => item !== command)
        : [...prev, command]
    );
  };

  const generateBuyScript = () => {
    if (selectedItems.length === 0) return '';
    const buyCommands = selectedItems.map(item => `buy ${item}`).join('; ');
    return `bind "${selectedKey}" "${buyCommands}"`;
  };

  const copyToClipboard = () => {
    const script = generateBuyScript();
    if (!script) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to generate a buy script.",
        variant: "destructive"
      });
      return;
    }
    
    navigator.clipboard.writeText(script);
    toast({
      title: "Copied to clipboard!",
      description: "Your buy script has been copied and is ready to paste into your config."
    });
  };

  const resetSelection = () => {
    setSelectedItems([]);
    toast({
      title: "Selection cleared",
      description: "All items have been deselected."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-amber-600 hover:text-amber-700">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center space-x-3">
              <Target className="text-amber-600" size={28} />
              <div>
                <h1 className="text-2xl font-bold text-amber-900">Buy Script Generator</h1>
                <p className="text-sm text-amber-600">Create optimized weapon buying scripts</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-amber-900">Advanced Buy Script Generator</CardTitle>
            <CardDescription className="text-center">
              Select weapons and equipment to generate bind commands for quick purchasing in-game
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTeam} onValueChange={setActiveTeam} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="ct" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Counter-Terrorist
                </TabsTrigger>
                <TabsTrigger value="terrorist" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  Terrorist
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ct">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 font-medium">
                    🛡️ You are customizing the Buy Script for the <strong>Counter-Terrorist Team</strong>. 
                    Switch to Terrorist team from the tab above.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="terrorist">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800 font-medium">
                    💥 You are customizing the Buy Script for the <strong>Terrorist Team</strong>. 
                    Switch to Counter-Terrorist team from the tab above.
                  </p>
                </div>
              </TabsContent>

              {/* Key Selection */}
              <div className="mb-6">
                <Label className="text-base font-semibold mb-3 block">Bind Key</Label>
                <Select value={selectedKey} onValueChange={setSelectedKey}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {keyOptions.map(key => (
                      <SelectItem key={key} value={key}>{key}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Weapon Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Weapons Column */}
                <div className="space-y-6">
                  {/* Pistols */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Pistols</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {currentWeapons.pistols.map(weapon => (
                        <div key={weapon.command} className="flex items-center space-x-2">
                          <Checkbox
                            id={weapon.command}
                            checked={selectedItems.includes(weapon.command)}
                            onCheckedChange={() => handleItemToggle(weapon.command)}
                          />
                          <Label htmlFor={weapon.command} className="text-sm cursor-pointer">
                            {weapon.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rifles */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Rifles</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {currentWeapons.rifles.map(weapon => (
                        <div key={weapon.command} className="flex items-center space-x-2">
                          <Checkbox
                            id={weapon.command}
                            checked={selectedItems.includes(weapon.command)}
                            onCheckedChange={() => handleItemToggle(weapon.command)}
                          />
                          <Label htmlFor={weapon.command} className="text-sm cursor-pointer">
                            {weapon.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SMGs */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">SMGs</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {currentWeapons.smgs.map(weapon => (
                        <div key={weapon.command} className="flex items-center space-x-2">
                          <Checkbox
                            id={weapon.command}
                            checked={selectedItems.includes(weapon.command)}
                            onCheckedChange={() => handleItemToggle(weapon.command)}
                          />
                          <Label htmlFor={weapon.command} className="text-sm cursor-pointer">
                            {weapon.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Snipers */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Snipers</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {currentWeapons.snipers.map(weapon => (
                        <div key={weapon.command} className="flex items-center space-x-2">
                          <Checkbox
                            id={weapon.command}
                            checked={selectedItems.includes(weapon.command)}
                            onCheckedChange={() => handleItemToggle(weapon.command)}
                          />
                          <Label htmlFor={weapon.command} className="text-sm cursor-pointer">
                            {weapon.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shotguns */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Shotguns</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {currentWeapons.shotguns.map(weapon => (
                        <div key={weapon.command} className="flex items-center space-x-2">
                          <Checkbox
                            id={weapon.command}
                            checked={selectedItems.includes(weapon.command)}
                            onCheckedChange={() => handleItemToggle(weapon.command)}
                          />
                          <Label htmlFor={weapon.command} className="text-sm cursor-pointer">
                            {weapon.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Equipment & Grenades Column */}
                <div className="space-y-6">
                  {/* Equipment */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Equipment</Label>
                    <div className="space-y-2">
                      {equipment.map(item => {
                        if (item.ctOnly && activeTeam === 'terrorist') return null;
                        return (
                          <div key={item.command} className="flex items-center space-x-2">
                            <Checkbox
                              id={item.command}
                              checked={selectedItems.includes(item.command)}
                              onCheckedChange={() => handleItemToggle(item.command)}
                            />
                            <Label htmlFor={item.command} className="text-sm cursor-pointer">
                              {item.name}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Grenades */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Grenades</Label>
                    <div className="space-y-2">
                      {grenades.map(grenade => (
                        <div key={grenade.command} className="flex items-center space-x-2">
                          <Checkbox
                            id={grenade.command}
                            checked={selectedItems.includes(grenade.command)}
                            onCheckedChange={() => handleItemToggle(grenade.command)}
                          />
                          <Label htmlFor={grenade.command} className="text-sm cursor-pointer">
                            {grenade.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Generated Script Preview */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Generated Script</Label>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[100px] flex items-center">
                      {generateBuyScript() || 'Select items to generate buy script...'}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      onClick={copyToClipboard}
                      className="flex-1 bg-amber-600 hover:bg-amber-700"
                      disabled={selectedItems.length === 0}
                    >
                      <Copy className="mr-2" size={16} />
                      Copy to Clipboard
                    </Button>
                    <Button 
                      onClick={resetSelection}
                      variant="outline"
                      className="flex-1"
                    >
                      <RefreshCw className="mr-2" size={16} />
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="max-w-6xl mx-auto mt-6 bg-amber-50/80">
          <CardHeader>
            <CardTitle className="text-amber-900">How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-amber-800">
              <li>Select your team (Counter-Terrorist or Terrorist)</li>
              <li>Choose a key to bind the buy script to</li>
              <li>Select the weapons and equipment you want to purchase</li>
              <li>Copy the generated script to your clipboard</li>
              <li>Paste it into your <code className="bg-amber-200 px-2 py-1 rounded">autoexec.cfg</code> or console</li>
              <li>Press your selected key in-game to instantly buy all selected items</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyScript;
