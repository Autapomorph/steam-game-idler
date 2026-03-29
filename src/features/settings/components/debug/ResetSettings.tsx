import { useTranslation } from 'react-i18next';
import { TbRotateClockwise } from 'react-icons/tb';
import { Button } from '@heroui/react';
import { useResetSettings } from '@/features/settings';
import { CustomModal } from '@/shared/components';

interface ResetSettingsProps {
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

export const ResetSettings = ({ setRefreshKey }: ResetSettingsProps) => {
  const { t } = useTranslation();
  const { handleResetSettings, isOpen, open, toggle } = useResetSettings();

  return (
    <>
      <Button
        size="sm"
        className="text-danger hover:bg-danger-soft rounded-full"
        variant="ghost"
        onPress={open}
      >
        <TbRotateClockwise className="rotate-90" size={20} />
        {t($ => $['settings.resetSettings.button'])}
      </Button>

      <CustomModal
        isOpen={isOpen}
        onOpenChange={toggle}
        title={t($ => $['common.confirm'])}
        body={t($ => $['confirmation.resetSettings'])}
        buttons={
          <>
            <Button
              size="sm"
              variant="ghost"
              className="text-danger hover:bg-danger-soft font-semibold rounded-full"
              onPress={toggle}
            >
              {t($ => $['common.cancel'])}
            </Button>
            <Button
              size="sm"
              className="bg-btn-secondary text-btn-text font-bold rounded-full"
              onPress={() => handleResetSettings(toggle, setRefreshKey)}
            >
              {t($ => $['common.confirm'])}
            </Button>
          </>
        }
      />
    </>
  );
};
