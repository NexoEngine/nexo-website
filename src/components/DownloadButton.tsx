
import React, { useState, useEffect } from 'react';
import { Download, List, Headset } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Release = {
  tag_name: string;
  name: string;
  html_url: string;
  assets: {
    name: string;
    browser_download_url: string;
  }[];
  published_at: string;
  prerelease: boolean;
};

const DownloadButton = ({ variant = 'primary', showAllReleases = false, className = '' }: {
  variant?: 'primary' | 'secondary' | 'outline' | 'chrome';
  showAllReleases?: boolean;
  className?: string;
}) => {
  const [latestRelease, setLatestRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/repos/NexoEngine/game-engine/releases');
        if (!response.ok) {
          throw new Error('Failed to fetch releases');
        }
        const releases = await response.json();
        
        // Filter out prerelease/draft versions if needed
        const validReleases = releases.filter((release: Release) => !release.prerelease);
        
        if (validReleases.length > 0) {
          setLatestRelease(validReleases[0]);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching release:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRelease();
  }, []);

  const handleDownload = () => {
    if (latestRelease && latestRelease.assets.length > 0) {
      // Find the most appropriate asset to download
      const mainAsset = latestRelease.assets.find(asset => asset.name.includes('nexo') && !asset.name.includes('debug'));

      if (mainAsset) {
        window.open(mainAsset.browser_download_url, '_blank');
        toast.success(`Downloading NEXO VR Engine ${latestRelease.tag_name}`);
      } else {
        window.open(latestRelease.html_url, '_blank');
        toast.info('Redirecting to release page');
      }
    } else {
      window.open('https://github.com/NexoEngine/game-engine/releases', '_blank');
      toast.info('Redirecting to releases page');
    }
  };

  const viewAllReleases = () => {
    window.open('https://github.com/NexoEngine/game-engine/releases', '_blank');
  };

  const buttonClass = {
    primary: 'nexo-btn-primary',
    secondary: 'nexo-btn-secondary',
    outline: 'nexo-btn-outline',
    chrome: 'chrome-btn',
  }[variant];

  return (
    <div className={cn('flex flex-col sm:flex-row gap-2', className)}>
      <button
        onClick={handleDownload}
        disabled={loading || error}
        className={cn(
          buttonClass,
          'py-2 px-4 transition-all',
          loading ? 'opacity-70 cursor-wait' : '',
          error ? 'opacity-50 cursor-not-allowed' : ''
        )}
      >
        {variant === 'chrome' ? (
          <Headset className="mr-2 h-4 w-4" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        {loading ? 'Loading...' : error ? 'Download unavailable' : `Download NEXO VR ${latestRelease?.tag_name || ''}`}
      </button>

      {showAllReleases && (
        <button
          onClick={viewAllReleases}
          className={variant === 'chrome' ? 'chrome-btn py-2 px-4' : 'nexo-btn-outline py-2 px-4'}
        >
          <List className="mr-2 h-4 w-4" />
          All Releases
        </button>
      )}
    </div>
  );
};

export default DownloadButton;
