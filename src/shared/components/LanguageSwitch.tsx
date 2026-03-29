import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TbLanguage } from 'react-icons/tb';
import { cn, ListBox, Select } from '@heroui/react';

export const LanguageSwitch = ({ className }: { className?: string }) => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  const languages = [
    { key: 'en-US', label: 'English' },
    { key: 'ru-RU', label: 'Русский' },
  ];

  useEffect(() => {
    setMounted(true);
  }, [i18n]);

  if (!mounted) return null;

  const currentLanguage = languages.find(lang => lang.key === i18n.language)
    ? i18n.language
    : 'en-US';

  return (
    <Select
      aria-label="language"
      className={cn('w-62.5', className)}
      defaultValue={currentLanguage}
      onChange={v => {
        const selectedLanguage = String(v);
        i18n.changeLanguage(selectedLanguage);
      }}
    >
      <Select.Trigger className="flex items-center">
        <TbLanguage />
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <ListBox disallowEmptySelection>
          {languages.map(option => (
            <ListBox.Item key={option.key} id={option.key}>
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
