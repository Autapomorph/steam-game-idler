import type { useTradingCardsList } from '@/features/trading-card-manager';
import type { CardSortOption } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import {
  TbChecks,
  TbChevronLeft,
  TbChevronRight,
  TbEraser,
  TbPackageExport,
  TbSettings,
  TbX,
} from 'react-icons/tb';
import { Button, cn, Separator, Tabs, useOverlayState } from '@heroui/react';
import { CustomModal } from '@/shared/components';
import { useNavigationStore, useSearchStore, useStateStore, useUserStore } from '@/shared/stores';

// Helper function to format seconds to HH:MM:SS
const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0'),
  ].join(':');
};

interface PageHeaderProps {
  selectedCardsWithPrice: string[];
  tradingCardContext: ReturnType<typeof useTradingCardsList>;
  currentPage: number;
  totalPages: number;
  lockedCards: string[];
  onPageChange: (page: number) => void;
}

export const PageHeader = ({
  selectedCardsWithPrice,
  tradingCardContext,
  currentPage,
  totalPages,
  lockedCards,
  onPageChange,
}: PageHeaderProps) => {
  const { t } = useTranslation();
  const userSettings = useUserStore(state => state.userSettings);
  const sidebarCollapsed = useStateStore(state => state.sidebarCollapsed);
  const transitionDuration = useStateStore(state => state.transitionDuration);
  const tradingCardQueryValue = useSearchStore(state => state.tradingCardQueryValue);
  const setTradingCardQueryValue = useSearchStore(state => state.setTradingCardQueryValue);
  const setActivePage = useNavigationStore(state => state.setActivePage);
  const setPreviousActivePage = useNavigationStore(state => state.setPreviousActivePage);
  const setCurrentSettingsTab = useNavigationStore(state => state.setCurrentSettingsTab);
  const { isOpen: isConfirmOpen, open: confirmOpen, toggle: onConfirmToggle } = useOverlayState();
  const { isOpen: isBulkOpen, open: bulkOpen, toggle: onBulkToggle } = useOverlayState();
  const { isOpen: isRemoveOpen, open: removeOpen, toggle: onRemoveToggle } = useOverlayState();

  const handleCardSorting = (key: string) => {
    tradingCardContext.setCardSortStyle?.(key);
  };

  const cardSortOptions: CardSortOption[] = [
    { key: 'a-z', label: t($ => $['tradingCards.sort.cardNameAsc']) },
    { key: 'z-a', label: t($ => $['tradingCards.sort.cardNameDesc']) },
    { key: 'aa-zz', label: t($ => $['tradingCards.sort.gameNameAsc']) },
    { key: 'zz-aa', label: t($ => $['tradingCards.sort.gameNameDesc']) },
    { key: 'badge', label: t($ => $['tradingCards.sort.badge']) },
    { key: 'foil', label: t($ => $['tradingCards.sort.foils']) },
    { key: 'dupes', label: t($ => $['tradingCards.sort.duplicates']) },
  ];

  return (
    <>
      <div
        className={cn(
          'z-50 pl-6 pt-2',
          sidebarCollapsed ? 'w-[calc(100vw-85px)]' : 'w-[calc(100vw-280px)]',
        )}
        style={{
          transitionDuration,
          transitionProperty: 'width',
        }}
      >
        <div className="flex justify-between items-center pb-3 w-full">
          <div className="flex items-center gap-1 select-none w-full">
            <div className="flex flex-col justify-center w-full">
              <p className="text-3xl font-black">{t($ => $['tradingCards.title'])}</p>
              <p className="text-xs text-altwhite my-2">{t($ => $['tradingCards.subtitle'])}</p>

              <div className="flex flex-col justify-center gap-2 mt-1">
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-altwhite font-bold">{t($ => $['common.sortBy'])}</p>

                  <Tabs
                    selectedKey={tradingCardContext.cardSortStyle}
                    onSelectionChange={key => {
                      handleCardSorting(key as string);
                    }}
                  >
                    <Tabs.ListContainer>
                      <Tabs.List aria-label="sort options">
                        {cardSortOptions.map(option => (
                          <Tabs.Tab key={option.key} id={option.key}>
                            {option.label}
                            <Tabs.Indicator />
                          </Tabs.Tab>
                        ))}
                      </Tabs.List>
                    </Tabs.ListContainer>
                  </Tabs>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <Button
                    className="bg-btn-secondary text-btn-text font-bold rounded-full"
                    onPress={() => tradingCardContext.handleRefresh()}
                  >
                    {t($ => $['common.refresh'])}
                  </Button>

                  <Button
                    className="bg-btn-secondary text-btn-text font-bold rounded-full"
                    isDisabled={selectedCardsWithPrice.length === 0}
                    isPending={tradingCardContext.loadingListButton}
                    onPress={confirmOpen}
                  >
                    !tradingCardContext.loadingListButton && <TbChecks fontSize={20} />
                    {t($ => $['tradingCards.list'])}{' '}
                    {selectedCardsWithPrice.length > 0 && `(${selectedCardsWithPrice.length})`}
                  </Button>

                  <Button
                    className="bg-btn-secondary text-btn-text font-bold rounded-full"
                    isDisabled={tradingCardContext.tradingCardsList.length === 0}
                    isPending={tradingCardContext.loadingListButton}
                    onPress={bulkOpen}
                  >
                    {!tradingCardContext.loadingListButton && <TbPackageExport fontSize={20} />}
                    {t($ => $['tradingCards.bulk'], {
                      count:
                        tradingCardContext.tradingCardsList?.length || 0 - lockedCards.length || 0,
                    })}
                  </Button>

                  <Button
                    className="font-bold rounded-full"
                    variant="danger"
                    isPending={tradingCardContext.loadingRemoveListings}
                    onPress={removeOpen}
                  >
                    {!tradingCardContext.loadingRemoveListings && <TbEraser fontSize={20} />}
                    {t($ => $['tradingCards.remove'])}
                  </Button>

                  <Button
                    isIconOnly
                    className="bg-btn-secondary text-btn-text font-bold rounded-full"
                    onPress={() => {
                      setPreviousActivePage('tradingCards');
                      setActivePage('settings');
                      setCurrentSettingsTab('trading-card-manager');
                    }}
                  >
                    <TbSettings size={20} />
                  </Button>

                  {tradingCardQueryValue && (
                    <div className="flex items-center gap-2">
                      <Separator orientation="vertical" className="mx-2 h-8 bg-border" />
                      <p className="text-sm text-altwhite font-bold">
                        {t($ => $['common.search'])}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-altwhite p-2 bg-item-active rounded-full max-w-44">
                        <p className="text-content truncate">{tradingCardQueryValue}</p>
                        <div
                          className="flex items-center justify-center cursor-pointer bg-item-hover hover:bg-item-hover/80 rounded-full p-1 duration-150"
                          onClick={() => setTradingCardQueryValue('')}
                        >
                          <TbX />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pagination */}
                  {tradingCardContext.tradingCardsList.length > 0 && (
                    <div className="flex ml-auto justify-center items-center gap-4">
                      <Button
                        isIconOnly
                        className="bg-btn-secondary text-btn-text font-bold rounded-full"
                        isDisabled={currentPage === 1}
                        onPress={() => onPageChange(currentPage - 1)}
                      >
                        <TbChevronLeft fontSize={20} />
                      </Button>

                      <p className="text-sm">
                        {currentPage} / {totalPages}
                      </p>

                      <Button
                        isIconOnly
                        className="bg-btn-secondary text-btn-text font-bold rounded-full"
                        isDisabled={currentPage === totalPages}
                        onPress={() => onPageChange(currentPage + 1)}
                      >
                        <TbChevronRight fontSize={20} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={isConfirmOpen}
        onOpenChange={onConfirmToggle}
        title={t($ => $['common.notice'])}
        body={
          <div className="whitespace-pre-line">
            {t($ => $['tradingCards.confirm'], {
              time: formatTime(
                Number(tradingCardContext.tradingCardsList?.length) *
                  (userSettings.tradingCards.sellDelay || 10),
              ),
              count: Number(selectedCardsWithPrice.length),
            })}
          </div>
        }
        buttons={
          <>
            <Button
              size="sm"
              variant="ghost"
              className="text-danger hover:bg-danger-soft font-semibold rounded-full"
              onPress={onConfirmToggle}
            >
              {t($ => $['common.cancel'])}
            </Button>
            <Button
              size="sm"
              className="bg-btn-secondary text-btn-text font-bold rounded-full"
              onPress={() => {
                tradingCardContext.handleSellSelectedCards();
                onConfirmToggle();
              }}
            >
              {t($ => $['common.confirm'])}
            </Button>
          </>
        }
      />

      <CustomModal
        isOpen={isBulkOpen}
        onOpenChange={onBulkToggle}
        title={t($ => $['common.notice'])}
        body={
          <div className="whitespace-pre-line">
            {t($ => $['tradingCards.confirmBulk'], {
              time: formatTime(Number(tradingCardContext.tradingCardsList?.length) * 3),
              count: Number(tradingCardContext.tradingCardsList?.length),
            })}
          </div>
        }
        buttons={
          <>
            <Button
              size="sm"
              variant="ghost"
              className="text-danger hover:bg-danger-soft font-semibold rounded-full"
              onPress={onBulkToggle}
            >
              {t($ => $['common.cancel'])}
            </Button>
            <Button
              size="sm"
              className="bg-btn-secondary text-btn-text font-bold rounded-full"
              onPress={() => {
                tradingCardContext.handleSellAllCards();
                onBulkToggle();
              }}
            >
              {t($ => $['common.confirm'])}
            </Button>
          </>
        }
      />

      <CustomModal
        isOpen={isRemoveOpen}
        onOpenChange={onRemoveToggle}
        title={t($ => $['common.notice'])}
        body={
          <div className="whitespace-pre-line">
            {t($ => $['tradingCards.confirmRemove'], {
              time: formatTime(Number(tradingCardContext.tradingCardsList?.length) * 3),
              count: Number(tradingCardContext.tradingCardsList?.length),
            })}
          </div>
        }
        buttons={
          <>
            <Button
              size="sm"
              variant="ghost"
              className="text-danger hover:bg-danger-soft font-semibold rounded-full"
              onPress={onRemoveToggle}
            >
              {t($ => $['common.cancel'])}
            </Button>
            <Button
              size="sm"
              className="bg-btn-secondary text-btn-text font-bold rounded-full"
              onPress={() => {
                tradingCardContext.handleRemoveActiveListings();
                onRemoveToggle();
              }}
            >
              {t($ => $['common.confirm'])}
            </Button>
          </>
        }
      />
    </>
  );
};
