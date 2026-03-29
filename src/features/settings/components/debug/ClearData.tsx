import { useTranslation } from 'react-i18next';
import { TbEraser } from 'react-icons/tb';
import { Button, useOverlayState } from '@heroui/react';
import { handleClearData } from '@/features/settings';
import { CustomModal } from '@/shared/components';
import { useUserStore } from '@/shared/stores';

export const ClearData = () => {
  const { t } = useTranslation();
  const { isOpen, open, toggle } = useOverlayState();
  const setUserSummary = useUserStore(state => state.setUserSummary);

  return (
    <>
      <Button
        size="sm"
        className="text-danger hover:bg-danger-soft rounded-full"
        variant="ghost"
        onPress={open}
      >
        <TbEraser size={20} />
        {t($ => $['settings.clearData.button'])}
      </Button>

      <CustomModal
        isOpen={isOpen}
        onOpenChange={toggle}
        title={t($ => $['common.confirm'])}
        body={t($ => $['confirmation.clearData'])}
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
              onPress={() => handleClearData(toggle, setUserSummary)}
            >
              {t($ => $['common.confirm'])}
            </Button>
          </>
        }
      />
    </>
  );
};
