import axios from 'axios';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';
import { BASE_URL } from '../utils';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text="no videos" />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic }
}: {
  query: { topic: string };
}) => {
  let res;
  if (!topic) res = await axios.get(`${BASE_URL}/api/posts`);
  else res = await axios.get(`${BASE_URL}/api/discover?topic=${topic}`);

  return {
    props: {
      videos: res.data
    }
  };
};

export default Home;
