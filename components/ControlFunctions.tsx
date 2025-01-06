import MapControlBtn from "./MapControlBtn";
import clsx from "clsx";
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface ControlFunctionsProps {
  selectedTypes?: string[];
  setSelectedTypes?: React.ComponentState;
  selectedCategories?: string[];
  setSelectedCategories?: React.ComponentState;
  zoomIn?: () => void;
  zoomOut?: () => void;
  setPopupOpen?: React.ComponentState;
}

const ControlFunctions = ({ selectedTypes, setSelectedTypes, zoomIn, zoomOut, setPopupOpen, selectedCategories, setSelectedCategories }: ControlFunctionsProps) => {
  const t = useTranslations('MapPage');
  const router = useRouter();
  const pathname = usePathname()
  const { toast } = useToast()


  const [isFullScreen, setIsFullScreen] = useState<Checked>(false);

  // Handle For Full Screen Button
  const handleFullScreen = () => {
    const element = document.documentElement;

    if (!document.fullscreenElement) {
      element.requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((error) => console.error(`Error entering full-screen mode: ${error.message}`));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullScreen(false))
        .catch((error) => console.error(`Error exiting full-screen mode: ${error.message}`));
    }
  }

  // Handle For Share Website Button
  const handleShareWebsite = async () => {
    if (navigator.share) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        await navigator.share({
          title: document.title,
          text: t("CheckWebsite"),
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          description: t("LinkCopiedMessage"),
          duration: 5000,
          style: { width: '200px', paddingLeft: '40px', margin: '10px', textAlign: 'center', fontSize: '18px' }
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("ErrorTitle"),
          description: t("CopyErrorMessage"),
        })
      }
    }
  };

  // Handle For Hide Places Button
  const handleHidePlaces = () => {
    setSelectedTypes([]);
  }

  const handleShowPlaces = () => {
    setSelectedTypes(["places"]);
  }

  // Handle For Hide Categories Button
  const handleHideCategories = () => {
    setSelectedCategories([]);
  }

  // Handle For Hide Categories Button
  const handleShowCategories = () => {
    setSelectedCategories(["category-a", "category-b", "category-c", "category-d"]);
  }

  // Handle For Change Language Button
  const handleChangeLanguage = (lang: string) => {
    if (!pathname) return;

    const segments = pathname.split('/').filter(Boolean);

    if (segments[0]) {
      segments[0] = lang;
    } else {
      segments.unshift(lang);
    }

    const newPath = `/${segments.join('/')}`;

    router.push(newPath);
  }

  // Handle For Ask For Help Button
  const handleAskHelp = () => { }


  return (
    <div className={clsx("fixed flex flex-col justify-between z-[1000] pb-[10px]", t("language").toLowerCase() == 'ar' ? "right-[10px]" : "left-[10px]", zoomIn ? "top-0  h-full" : "top-20 h-[calc(100%-5rem)]")}>
      {(zoomIn && zoomOut) && (
        <div >
          <MapControlBtn onClick={zoomIn} icon="plus" title={t("ZoomIn")} />
          <MapControlBtn onClick={zoomOut} icon="minus" title={t("ZoomOut")} />
        </div>
      )}
      <div>
        {selectedTypes && (
          <MapControlBtn onClick={(selectedTypes.includes("places") || selectedTypes.length) ? handleHidePlaces : handleShowPlaces} icon={selectedTypes.length ? 'eyes-dash' : 'eyes'} title={selectedTypes.length ? t("HidePlaces") : t("ShowPlaces")} />
        )}
        {selectedCategories && (
          <MapControlBtn onClick={selectedCategories.length ? handleHideCategories : handleShowCategories} icon={selectedCategories.length ? 'eyes-dash' : 'eyes'} title={selectedCategories.length ? t("HideCategories") : t("ShowCategories")} />
        )}
        <MapControlBtn onClick={() => handleChangeLanguage(t("language").toLowerCase())} text={t("language")} title={t("ChangeLanguage")} />
      </div>

      <div className="flex-1 flex flex-col justify-end">
        {(zoomIn && zoomOut && setPopupOpen) && (
          <MapControlBtn onClick={() => setPopupOpen(true)} icon="gallery" title={t('gallery')} />
        )}
        <MapControlBtn onClick={handleAskHelp} icon="question" title={t('AskHelp')} />
        <MapControlBtn onClick={handleShareWebsite} icon="share" title={t("ShareWebsite")} />
        <MapControlBtn onClick={handleFullScreen} icon={isFullScreen ? 'small-screen' : 'full-screen'} title={isFullScreen ? t("SmallScreen") : t("FullScreen")} />
      </div>
    </div>
  )
}

export default ControlFunctions
