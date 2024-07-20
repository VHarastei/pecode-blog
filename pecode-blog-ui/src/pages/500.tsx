import { MainLayout } from '@layouts';
import { ServerErrorView } from '@features/error';

export default function ServerError() {
  return (
    <MainLayout title="Error Page">
      <ServerErrorView />
    </MainLayout>
  );
}
