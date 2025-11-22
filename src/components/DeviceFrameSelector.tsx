import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Tablet, Monitor, RotateCw } from "lucide-react";

type DeviceType = "iphone" | "android" | "ipad";
type Orientation = "portrait" | "landscape";

interface DeviceConfig {
  type: DeviceType;
  name: string;
  width: number;
  height: number;
  notch?: boolean;
}

const devices: Record<DeviceType, DeviceConfig> = {
  iphone: {
    type: "iphone",
    name: "iPhone 15 Pro",
    width: 340,
    height: 680,
    notch: true,
  },
  android: {
    type: "android",
    name: "Samsung Galaxy S24",
    width: 340,
    height: 700,
    notch: false,
  },
  ipad: {
    type: "ipad",
    name: "iPad Pro",
    width: 600,
    height: 800,
    notch: false,
  },
};

interface DeviceFrameSelectorProps {
  onDeviceChange?: (device: DeviceType, orientation: Orientation) => void;
  children: React.ReactNode;
}

export const DeviceFrameSelector = ({ onDeviceChange, children }: DeviceFrameSelectorProps) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>("iphone");
  const [orientation, setOrientation] = useState<Orientation>("portrait");

  const device = devices[selectedDevice];
  const isLandscape = orientation === "landscape";
  const width = isLandscape ? device.height : device.width;
  const height = isLandscape ? device.width : device.height;

  const handleDeviceChange = (type: DeviceType) => {
    setSelectedDevice(type);
    onDeviceChange?.(type, orientation);
  };

  const toggleOrientation = () => {
    const newOrientation = orientation === "portrait" ? "landscape" : "portrait";
    setOrientation(newOrientation);
    onDeviceChange?.(selectedDevice, newOrientation);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      {/* Device Selector */}
      <Card className="flex gap-2 p-2 bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
        <Button
          size="sm"
          variant={selectedDevice === "iphone" ? "default" : "ghost"}
          onClick={() => handleDeviceChange("iphone")}
          className="gap-2"
        >
          <Smartphone className="w-4 h-4" />
          iPhone
        </Button>
        <Button
          size="sm"
          variant={selectedDevice === "android" ? "default" : "ghost"}
          onClick={() => handleDeviceChange("android")}
          className="gap-2"
        >
          <Smartphone className="w-4 h-4" />
          Android
        </Button>
        <Button
          size="sm"
          variant={selectedDevice === "ipad" ? "default" : "ghost"}
          onClick={() => handleDeviceChange("ipad")}
          className="gap-2"
        >
          <Tablet className="w-4 h-4" />
          iPad
        </Button>
        <div className="w-px bg-border mx-1" />
        <Button
          size="sm"
          variant="ghost"
          onClick={toggleOrientation}
          className="gap-2"
        >
          <RotateCw className="w-4 h-4" />
          Rotate
        </Button>
      </Card>

      {/* Device Frame */}
      <div className="flex items-center justify-center flex-1">
        <div
          className="relative bg-background border-8 border-foreground rounded-[3rem] shadow-2xl overflow-hidden transition-all duration-300"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          {/* Notch (iPhone only in portrait) */}
          {device.notch && !isLandscape && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-foreground rounded-b-2xl z-10" />
          )}

          {/* Device Content */}
          <div className="h-full w-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>

      {/* Device Info */}
      <div className="text-center text-sm text-muted-foreground">
        {device.name} • {width}×{height}px • {orientation}
      </div>
    </div>
  );
};
