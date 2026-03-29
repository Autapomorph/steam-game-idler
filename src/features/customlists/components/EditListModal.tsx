import type { Game } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import { RiSearchLine } from 'react-icons/ri';
import { List } from 'react-window';
import { Button, CloseButton, cn, InputGroup, Modal, TextField } from '@heroui/react';

import { EditListRow, type RowData } from './EditListRow';

interface EditListModalProps {
  type?: string;
  list: Game[];
  isOpen: boolean;
  filteredGamesList: Game[];
  showInList: boolean;
  showBlacklist: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setShowInList: (show: boolean) => void;
  setShowBlacklist: (show: boolean) => void;
  handleAddGame: (game: Game) => void;
  handleAddAllGames: (games: Game[]) => void;
  handleAddAllResults: (games: Game[]) => void;
  handleRemoveGame: (game: Game) => void;
  handleClearList: () => void;
  handleBlacklistGame?: (game: Game) => void;
  blacklist: number[];
}

export const EditListModal = ({
  type,
  list,
  isOpen,
  filteredGamesList,
  showInList,
  showBlacklist,
  onOpenChange,
  onClose,
  searchTerm,
  setSearchTerm,
  setShowInList,
  setShowBlacklist,
  handleAddGame,
  handleAddAllGames,
  handleAddAllResults,
  handleRemoveGame,
  handleClearList,
  handleBlacklistGame,
  blacklist,
}: EditListModalProps) => {
  const { t } = useTranslation();
  const rowData: RowData = {
    filteredGamesList,
    list,
    handleAddGame,
    handleRemoveGame,
    type,
    handleBlacklistGame,
    blacklist,
  };

  // Compute the list to show in the virtualized list
  let displayList: Game[];
  if (showInList) {
    displayList = list;
  } else if (showBlacklist) {
    displayList = filteredGamesList.filter(game => blacklist.includes(game.appid));
  } else {
    displayList = filteredGamesList;
  }

  return (
    <Modal.Backdrop
      isOpen={isOpen}
      onOpenChange={isOpen => {
        if (!isOpen) {
          onClose();
        }
        onOpenChange(isOpen);
      }}
    >
      <Modal.Container className="min-h-[75%] max-h-[75%] text-content min-w-[40%] border border-border rounded-4xl">
        <Modal.Dialog>
          {renderProps => (
            <>
              <Modal.Header className="flex gap-2 border-b border-border/40 p-3">
                <TextField autoFocus fullWidth isDisabled={showInList || showBlacklist}>
                  <InputGroup className={cn('bg-transparent hover:bg-transparent')}>
                    <InputGroup.Prefix>
                      <RiSearchLine size={24} className="text-content/60" />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      className={cn(
                        'bg-transparent hover:bg-transparent h-24',
                        'text-content! text-xl! placeholder:text-xl placeholder:text-content/60',
                        'focus-visible:ring-0! focus-visible:ring-offset-0! focus:ring-0! focus:ring-offset-0!',
                      )}
                      placeholder={t($ => $['common.search'])}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                    <InputGroup.Suffix>
                      {searchTerm && (
                        <CloseButton
                          className="bg-surface-secondary text-content/60 hover:text-content"
                          aria-label="Close"
                          onPress={() => setSearchTerm('')}
                        />
                      )}
                    </InputGroup.Suffix>
                  </InputGroup>
                </TextField>
              </Modal.Header>

              <Modal.Body className="relative p-0 gap-0 overflow-y-auto">
                <List
                  rowComponent={EditListRow}
                  rowCount={displayList.length}
                  rowHeight={37}
                  style={{
                    width: '100%',
                    height: window.innerHeight - 225,
                  }}
                  rowProps={{
                    data: {
                      ...rowData,
                      filteredGamesList: displayList,
                    },
                  }}
                />
              </Modal.Body>

              <Modal.Footer className="border-t border-border/40 p-3">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-danger hover:bg-danger-soft font-semibold rounded-full"
                  onPress={handleClearList}
                >
                  {t($ => $['common.clear'])}
                </Button>

                {type === 'cardFarmingList' && (
                  <Button
                    size="sm"
                    className={`font-bold rounded-full ${showBlacklist ? 'bg-success-soft-hover text-success' : 'bg-btn-secondary text-btn-text'}`}
                    isDisabled={blacklist.length === 0}
                    onPress={() => {
                      setShowBlacklist(!showBlacklist);
                      if (showInList) setShowInList(false);
                    }}
                  >
                    {t($ => $['customLists.inBlacklist'])}
                  </Button>
                )}

                <Button
                  size="sm"
                  className={`font-bold rounded-full ${showInList ? 'bg-success-soft-hover text-success' : 'bg-btn-secondary text-btn-text'}`}
                  isDisabled={list.length === 0}
                  onPress={() => {
                    setShowInList(!showInList);
                    if (showBlacklist) setShowBlacklist(false);
                  }}
                >
                  {t($ => $['customLists.inList'])}
                </Button>

                {type === 'achievementUnlockerList' && searchTerm === '' && (
                  <Button
                    size="sm"
                    className="bg-btn-secondary text-btn-text font-bold rounded-full"
                    isDisabled={
                      filteredGamesList.length === 0 || list.length === filteredGamesList.length
                    }
                    onPress={() => handleAddAllGames(filteredGamesList)}
                  >
                    {t($ => $['customLists.addAll'])}
                  </Button>
                )}

                {type === 'achievementUnlockerList' && searchTerm !== '' && (
                  <Button
                    size="sm"
                    className="bg-btn-secondary text-btn-text font-bold rounded-full"
                    isDisabled={
                      filteredGamesList.length === 0 ||
                      filteredGamesList.every(game =>
                        list.some(listGame => listGame.appid === game.appid),
                      )
                    }
                    onPress={() => handleAddAllResults(filteredGamesList)}
                  >
                    {t($ => $['customLists.addAllResults'])}
                  </Button>
                )}

                <Button
                  size="sm"
                  className="bg-btn-secondary text-btn-text font-bold rounded-full"
                  onPress={renderProps.close}
                >
                  {t($ => $['common.done'])}
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};
