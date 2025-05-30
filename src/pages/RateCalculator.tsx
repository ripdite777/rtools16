
import React, { useState } from 'react';
import { Wifi, Copy, Download, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const RateCalculator = () => {
  const { toast } = useToast();
  
  const [fps, setFps] = useState([100]);
  const [cmdRate, setCmdRate] = useState([105]);
  const [updateRate, setUpdateRate] = useState([102]);
  const [rate, setRate] = useState([25000]);
  const [dlMax, setDlMax] = useState([9999]);
  const [exInterp, setExInterp] = useState('0.01');

  const calculateOptimalSettings = () => {
    const calculatedInterp = 1 / updateRate[0];
    const recommendedRate = Math.min(100000, Math.max(1000, fps[0] * 100));
    
    return {
      interp: calculatedInterp.toFixed(4),
      recommendedRate: recommendedRate,
      packetLoss: updateRate[0] > 60 ? 'Low' : 'Medium',
      smoothness: cmdRate[0] >= 100 ? 'Excellent' : cmdRate[0] >= 60 ? 'Good' : 'Poor'
    };
  };

  const generateRateConfig = () => {
    const optimal = calculateOptimalSettings();
    
    return `// Rate Calculator Settings - Generated by rtools16
rate ${rate[0]}
cl_updaterate ${updateRate[0]}
cl_cmdrate ${cmdRate[0]}
ex_interp "${exInterp}"
cl_dlmax ${dlMax[0]}
fps_max ${fps[0]}

// Calculated optimal interp: ${optimal.interp}
// Packet loss prediction: ${optimal.packetLoss}
// Smoothness rating: ${optimal.smoothness}
// Recommended rate: ${optimal.recommendedRate}
`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateRateConfig());
    toast({
      title: "Copied!",
      description: "Rate settings copied to clipboard",
    });
  };

  const downloadConfig = () => {
    const config = generateRateConfig();
    const blob = new Blob([config], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rate_config.cfg';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "Rate config downloaded",
    });
  };

  const resetSettings = () => {
    setFps([100]);
    setCmdRate([105]);
    setUpdateRate([102]);
    setRate([25000]);
    setDlMax([9999]);
    setExInterp('0.01');
    toast({
      title: "Reset!",
      description: "All settings reset to defaults",
    });
  };

  const optimal = calculateOptimalSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wifi className="text-amber-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-amber-900">Rate Calculator</h1>
                <p className="text-amber-700 text-sm mt-1">Optimize network settings for your connection</p>
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
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Settings</CardTitle>
                <CardDescription>Configure your connection parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>FPS: {fps[0]}</Label>
                  <Slider
                    value={fps}
                    onValueChange={setFps}
                    max={300}
                    min={60}
                    step={10}
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
                  <Label>Download Max: {dlMax[0]}</Label>
                  <Slider
                    value={dlMax}
                    onValueChange={setDlMax}
                    max={9999}
                    min={0}
                    step={100}
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>Calculated optimal settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Calculated Interp</Label>
                    <div className="text-lg font-semibold">{optimal.interp}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Recommended Rate</Label>
                    <div className="text-lg font-semibold">{optimal.recommendedRate}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Packet Loss</Label>
                    <div className="text-lg font-semibold">{optimal.packetLoss}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Smoothness</Label>
                    <div className="text-lg font-semibold">{optimal.smoothness}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Generated Config</CardTitle>
                <CardDescription>Copy these settings to your config</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generateRateConfig()}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCalculator;
