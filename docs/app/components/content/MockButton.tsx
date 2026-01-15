import { FaCheck } from 'react-icons/fa';
import { FaSteam } from 'react-icons/fa6';
import { GoGrabber } from 'react-icons/go';
import {
  TbArrowsSort,
  TbAward,
  TbBuildingStore,
  TbCards,
  TbChecks,
  TbDeviceGamepad2,
  TbEdit,
  TbEraser,
  TbGift,
  TbHeart,
  TbHourglassLow,
  TbLock,
  TbLockOpen,
  TbPackageExport,
  TbPlayerPlay,
  TbPlus,
  TbSettings,
  TbUpload,
} from 'react-icons/tb';

type ButtonType =
  | 'content'
  | 'unlock'
  | 'lock'
  | 'unlock-all'
  | 'lock-all'
  | 'edit'
  | 'card-farming'
  | 'card-farming-action'
  | 'achievement-unlocker'
  | 'achievement-unlocker-action'
  | 'achievement-manager'
  | 'list-card'
  | 'list-selected'
  | 'list-all'
  | 'remove-all'
  | 'save'
  | 'save-alt'
  | 'save-changes'
  | 'context-add'
  | 'context-cog'
  | 'your-games'
  | 'trading-card-manager'
  | 'idling-games'
  | 'auto-idle'
  | 'free-games'
  | 'unlock-order'
  | 'grabber'
  | 'favorites'
  | 'start-idle'
  | 'steam'
  | 'start-manually'
  | 'checkbox';

interface Props {
  type: ButtonType;
  content?: string;
}

export default function MockButton({ type, content }: Props) {
  if (type === 'content') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        {content}
      </span>
    );
  }
  if (type === 'lock') {
    return (
      <span className="inline-flex align-middle items-center justify-center text-icon-dark bg-red-500 text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbLock fontSize={16} className="inline" /> Lock
      </span>
    );
  }
  if (type === 'lock-all') {
    return (
      <span className="inline-flex align-middle items-center justify-center text-icon-dark bg-red-500 text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbLock fontSize={16} className="inline" /> Lock All
      </span>
    );
  }
  if (type === 'remove-all') {
    return (
      <span className="inline bg-red-500 text-white text-[12px] font-semibold px-2 py-1.5 rounded-full shadow-sm select-none">
        <TbEraser fontSize={16} className="inline" /> Remove All
      </span>
    );
  }
  if (type === 'unlock') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbLockOpen fontSize={16} className="inline" /> Unlock
      </span>
    );
  }
  if (type === 'unlock-all') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbLockOpen fontSize={16} className="inline" /> Unlock All
      </span>
    );
  }
  if (type === 'edit') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbEdit fontSize={16} className="inline" /> Edit List
      </span>
    );
  }
  if (type === 'card-farming') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbCards fontSize={16} className="inline" /> Card Farming
      </span>
    );
  }
  if (type === 'card-farming-action') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbCards fontSize={16} className="inline" /> Start Card Farming
      </span>
    );
  }
  if (type === 'achievement-unlocker') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbAward fontSize={16} className="inline" /> Achievement Unlocker
      </span>
    );
  }
  if (type === 'achievement-unlocker-action') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbAward fontSize={16} className="inline" /> Start Achievement Unlocker
      </span>
    );
  }
  if (type === 'achievement-manager') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1 h-8">
        <TbAward fontSize={16} className="inline" />
      </span>
    );
  }
  if (type === 'list-card') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1 h-8">
        <TbPackageExport fontSize={16} className="inline" />
      </span>
    );
  }
  if (type === 'list-selected') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbChecks fontSize={16} className="inline" /> List Selected
      </span>
    );
  }
  if (type === 'list-all') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbPackageExport fontSize={16} className="inline" /> List All
      </span>
    );
  }
  if (type === 'save') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbUpload fontSize={16} className="inline" /> Save
      </span>
    );
  }
  if (type === 'save-alt') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        Save
      </span>
    );
  }
  if (type === 'save-changes') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbUpload fontSize={16} className="inline" /> Save Changes
      </span>
    );
  }
  if (type === 'context-add') {
    return (
      <span
        className={`inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1 ${content === undefined && 'h-8'}`}
      >
        <TbPlus fontSize={16} className="inline" /> {content}
      </span>
    );
  }
  if (type === 'context-cog') {
    return (
      <span
        className={`inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1 ${content === undefined && 'h-8'}`}
      >
        <TbSettings fontSize={16} className="inline" /> {content}
      </span>
    );
  }
  if (type === 'your-games') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbDeviceGamepad2 fontSize={16} className="inline" /> Your Games
      </span>
    );
  }
  if (type === 'trading-card-manager') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbBuildingStore fontSize={16} className="inline" /> Trading Card Manager
      </span>
    );
  }
  if (type === 'idling-games') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbPlayerPlay fontSize={16} className="inline" /> Idling Games
      </span>
    );
  }
  if (type === 'auto-idle') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbHourglassLow fontSize={16} className="inline" /> Automatic Idler
      </span>
    );
  }
  if (type === 'free-games') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbGift fontSize={16} className="inline" /> Free Games
      </span>
    );
  }
  if (type === 'unlock-order') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1 h-8">
        <TbArrowsSort fontSize={16} className="inline" />
      </span>
    );
  }
  if (type === 'grabber') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-1 rounded-full shadow-sm select-none gap-1 h-8">
        <GoGrabber fontSize={24} className="inline" />
      </span>
    );
  }
  if (type === 'favorites') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbHeart fontSize={16} className="inline" /> Favorite Games
      </span>
    );
  }
  if (type === 'start-idle') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1 h-8">
        <TbPlayerPlay fontSize={16} className="inline" />
      </span>
    );
  }
  if (type === 'steam') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1 h-8">
        <FaSteam fontSize={16} className="inline" />
      </span>
    );
  }
  if (type === 'start-manually') {
    return (
      <span className="inline-flex align-middle items-center justify-center bg-icon-light dark:bg-icon-dark text-icon-light dark:text-icon-dark text-[12px] font-semibold px-2 rounded-full shadow-sm select-none gap-1">
        <TbHourglassLow fontSize={16} className="inline" /> Start Manually
      </span>
    );
  }
  if (type === 'checkbox') {
    return (
      <span className="inline-flex align-middle items-center justify-center w-5 h-5 rounded-md text-white bg-blue-500 border border-border">
        <span className="w-3 h-3 block">
          <FaCheck fontSize={12} />
        </span>
      </span>
    );
  }

  return null;
}
