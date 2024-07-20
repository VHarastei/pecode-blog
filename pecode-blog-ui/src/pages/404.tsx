import { MainLayout } from '@layouts';
import { NotFoundView } from '@features/error';

export default function NotFoundPage() {
  return (
    <MainLayout title="Not found">
      <NotFoundView />
    </MainLayout>
  );
}
