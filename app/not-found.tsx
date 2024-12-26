"use client";

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  const router = useRouter()

  const navigateToHomePage = () => {
    router.push('/ar')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">
        {t('description')}
      </p>
      <Button
        onClick={navigateToHomePage}
        className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
        {t('button')}
      </Button>
    </div>
  );
}
