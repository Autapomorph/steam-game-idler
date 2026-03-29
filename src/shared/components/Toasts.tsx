import { toast } from '@heroui/react';
import i18next from 'i18next';
import { ErrorToast } from '@/shared/components';

export function showSuccessToast(description: string) {
  toast.success(description);
}

export function showPrimaryToast(description: string) {
  toast.info(description);
}

export function showWarningToast(description: string) {
  toast.warning(description);
}

export function showDangerToast(description: string) {
  toast.danger(description);
}

export function showSteamNotRunningToast() {
  toast.danger(
    <div className="grow">
      <ErrorToast
        message={i18next.t($ => $['toast.steam'])}
        href="https://steamgameidler.com/docs/faq#error-messages:~:text=Steam%20is%20not%20running"
      />
    </div>,
  );
}

export function showAccountMismatchToast(color: 'danger' | 'warning') {
  toast[color](
    <ErrorToast
      message={i18next.t($ => $['toast.mismatch'])}
      href="https://steamgameidler.com/docs/faq#error-messages:~:text=Account%20mismatch%20between%20Steam%20and%20SGI"
    />,
  );
}

export function showMissingCredentialsToast() {
  toast.danger(
    <ErrorToast
      message={i18next.t($ => $['toast.missingCredentials'])}
      href="https://steamgameidler.com/docs/faq#error-messages:~:text=Missing%20card%20farming%20credentials%20in%20%E2%80%9Csettings%20%3E%20card%20farming%22"
    />,
  );
}

export function showOutdatedCredentialsToast() {
  toast.danger(
    <ErrorToast
      message={i18next.t($ => $['toast.outdatedCredentials'])}
      href="https://steamgameidler.com/docs/faq#error-messages:~:text=Card%20farming%20credentials%20need%20to%20be%20updated%20in%20%E2%80%9Csettings%20%3E%20general%22"
    />,
  );
}

export function showEnableAllGamesToast() {
  toast.danger(
    <ErrorToast
      message={i18next.t($ => $['toast.enableAllGames'])}
      href="https://steamgameidler.com/docs/faq#error-messages:~:text=Add%20some%20games%20to%20your%20card%20farming%20list%20or%20enable%20%E2%80%9Call%20games%E2%80%9D%20in%20%E2%80%9Csettings%20%3E%20card%20farming%22"
    />,
  );
}

export function showIncorrectCredentialsToast() {
  toast.danger(
    <ErrorToast
      message={i18next.t($ => $['toast.incorrectCredentials'])}
      href="https://steamgameidler.com/docs/faq#error-messages:~:text=Incorrect%20card%20farming%20credentials"
    />,
  );
}

export function showNoGamesToast() {
  toast.danger(
    <ErrorToast
      message={i18next.t($ => $['toast.noGames'])}
      href="https://steamgameidler.com/docs/faq#:~:text=There%20are%20no%20games%20in%20your%20list"
    />,
  );
}

export function showPriceFetchCooldownToast(cooldown: number) {
  toast.warning(
    <ErrorToast
      message={i18next.t($ => $['toast.tradingCards.cooldown'], { cooldown })}
      href="https://steamgameidler.com/docs/faq#error-messages:~:text=Please%20wait%20X%20seconds%20before%20fetching%20more%20card%20prices"
    />,
  );
}

export function showPriceFetchRateLimitToast() {
  toast.danger(
    <ErrorToast
      message={i18next.t($ => $['toast.tradingCards.rateLimit'])}
      href="https://steamgameidler.com/docs/faq#:~:text=Rate%20limited%20when%20fetching%20card%20prices"
    />,
  );
}
