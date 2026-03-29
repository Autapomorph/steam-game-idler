import type { useTradingCardsList } from '@/features/trading-card-manager';
import type { TradingCard } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import { TbPackageExport } from 'react-icons/tb';
import { Button, NumberField } from '@heroui/react';
import { CustomTooltip } from '@/shared/components';

interface PriceInputProps {
  item: TradingCard;
  isLocked?: boolean;
  tradingCardContext: ReturnType<typeof useTradingCardsList>;
}

export const PriceInput = ({ item, isLocked, tradingCardContext }: PriceInputProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center gap-1 mt-2">
      <NumberField
        isDisabled={isLocked}
        isInvalid={
          tradingCardContext.selectedCards[item.assetid] &&
          tradingCardContext.getCardPriceValue(item.assetid) <= 0
        }
        value={tradingCardContext.getCardPriceValue(item.assetid)}
        maxValue={99999}
        defaultValue={0}
        step={0.01}
        formatOptions={{
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }}
        aria-label="statistic value"
        className="w-21.25"
        onChange={value => tradingCardContext.updateCardPrice(item.assetid, value)}
      >
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="text-sm text-content! placeholder:text-altwhite/50" />
          <NumberField.IncrementButton />
        </NumberField.Group>
      </NumberField>

      <CustomTooltip content={t($ => $['common.list'])} placement="top">
        <Button
          isIconOnly
          className="bg-btn-secondary text-btn-text font-bold rounded-full"
          isPending={tradingCardContext.loadingListButton}
          isDisabled={
            tradingCardContext.loadingListButton ||
            tradingCardContext.getCardPriceValue(item.assetid) <= 0
          }
          onPress={() => {
            tradingCardContext.handleSellSingleCard(
              item.assetid,
              item.id,
              tradingCardContext.getCardPriceValue(item.assetid),
            );
          }}
        >
          {!tradingCardContext.loadingListButton && <TbPackageExport size={20} />}
        </Button>
      </CustomTooltip>
    </div>
  );
};
