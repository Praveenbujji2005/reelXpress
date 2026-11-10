import CookiePolicyView from '@/components/cookies/CookiePolicyView';

export const metadata = {
  title: 'Cookie Policy | reelXpress - QUANTELLOVENTURES PRIVATE LIMITED',
  description:
    'Cookie Policy of QUANTELLOVENTURES PRIVATE LIMITED for reelXpress. Learn how cookies and tracking technologies are used on our platform.',
  openGraph: {
    title: 'Cookie Policy | reelXpress',
    description:
      'Cookie Policy explaining how QUANTELLOVENTURES PRIVATE LIMITED uses cookies on the reelXpress platform.',
    url: 'https://www.reelxpress.com/cookies',
  },
};

export default function CookiePage() {
  return <CookiePolicyView />;
}
