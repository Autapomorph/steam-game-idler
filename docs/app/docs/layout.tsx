import { type PropsWithChildren } from 'react';
import Image from 'next/image';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { FaGithub } from 'react-icons/fa6';

import { source } from '@lib/source';
import { baseOptions } from '@lib/layout.shared';

export default function Layout({ children }: PropsWithChildren) {
  const base = baseOptions();

  return (
    <DocsLayout
      {...base}
      tree={source.pageTree}
      links={[
        {
          type: 'icon',
          url: 'https://github.com/Autapomorph/steam-game-idler',
          label: 'github',
          text: 'Github',
          icon: <FaGithub />,
          external: true,
        },
      ]}
      nav={{
        ...base.nav,
        title: (
          <>
            <Image src="/logo.svg" alt="Steam Game Idler" width={24} height={24} />
            <span className="">Steam Game Idler</span>
          </>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
