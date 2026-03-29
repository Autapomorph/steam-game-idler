import type { Game } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import { TbPlus } from 'react-icons/tb';
import { Button, Input, NumberField, useOverlayState } from '@heroui/react';
import { useManualAdd } from '@/features/customlists';
import { CustomModal } from '@/shared/components';

interface ManualAddModalProps {
  listName: string;
  setList: React.Dispatch<React.SetStateAction<Game[]>>;
}

export const ManualAddModal = ({ listName, setList }: ManualAddModalProps) => {
  const { t } = useTranslation();
  const { isOpen, open, toggle } = useOverlayState();
  const manualAdd = useManualAdd(listName, setList);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, onClose: () => void) => {
    if (e.key === 'Enter') {
      manualAdd.handleAdd(onClose);
    }
  };

  const handleClose = () => {
    manualAdd.setAppNameValue('');
    manualAdd.setAppIdValue(0);
  };

  return (
    <>
      <Button
        isIconOnly
        className="bg-btn-secondary text-btn-text font-bold rounded-full"
        onPress={open}
      >
        <TbPlus fontSize={18} />
      </Button>

      <CustomModal
        isOpen={isOpen}
        onOpenChange={() => {
          toggle();
          handleClose();
        }}
        title={t($ => $['customLists.manualAdd.title'])}
        body={
          <>
            <Input
              autoFocus
              placeholder={t($ => $['customLists.manualAdd.gameName'])}
              value={manualAdd.appNameValue || ''}
              onChange={manualAdd.handleNameChange}
              onKeyDown={e => handleKeyPress(e, toggle)}
            />

            <NumberField
              value={Number(manualAdd.appIdValue)}
              formatOptions={{ useGrouping: false }}
              onChange={e => manualAdd.handleIdChange(e)}
              onKeyDown={e => handleKeyPress(e, toggle)}
            >
              <NumberField.Group>
                <NumberField.DecrementButton />
                <NumberField.Input className="text-sm text-content! placeholder:text-altwhite/50" />
                <NumberField.IncrementButton />
              </NumberField.Group>
            </NumberField>
          </>
        }
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
              isPending={manualAdd.isLoading}
              isDisabled={!manualAdd.appNameValue || !manualAdd.appIdValue}
              onPress={() => manualAdd.handleAdd(toggle)}
            >
              {t($ => $['common.add'])}
            </Button>
          </>
        }
      />
    </>
  );
};
