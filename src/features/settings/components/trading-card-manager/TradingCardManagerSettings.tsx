import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TbChevronRight } from 'react-icons/tb';
import { Alert, Separator, NumberField, Select, ListBox } from '@heroui/react';
import {
  handlePriceAdjustmentChange,
  handleSellDelayChange,
  handleSellLimitMaxChange,
  handleSellLimitMinChange,
  handleSellOptionChange,
  useCardSettings,
} from '@/features/settings';
import { useUserStore } from '@/shared/stores';

export const TradingCardManagerSettings = () => {
  const { t } = useTranslation();
  const userSummary = useUserStore(state => state.userSummary);
  const userSettings = useUserStore(state => state.userSettings);
  const setUserSettings = useUserStore(state => state.setUserSettings);
  const cardSettings = useCardSettings();
  const [priceAdjustment, setPriceAdjustment] = useState<number>(0.0);
  const [sellLimitMin, setSellLimitMin] = useState<number>(0.01);
  const [sellLimitMax, setSellLimitMax] = useState<number>(1.1);
  const [sellDelay, setSellDelay] = useState<number>(10);

  useEffect(() => {
    setPriceAdjustment(userSettings?.tradingCards?.priceAdjustment || 0.0);
    setSellLimitMin(userSettings?.tradingCards?.sellLimit?.min || 0.01);
    setSellLimitMax(userSettings?.tradingCards?.sellLimit?.max || 1.1);
    setSellDelay(userSettings?.tradingCards?.sellDelay || 10);
  }, [
    userSettings?.tradingCards?.priceAdjustment,
    userSettings?.tradingCards?.sellLimit,
    userSettings?.tradingCards?.sellDelay,
  ]);

  const sellOptions = [
    {
      key: 'highestBuyOrder',
      label: t($ => $['settings.tradingCards.sellOptions.highestBuyOrder']),
    },
    {
      key: 'lowestSellOrder',
      label: t($ => $['settings.tradingCards.sellOptions.lowestSellOrder']),
    },
  ];

  return (
    <div className="relative flex flex-col gap-4 mt-9 pb-16 w-4/5">
      <div className="flex flex-col gap-0 select-none">
        <p className="flex items-center text-xs text-altwhite font-bold">
          {t($ => $['settings.title'])}
          <span>
            <TbChevronRight size={12} />
          </span>
        </p>
        <p className="text-3xl font-black">{t($ => $['tradingCards.title'])}</p>

        {!cardSettings.cardFarmingUser && (
          <div className="mt-4">
            <Alert className="bg-dynamic/30! text-dynamic border-dynamic/40!">
              <Alert.Indicator className="bg-dynamic/30! border-dynamic/40 rounded-full" />
              <Alert.Content>
                <Alert.Title className="font-bold text-xs">
                  {t($ => $['settings.tradingCards.alert'])}
                </Alert.Title>
              </Alert.Content>
            </Alert>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['settings.tradingCards.sellOptions'])}
            </p>
            <p className="text-xs text-altwhite">
              {t($ => $['settings.tradingCards.sellOptions.description'])}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              aria-label="sellOptions"
              className="w-50"
              defaultValue={userSettings.tradingCards?.sellOptions}
              placeholder={t($ => $['common.nextTask.selectPlaceholder'])}
              onChange={v => {
                handleSellOptionChange(String(v), userSummary, setUserSettings);
              }}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox disallowEmptySelection>
                  {sellOptions.map(option => (
                    <ListBox.Item key={option.key} id={option.key}>
                      {option.label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['settings.tradingCards.priceAdjustment'])}
            </p>
            <p className="text-xs text-altwhite">
              <Trans
                i18nKey={$ => $['settings.tradingCards.priceAdjustmentSub']}
                values={{ priceAdjustment }}
                components={{ 1: <strong /> }}
              />
            </p>
          </div>

          <NumberField
            value={priceAdjustment}
            formatOptions={{
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }}
            step={0.01}
            aria-label="price adjustment value"
            className="w-22.5"
            onChange={value =>
              handlePriceAdjustmentChange(value, userSummary, setUserSettings, setPriceAdjustment)
            }
          >
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="text-sm text-content! placeholder:text-altwhite/50" />
              <NumberField.IncrementButton />
            </NumberField.Group>
          </NumberField>
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['settings.tradingCards.sellLimit'])}
            </p>
            <p className="text-xs text-altwhite">
              <Trans
                i18nKey={$ => $['settings.tradingCards.sellLimitSub']}
                values={{ sellLimitMin, sellLimitMax }}
                components={{ 1: <strong />, 3: <strong /> }}
              />
            </p>
          </div>
          <div className="flex items-center gap-4">
            <NumberField
              value={sellLimitMin}
              formatOptions={{
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }}
              minValue={0.01}
              step={0.01}
              aria-label="sell limit minimum value"
              className="w-22.5"
              onChange={value =>
                handleSellLimitMinChange(
                  value,
                  userSummary,
                  setUserSettings,
                  sellLimitMax,
                  setSellLimitMin,
                )
              }
            >
              <NumberField.Group>
                <NumberField.DecrementButton />
                <NumberField.Input className="text-sm text-content! placeholder:text-altwhite/50" />
                <NumberField.IncrementButton />
              </NumberField.Group>
            </NumberField>

            <NumberField
              value={sellLimitMax}
              formatOptions={{
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }}
              step={0.01}
              aria-label="sell limit maximum value"
              className="w-22.5"
              onChange={value =>
                handleSellLimitMaxChange(
                  value,
                  userSummary,
                  setUserSettings,
                  sellLimitMin,
                  setSellLimitMax,
                )
              }
            >
              <NumberField.Group>
                <NumberField.DecrementButton />
                <NumberField.Input className="text-sm text-content! placeholder:text-altwhite/50" />
                <NumberField.IncrementButton />
              </NumberField.Group>
            </NumberField>
          </div>
        </div>

        <Separator className="bg-border/70 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-sm text-content font-bold">
              {t($ => $['settings.tradingCards.sellDelay'])}
            </p>
            <p className="text-xs text-altwhite">
              <Trans
                i18nKey={$ => $['settings.tradingCards.sellDelaySub']}
                values={{ sellDelay }}
                components={{ 1: <strong /> }}
              />
            </p>
          </div>

          <NumberField
            value={sellDelay}
            step={1}
            minValue={10}
            maxValue={60}
            aria-label="sell delay value"
            className="w-22.5"
            onChange={value =>
              handleSellDelayChange(value, userSummary, setUserSettings, setSellDelay)
            }
          >
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="text-sm text-content! placeholder:text-altwhite/50" />
              <NumberField.IncrementButton />
            </NumberField.Group>
          </NumberField>
        </div>
      </div>
    </div>
  );
};
