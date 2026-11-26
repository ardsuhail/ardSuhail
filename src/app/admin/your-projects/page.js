export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
import YourProject from '@/component/admin/YourProject';
const page = () => {
  return (
    <div>
      <YourProject/>
    </div>
  )
}

export default page
