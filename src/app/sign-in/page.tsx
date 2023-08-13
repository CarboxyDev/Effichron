import { Logo } from '@/components/Logo';
import { PageWrapper } from '@/components/PageWrapper';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <PageWrapper navbarProps={null}>
      <div className="mt-50 flex flex-col items-center">
        <Link href="/">
          <Logo size={120} />
        </Link>
        <div className="mt-20 flex h-90 w-120 flex-col items-center rounded-xl border border-dark-700 bg-dark-900">
          <h2 className="mt-8 text-lg text-dark-400">Sign in with</h2>
          <div className="mt-24">
            <div className=""></div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
