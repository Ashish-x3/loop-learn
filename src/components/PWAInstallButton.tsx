
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/usePWA';

const PWAInstallButton = () => {
  const { isInstallable, installApp } = usePWA();

  if (!isInstallable) return null;

  return (
    <Button
      onClick={installApp}
      variant="outline"
      size="sm"
      className="flex items-center space-x-2"
    >
      <Download className="w-4 h-4" />
      <span>Install App</span>
    </Button>
  );
};

export default PWAInstallButton;
